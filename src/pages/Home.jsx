import React from "react";
import HeroSection from "../components/home/HeroSection";
import FlavorPreview from "../components/home/FlavorPreview";
import TechTeaser from "../components/home/TechTeaser";
import StoresCTA from "../components/home/StoresCTA";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FlavorPreview />
      <TechTeaser />
      <StoresCTA />
    </div>
  );
}