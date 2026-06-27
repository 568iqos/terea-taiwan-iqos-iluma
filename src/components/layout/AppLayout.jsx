import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AgeGate from "../AgeGate";
import HealthWarningBanner from "../HealthWarningBanner";
import LineContactButton from "../LineContactButton";
import SafeBlock from "../SafeBlock";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AgeGate />
      <HealthWarningBanner />
      <LineContactButton />
      <Navbar />
      <main className="flex-1">
        <SafeBlock fallback={
          <div style={{ minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", fontSize: 14 }}>
            此區塊暫時無法顯示，其他內容仍可正常使用。
          </div>
        }>
          <Outlet />
        </SafeBlock>
      </main>
      <Footer />
    </div>
  );
}
