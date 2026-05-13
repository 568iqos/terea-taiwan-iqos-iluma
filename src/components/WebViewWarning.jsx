import React, { useState, useEffect } from "react";

function isLineWebView() {
  const ua = navigator.userAgent || "";
  return /Line\//i.test(ua);
}

function isInstagramWebView() {
  const ua = navigator.userAgent || "";
  return /Instagram/i.test(ua) || /FBAN|FBAV/i.test(ua);
}

function isWebView() {
  const ua = navigator.userAgent || "";
  return (
    /Line\//i.test(ua) ||
    /FBAN|FBAV/i.test(ua) ||
    /Instagram/i.test(ua) ||
    /\[FBAN|GSA|(?:Mobile Safari.+Version\/)/.test(ua) ||
    /\bwv\b/.test(ua) ||
    (/Android/.test(ua) && /Version\/\d+\.\d+/.test(ua) && /Chrome\/\d+/.test(ua) && !/SamsungBrowser/.test(ua))
  );
}

function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export default function WebViewWarning() {
  // WebView warning disabled — allow LINE/IG in-app browsers
  return null;

  const ios = isIOS();
  const isLine = isLineWebView();
  const isIG = isInstagramWebView();

  const handleOpenBrowser = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    // Android LINE: try intent scheme
    if (isLine && !ios) {
      window.location.href = "intent://" + url.replace(/^https?:\/\//, "") + "#Intent;scheme=https;package=com.android.chrome;end";
    }
    // Instagram: redirect to chrome for Android
    if (isInstagramWebView() && !ios) {
      window.location.href = "intent://" + url.replace(/^https?:\/\//, "") + "#Intent;scheme=https;package=com.android.chrome;end";
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl max-w-sm w-full p-8 text-center shadow-2xl">
        <div className="text-4xl mb-4">🌐</div>
        <h2 className="font-heading text-xl font-bold mb-3">請用瀏覽器開啟</h2>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
          {isLine ? "您目前在 LINE 內開啟本頁面" : isIG ? "您目前在 Instagram 內開啟本頁面" : "您目前使用的是 APP 內建瀏覽器"}，<br />
          部分功能可能無法正常運作。
        </p>

        {ios ? (
          <div className="bg-muted rounded-xl p-4 mb-6 text-left">
            <p className="font-body text-xs text-foreground font-bold mb-2">iOS 開啟方式：</p>
            {isIG ? (
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                點選右上角 <span className="font-bold text-foreground">「⋯」</span> 選單<br />
                → 選擇 <span className="font-bold text-foreground">「用 Safari 開啟」</span><br />
                或複製網址貼到 Safari
              </p>
            ) : (
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                點選右下角 <span className="font-bold text-foreground">「⎋ 分享」</span> 圖示<br />
                → 選擇 <span className="font-bold text-foreground">「在 Safari 中開啟」</span>
              </p>
            )}
          </div>
        ) : (
          <div className="bg-muted rounded-xl p-4 mb-6 text-left">
            <p className="font-body text-xs text-foreground font-bold mb-2">Android 開啟方式：</p>
            {isIG ? (
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                點選右上角 <span className="font-bold text-foreground">「⋯」</span> 選單<br />
                → 選擇 <span className="font-bold text-foreground">「用其他應用程式開啟」</span><br />
                → 選擇 <span className="font-bold text-foreground">「Chrome」</span>
              </p>
            ) : (
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                點選右上角 <span className="font-bold text-foreground">「⋮」</span> 選單<br />
                → 選擇 <span className="font-bold text-foreground">「在瀏覽器中開啟」</span>
              </p>
            )}
          </div>
        )}

        <button
          onClick={handleOpenBrowser}
          className="w-full bg-black text-white font-body text-sm py-3 rounded-xl hover:bg-black/80 transition-colors"
        >
          複製網址
        </button>
      </div>
    </div>
  );
}