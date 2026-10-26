import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ConsultationForm from "@/components/ConsultationForm";
import { aboutPillarsData, AboutPillarItem } from "@/data/aboutPillarsData";
import {
  Compass,
  FileCheck2,
  Briefcase,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  FileText,
  Sparkles,
  Layers,
  ArrowLeft,
  PhoneCall,
  Clock,
  MapPin,
  ExternalLink,
} from "lucide-react";

export const instant = false;

interface PillarPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getRecommendedServiceSlug(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("tax") || n.includes("itr")) return "tax-filing";
  if (n.includes("gst")) return "gst-registration-filing";
  if (n.includes("tds") || n.includes("tcs")) return "tds";
  if (n.includes("epf") || n.includes("esi") || n.includes("provident")) return "provident-fund";
  if (n.includes("company") || n.includes("incorporation")) return "company-incorporation";
  if (n.includes("partnership")) return "partnership-registration";
  if (n.includes("trade license") || n.includes("municipal")) return "trade-license";
  if (n.includes("msme") || n.includes("udyam") || n.includes("business registration")) return "business-registration";
  if (n.includes("financial") || n.includes("bookkeeping") || n.includes("accounting")) return "accounting-bookkeeping";
  return "services";
}

export async function generateStaticParams() {
  return aboutPillarsData.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: PillarPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pillar = aboutPillarsData.find((p) => p.id === slug);

  if (!pillar) {
    return {
      title: "Operational Pillar | FINCORE Consultancy Services",
    };
  }

  return {
    title: `${pillar.title} - ${pillar.tagline} | FINCORE Consultancy Services`,
    description: `${pillar.summary} Explore in-depth execution methodologies, deliverables, and statutory risk protection.`,
  };
}

