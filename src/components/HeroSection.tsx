"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
      className="relative min-h-screen flex flex-col justify-center pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 text-white overflow-hidden scroll-mt-20 select-none"
    >
      {/* Background Image Container with Next.js Image for optimal crispness & clarity */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/hero-bg.png"
          alt="FINCORE Financial & Business Advisory - Deal Partnership and Consultation"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Balanced, translucent gradient ensuring the desk, handshake, laptop & documents remain clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080E1C]/40 via-[#080E1C]/20 to-[#080E1C]/60 pointer-events-none" />
        {/* Soft radial vignette focusing readability in the center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,14,28,0.35)_0%,transparent_75%)] pointer-events-none" />
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
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-full text-white hover:text-white bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/35 transition-all duration-300 shadow-xl"
          >
            <span>Explore Services</span>
          </Link>
        </div>

        {/* Verified Trust Strip */}
        <div className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-100">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-medium">MCA &amp; GSTN Verified</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            <span className="font-medium">Zero Penalty Checklists</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-cyan-300" />
            <span className="font-medium">100% Data Confidentiality</span>
          </div>
        </div>
      </div>
    </section>
  );
}
