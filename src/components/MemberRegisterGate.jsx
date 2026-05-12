import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

const CITIES = [
  "台北市", "新北市", "基隆市", "桃園市", "新竹市", "新竹縣",
  "苗栗縣", "台中市", "彰化縣", "南投縣", "雲林縣", "嘉義市",
  "嘉義縣", "台南市", "高雄市", "屏東縣", "宜蘭縣", "花蓮縣",
  "台東縣", "澎湖縣", "金門縣", "連江縣"
];

const OCCUPATIONS = [
  "上班族", "學生", "自營業主", "自由業", "家管", "退休", "其他"
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 80 }, (_, i) => currentYear - 20 - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function MemberRegisterGate({ onComplete }) {
  const [show, setShow] = useState(() => {
    try { return sessionStorage.getItem("memberRegistered") !== "true"; } catch { return true; }
  });
  const [otpSent, setOtpSent] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", occupation: "", line_id: "",
    birth_year: "", birth_month: "", city: "", age_confirmed: false,
  });

  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!show) onComplete();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "請填寫姓名";
    if (!form.email.trim()) e.email = "請填寫 Email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email 格式不正確";
    if (!form.line_id.trim()) e.line_id = "請填寫 LINE ID";
    if (!form.occupation) e.occupation = "請選擇職業別";
    if (!form.birth_year) e.birth_year = "請選擇出生年份";
    if (!form.birth_month) e.birth_month = "請選擇出生月份";
    if (!form.city) e.city = "請選擇縣市";
    if (!form.age_confirmed) e.age_confirmed = "請勾選確認";
    return e;
  };

  const handleSendOtp = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    setSendingOtp(true);
    const res = await base44.functions.invoke("sendEmailOtp", { email: form.email.trim() });
    setSendingOtp(false);

    if (res.data?.success) {
      setOtpSent(true);
      setOtpError("");
    } else {
      setErrors(e2 => ({ ...e2, email: "驗證碼發送失敗，請確認 Email" }));
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) { setOtpError("請輸入驗證碼"); return; }
    setSubmitting(true);

    const res = await base44.functions.invoke("verifyEmailOtp", { email: form.email.trim(), code: otp });

    if (res.data?.success) {
      let userEmail = form.email.trim();
      try { const user = await base44.auth.me(); userEmail = user?.email || userEmail; } catch {}

      await base44.entities.Member.create({
        ...form,
        birth_year: parseInt(form.birth_year),
        birth_month: parseInt(form.birth_month),
        user_email: userEmail,
      });
      sessionStorage.setItem("memberRegistered", "true");
      setShow(false);
      onComplete();
    } else {
      setOtpError(res.data?.error || "驗證碼錯誤，請重新輸入");
      setSubmitting(false);
    }
  };

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: undefined }));
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-black px-8 pt-8 pb-6 text-center">
              <p className="font-heading font-bold text-2xl tracking-[0.35em] uppercase text-white mb-1">TEREA</p>
              <p className="font-body text-xs text-white/40 tracking-widest">TAIWAN</p>
            </div>

            {/* Body */}
            <div className="px-8 py-6 overflow-y-auto max-h-[70vh]">
              <h2 className="font-heading text-lg font-bold text-center mb-1">會員資料填寫</h2>
              <p className="font-body text-xs text-muted-foreground text-center mb-6">請填寫以下資料以進入網站</p>

              <div className="space-y-4">
                <Field label="姓名 *" error={errors.name}>
                      <input type="text" placeholder="請輸入姓名"
                        value={form.name} onChange={e => set("name", e.target.value)}
                        className={inputCls(errors.name)} />
                    </Field>

                <Field label="Email *" error={errors.email}>
                      <input type="email" placeholder="example@email.com"
                        value={form.email} onChange={e => set("email", e.target.value)}
                        disabled={otpSent}
                        className={inputCls(errors.email)} />
                    </Field>

                {otpSent && (
                  <Field label="驗證碼 *" error={otpError}>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="請輸入 6 位驗證碼"
                          value={otp}
                          onChange={e => { setOtp(e.target.value); setOtpError(""); }}
                          className={inputCls(otpError)}
                          maxLength={6}
                        />
                    <p className="font-body text-[10px] text-muted-foreground mt-1.5">若未收到，請檢查垃圾郵件資料夾</p>
                  </Field>
                )}

                <Field label="LINE ID *" error={errors.line_id}>
                      <input type="text" placeholder="請輸入 LINE ID"
                        value={form.line_id} onChange={e => set("line_id", e.target.value)}
                        className={inputCls(errors.line_id)} />
                    </Field>

                <Field label="職業別 *" error={errors.occupation}>
                      <select value={form.occupation} onChange={e => set("occupation", e.target.value)} className={selectCls(errors.occupation)}>
                        <option value="">請選擇職業</option>
                        {OCCUPATIONS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="出生年份 *" error={errors.birth_year}>
                        <select value={form.birth_year} onChange={e => set("birth_year", e.target.value)} className={selectCls(errors.birth_year)}>
                          <option value="">年份</option>
                          {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </Field>
                  <Field label="出生月份 *" error={errors.birth_month}>
                        <select value={form.birth_month} onChange={e => set("birth_month", e.target.value)} className={selectCls(errors.birth_month)}>
                          <option value="">月份</option>
                          {MONTHS.map(m => <option key={m} value={m}>{m}月</option>)}
                        </select>
                  </Field>
                </div>

                <Field label="居住縣市 *" error={errors.city}>
                      <select value={form.city} onChange={e => set("city", e.target.value)} className={selectCls(errors.city)}>
                        <option value="">請選擇縣市</option>
                        {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>

                <div
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer select-none ${errors.age_confirmed ? "border-red-400 bg-red-50" : "border-border bg-muted/30"}`}
                      onClick={() => set("age_confirmed", !form.age_confirmed)}
                    >
                      <div className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${form.age_confirmed ? "bg-black border-black" : "bg-white border-border"}`}>
                        {form.age_confirmed && (
                          <svg viewBox="0 0 12 10" className="w-3 h-3 fill-none stroke-white stroke-2">
                            <polyline points="1,5 4,8 11,1" />
                          </svg>
                        )}
                      </div>
                      <p className="font-body text-sm text-foreground leading-relaxed">
                        我已年滿 <span className="font-bold">20 歲</span>並自行同意進入本網站，了解本網站含有菸草相關商品資訊。
                      </p>
                    </div>
                {errors.age_confirmed && <p className="font-body text-xs text-red-500 -mt-2">{errors.age_confirmed}</p>}
              </div>

              {!otpSent && (
                <button
                  onClick={handleSendOtp}
                  disabled={sendingOtp}
                  className="w-full mt-6 py-4 bg-black text-white font-body text-sm tracking-widest rounded-xl hover:bg-black/80 transition-all disabled:opacity-50"
                >
                  {sendingOtp ? "發送中…" : "發送驗證碼"}
                </button>
              )}

                  {otpSent && (
                    <button
                  onClick={handleVerifyOtp}
                  disabled={submitting}
                  className="w-full mt-6 py-4 bg-black text-white font-body text-sm tracking-widest rounded-xl hover:bg-black/80 transition-all disabled:opacity-50"
                >
                  {submitting ? "驗證中…" : "確認進入"}
                </button>
              )}

              {otpSent && (
                <button
                  onClick={() => { setOtpSent(false); setOtp(""); setOtpError(""); }}
                  className="w-full mt-2 py-3 text-muted-foreground font-body text-xs tracking-wider hover:text-foreground transition-colors"
                >
                  返回修改資料
                </button>
              )}

              <p className="font-body text-[10px] text-muted-foreground text-center mt-4 leading-relaxed">
                ⚠ 吸菸有害健康。本網站僅供台灣地區20歲以上成年人瀏覽。
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="font-body text-xs text-muted-foreground mb-1.5 block">{label}</label>
      {children}
      {error && <p className="font-body text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function inputCls(error) {
  return `w-full border rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-black/20 ${error ? "border-red-400" : "border-border"}`;
}

function selectCls(error) {
  return `w-full border rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-black/20 bg-white appearance-none ${error ? "border-red-400" : "border-border"}`;
}