export default async function PillarDetailPage({ params }: PillarPageProps) {
  const { slug } = await params;
  const pillar = aboutPillarsData.find((p) => p.id === slug);

  if (!pillar) {
    notFound();
  }

  const Icon = pillar.icon;
  const initialServiceName = pillar.recommendedServices[0]?.name || "Tax Filing";

  return (
    <>
      <PageHero
        badge={`${pillar.category} • ${pillar.metric}`}
        title={pillar.title}
        subtitle={`${pillar.tagline} — ${pillar.summary}`}
        breadcrumbs={[
          { name: "About Us", href: "/about" },
          { name: "Operational Pillars", href: "/about#pillars" },
          { name: pillar.title },
        ]}
      />

      {/* Pillar Switcher Navigation Bar (Desktop & Mobile) */}
      <section className="bg-slate-50 border-b border-slate-200 sticky top-16 sm:top-20 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              View Operational Pillar:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {aboutPillarsData.map((p) => {
                const PIcon = p.icon;
                const isActive = p.id === pillar.id;
                return (
                  <Link
                    key={p.id}
                    href={`/about/${p.id}`}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#163E8C] text-white shadow-xs font-bold"
                        : "bg-white text-slate-700 hover:text-[#163E8C] hover:bg-blue-50 border border-slate-200"
                    }`}
                  >
                    <PIcon className="w-3.5 h-3.5" />
                    <span>{p.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Narrative & Execution Section */}
      <section className="py-16 sm:py-20 bg-white font-serif">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Top Back & Quick Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#163E8C] hover:text-[#0B2458] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to About Us Overview</span>
            </Link>
            <div className="flex items-center gap-4 text-xs">
              <Link
                href="/services"
                className="font-semibold text-slate-600 hover:text-[#163E8C] transition-colors"
              >
                Explore Practice Directory
              </Link>
              <span className="text-slate-300">•</span>
              <a
                href="#consultation"
                className="font-bold text-[#163E8C] hover:underline"
              >
                Speak with an Advisor ↓
              </a>
            </div>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column (8 cols): Concept, Methodologies, Deliverables, Risk Protection */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-12">
              {/* Section 1: Practice Scope & Concept */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#163E8C] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#163E8C]">
                    Practice Scope &amp; Concept
                  </h2>
                </div>
                <div className="p-6 sm:p-7 rounded-2xl bg-[#F5F7FA] border border-slate-200/90 shadow-2xs">
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                    {pillar.overview}
                  </p>
                </div>
              </div>

              {/* Section 2: Execution Methodologies & Core Pillars (4 Cards) */}
              <div className="space-y-6 pt-4 border-t border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#163E8C] flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#163E8C]">
                      Execution Methodologies
                    </h3>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-[#080B12] mt-1">
                    How We Implement {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Disciplined protocols designed to eliminate omissions, ensure accuracy, and protect client interests.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pillar.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="w-6 h-6 rounded-full bg-[#EAF1FF] text-[#163E8C] flex items-center justify-center text-xs font-bold font-mono">
                            {idx + 1}
                          </span>
                          <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                            Methodology
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-[#080B12]">
                          {feature.title}
                        </h5>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Key Deliverables & Client Assets */}
              <div className="space-y-6 pt-4 border-t border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Tangible Deliverables
                    </h3>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-[#080B12] mt-1">
                    What You Receive with This Advisory
                  </h4>
                  <p className="text-xs text-slate-500">
                    Concrete outputs and structured compliance documentation provided across every engagement.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {pillar.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#F5F8FF] border border-blue-100 flex items-start gap-3 hover:border-blue-300 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#163E8C] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Statutory Risk & Scrutiny Protection */}
              <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-amber-950 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                      Statutory Scrutiny Shield
                    </span>
                    <h4 className="text-sm font-bold text-amber-950">
                      {pillar.riskProtection.heading}
                    </h4>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed pl-10">
                  {pillar.riskProtection.description}
                </p>
                <div className="pt-2 pl-10 flex items-center gap-2 text-[11px] font-mono text-amber-800">
                  <strong>Statutory Scope Reference:</strong>
                  <span className="bg-amber-100/90 px-2 py-0.5 rounded border border-amber-200">
                    {pillar.riskProtection.statutoryRef}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column (4-5 cols): Profile, Recommended Services, Advisory Desk */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6">
              {/* Executive Pillar Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B2458] via-[#0F3277] to-[#163E8C] text-white shadow-xl space-y-5 border border-blue-900/40 relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white text-[#163E8C] flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/50 border border-emerald-400/30 px-2.5 py-0.5 rounded-full font-mono">
                    {pillar.metric}
                  </span>
                </div>

                <div className="space-y-1 relative z-10">
                  <span className="text-[10px] uppercase tracking-wider text-blue-200 font-semibold block">
                    {pillar.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-blue-100/90 leading-relaxed pt-1">
                    {pillar.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/15 relative z-10">
                  <a
                    href="#consultation"
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#080B12] text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <span>Request Advisory for This Pillar</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#163E8C]" />
                  </a>
                </div>
              </div>

              {/* Recommended Services Suite */}
              <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200/90 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#163E8C]" />
                  <h4 className="text-sm font-bold text-[#080B12]">
                    Recommended Practice Areas
                  </h4>
                </div>
                <p className="text-xs text-slate-500">
                  Services directly utilizing this operational methodology:
                </p>

                <div className="space-y-2.5">
                  {pillar.recommendedServices.map((svc, idx) => {
                    const slug = getRecommendedServiceSlug(svc.name);
                    return (
                      <Link
                        key={idx}
                        href={`/services/${slug}`}
                        className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all block group"
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-[#080B12] group-hover:text-[#163E8C] transition-colors">
                          <span>{svc.name}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#163E8C] group-hover:translate-x-0.5 transition-all" />
                        </div>
                        <p className="text-[11px] text-slate-500 leading-tight mt-1">
                          {svc.description}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Direct Advisory Desk Help */}
              <div className="p-5 rounded-2xl bg-[#080B14] text-white space-y-3.5 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Senior Advisor Desk</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Have a specific question regarding statutory interpretation or notice response?
                </p>
                <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-300 font-sans font-bold">Call:</span>
                    <a href="tel:+919449448995" className="hover:underline text-white font-bold">
                      +91 94494 48995
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3 text-amber-300 shrink-0" />
                    <span>Mon - Sat: 9:30 AM – 6:30 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <MapPin className="w-3 h-3 text-amber-300 shrink-0" />
                    <span>HBR Layout, Bengaluru</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Consultation Form */}
      <div id="consultation">
        <ConsultationForm initialService={initialServiceName} />
      </div>
    </>
  );
}