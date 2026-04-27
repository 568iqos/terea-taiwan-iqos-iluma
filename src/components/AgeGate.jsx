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
          className="max-w-sm w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-10 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Logo */}
          <p className="font-heading font-bold text-2xl tracking-[0.35em] uppercase text-black mb-8">
            TEREA
          </p>

          <div className="w-full h-px bg-black/10 mb-8" />

          <h2 className="font-heading text-xl font-bold tracking-tight mb-4 text-black">
            年齡驗證
          </h2>
          <p className="font-body text-sm text-black/50 leading-relaxed mb-8">
            本網站含有菸草相關商品資訊，未滿20歲者無法瀏覽菸草網頁。
            <br /><br />
            <span className="font-semibold text-black">您是否已滿 20 歲？</span>
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleYes}
              className="flex-1 py-3.5 bg-black text-white font-body text-sm tracking-widest rounded-lg hover:bg-black/80 transition-all"
            >
              是
            </button>
            <a
              href="https://www.google.com"
              className="flex-1 py-3.5 border border-black/20 text-black/60 font-body text-sm tracking-widest rounded-lg hover:border-black/50 hover:text-black transition-all"
            >
              否
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}