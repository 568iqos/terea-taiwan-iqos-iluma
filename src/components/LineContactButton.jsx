import React from "react";
import { motion } from "framer-motion";

export default function LineContactButton() {
  const LINE_OFFICIAL_URL = "https://lin.ee/XiRqVwz";

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2"
    >
      <motion.a
        href={LINE_OFFICIAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        className="w-16 h-16 flex items-center justify-center transition-all drop-shadow-lg"
        title="加入 TEREA 官方 LINE"
      >
        <img src="https://media.base44.com/images/public/69edb64b2f0beef803a1b699/14dcf0c8a_IMG_8734.webp" alt="LINE" className="w-full h-full object-contain" />
      </motion.a>
      <p className="text-xs font-medium text-gray-800 whitespace-nowrap">聯絡我們</p>
    </motion.div>
  );
}