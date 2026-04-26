import React from "react";
import HeroSection from "../components/home/HeroSection";
import FlavorPreview from "../components/home/FlavorPreview";
import ProductCompare from "../components/home/ProductCompare";
import TechTeaser from "../components/home/TechTeaser";
import FaqSection from "../components/home/FaqSection";
import StoresCTA from "../components/home/StoresCTA";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FlavorPreview />
      <ProductCompare />
      <TechTeaser />
      <FaqSection />
      <StoresCTA />
    </div>
  );
}