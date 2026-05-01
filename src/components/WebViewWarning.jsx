import React, { useState, useEffect } from "react";

function isWebView() {
  const ua = navigator.userAgent || "";
  return (
    /Line\//i.test(ua) ||
    /FBAN|FBAV/i.test(ua) ||
    /Instagram/i.test(ua) ||
    /\bwv\b/.test(ua) ||
    (/Android/.test(ua) && /Version\/\d+\.\d+/.test(ua) && /Chrome\/\d+/.test(ua) && !/SamsungBrowser/.test(ua))
  );
}

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export default function WebViewWarning() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isWebView()) setShow(true);
  }, []);

  if (!show) return null;

  const ios = isIOS();

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl max-w-sm w-full p-8 text-center shadow-2xl">
        <div className="text-4xl mb-4">🌐</div>
        <h2 className="font-heading text-xl font-bold mb-3">請用瀏覽器開啟</h2>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
          您目前使用的是 APP 內建瀏覽器，無法正常登入。<br />
          請點選下方按鈕，用 {ios ? "Safari" : "Chrome"} 開啟本頁面。
        </p>
        <p className="font-body text-xs text-muted-foreground mb-6">
          {ios
            ? '點選右下角「分享」圖示 → 「在 Safari 中開啟」'
            : '點選右上角「⋮」選單 → 「在瀏覽器中開啟」'}
        </p>
        <button
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(window.location.href);
            }
            setShow(false);
          }}
          className="w-full bg-black text-white font-body text-sm py-3 rounded-xl hover:bg-black/80 transition-colors"
        >
          複製網址並繼續
        </button>
      </div>
    </div>
  );
}