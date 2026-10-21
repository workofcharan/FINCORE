import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import AboutSection from "@/components/AboutSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import {
  Compass,
  FileCheck2,
  Users2,
  ShieldCheck,
  Building,
  Target,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Simplifying Finance, Empowering Businesses",
  description:
    "Learn about FINCORE CONSULTANCY SERVICES, our mission, compliance philosophy, and how we assist Indian businesses and individuals with structured statutory and financial advisory.",
};

export default function AboutPage() {
  const commitments = [
    {
      title: "Clear Communication & Practical Guidance",
      description:
        "We translate complex statutory provisions and portal workflows into straightforward, actionable requirements for your entity.",
      icon: Compass,
    },
    {
      title: "Organized Documentation & Filing Support",
      description:
        "Every application, challan, and schedule is prepared with systematic checklists to eliminate omissions and rework.",
      icon: FileCheck2,
    },
    {
      title: "Tailored to Individual & Commercial Scale",
      description:
        "From an individual filing an ITR-2 with capital gains to an expanding corporate entity requiring monthly GST reconciliations.",
      icon: Users2,
    },
    {
      title: "Lifecycle Statutory Accompaniment",
      description:
        "Support throughout the entire registration, approval, and recurring compliance process rather than one-off disconnected tasks.",
      icon: ShieldCheck,
    },
  ];

  return (
    <>
      <PageHero
        badge="About Our Practice"
        title="Simplifying Finance. Empowering Businesses."
        subtitle="A dedicated Indian consultancy helping individuals, startups, and growing enterprises navigate financial documentation, tax compliance, company formation, and licensing requirements."
        breadcrumbs={[{ name: "About Us" }]}
      />

      {/* 1. About FINCORE & Operational Pillars (Comes First) */}
      <AboutSection />

      {/* 2. Main Narrative Section: Who We Are & Mission & Client Tenets */}
      <section className="py-20 bg-[#F5F7FA] font-serif border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Who We Are & Mission */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#163E8C] bg-[#EAF1FF] px-3 py-1 rounded-md border border-blue-200/50">
                  Firm Overview
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-[#080B12]">
                  Who We Are
                </h2>
                <p className="text-base text-[#687386] leading-relaxed">
                  FINCORE CONSULTANCY SERVICES was established to bridge the gap
                  between intricate Indian regulatory mandates and practical
                  business execution. Operating in a rapidly modernizing economy
                  means businesses must keep pace with digitized tax frameworks,
                  MCA filings, GST portal protocols, and municipal clearances.
                </p>
                <p className="text-sm text-[#687386] leading-relaxed">
                  Our team functions as an operational ally for founders,
                  executives, and individual taxpayers. By establishing orderly
                  documentation pipelines, verifying statutory eligibility, and
                  monitoring filing deadlines, we eliminate procedural anxiety
                  so you can focus on your enterprise.
                </p>
              </div>

              {/* Our Mission & Vision */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-lg hover:border-[#163E8C]/40 hover:-translate-y-1.5 transition-all duration-300 space-y-3 group">
                  <div className="w-10 h-10 rounded-lg bg-[#EAF1FF] text-[#163E8C] flex items-center justify-center group-hover:bg-[#163E8C] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#080B12] group-hover:text-[#163E8C] transition-colors">
                    Our Mission
                  </h3>
                  <p className="text-xs text-[#687386] leading-relaxed">
                    To make statutory adherence, financial organization, and
                    corporate setup transparent, accessible, and reliably
                    managed for every client we serve.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-lg hover:border-[#163E8C]/40 hover:-translate-y-1.5 transition-all duration-300 space-y-3 group">
                  <div className="w-10 h-10 rounded-lg bg-[#EAF1FF] text-[#163E8C] flex items-center justify-center group-hover:bg-[#163E8C] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#080B12] group-hover:text-[#163E8C] transition-colors">
                    Our Approach
                  </h3>
                  <p className="text-xs text-[#687386] leading-relaxed">
                    Rigorous preliminary assessment, disciplined document
                    reconciliation, and proactive communication before deadlines
                    arrive.
                  </p>
                </div>
              </div>

              {/* Regulatory Notice Banner */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-start gap-3 shadow-2xs">
                <ShieldAlert className="w-4 h-4 text-[#163E8C] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-[#080B12]">Commitment to Honesty:</strong> We
                  do not manufacture superficial awards or guarantee government
                  outcomes outside our legal scope. We take pride in real,
                  careful work that stands up to statutory scrutiny.
                </p>
              </div>
            </div>

            {/* Right Column: Commitments to Clients */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#0B2458] text-white rounded-2xl p-7 sm:p-8 border border-blue-400/30 shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">
                    Client Tenets
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Our Commitment to Clients
                  </h3>
                </div>

                <div className="space-y-4">
                  {commitments.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-1.5 hover:bg-white/15 hover:border-white/30 hover:translate-x-1.5 transition-all duration-300 group cursor-default"
                      >
                        <div className="flex items-center gap-2 text-sm font-bold text-white">
                          <Icon className="w-4 h-4 text-blue-300" />
                          <span>{item.title}</span>
                        </div>
                        <p className="text-xs text-blue-100/90 leading-relaxed pl-6">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-white/15">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-blue-200 hover:text-white transition-colors"
                  >
                    <span>Browse Our Complete Practice Directory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4-Step Client Engagement Roadmap */}
      <HowItWorksSection />
    </>
  );
}
