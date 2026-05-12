import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Save, Plus, Trash2, LogOut, Image, HelpCircle, ChevronDown, ChevronUp, Video, Upload } from "lucide-react";

const TAB_LIST = [
  { id: "hero", label: "Hero 輪播", icon: Image },
  { id: "faq", label: "FAQ 問答", icon: HelpCircle },
  { id: "video", label: "影片", icon: Video },
];

const ADMIN_EMAIL = "568iqos@gmail.com";
const ADMIN_PASSWORD = "i9831221";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  // Hero slides state
  const [slides, setSlides] = useState([
    {
      image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/e45ae93a9_IMG_8058.jpg",
      label: "TEREA Taiwan",
      title: "加熱不燃燒\n新科技體驗",
      sub: "每一次點燃，都多了一份儀式感",
      ctaLabel: "探索產品",
      ctaTo: "/products",
      ctaSecondaryLabel: "了解技術",
      ctaSecondaryTo: "/technology",
      align: "left",
    },
    {
      image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/1cc1cf9ab_IMG_8122.png",
      label: "TEREA Lifestyle",
      title: "創作靈感\n自由表達",
      sub: "以風味為畫筆，描繪屬於你的生活品味",
      ctaLabel: "探索產品",
      ctaTo: "/products",
      ctaSecondaryLabel: "",
      ctaSecondaryTo: "",
      align: "left",
    },
    {
      image: "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/260e7c9f4_IMG_8125.jpg",
      label: "ILUMA",
      title: "你的 Q故事\n個性登場",
      sub: "多款配色設計，展現獨一無二的風格品味",
      ctaLabel: "探索產品",
      ctaTo: "/products",
      ctaSecondaryLabel: "了解技術",
      ctaSecondaryTo: "/technology",
      align: "right",
    },
  ]);

  // FAQ state
  const [faqs, setFaqs] = useState([
    { q: "TEREA 是什麼產品？", a: "TEREA 是專為 IQOS ILUMA 系列設計的加熱式菸草彈，採用 Smartcore™ 感應加熱技術，從菸草內部加熱，溫度不超過 350°C，不產生燃燒、無灰燼。" },
    { q: "加熱不燃燒與傳統菸草有何不同？", a: "傳統菸草透過燃燒（600°C 以上）產生煙霧，而 TEREA 使用電磁感應將菸草加熱至 350°C 以下，產生蒸氣而非煙霧，因此無燃燒氣味，也不會產生灰燼。" },
    { q: "TEREA 有哪些口味可以選擇？", a: "目前 TEREA 台灣市場提供六款風味：醇原味、淡原味、柔原味、濃郁原味、綠洲珍珠（薄荷）、日光珍珠（柑橘薄荷），涵蓋菸草系與清涼系。" },
    { q: "在哪裡可以購買 TEREA？", a: "TEREA 可於全台授權門市購買，包含台北、台中、高雄等地。請前往「門市據點」頁面查詢最近的授權販售點。" },
    { q: "TEREA 每根可以使用多久？", a: "每根 TEREA 約可使用 14 口或 6 分鐘，具體時間依個人使用方式而異。" },
  ]);

  const [expandedSlide, setExpandedSlide] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoSettingId, setVideoSettingId] = useState(null);
  const [videoUploading, setVideoUploading] = useState(false);
  const videoInputRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
        if (me?.role === "admin" && authenticated) {
          await loadSettings();
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    if (authenticated) init();
  }, [authenticated]);

  const loadSettings = async () => {
    try {
      const records = await base44.entities.SiteSettings.list();
      const heroRec = records.find((r) => r.key === "hero_slides");
      const faqRec = records.find((r) => r.key === "faq_items");
      const videoRec = records.find((r) => r.key === "home_video_url");
      if (heroRec?.value) setSlides(JSON.parse(heroRec.value));
      if (faqRec?.value) setFaqs(JSON.parse(faqRec.value));
      if (videoRec?.value) { setVideoUrl(videoRec.value); setVideoSettingId(videoRec.id); }
    } catch {}
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const records = await base44.entities.SiteSettings.list();
      const heroRec = records.find((r) => r.key === "hero_slides");
      const faqRec = records.find((r) => r.key === "faq_items");

      if (heroRec) {
        await base44.entities.SiteSettings.update(heroRec.id, { value: JSON.stringify(slides) });
      } else {
        await base44.entities.SiteSettings.create({ key: "hero_slides", value: JSON.stringify(slides) });
      }

      if (faqRec) {
        await base44.entities.SiteSettings.update(faqRec.id, { value: JSON.stringify(faqs) });
      } else {
        await base44.entities.SiteSettings.create({ key: "faq_items", value: JSON.stringify(faqs) });
      }

      setSavedMsg("儲存成功！");
      setTimeout(() => setSavedMsg(""), 2500);
    } catch (e) {
      setSavedMsg("儲存失敗，請重試");
      setTimeout(() => setSavedMsg(""), 2500);
    } finally {
      setSaving(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (loginEmail === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setLoginError("");
      setLoading(true);
    } else {
      setLoginError("帳號或密碼錯誤");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-1 tracking-widest">TEREA</h1>
          <p className="text-xs text-gray-400 text-center mb-6 tracking-widest">後台管理系統</p>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">帳號</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => { setLoginEmail(e.target.value); setLoginError(""); }}
                placeholder="568iqos@gmail.com"
                className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">密碼</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => { setLoginPassword(e.target.value); setLoginError(""); }}
                placeholder="密碼"
                className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
            {loginError && <p className="text-xs text-red-500 text-center">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-medium text-sm hover:bg-black/80 transition mt-6"
            >
              進入後台
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">請先登入</p>
          <button
            onClick={() => base44.auth.redirectToLogin("/admin")}
            className="px-6 py-2 bg-black text-white text-sm rounded hover:bg-black/80 transition"
          >
            前往登入
          </button>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-lg font-semibold mb-1">權限不足</p>
          <p className="text-sm text-gray-500">此頁面僅限管理員使用</p>
        </div>
      </div>
    );
  }

  // Video upload
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideoUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    const records = await base44.entities.SiteSettings.list();
    const rec = records.find((r) => r.key === "home_video_url");
    if (rec) {
      await base44.entities.SiteSettings.update(rec.id, { value: file_url });
      setVideoSettingId(rec.id);
    } else {
      const newRec = await base44.entities.SiteSettings.create({ key: "home_video_url", value: file_url });
      setVideoSettingId(newRec.id);
    }
    setVideoUrl(file_url);
    setVideoUploading(false);
  };

  const handleVideoUrlSave = async () => {
    setSaving(true);
    const records = await base44.entities.SiteSettings.list();
    const rec = records.find((r) => r.key === "home_video_url");
    if (rec) {
      await base44.entities.SiteSettings.update(rec.id, { value: videoUrl });
    } else {
      await base44.entities.SiteSettings.create({ key: "home_video_url", value: videoUrl });
    }
    setSavedMsg("儲存成功！");
    setTimeout(() => setSavedMsg(""), 2500);
    setSaving(false);
  };

  // Slide helpers
  const updateSlide = (i, field, val) => {
    setSlides((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  };
  const addSlide = () => setSlides((prev) => [...prev, { image: "", label: "", title: "", sub: "", ctaLabel: "探索產品", ctaTo: "/products", ctaSecondaryLabel: "", ctaSecondaryTo: "", align: "left" }]);
  const removeSlide = (i) => setSlides((prev) => prev.filter((_, idx) => idx !== i));

  // FAQ helpers
  const updateFaq = (i, field, val) => {
    setFaqs((prev) => prev.map((f, idx) => idx === i ? { ...f, [field]: val } : f));
  };
  const addFaq = () => setFaqs((prev) => [...prev, { q: "", a: "" }]);
  const removeFaq = (i) => setFaqs((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg tracking-tight">TEREA 後台管理</h1>
          <p className="text-xs text-gray-400 mt-0.5">歡迎，{user.full_name || user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          {savedMsg && (
            <span className={`text-sm font-medium ${savedMsg.includes("成功") ? "text-green-600" : "text-red-500"}`}>
              {savedMsg}
            </span>
          )}
          <button
            onClick={saveSettings}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "儲存中..." : "儲存變更"}
          </button>
          <button
            onClick={() => base44.auth.logout("/")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50 transition"
          >
            <LogOut className="w-4 h-4" />
            登出
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {TAB_LIST.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                tab === t.id ? "bg-black text-white" : "bg-white border text-gray-600 hover:border-black"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Hero Slides Editor */}
        {tab === "hero" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="space-y-4">
              {slides.map((slide, i) => (
                <div key={i} className="bg-white rounded-xl border overflow-hidden">
                  <button
                    onClick={() => setExpandedSlide(expandedSlide === i ? -1 : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      {slide.image && (
                        <img src={slide.image} alt="" className="w-10 h-10 object-cover rounded" />
                      )}
                      <div>
                        <p className="font-semibold text-sm">{slide.label || `第 ${i + 1} 張`}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">{slide.title?.replace("\n", " ")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); removeSlide(i); }}
                        className="p-1.5 rounded hover:bg-red-50 text-red-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {expandedSlide === i ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </div>
                  </button>

                  {expandedSlide === i && (
                    <div className="px-5 pb-5 border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">圖片網址</label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={slide.image}
                          onChange={(e) => updateSlide(i, "image", e.target.value)}
                          placeholder="https://..."
                        />
                        {slide.image && (
                          <img src={slide.image} alt="" className="mt-2 h-28 w-full object-cover rounded-lg" />
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">標籤文字（英文小字）</label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={slide.label}
                          onChange={(e) => updateSlide(i, "label", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">對齊方向</label>
                        <select
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={slide.align}
                          onChange={(e) => updateSlide(i, "align", e.target.value)}
                        >
                          <option value="left">靠左</option>
                          <option value="right">靠右</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">主標題（換行用 \n）</label>
                        <textarea
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          rows={2}
                          value={slide.title}
                          onChange={(e) => updateSlide(i, "title", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">副標題</label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={slide.sub}
                          onChange={(e) => updateSlide(i, "sub", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">主按鈕文字</label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={slide.ctaLabel}
                          onChange={(e) => updateSlide(i, "ctaLabel", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">主按鈕連結</label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={slide.ctaTo}
                          onChange={(e) => updateSlide(i, "ctaTo", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">次按鈕文字（空白=不顯示）</label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={slide.ctaSecondaryLabel}
                          onChange={(e) => updateSlide(i, "ctaSecondaryLabel", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">次按鈕連結</label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={slide.ctaSecondaryTo}
                          onChange={(e) => updateSlide(i, "ctaSecondaryTo", e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={addSlide}
                className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-black hover:text-black transition w-full justify-center"
              >
                <Plus className="w-4 h-4" /> 新增輪播
              </button>
            </div>
          </motion.div>
        )}

        {/* Video Editor */}
        {tab === "video" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="bg-white rounded-xl border p-6 space-y-6">
              <div>
                <h2 className="font-semibold text-base mb-1">首頁影片</h2>
                <p className="text-xs text-gray-400">可上傳影片檔案，或輸入影片網址（YouTube embed、CDN 連結等）</p>
              </div>

              {/* Upload */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">上傳影片檔案</label>
                <button
                  onClick={() => videoInputRef.current?.click()}
                  disabled={videoUploading}
                  className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-black hover:text-black transition disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  {videoUploading ? "上傳中..." : "選擇影片檔案"}
                </button>
                <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
              </div>

              {/* URL input */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">或輸入影片網址</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              {/* Preview */}
              {videoUrl && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">預覽</label>
                  <video src={videoUrl} className="w-full max-h-64 rounded-lg object-cover bg-black" controls muted />
                </div>
              )}

              <button
                onClick={handleVideoUrlSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                儲存影片設定
              </button>
            </div>
          </motion.div>
        )}

        {/* FAQ Editor */}
        {tab === "faq" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-xs font-medium text-gray-400 mt-2">Q{i + 1}</span>
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">問題</label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          value={faq.q}
                          onChange={(e) => updateFaq(i, "q", e.target.value)}
                          placeholder="常見問題"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">回答</label>
                        <textarea
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                          rows={3}
                          value={faq.a}
                          onChange={(e) => updateFaq(i, "a", e.target.value)}
                          placeholder="詳細說明..."
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeFaq(i)}
                      className="p-1.5 mt-1 rounded hover:bg-red-50 text-red-400 hover:text-red-600 transition flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addFaq}
                className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-black hover:text-black transition w-full justify-center"
              >
                <Plus className="w-4 h-4" /> 新增問答
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}