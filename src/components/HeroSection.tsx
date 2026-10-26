"use client";

import React from "react";
import Image from "next/image";
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
      className="relative min-h-screen flex flex-col justify-center pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 text-white overflow-hidden scroll-mt-20 select-none rounded-b-[36px] sm:rounded-b-[48px] lg:rounded-b-[64px] shadow-2xl"
    >
      {/* High-Performance Optimized Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none rounded-b-[36px] sm:rounded-b-[48px] lg:rounded-b-[64px]">
        <Image
          src="/images/hero-bg.webp"
          alt="FINCORE Financial & Business Advisory"
          fill
          priority
          sizes="100vw"
          
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080E1C]/40 via-[#080E1C]/15 to-[#080E1C]/60" />
      </div>
      {/* Main Hero Editorial Content (Centered) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto text-center space-y-6 sm:space-y-8">
        {/* Monumental Centered Headline with Crisp Shadows */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.12] font-heading drop-shadow-2xl"
          style={{
            textShadow:
              "0 2px 10px rgba(0, 0, 0, 0.95), 0 4px 20px rgba(0, 0, 0, 0.85), 0 8px 36px rgba(0, 0, 0, 0.75)",
          }}
        >
          <span className="inline-block">
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
          <span className="block mt-1 sm:mt-2 text-white">
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

        {/* Subtitle with Crisp Shadow */}
        <p
          className="animate-hero-subtitle text-base sm:text-lg md:text-xl text-white leading-relaxed max-w-2xl mx-auto font-medium"
          style={{
            textShadow:
              "0 2px 8px rgba(0, 0, 0, 0.95), 0 4px 18px rgba(0, 0, 0, 0.85)",
          }}
        >
          From business registration to full-scale tax compliance, we deliver precision in every detail.
        </p>

        {/* Action Buttons: Rich Pill Button */}
        <div className="animate-hero-actions pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleConsultation}
            className="btn-pill-warm inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base font-semibold rounded-full text-white cursor-pointer group shadow-2xl"
          >
            <span>Get a Consultation</span>
            <ArrowRight className="w-4 h-4 text-amber-200/90 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-full text-white hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/30 transition-all duration-300 shadow-xl"
          >
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
