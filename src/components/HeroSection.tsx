"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSPA } from "@/context/SPAContext";

interface HeroSectionProps {
  onOpenConsultation?: () => void;
}

export default function HeroSection({ onOpenConsultation }: HeroSectionProps = {}) {
  const spa = useSPA();
  const handleConsultation = onOpenConsultation || (() => spa.openConsultation());

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const line1Words = [
    { text: "Master", delay: "0.06s" },
    { text: "Your", delay: "0.18s" },
    { text: "Finances,", delay: "0.30s" },
  ];
  const line2Words = [
    { text: "Inspire", delay: "0.44s" },
    { text: "Limitless", delay: "0.56s" },
    { text: "Growth", delay: "0.68s" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 bg-gradient-to-b from-[#F3F8FD] via-[#F8FAFC] to-white overflow-hidden scroll-mt-20 select-none"
    >
      {/* Ambient background illumination */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(14,107,221,0.08)_0%,transparent_70%)] pointer-events-none blur-3xl -z-10" />
      <div className="absolute inset-0 bg-enterprise-grid opacity-30 pointer-events-none -z-10" />

      {/* Main Hero Editorial Content (Centered) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto text-center space-y-6 sm:space-y-8">
        {/* Monumental Centered Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] font-heading">
          <span className="inline-block text-[#080B12]">
            {line1Words.map((item, index) => (
              <React.Fragment key={item.text}>
                <span
                  className="inline-block animate-hero-word"
                  style={{ animationDelay: item.delay }}
                >
                  {item.text}
                </span>
                {index < line1Words.length - 1 && " "}
              </React.Fragment>
            ))}
          </span>
          <span className="block mt-1 sm:mt-2 text-[#0E6BDD]">
            {line2Words.map((item, index) => (
              <React.Fragment key={item.text}>
                <span
                  className="inline-block animate-hero-word"
                  style={{ animationDelay: item.delay }}
                >
                  {item.text}
                </span>
                {index < line2Words.length - 1 && " "}
              </React.Fragment>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-hero-subtitle text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto font-medium font-sans">
          From business registration to full-scale tax compliance, we deliver precision in every detail.
        </p>

        {/* Action Buttons: Clean Modern Pills */}
        <div className="animate-hero-actions pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleConsultation}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base font-semibold rounded-full text-white bg-[#0E6BDD] hover:bg-[#0b5cbe] shadow-lg shadow-[#0E6BDD]/25 hover:shadow-xl hover:shadow-[#0E6BDD]/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
          >
            <span>Get a Consultation</span>
            <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-full text-slate-800 hover:text-[#0E6BDD] bg-white hover:bg-slate-50 border border-slate-300/80 hover:border-[#0E6BDD]/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
