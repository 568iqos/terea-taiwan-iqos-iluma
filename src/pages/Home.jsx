import React from "react";
import HeroSection from "../components/home/HeroSection";
import FlavorPreview from "../components/home/FlavorPreview";
import TechTeaser from "../components/home/TechTeaser";
import StoresCTA from "../components/home/StoresCTA";

const HERO_IMAGE = "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/e45ae93a9_IMG_8058.jpg";
const TECH_IMAGE = "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/6b4f5e762_generated_d51a747f.png";
const CITY_IMAGE = "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/b533020cf_generated_a770e83d.png";
const DEVICE_IMAGE = "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/fa60dbfcd_generated_0be12d84.png";

const FLAVOR_IMAGES = [
  "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/02dace3d5_generated_d47b826e.png",
  "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/8dda69a42_generated_ace8fd89.png",
  "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/4258615b9_generated_81912564.png",
  "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/4232866f5_generated_79373a25.png",
  "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/a44bfbcdb_generated_749f3ab3.png",
];

export default function Home() {
  return (
    <div>
      <HeroSection heroImage={HERO_IMAGE} />
      <FlavorPreview flavorImages={FLAVOR_IMAGES} />
      <TechTeaser techImage={TECH_IMAGE} deviceImage={DEVICE_IMAGE} />
      <StoresCTA cityImage={CITY_IMAGE} />
    </div>
  );
}