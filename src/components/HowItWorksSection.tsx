"use client";

import React from "react";
import {
  FileText,
  SearchCheck,
  FileCode2,
  Headphones,
  ArrowRight,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function HowItWorksSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const steps = [
    {
      step: 1,
      title: "Tell Us Your Requirement",
      tagline: "Inquiry & Intake",
      description:
        "Submit an online enquiry or contact our team specifying your required service, entity type, and current status.",
      icon: FileText,
      delay: "0.10s",
    },
    {
      step: 2,
      title: "Understand Your Needs",
      tagline: "Scope & Eligibility Check",
      description:
        "We evaluate statutory applicability, identify necessary documentation, and provide transparent scope parameters.",
      icon: SearchCheck,
      delay: "0.22s",
    },
    {
      step: 3,
      title: "Documentation & Processing",
      tagline: "Drafting & Portal Submissions",
      description:
        "Our team assists in assembling compliant files, preparing statutory forms, and coordinating official filings.",
      icon: FileCode2,
      delay: "0.34s",
    },
    {
      step: 4,
      title: "Follow-Up & Ongoing Support",
      tagline: "Acknowledgements & Calendar",
      description:
        "Receive official submission receipts, portal acknowledgements, and periodic support for upcoming compliance cycles.",
      icon: Headphones,
      delay: "0.46s",
    },
  ];

  return (
    <section
      ref={ref}
      id="process"
      className="py-20 lg:py-28 bg-[#FAFBFD] relative scroll-mt-20 overflow-hidden"
    >
      {/* Decorative ambient gradient blooms */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none animate-subtle-pulse" />
      <div className="absolute -bottom-10 -left-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none animate-subtle-float" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with smooth entrance animation */}
        <div
          className={`text-center max-w-3xl mx-auto space-y-4 mb-16 transition-all duration-700 ${
            isInView ? "animate-section-reveal" : "opacity-0 translate-y-6"
          }`}
        >
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

        {/* Process Timeline: Horizontal with Animated Traveling Beam on Desktop */}
        <div className="relative">
          {/* Desktop Connecting Line with Traveling Energy Beam */}
          <div className="hidden lg:block absolute top-[68px] left-[10%] right-[10%] h-1 bg-slate-200/80 rounded-full overflow-hidden z-0">
            <div className="h-full w-48 bg-gradient-to-r from-transparent via-[#163E8C] to-transparent rounded-full animate-beam-flow shadow-sm shadow-[#163E8C]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 relative z-10">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  style={{ animationDelay: item.delay }}
                  className={`bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:border-[#163E8C] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                    isInView ? "animate-card-reveal" : "opacity-0 translate-y-8"
                  }`}
                >
                  {/* Subtle top indicator bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#163E8C]/0 to-transparent group-hover:via-[#163E8C] transition-all duration-500" />

                  <div className="space-y-4">
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-13 h-13 rounded-2xl bg-[#EAF1FF] text-[#163E8C] flex items-center justify-center font-bold text-sm group-hover:bg-[#163E8C] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-[#163E8C]/25 transition-all duration-300 shadow-xs border border-blue-100">
                        <Icon className="w-6 h-6 transition-transform" />
                      </div>
                      <span className="text-xs font-bold text-[#163E8C] bg-blue-50 px-2.5 py-1 rounded-full font-mono border border-blue-200 group-hover:bg-[#163E8C] group-hover:text-white group-hover:border-[#163E8C] transition-all duration-300 shadow-2xs">
                        STEP 0{item.step}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#163E8C] transition-colors">
                        {item.tagline}
                      </span>
                      <h3 className="text-base font-bold text-[#080B12] mt-0.5 group-hover:text-[#163E8C] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs text-[#687386] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#163E8C]">
                    <span>Stage {item.step} of 4</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#163E8C] opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Prompt */}
        <div
          className={`mt-14 text-center transition-all duration-700 delay-300 ${
            isInView ? "animate-section-reveal" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/contact"
            className="btn-pill-warm group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>Begin Step 1: Submit Your Requirement</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
