import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AgeGate() {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const passed = sessionStorage.getItem("ageGatePassed");
    if (passed === "true") setConfirmed(true);
  }, []);

  const handleYes = () => {
    sessionStorage.setItem("ageGatePassed", "true");
    setConfirmed(true);
  };

  if (confirmed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="max-w-sm w-full bg-black rounded-2xl shadow-2xl overflow-hidden p-10 text-center border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Logo */}
          <p className="font-heading font-bold text-2xl tracking-[0.35em] uppercase text-white mb-8">
            TEREA
          </p>

          <div className="w-full h-px bg-white/10 mb-8" />

          <h2 className="font-heading text-xl font-bold tracking-tight mb-4 text-white flex items-center justify-center gap-2">
            <span>🔞</span>年齡驗證
          </h2>
          <p className="font-body text-sm text-white/50 leading-relaxed mb-8">
            本網站含有菸草相關商品資訊，未滿20歲者無法瀏覽菸草網頁。
            <br /><br />
            <span className="font-semibold text-white">您是否已滿 20 歲？</span>
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleYes}
              className="flex-1 py-3.5 bg-white text-black font-body text-sm tracking-widest rounded-lg hover:bg-white/80 transition-all"
            >
              是
            </button>
            <a
              href="https://www.google.com"
              className="flex-1 py-3.5 border border-white/20 text-white/60 font-body text-sm tracking-widest rounded-lg hover:border-white/50 hover:text-white transition-all"
            >
              否
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}