import React from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTASection from "@/components/CTASection";
import ConsultationForm from "@/components/ConsultationForm";

export default function HomePage() {
  return (
    <>
      {/* 1. Executive Hero with Reference Blur-In Motion */}
      <HeroSection />

      {/* 2. About FINCORE Section */}
      <AboutSection />

      {/* 3. Practice Directory: 15 Services across 3 Core Categories */}
      <ServicesSection />

      {/* 4. Structured 4-Step Engagement Process */}
      <HowItWorksSection />

      {/* 5. Promotional Action Banner */}
      <CTASection />

      {/* 6. Dedicated Consultation & Contact Desk */}
      <ConsultationForm />
    </>
  );
}
