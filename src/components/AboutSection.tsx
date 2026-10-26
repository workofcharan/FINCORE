"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  FileCheck2,
  Briefcase,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

export default function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const highlights = [
    {
      id: "clear-guidance",
      title: "Clear Guidance",
      tagline: "Transparent Statutory Clarity",
      description:
        "We translate complex statutory jargon into clear, practical roadmaps tailored to your specific individual or business operational structure.",
      icon: Compass,
      metric: "Clarity First",
      delay: "0.12s",
    },
    {
      id: "compliance-support",
      title: "Compliance-Focused Support",
      tagline: "Systematic Filing Verification",
      description:
        "Every registration, return, and municipal application is verified against current Indian regulatory checklists to eliminate omissions and errors.",
      icon: FileCheck2,
      metric: "Verified Scope",
      delay: "0.26s",
    },
    {
      id: "business-solutions",
      title: "Business-Oriented Solutions",
      tagline: "Scalable Enterprise Facilitation",
      description:
        "From early sole proprietorships to expanding corporate bodies, our advisory adapts to your transaction volume and commercial growth stages.",
      icon: Briefcase,
      metric: "Growth Aligned",
      delay: "0.40s",
    },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="py-20 lg:py-28 bg-white relative scroll-mt-20 overflow-hidden"
    >
      <div id="pillars" className="absolute -top-20" />

      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-[radial-gradient(circle,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 -right-28 w-96 h-96 bg-[radial-gradient(circle,rgba(245,158,11,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header with smooth entrance animation */}
        <div
          className={`text-center max-w-3xl mx-auto space-y-4 transition-all duration-700 ${
            isInView ? "animate-section-reveal" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#080B12] font-heading">
            About <span className="text-[#163E8C]">FINCORE</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            FINCORE Consultancy Services simplifies financial administration and business compliance by bringing essential consultancy services together in one place. Our advisory helps individuals, entrepreneurs, and businesses navigate statutory requirements with absolute clarity.
          </p>

          <p className="text-xs text-[#163E8C] font-semibold tracking-wide uppercase pt-1 inline-flex items-center gap-1.5 bg-blue-50/80 px-3 py-1 rounded-full border border-blue-100 hover:bg-blue-100/80 transition-colors">
            <span>Click any pillar below to explore in-depth scope &amp; execution methodologies</span>
          </p>
        </div>

        {/* Three Visual Highlights (Staggered Cards with 3D Hover Elevation) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={`/about/${item.id}`}
                aria-label={`View dedicated page for ${item.title}`}
                style={{
                  animationDelay: item.delay,
                }}
                className={`p-6 sm:p-7 rounded-2xl bg-slate-50 hover:bg-gradient-to-b hover:from-white hover:to-blue-50/30 border border-slate-200/90 shadow-2xs hover:shadow-2xl hover:border-[#163E8C] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163E8C] relative overflow-hidden ${
                  isInView ? "animate-card-reveal" : "opacity-0 translate-y-8"
                }`}
              >
                {/* Subtle top shimmer accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#163E8C]/0 to-transparent group-hover:via-[#163E8C] transition-all duration-500" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#163E8C] border border-blue-100 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#163E8C] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-[#163E8C]/25 transition-all duration-300">
                      <Icon className="w-6 h-6 transition-transform" />
                    </div>
                    <span className="text-[10px] font-bold text-[#163E8C] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 group-hover:bg-[#163E8C] group-hover:text-white group-hover:border-[#163E8C] transition-all duration-300 font-mono shadow-2xs">
                      {item.metric}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-[#080B12] group-hover:text-[#163E8C] transition-colors flex items-center justify-between">
                      <span>{item.title}</span>
                      <ArrowRight className="w-4 h-4 text-[#163E8C] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-[#163E8C] font-semibold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#163E8C] group-hover:scale-110 transition-transform" />
                    <span className="truncate max-w-[150px]">{item.tagline}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#163E8C] group-hover:translate-x-1 transition-transform shrink-0">
                    <span>Full Guide</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
