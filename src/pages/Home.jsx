import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import HeroSection from "../components/home/HeroSection";
import FlavorPreview from "../components/home/FlavorPreview";
import VideoSection from "../components/home/VideoSection";
import ProductCompare from "../components/home/ProductCompare";
import TechTeaser from "../components/home/TechTeaser";
import FaqSection from "../components/home/FaqSection";

export default function Home() {
  const [siteSettings, setSiteSettings] = useState([]);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const records = await base44.entities.SiteSettings.list();
        setSiteSettings(records || []);
      } catch (e) {
        console.warn('Failed to load site settings:', e);
        // 使用空陣列作為備用，讓首頁仍能顯示預設內容
        setSiteSettings([]);
      }
    };
    loadSettings();
  }, []);

  return (
    <div>
      <HeroSection siteSettings={Array.isArray(siteSettings) ? siteSettings : []} />
      <FlavorPreview />
      <VideoSection siteSettings={Array.isArray(siteSettings) ? siteSettings : []} />
      <ProductCompare />
      <TechTeaser />
      <FaqSection siteSettings={Array.isArray(siteSettings) ? siteSettings : []} />
    </div>
  );
}
