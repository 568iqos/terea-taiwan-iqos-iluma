import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AgeGate() {
  const [confirmed, setConfirmed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const passed = sessionStorage.getItem("ageGatePassed");
    if (passed === "true") setConfirmed(true);
  }, []);

  const handleConfirm = () => {
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
            年齢確認
          </h1>
          <p className="font-body text-sm text-black/50 leading-relaxed mb-6">
            本網站涉及菸草相關產品資訊，依台灣菸害防制法規定，<br />
            僅限 <span className="font-semibold text-black">20 歲以上成年人</span> 瀏覽。
          </p>

          {/* Warning */}
          <div className="bg-black/5 border border-black/10 rounded-xl p-4 mb-6 text-left">
            <p className="font-body text-[11px] text-black/40 leading-relaxed">
              ⚠ 吸菸有害健康——吸菸會導致肺癌、心臟病、慢性支氣管炎及動脈硬化。
            </p>
          </div>

          {/* Checkbox */}
          <label className="flex items-start gap-3 mb-6 text-left cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-0.5 w-4 h-4 cursor-pointer accent-black flex-shrink-0"
            />
            <span className="font-body text-xs text-black/50 leading-relaxed">
              我確認我已年滿 20 歲，並了解本網站內容涉及菸草相關產品。
            </span>
          </label>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleConfirm}
              disabled={!checked}
              className="w-full py-3 bg-black text-white font-body text-[11px] tracking-widest uppercase rounded-full disabled:opacity-25 disabled:cursor-not-allowed hover:bg-black/80 transition-all"
            >
              確認進入
            </button>
            <a
              href="https://www.google.com"
              className="w-full py-3 border border-black/15 text-black/40 font-body text-[11px] tracking-widest uppercase rounded-full hover:border-black/30 transition-all"
            >
              離開
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}