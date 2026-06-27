import React, { useState } from "react";

export default function AgeGate() {
  const [confirmed, setConfirmed] = useState(() => {
    try { return localStorage.getItem("ageConfirmed") === "true"; } catch { return false; }
  });

  const handleYes = () => {
    try { localStorage.setItem("ageConfirmed", "true"); } catch {}
    setConfirmed(true);
  };

  const handleNo = () => {
    window.location.href = "https://www.google.com";
  };

  if (confirmed) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "black", display: "flex",
      alignItems: "center", justifyContent: "center", padding: "24px"
    }}>
      <div style={{ maxWidth: 360, width: "100%", textAlign: "center", color: "white", fontFamily: "sans-serif" }}>
        <p style={{ fontSize: 40, fontWeight: 700, letterSpacing: "0.4em", marginBottom: 32 }}>TEREA</p>
        <div style={{ height: 1, background: "rgba(255,255,255,0.2)", marginBottom: 32 }} />
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>您是否已年滿 20 歲？</h2>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 40 }}>
          本網站含有菸草相關商品資訊，僅限台灣年滿 20 歲的成年人瀏覽。
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          <button onClick={handleNo} style={{
            flex: 1, padding: "16px 0", border: "1px solid rgba(255,255,255,0.3)",
            background: "transparent", color: "white", fontSize: 14,
            letterSpacing: "0.2em", borderRadius: 12, cursor: "pointer"
          }}>否</button>
          <button onClick={handleYes} style={{
            flex: 1, padding: "16px 0", background: "white",
            color: "black", fontSize: 14, letterSpacing: "0.2em",
            borderRadius: 12, cursor: "pointer", border: "none"
          }}>是</button>
        </div>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 32, lineHeight: 1.6 }}>
          ⚠ 未滿20歲請勿購買或吸菸。本網站僅供台灣地區20歲以上成年人瀏覽。
        </p>
      </div>
    </div>
  );
}
