"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useSPA } from "@/context/SPAContext";
import { useInView } from "@/hooks/useInView";

interface CTASectionProps {
  onOpenConsultation?: () => void;
}

export default function CTASection({ onOpenConsultation }: CTASectionProps = {}) {
  const spa = useSPA();
  const handleConsultation = onOpenConsultation || (() => spa.openConsultation());
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Luxury Architectural Banner */}
        <div
          className={`relative rounded-3xl bg-gradient-to-br from-[#080B14] via-[#0F1626] to-[#1C1613] text-white p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden border border-white/10 transition-all duration-700 ${
            isInView ? "animate-section-reveal" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Subtle Ambient Radial Lighting with Live Breathing Animations */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-subtle-float" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-subtle-pulse" />

          {/* Animated top golden energy accent beam */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-80" />

          {/* Banner Content */}
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Direct Statutory Facilitation</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-5.5xl font-extrabold tracking-tight text-white leading-[1.14] font-heading">
              Let&apos;s Simplify Your Business Compliance
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
              Explore the right consultancy services for your financial, registration, accounting, and licensing requirements with total clarity.
            </p>

            {/* Pill CTAs (Matching Reference Button Style) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={handleConsultation}
                className="btn-pill-white inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-semibold rounded-full text-[#080B14] cursor-pointer group shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#080B14] group-hover:translate-x-1.5 transition-transform" />
              </button>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold rounded-full text-white hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Explore All 15 Services</span>
              </Link>
            </div>

            {/* Trust Checklist with hover micro-animations */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 group cursor-default">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="group-hover:text-white transition-colors">Statutory Checklist Preparation</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="group-hover:text-white transition-colors">Structured Portal Submissions</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="group-hover:text-white transition-colors">Confidential Client Handling</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
