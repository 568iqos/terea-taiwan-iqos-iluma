import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AgeGate from "../AgeGate";
import HealthWarningBanner from "../HealthWarningBanner";
import WebViewWarning from "../WebViewWarning";
import MemberRegisterGate from "../MemberRegisterGate";
import { useState } from "react";

export default function AppLayout() {
  const [memberDone, setMemberDone] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <WebViewWarning />
      <AgeGate />
      {!memberDone && <MemberRegisterGate onComplete={() => setMemberDone(true)} />}
      <HealthWarningBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}