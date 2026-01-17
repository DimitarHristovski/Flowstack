import { useEffect } from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import RecommendedToolsSection from "../components/home/RecommendedToolsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import PricingSection from "../components/home/PricingSection";

export default function HomePage() {
  useEffect(() => {
    document.title = "FlowStack | Browse & Use AI Agents";
  }, []);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <RecommendedToolsSection />
      <TestimonialsSection />
      <PricingSection />
    </>
  );
}
