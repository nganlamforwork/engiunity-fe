import React from "react";
import { Hero } from "@/components/pages/home/hero";
import { Features } from "@/components/pages/home/features";
import { Metadata } from "next";
import { HowItWorks } from "@/components/pages/home/how-it-works";
import { Demo } from "@/components/pages/home/demo";
import { TestimonialsSlider } from "@/components/pages/home/testimonials-slider";
import { Pricing } from "@/components/pages/home/pricing";
import { Cta } from "@/components/pages/home/cta";

export const metadata: Metadata = {
  title: "Enginuity",
};
const HomePage = () => {
  return (
    <main className="flex-1">
      <Hero />
      <Features />
      <HowItWorks />
      <Demo />
      <TestimonialsSlider />
      <Pricing />
      <Cta />
    </main>
  );
};

export default HomePage;
