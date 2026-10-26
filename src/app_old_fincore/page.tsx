import React from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import CTASection from "@/components/CTASection";
import WhoWeServeSection from "@/components/WhoWeServeSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ConsultationForm from "@/components/ConsultationForm";

export default function HomePage() {
  return (
    <>
      {/* 1. Executive Monumental Hero */}
      <HeroSection />

      {/* 2. About FINCORE & Operational Pillars */}
      <AboutSection />

      {/* 3. Practice Directory: 15 Services across 3 Core Categories */}
      <ServicesSection />

      {/* 4. Structured 4-Step Engagement Process */}
      <HowItWorksSection />

      {/* 5. Operational Standards & Why Choose FINCORE */}
      <WhyChooseSection />

      {/* 6. Promotional Graphic Action Banner */}
      <CTASection />

      {/* 7. Markets & Client Sectors We Serve */}
      <WhoWeServeSection />

      {/* 8. Verified Founder & Client Testimonials */}
      <TestimonialsSection />

      {/* 9. Interactive Frequently Asked Questions */}
      <FAQSection />

      {/* 10. Dedicated Consultation & Contact Desk */}
      <ConsultationForm />
    </>
  );
}
