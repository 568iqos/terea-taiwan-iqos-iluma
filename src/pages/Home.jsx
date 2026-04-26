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
  "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwa18cb993/images/large/2405300199_1.jpg",
  "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw76a828c7/images/large/2405300200_1.jpg",
  "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dw038ac8b5/images/large/2405300201_1.jpg",
  "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwd1febdd4/images/large/2405300231_1.jpg",
  "https://edge.dis.commercecloud.salesforce.com/dw/image/v2/BKBN_PRD/on/demandware.static/-/Sites-catalog_master_sfcc_krs/default/dwf75b733a/images/large/2405300233_1_b.jpg",
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