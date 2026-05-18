import React from "react";

const LINE_URL = "https://lin.ee/XiRqVwz";

export default function FloatingLine() {
  return (
    <a
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-6 z-[9990] flex items-center justify-center w-16 h-16 hover:scale-110 transition-transform drop-shadow-lg"
      aria-label="LINE 客服"
    >
      <img src="https://media.base44.com/images/public/69edb64b2f0beef803a1b699/14dcf0c8a_IMG_8734.webp" alt="LINE" className="w-full h-full object-contain" />
    </a>
  );
}