import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => currentYear - i);

export default function AgeGate() {
  const [confirmed, setConfirmed] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const passed = sessionStorage.getItem("ageGatePassed");
    if (passed === "true") setConfirmed(true);
  }, []);

  const handleConfirm = () => {
    if (!month || !year) {
      setError("請選擇出生年份和月份");
      return;
    }
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < 1)) age--;

    if (age >= 20) {
      sessionStorage.setItem("ageGatePassed", "true");
      setConfirmed(true);
    } else {
      window.location.href = "https://www.google.com";
    }
  };

  if (confirmed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="max-w-sm w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Logo */}
          <p className="font-heading font-bold text-2xl tracking-[0.35em] uppercase text-black mb-6">
            TEREA
          </p>

          <div className="w-full h-px bg-black/10 mb-6" />

          <h2 className="font-heading text-xl font-bold tracking-tight mb-3 text-black leading-snug">
            請輸入您的出生日期以確認<br />您年滿 20 歲。
          </h2>
          <p className="font-body text-xs text-muted-foreground leading-relaxed mb-6">
            本網站含有菸草相關商品資訊，僅限台灣年滿 20 歲的成年人瀏覽。
          </p>

          {/* Month selector */}
          <div className="relative mb-3">
            <select
              value={month}
              onChange={(e) => { setMonth(e.target.value); setError(""); }}
              className="w-full appearance-none border border-border rounded-xl px-4 py-3.5 font-body text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              <option value="">月份</option>
              {MONTHS.map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">▾</div>
          </div>

          {/* Year selector */}
          <div className="relative mb-5">
            <select
              value={year}
              onChange={(e) => { setYear(e.target.value); setError(""); }}
              className="w-full appearance-none border border-border rounded-xl px-4 py-3.5 font-body text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              <option value="">年份</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">▾</div>
          </div>

          {error && (
            <p className="font-body text-xs text-red-500 mb-3">{error}</p>
          )}

          <button
            onClick={handleConfirm}
            disabled={!month || !year}
            className="w-full py-3.5 bg-black text-white font-body text-sm tracking-widest rounded-xl hover:bg-black/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            確認
          </button>

          <p className="font-body text-[10px] text-muted-foreground mt-4 leading-relaxed">
            ⚠ 未滿20歲請勿購買或吸菸。本網站僅供台灣地區20歲以上成年人瀏覽。
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}