import React from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/home/HeroSection';
import FlavorSpectrum from '../components/home/FlavorSpectrum';
import TechDeepDive from '../components/home/TechDeepDive';
import StoreLocator from '../components/home/StoreLocator';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FlavorSpectrum />
      <TechDeepDive />
      <StoreLocator />
      <Footer />
    </div>
  );
}