import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import HeroSection from "../components/home/HeroSection";
import FlavorPreview from "../components/home/FlavorPreview";
import VideoSection from "../components/home/VideoSection";
import ProductCompare from "../components/home/ProductCompare";
import TechTeaser from "../components/home/TechTeaser";
import FaqSection from "../components/home/FaqSection";

export default function Home() {
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    base44.entities.SiteSettings.list()
      .then(setSiteSettings)
      .catch(() => setSiteSettings([]));
  }, []);

  return (
    <div>
      <HeroSection siteSettings={siteSettings} />
      <FlavorPreview />
      <VideoSection siteSettings={siteSettings} />
      <ProductCompare />
      <TechTeaser />
      <FaqSection siteSettings={siteSettings} />
    </div>
  );
}