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
        className="fixed inset-0 z-[9999] bg-foreground flex items-center justify-center p-6"
      >
        <div className="max-w-md w-full text-center text-background">
          <div className="h-px w-16 bg-primary mx-auto mb-8" />
          <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-4">
            年齡確認
          </h1>
          <p className="font-body text-background/70 text-sm leading-relaxed mb-8">
            本網站涉及菸草相關產品資訊，依台灣菸害防制法規定，
            僅限 <strong className="text-background">20 歲以上成年人</strong> 瀏覽。
          </p>

          <div className="bg-background/10 rounded-xl p-4 mb-8 text-left">
            <p className="font-heading text-xs tracking-wider text-primary uppercase mb-2">
              ⚠ 法定健康警語
            </p>
            <p className="font-body text-xs text-background/60 leading-relaxed">
              吸菸有害健康——吸菸會導致肺癌、心臟病、慢性支氣管炎及動脈硬化。
            </p>
          </div>

          <label className="flex items-start gap-3 mb-6 text-left cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="mt-1 w-4 h-4 accent-primary cursor-pointer"
            />
            <span className="font-body text-xs text-background/60 leading-relaxed">
              我確認我已年滿 20 歲，並了解本網站內容涉及菸草相關產品。
            </span>
          </label>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleConfirm}
              disabled={!checked}
              className="w-full py-3 bg-primary text-primary-foreground font-heading text-sm tracking-widest uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/90 transition-all rounded"
            >
              確認進入
            </button>
            <a
              href="https://www.google.com"
              className="w-full py-3 border border-background/20 text-background/50 font-heading text-sm tracking-widest uppercase hover:border-background/40 transition-all rounded"
            >
              離開
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}