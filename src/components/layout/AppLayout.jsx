import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AgeGate from "../AgeGate";
import HealthWarningBanner from "../HealthWarningBanner";
import WebViewWarning from "../WebViewWarning";
import MemberRegisterGate from "../MemberRegisterGate";
import FloatingLine from "../FloatingLine";
import { useState } from "react";

export default function AppLayout() {
  const [memberDone, setMemberDone] = useState(() => {
    // Force refresh - clear old sessionStorage
    try { sessionStorage.removeItem("memberRegistered"); } catch {}
    return false;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <WebViewWarning />
      <AgeGate />
      {!memberDone && <MemberRegisterGate key="member-register-gate-v2" onComplete={() => setMemberDone(true)} />}
      <HealthWarningBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingLine />
    </div>
  );
}