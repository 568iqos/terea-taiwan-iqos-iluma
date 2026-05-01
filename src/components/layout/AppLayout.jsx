import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AgeGate from "../AgeGate";
import HealthWarningBanner from "../HealthWarningBanner";
import WebViewWarning from "../WebViewWarning";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <WebViewWarning />
      <AgeGate />
      <HealthWarningBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}