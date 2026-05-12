import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MemberRegisterGate({ onComplete }) {
  const [show, setShow] = useState(() => {
    try {
      const saved = localStorage.getItem("ageConfirmed");
      return !saved;
    } catch { return true; }
  });
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  useEffect(() => {
    if (!show) onComplete();
  }, [show, onComplete]);

  const handleSubmit = () => {
    if (!ageConfirmed) return;
    localStorage.setItem("ageConfirmed", "true");
    setShow(false);
    onComplete();
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
            <div className="px-8 py-6 text-center">
              <h2 className="font-heading text-lg font-bold mb-4">年齡確認</h2>
              <p className="font-body text-sm text-muted-foreground mb-6">本網站僅供20歲以上成年人瀏覽</p>

              <div
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer select-none mb-6 ${!ageConfirmed ? "border-border bg-muted/30" : "border-black bg-black/5"}`}
                onClick={() => setAgeConfirmed(!ageConfirmed)}
              >
                <div className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${ageConfirmed ? "bg-black border-black" : "bg-white border-border"}`}>
                  {ageConfirmed && (
                    <svg viewBox="0 0 12 10" className="w-3 h-3 fill-none stroke-white stroke-2">
                      <polyline points="1,5 4,8 11,1" />
                    </svg>
                  )}
                </div>
                <p className="font-body text-sm text-foreground leading-relaxed">
                  我已年滿 <span className="font-bold">20 歲</span>
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!ageConfirmed}
                className="w-full py-4 bg-black text-white font-body text-sm tracking-widest rounded-xl hover:bg-black/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                確認進入
              </button>

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