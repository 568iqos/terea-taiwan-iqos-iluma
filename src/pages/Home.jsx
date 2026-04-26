import React from "react";
import HeroSection from "../components/home/HeroSection";
import FlavorPreview from "../components/home/FlavorPreview";
import TechTeaser from "../components/home/TechTeaser";
import StoresCTA from "../components/home/StoresCTA";

const HERO_IMAGE = "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/e45ae93a9_IMG_8058.jpg";
const TECH_IMAGE = "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/1565ebbb3_generated_image.png";
const CITY_IMAGE = "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/15080c9ca_generated_image.png";
const DEVICE_IMAGE = "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/11904d9b6_generated_image.png";

const FLAVOR_IMAGES = [
  "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/3914cfbd4_generated_image.png",
  "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/c73b166f0_generated_image.png",
  "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/82e4b8859_generated_image.png",
  "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/c5d26d4dc_generated_image.png",
  "https://media.base44.com/images/public/69edb64b2f0beef803a1b699/a968d7153_generated_image.png",
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