import { useEffect } from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import PricingSection from "../components/home/PricingSection";

export default function HomePage() {
  useEffect(() => {
    document.title = "FlowStack | Smart AI Agents Marketplace";
  }, []);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
    </>
  );
}
