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
        className="fixed inset-0 z-[9999] bg-white flex items-center justify-center p-6"
      >
        <div className="max-w-sm w-full text-center">
          {/* Logo */}
          <p className="font-heading font-bold text-2xl tracking-[0.35em] uppercase text-black mb-8">
            TEREA
          </p>

          <div className="w-full h-px bg-black/10 mb-8" />

          <h1 className="font-heading text-xl font-bold tracking-tight mb-3 text-black">
            年齡確認
          </h1>
          <p className="font-body text-sm text-black/50 leading-relaxed mb-8">
            本網站涉及菸草相關產品資訊。<br />
            您是否已年滿 <span className="font-semibold text-black">18 歲</span>？
          </p>

          {/* Warning */}
          <div className="bg-black/5 border border-black/10 rounded-xl p-4 mb-8 text-left">
            <p className="font-body text-[11px] text-black/40 leading-relaxed">
              ⚠ 吸菸有害健康。本產品含有尼古丁，尼古丁具有成癮性。未滿18歲請勿購買或使用。
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleYes}
              className="flex-1 py-3.5 bg-black text-white font-body text-[11px] tracking-widest uppercase rounded-full hover:bg-black/80 transition-all"
            >
              是，我已成年
            </button>
            <a
              href="https://www.google.com"
              className="flex-1 py-3.5 border border-black/20 text-black/50 font-body text-[11px] tracking-widest uppercase rounded-full hover:border-black/40 transition-all"
            >
              否，離開
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}