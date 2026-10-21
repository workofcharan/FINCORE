"use client";

import React from "react";
import { Star, ShieldCheck, Quote, Building2, TrendingUp, CheckCircle2 } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  designation: string;
  company: string;
  location: string;
  serviceUsed: string;
  entityType: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "FINCORE handled our MCA SPICe+ Private Limited incorporation, GST registration, and constitutional drafting in under 8 working days. Their documentation clarity saved us months of portal back-and-forth.",
    author: "Arjun Nair",
    designation: "Founder & CEO",
    company: "Omnix Healthtech Pvt Ltd",
    location: "Bengaluru, Karnataka",
    serviceUsed: "MCA Company Incorporation & GST",
    entityType: "Private Limited",
  },
  {
    id: "2",
    quote:
      "Reconciling input tax credit with vendor GSTR-2B used to be a nightmare of disallowed credits. FINCORE implemented disciplined monthly bookkeeping and automated tax matching that recovered ₹4.2 Lakhs in blocked ITC.",
    author: "Meera Sen",
    designation: "Managing Partner",
    company: "Kaveri Export Crafts LLP",
    location: "Mumbai, Maharashtra",
    serviceUsed: "GST Reconciliation & Monthly Bookkeeping",
    entityType: "Limited Liability Partnership",
  },
  {
    id: "3",
    quote:
      "For our industrial transport operations, managing municipal trade licenses, labour welfare permits, and quarterly TDS was overwhelming. FINCORE organized our entire statutory calendar with zero late fees.",
    author: "Vikram Singhal",
    designation: "Director",
    company: "Singhal Precision Logistics",
    location: "Delhi NCR",
    serviceUsed: "Trade Licensing & Payroll Compliance",
    entityType: "Corporate Enterprise",
  },
  {
    id: "4",
    quote:
      "As an independent medical consultant filing under Section 44ADA presumptive taxation, their team matched my AIS/TIS dividend entries and completed my ITR-4 filing with total transparency.",
    author: "Dr. Ananya Roy",
    designation: "Healthcare Consultant",
    company: "Roy Diagnostics Advisory",
    location: "Pune, Maharashtra",
    serviceUsed: "Section 44ADA Professional ITR",
    entityType: "Professional Consultant",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F7FA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF1FF] border border-blue-200/80 text-[#163E8C] text-xs font-mono font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#163E8C]" />
            <span>Client Trust &amp; Verified Engagements</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#080B12] font-heading">
            Trusted by Founders, Exporters &amp; Professionals
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Real experiences from business leaders and individuals who depend on FINCORE for punctual statutory submissions and disciplined financial administration.
          </p>
        </div>

        {/* 4-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Top Strip: Star Ratings & Service Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B1426] bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {item.entityType}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author & Context Footnote */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#080B12] group-hover:text-[#163E8C] transition-colors">
                    {item.author}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {item.designation} • <span className="text-slate-700 font-semibold">{item.company}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                    {item.location}
                  </p>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Focus Scope</span>
                  <span className="text-xs font-semibold text-[#0B1426] block">{item.serviceUsed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quantitative Proof Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-[#080B14] text-white border border-white/10 shadow-2xl">
          <div className="text-center space-y-1 p-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-heading block">15+</span>
            <p className="text-xs text-slate-300 font-medium">Statutory Practice Areas</p>
          </div>
          <div className="text-center space-y-1 p-2 border-l border-white/10">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-heading block">950+</span>
            <p className="text-xs text-slate-300 font-medium">Verified Engagements</p>
          </div>
          <div className="text-center space-y-1 p-2 border-l border-white/10">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-heading block">₹0</span>
            <p className="text-xs text-slate-300 font-medium">Hidden Surcharges</p>
          </div>
          <div className="text-center space-y-1 p-2 border-l border-white/10">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-heading block">28+</span>
            <p className="text-xs text-slate-300 font-medium">States &amp; UTs Served</p>
          </div>
        </div>
      </div>
    </section>
  );
}
