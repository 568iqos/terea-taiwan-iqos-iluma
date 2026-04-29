import React from "react";
import HeroSection from "../components/home/HeroSection";
import FlavorPreview from "../components/home/FlavorPreview";
import VideoSection from "../components/home/VideoSection";
import ProductCompare from "../components/home/ProductCompare";
import TechTeaser from "../components/home/TechTeaser";
import FaqSection from "../components/home/FaqSection";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <FlavorPreview />
      <VideoSection />
      <ProductCompare />
      <TechTeaser />
      <FaqSection />
    </div>
  );
}