import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AgeGate() {
  const [confirmed, setConfirmed] = useState(() => {
    try {
      return localStorage.getItem("ageConfirmed") === "true";
    } catch { return false; }
  });

  const handleYes = () => {
    try { localStorage.setItem("ageConfirmed", "true"); } catch {}
    setConfirmed(true);
  };

  const handleNo = () => {
    window.location.href = "https://www.google.com";
  };

  if (confirmed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="max-w-sm w-full text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Logo */}
          <p className="font-heading text-5xl font-bold tracking-[0.4em] uppercase text-white mb-8">
            TEREA
          </p>

          <div className="w-full h-px bg-white/20 mb-8" />

          <h2 className="font-heading text-xl font-bold tracking-tight mb-3 text-white leading-snug">
            您是否已年滿 20 歲？
          </h2>
          <p className="font-body text-xs text-white/50 leading-relaxed mb-10">
            本網站含有菸草相關商品資訊，僅限台灣年滿 20 歲的成年人瀏覽。
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleNo}
              className="flex-1 py-4 border border-white/30 text-white font-body text-sm tracking-widest rounded-xl hover:bg-white/10 transition-all"
            >
              否
            </button>
            <button
              onClick={handleYes}
              className="flex-1 py-4 bg-white text-black font-body text-sm tracking-widest rounded-xl hover:bg-white/90 transition-all"
            >
              是
            </button>
          </div>

          <p className="font-body text-[10px] text-white/30 mt-8 leading-relaxed">
            ⚠ 未滿20歲請勿購買或吸菸。本網站僅供台灣地區20歲以上成年人瀏覽。
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
