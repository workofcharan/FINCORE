"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileCheck, Building2, BookOpen, ShieldCheck } from "lucide-react";
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
          className={`relative w-full aspect-[1553/542] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-slate-200/80 bg-white transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Banner Graphic */}
          <Image
            src="/images/fincore-banner.png"
            alt="FINCORE - Financial & Business Consultancy: Your Trusted Partner in Tax, Registration, Accounting & Licensing"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover w-full h-full"
          />

          {/* Interactive Hotspot Overlay: 'Explore Our Services ->' button */}
          <a
            href="#services"
            onClick={(e) => handleScrollTo(e, "#services")}
            aria-label="Explore Our Services"
            className="absolute left-[4.8%] top-[58.5%] w-[14.5%] h-[8.3%] rounded-full cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 hover:bg-white/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Explore Our Services"
          >
            <span className="sr-only">Explore Our Services</span>
          </a>

          {/* Interactive Hotspot Overlay: 'Get Consultation ->' button */}
          <button
            type="button"
            onClick={handleConsultation}
            aria-label="Get Consultation"
            className="absolute left-[20.8%] top-[58.5%] w-[12.6%] h-[8.3%] rounded-full cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 hover:bg-blue-600/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Get Consultation"
          >
            <span className="sr-only">Get Consultation</span>
          </button>

          {/* Interactive Hotspot Overlays for the 4 Feature Pills at bottom */}
          {/* 1. Tax & GST Compliance */}
          <a
            href="#services"
            onClick={(e) => handleScrollTo(e, "#services")}
            className="absolute left-[4.8%] top-[76.5%] w-[10.8%] h-[10%] rounded-full cursor-pointer hover:bg-blue-500/10 transition-colors"
            title="Tax & GST Compliance"
          >
            <span className="sr-only">Tax &amp; GST Compliance</span>
          </a>

          {/* 2. Business Registration */}
          <a
            href="#services"
            onClick={(e) => handleScrollTo(e, "#services")}
            className="absolute left-[16.0%] top-[76.5%] w-[11.0%] h-[10%] rounded-full cursor-pointer hover:bg-blue-500/10 transition-colors"
            title="Business Registration"
          >
            <span className="sr-only">Business Registration</span>
          </a>

          {/* 3. Accounting & Bookkeeping */}
          <a
            href="#services"
            onClick={(e) => handleScrollTo(e, "#services")}
            className="absolute left-[27.4%] top-[76.5%] w-[12.0%] h-[10%] rounded-full cursor-pointer hover:bg-blue-500/10 transition-colors"
            title="Accounting & Bookkeeping"
          >
            <span className="sr-only">Accounting &amp; Bookkeeping</span>
          </a>

          {/* 4. Licensing & Regulatory Support */}
          <a
            href="#services"
            onClick={(e) => handleScrollTo(e, "#services")}
            className="absolute left-[39.6%] top-[76.5%] w-[14.0%] h-[10%] rounded-full cursor-pointer hover:bg-blue-500/10 transition-colors"
            title="Licensing & Regulatory Support"
          >
            <span className="sr-only">Licensing &amp; Regulatory Support</span>
          </a>
        </div>

        {/* Mobile-Optimized Action Bar (< sm screens) */}
        <div className="mt-4 px-1 sm:hidden flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleConsultation}
              className="flex-1 btn-pill-warm py-3 px-4 rounded-xl text-center text-sm font-semibold text-white shadow-md inline-flex items-center justify-center gap-2"
            >
              <span>Get Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, "#services")}
              className="flex-1 py-3 px-4 rounded-xl text-center text-sm font-semibold text-slate-800 bg-white border border-slate-300 shadow-sm hover:bg-slate-50 transition-colors inline-flex items-center justify-center"
            >
              Explore Services
            </a>
          </div>

          {/* Quick Pillar Tags on Mobile */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 pt-0.5">
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, "#services")}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200/80 shadow-xs hover:border-blue-400 transition-colors"
            >
              <FileCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="font-medium truncate">Tax &amp; GST</span>
            </a>
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, "#services")}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200/80 shadow-xs hover:border-blue-400 transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="font-medium truncate">Registrations</span>
            </a>
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, "#services")}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200/80 shadow-xs hover:border-blue-400 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="font-medium truncate">Accounting</span>
            </a>
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, "#services")}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-slate-200/80 shadow-xs hover:border-blue-400 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="font-medium truncate">Licensing</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
