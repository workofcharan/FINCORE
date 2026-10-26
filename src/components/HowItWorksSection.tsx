"use client";

import React from "react";
import {
  Lightbulb,
  Target,
  Coins,
  TrendingUp,
  ArrowRight,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

interface ProcessStep {
  step: number;
  numberStr: string;
  title: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bullets: {
    title: string;
    desc: string;
  }[];
  delay: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    numberStr: "01",
    title: "REQUIREMENT INTAKE",
    shortDesc: "Initial intake, applicability verification, and personalized scope definition.",
    icon: Lightbulb,
    accentColor: "#0284C7", // Cyan / Sky Blue
    bullets: [
      {
        title: "ONLINE SUBMISSION",
        desc: "Share your business activity, structure, and statutory goals.",
      },
      {
        title: "CHECKLIST DISCOVERY",
        desc: "Receive an instant statutory checklist of required PAN & financial records.",
      },
      {
        title: "DEDICATED ADVISOR",
        desc: "Get paired with a domain compliance lead for direct coordination.",
      },
    ],
    delay: "0.05s",
  },
  {
    step: 2,
    numberStr: "02",
    title: "ELIGIBILITY & SCOPE",
    shortDesc: "Comprehensive portal assessment, data reconciliation, and advisory strategy.",
    icon: Target,
    accentColor: "#7C3AED", // Purple / Violet
    bullets: [
      {
        title: "DATA RECONCILIATION",
        desc: "Match Form 26AS, AIS/TIS, GSTR-2B, and MCA records for zero gaps.",
      },
      {
        title: "TAX OPTIMIZATION",
        desc: "Identify legitimate statutory deductions, exemptions, and state benefits.",
      },
      {
        title: "TRANSPARENT SCOPE",
        desc: "Lock clear timeline commitments with zero hidden government costs.",
      },
    ],
    delay: "0.15s",
  },
  {
    step: 3,
    numberStr: "03",
    title: "DRAFTING & FILING",
    shortDesc: "Accurate documentation, statutory forms compilation, and government filing.",
    icon: Coins,
    accentColor: "#F59E0B", // Golden Amber / Warm Yellow
    bullets: [
      {
        title: "LEGAL DRAFTING",
        desc: "Draft resolutions, partnership deeds, MOA/AOA, and calculation sheets.",
      },
      {
        title: "CLIENT APPROVAL",
        desc: "Preview and approve computational sheets prior to portal transmission.",
      },
      {
        title: "GOVERNMENT FILING",
        desc: "Direct submission on MCA, Income Tax, GSTN, EPFO, or municipal portals.",
      },
    ],
    delay: "0.25s",
  },
  {
    step: 4,
    numberStr: "04",
    title: "APPROVAL & SUPPORT",
    shortDesc: "Official certificates delivery, cloud document vault, and calendar tracking.",
    icon: TrendingUp,
    accentColor: "#EF4444", // Coral / Red-Orange
    bullets: [
      {
        title: "OFFICIAL APPROVAL",
        desc: "Receive verified acknowledgements, ITR-V, and statutory certificates.",
      },
      {
        title: "SECURE DOCUMENT VAULT",
        desc: "Lifetime cloud archive of all filings, challans, and statutory records.",
      },
      {
        title: "COMPLIANCE MONITORING",
        desc: "Periodic calendar alerts for advance tax, quarterly TDS, and ROC due dates.",
      },
    ],
    delay: "0.35s",
  },
];

export default function HowItWorksSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="process"
      className="py-20 lg:py-28 bg-[#F4F6F9] relative scroll-mt-20 overflow-hidden"
    >
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse,rgba(255,255,255,0.8)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 transition-all duration-700 animate-section-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF1FF] text-[#163E8C] text-xs font-semibold uppercase tracking-wider border border-blue-200/60 shadow-xs">
            <Workflow className="w-3.5 h-3.5 text-[#163E8C] animate-spin" style={{ animationDuration: "12s" }} />
            <span>Structured Engagement Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#080B12] font-heading">
            How It Works
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            A clear, four-step advisory framework designed to eliminate guesswork,
            ensure regulatory conformity, and deliver peace of mind.
          </p>
        </div>

        {/* 4 Connected Infographic Cards Matching Reference Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 lg:gap-6 relative z-10 pt-4">
          {PROCESS_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                style={{ animationDelay: item.delay }}
                className="relative group flex flex-col transition-all duration-300 hover:-translate-y-2"
              >
                {/* Right-pointing chevron connector matching reference image */}
                <div className="hidden lg:flex absolute -right-5.5 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <svg
                    className="w-6 h-12 drop-shadow-xs transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: item.accentColor }}
                  >
                    <path d="M4 4L20 20L4 36" />
                  </svg>
                </div>

                {/* Outer Colored Base Card with rounded-3xl and bottom speech bubble tail */}
                <div
                  className="relative rounded-[26px] p-4.5 sm:p-5 pb-5 text-white flex flex-col justify-between shadow-xl shadow-slate-300/50 transition-all duration-300 group-hover:shadow-2xl"
                  style={{ backgroundColor: item.accentColor }}
                >
                  {/* Inner White Speech Bubble Card */}
                  <div className="relative rounded-2xl bg-white p-5 pt-9 pb-6 shadow-md shadow-black/10 flex flex-col min-h-[290px] justify-between">
                    {/* Top Floating Circular Icon Badge */}
                    <div
                      className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: item.accentColor }}
                    >
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    {/* 3 Checklist Bullet Points */}
                    <div className="space-y-4 my-auto">
                      {item.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5">
                          <span
                            className="w-2 h-2 rounded-full mt-1 shrink-0"
                            style={{ backgroundColor: item.accentColor }}
                          />
                          <div className="space-y-0.5 min-w-0">
                            <h5
                              className="text-[11px] sm:text-xs font-black uppercase tracking-wider leading-tight"
                              style={{ color: item.accentColor }}
                            >
                              {bullet.title}
                            </h5>
                            <p className="text-[11px] text-slate-500 leading-snug">
                              {bullet.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Inner White Downward Speech Bubble Tail */}
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white" />
                  </div>

                  {/* Bottom Number & Title Section */}
                  <div className="pt-5 px-1 flex items-center gap-3 relative z-10">
                    {/* Giant Number */}
                    <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tighter leading-none select-none shrink-0">
                      {item.numberStr}
                    </span>
                    {/* Title & Description */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white font-heading leading-tight truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-white/90 leading-tight mt-0.5 line-clamp-2 font-medium">
                        {item.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Outer Colored Card Downward Speech Bubble Tail */}
                  <div
                    className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px]"
                    style={{ borderTopColor: item.accentColor }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="mt-18 text-center transition-all duration-700 delay-300 animate-section-reveal">
          <Link
            href="/contact"
            className="btn-pill-warm group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>Begin Step 1: Submit Your Requirement</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
