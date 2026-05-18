import React, { useEffect } from 'react';

const LINE_URL = "https://lin.ee/XiRqVwz";

export default function ContactUs() {
  useEffect(() => {
    window.location.href = LINE_URL;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-foreground/60 mb-4">正在跳轉至 LINE 官方帳號...</p>
        <a href={LINE_URL} className="text-sm underline text-foreground/50 hover:text-foreground">
          點此手動前往
        </a>
      </div>
    </div>
  );
}