"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  ReceiptText,
  Building2,
  Calculator,
  ShieldCheck,
} from "lucide-react";
import { useSPA } from "@/context/SPAContext";
import { useInView } from "@/hooks/useInView";

interface CTASectionProps {
  onOpenConsultation?: () => void;
}

export default function CTASection({ onOpenConsultation }: CTASectionProps = {}) {
  const spa = useSPA();
  const handleConsultation = onOpenConsultation || (() => spa.openConsultation());
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/${id}`;
    }
  };

  return (
    <section
      ref={ref}
      id="banner-section"
      className="py-12 sm:py-16 lg:py-20 bg-[#FAF9F6] relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-slate-200/90 bg-gradient-to-r from-white via-white to-blue-50/40 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Main Grid: Responsive 2-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px]">

            {/* Visual Artwork for Mobile/Tablet (< lg) */}
            <div className="lg:hidden relative w-full h-52 sm:h-64 overflow-hidden border-b border-slate-100 bg-slate-50">
              <Image
                src="/images/banner-artwork.png"
                alt="FINCORE Financial and Business Consultancy"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            {/* Left Content Column (Desktop: 7 cols) */}
            <div className="lg:col-span-7 xl:col-span-7 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-between z-10">
              <div>
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="text-xs sm:text-sm font-bold tracking-widest text-[#163E8C] uppercase font-mono">
                    YOUR TRUSTED PARTNER IN
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold tracking-tight text-[#080B12] font-heading leading-[1.14] mb-4">
                  Financial &amp; Business{" "}
                  <span className="text-[#163E8C]">Consultancy</span>
                </h2>

                {/* Subtitle / Paragraph */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mb-7 font-sans">
                  From tax compliance and business registration to accounting and licensing, FINCORE helps individuals and businesses navigate essential financial and regulatory processes with clarity.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 mb-8 sm:mb-10">
                  <a
                    href="#services"
                    onClick={(e) => handleScrollTo(e, "#services")}
                    className="bg-[#163E8C] hover:bg-[#0B2458] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold shadow-md shadow-blue-900/15 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2 group cursor-pointer"
                  >
                    <span>Explore Our Services</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>

                  <button
                    type="button"
                    onClick={handleConsultation}
                    className="bg-white hover:bg-blue-50/70 text-[#163E8C] border-2 border-[#163E8C] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold shadow-xs hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2 group cursor-pointer"
                  >
                    <span>Get Consultation</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* 4 Feature Badges at Bottom */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-200/80">
                {/* 1. Tax & GST Compliance */}
                <a
                  href="#services"
                  onClick={(e) => handleScrollTo(e, "#services")}
                  className="group flex flex-col sm:flex-row items-start sm:items-center gap-2.5 p-1.5 rounded-xl hover:bg-white/90 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50/90 border border-blue-100 flex items-center justify-center text-[#163E8C] shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <ReceiptText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#163E8C] transition-colors leading-tight">
                      Tax &amp; GST
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500 leading-tight">
                      Compliance
                    </div>
                  </div>
                </a>

                {/* 2. Business Registration */}
                <a
                  href="#services"
                  onClick={(e) => handleScrollTo(e, "#services")}
                  className="group flex flex-col sm:flex-row items-start sm:items-center gap-2.5 p-1.5 rounded-xl hover:bg-white/90 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50/90 border border-blue-100 flex items-center justify-center text-[#163E8C] shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#163E8C] transition-colors leading-tight">
                      Business
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500 leading-tight">
                      Registration
                    </div>
                  </div>
                </a>

                {/* 3. Accounting & Bookkeeping */}
                <a
                  href="#services"
                  onClick={(e) => handleScrollTo(e, "#services")}
                  className="group flex flex-col sm:flex-row items-start sm:items-center gap-2.5 p-1.5 rounded-xl hover:bg-white/90 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50/90 border border-blue-100 flex items-center justify-center text-[#163E8C] shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#163E8C] transition-colors leading-tight">
                      Accounting &amp;
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500 leading-tight">
                      Bookkeeping
                    </div>
                  </div>
                </a>

                {/* 4. Licensing & Regulatory Support */}
                <a
                  href="#services"
                  onClick={(e) => handleScrollTo(e, "#services")}
                  className="group flex flex-col sm:flex-row items-start sm:items-center gap-2.5 p-1.5 rounded-xl hover:bg-white/90 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50/90 border border-blue-100 flex items-center justify-center text-[#163E8C] shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#163E8C] transition-colors leading-tight">
                      Licensing &amp;
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500 leading-tight">
                      Regulatory Support
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Visual Artwork for Desktop (lg:col-span-5) */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-5 relative w-full h-full min-h-[460px] overflow-hidden">
              <Image
                src="/images/banner-artwork.png"
                alt="FINCORE Financial and Business Consultancy"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-center"
              />
              {/* Subtle left-side blend gradient to smoothly merge into white container */}
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
