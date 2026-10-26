"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Layers,
  ShieldAlert,
  Sparkles,
  ReceiptText,
  Percent,
  BookOpen,
  Building2,
  Handshake,
  Briefcase,
  PiggyBank,
  HeartPulse,
  FileSpreadsheet,
  Coins,
  Scale,
  Store,
  HardHat,
  UtensilsCrossed,
  ShieldCheck,
} from "lucide-react";
import { allServices, ServiceItem } from "@/data/servicesData";
import { ServiceCardModern } from "@/components/ServiceCardModern";
import { useSPA } from "@/context/SPAContext";
import { useInView } from "@/hooks/useInView";

interface ServicesSectionProps {
  onOpenConsultationWithService?: (serviceName: string) => void;
}

interface ServiceCardConfig {
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  accentColor: string;
  glowColor: string;
  bullets: string[];
  stats: { value: string; label: string }[];
}

const SERVICE_CONFIGS: Record<string, ServiceCardConfig> = {
  "tax-filing": {
    icon: ReceiptText,
    gradient: "bg-gradient-to-br from-rose-500 to-amber-500",
    accentColor: "#F43F5E",
    glowColor: "radial-gradient(circle, rgba(244,63,94,0.2) 0%, rgba(251,146,60,0.1) 50%, transparent 70%)",
    bullets: [
      "ITR-1 through ITR-7 Return Filing",
      "AIS & Form 26AS Tax Credit Matching",
      "Capital Gains & Salary Computation",
      "Notice Response & Assessment Guidance",
    ],
    stats: [
      { value: "1,200+", label: "Returns Filed" },
      { value: "100%", label: "Verified" },
      { value: "Zero", label: "Default Notices" },
    ],
  },
  "gst-registration-filing": {
    icon: Percent,
    gradient: "bg-gradient-to-br from-blue-600 to-indigo-600",
    accentColor: "#2563EB",
    glowColor: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(99,102,241,0.1) 50%, transparent 70%)",
    bullets: [
      "Monthly GSTR-1 & GSTR-3B Filings",
      "Dynamic ITC GSTR-2B Matching",
      "GSTIN Registration & Migration",
      "Annual Returns & E-Way Bills",
    ],
    stats: [
      { value: "₹8.5Cr+", label: "ITC Reconciled" },
      { value: "99.8%", label: "On-Time Rate" },
      { value: "Pan-India", label: "GSTN Scope" },
    ],
  },
  "accounting-bookkeeping": {
    icon: BookOpen,
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
    accentColor: "#059669",
    glowColor: "radial-gradient(circle, rgba(5,150,105,0.2) 0%, rgba(13,148,136,0.1) 50%, transparent 70%)",
    bullets: [
      "Ledger Maintenance & Reconciliation",
      "Balance Sheet & P&L Statements",
      "Tally & Zoho Multi-Cloud Accounting",
      "Statutory Audit Readiness Support",
    ],
    stats: [
      { value: "Monthly", label: "MIS Reporting" },
      { value: "Zero", label: "Ledger Gaps" },
      { value: "Audit Ready", label: "Financials" },
    ],
  },
  "company-incorporation": {
    icon: Building2,
    gradient: "bg-gradient-to-br from-fuchsia-600 to-purple-700",
    accentColor: "#9333EA",
    glowColor: "radial-gradient(circle, rgba(147,51,234,0.2) 0%, rgba(168,85,247,0.1) 50%, transparent 70%)",
    bullets: [
      "SPICe+ Part B MCA Portal Submission",
      "RUN Company Name Reservation Check",
      "Director DIN & Class-3 DSC Issuance",
      "PAN, TAN & Bank Current Account Help",
    ],
    stats: [
      { value: "5-7 Days", label: "Fast-Track SLA" },
      { value: "100%", label: "Online Setup" },
      { value: "MCA Direct", label: "Filings" },
    ],
  },
  "partnership-registration": {
    icon: Handshake,
    gradient: "bg-gradient-to-br from-amber-500 to-orange-600",
    accentColor: "#D97706",
    glowColor: "radial-gradient(circle, rgba(217,119,6,0.2) 0%, rgba(249,115,22,0.1) 50%, transparent 70%)",
    bullets: [
      "LLP Agreement & Partnership Deed",
      "ROC Form 11 & Form 8 Annual Returns",
      "RoF Sub-Registrar Registration",
      "Partner Capital Structure Advisory",
    ],
    stats: [
      { value: "150+", label: "LLPs Formed" },
      { value: "Deed Drafts", label: "Fast-Track" },
      { value: "ROC Compliant", label: "Standard" },
    ],
  },
  "business-registration": {
    icon: Briefcase,
    gradient: "bg-gradient-to-br from-cyan-500 to-blue-600",
    accentColor: "#0284C7",
    glowColor: "radial-gradient(circle, rgba(2,132,199,0.2) 0%, rgba(59,130,246,0.1) 50%, transparent 70%)",
    bullets: [
      "MSME Udyam Registration Portal",
      "Proprietorship Business Declaration",
      "Bank Current Account Resolution",
      "Government Subsidies & Benefits Help",
    ],
    stats: [
      { value: "Same-Day", label: "Udyam Issuance" },
      { value: "Zero-Cost", label: "Govt Portal" },
      { value: "100%", label: "Paperless" },
    ],
  },
  "provident-fund": {
    icon: PiggyBank,
    gradient: "bg-gradient-to-br from-violet-500 to-purple-600",
    accentColor: "#7C3AED",
    glowColor: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(147,51,234,0.1) 50%, transparent 70%)",
    bullets: [
      "Monthly ECR Challan Preparation",
      "Unified Portal UAN KYC Linking",
      "New Establishment Code Registration",
      "Annual Statutory PF Returns",
    ],
    stats: [
      { value: "Monthly", label: "ECR Filings" },
      { value: "20+ Staff", label: "Mandate Slabs" },
      { value: "EPFO Portal", label: "Direct Sync" },
    ],
  },
  "esi": {
    icon: HeartPulse,
    gradient: "bg-gradient-to-br from-rose-500 to-red-600",
    accentColor: "#E11D48",
    glowColor: "radial-gradient(circle, rgba(225,29,72,0.2) 0%, rgba(239,68,68,0.1) 50%, transparent 70%)",
    bullets: [
      "ESIC Portal Employee Enrolment",
      "Monthly Statutory Contribution Filing",
      "Pehchan Identity Card Verification",
      "Form 5 Half-Yearly Return Filing",
    ],
    stats: [
      { value: "10+ Staff", label: "Threshold" },
      { value: "Monthly", label: "Challan Filing" },
      { value: "ESIC", label: "Fully Compliant" },
    ],
  },
  "tds": {
    icon: FileSpreadsheet,
    gradient: "bg-gradient-to-br from-sky-500 to-indigo-600",
    accentColor: "#0284C7",
    glowColor: "radial-gradient(circle, rgba(2,132,199,0.2) 0%, rgba(99,102,241,0.1) 50%, transparent 70%)",
    bullets: [
      "Form 24Q (Salary) & 26Q (Vendor)",
      "TRACES Portal Form 16 / 16A Issuance",
      "TDS Challan ITNS 281 Generation",
      "Lower Deduction Sec 197 Application",
    ],
    stats: [
      { value: "Quarterly", label: "Return Cycles" },
      { value: "TRACES", label: "Portal Sync" },
      { value: "Zero Delay", label: "Compliance" },
    ],
  },
  "tcs": {
    icon: Coins,
    gradient: "bg-gradient-to-br from-amber-500 to-yellow-600",
    accentColor: "#D97706",
    glowColor: "radial-gradient(circle, rgba(217,119,6,0.2) 0%, rgba(202,138,4,0.1) 50%, transparent 70%)",
    bullets: [
      "Form 27EQ Quarterly Submission",
      "Section 206C Scope Evaluation",
      "Form 27D TCS Certificate Generation",
      "Motor Vehicle, Scrap & Timber TCS",
    ],
    stats: [
      { value: "Sec 206C", label: "Audit Trial" },
      { value: "Quarterly", label: "Filing Cycle" },
      { value: "100%", label: "Accuracy" },
    ],
  },
  "professional-tax": {
    icon: Scale,
    gradient: "bg-gradient-to-br from-teal-500 to-emerald-600",
    accentColor: "#0D9488",
    glowColor: "radial-gradient(circle, rgba(13,148,136,0.2) 0%, rgba(5,150,105,0.1) 50%, transparent 70%)",
    bullets: [
      "PTRC Employer Return Filings",
      "PTEC Entity Registration Setup",
      "State-Specific Slab Computations",
      "Annual Form 5 PT Submissions",
    ],
    stats: [
      { value: "State Slabs", label: "Karnataka/Pan-IN" },
      { value: "Monthly", label: "Remittance" },
      { value: "Prompt", label: "Clearances" },
    ],
  },
  "trade-license": {
    icon: Store,
    gradient: "bg-gradient-to-br from-orange-500 to-amber-600",
    accentColor: "#EA580C",
    glowColor: "radial-gradient(circle, rgba(234,88,12,0.2) 0%, rgba(245,158,11,0.1) 50%, transparent 70%)",
    bullets: [
      "BBMP & Municipal Corporation Filing",
      "Commercial Premise Verification Check",
      "Khatha & Property Tax Vetting",
      "Annual Trade License Renewals",
    ],
    stats: [
      { value: "Municipal", label: "Direct Vetting" },
      { value: "1 Year", label: "Standard Term" },
      { value: "Zero Delay", label: "Renewals" },
    ],
  },
  "labour-license": {
    icon: HardHat,
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
    accentColor: "#2563EB",
    glowColor: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)",
    bullets: [
      "Shops & Commercial Est. Registration",
      "Form A to Form C Statutory Filings",
      "Contract Labour License Advisory",
      "Statutory Wage Registers Setup",
    ],
    stats: [
      { value: "State Labour", label: "Department" },
      { value: "Mandatory", label: "For Premises" },
      { value: "100%", label: "Compliant" },
    ],
  },
  "food-license": {
    icon: UtensilsCrossed,
    gradient: "bg-gradient-to-br from-emerald-500 to-green-600",
    accentColor: "#16A34A",
    glowColor: "radial-gradient(circle, rgba(22,163,74,0.2) 0%, rgba(34,197,94,0.1) 50%, transparent 70%)",
    bullets: [
      "Basic, State & Central FSSAI License",
      "FoSCoS Direct Portal Submission",
      "Food Safety Hygiene Documentation",
      "1 to 5 Year Validity Selection",
    ],
    stats: [
      { value: "FoSCoS", label: "Direct Gateway" },
      { value: "1-5 Yrs", label: "Tenure Scope" },
      { value: "Pan-India", label: "FSSAI Valid" },
    ],
  },
  "other-licenses": {
    icon: ShieldCheck,
    gradient: "bg-gradient-to-br from-indigo-500 to-violet-600",
    accentColor: "#4F46E5",
    glowColor: "radial-gradient(circle, rgba(79,70,229,0.2) 0%, rgba(124,58,237,0.1) 50%, transparent 70%)",
    bullets: [
      "Annual Director KYC (DIR-3 KYC)",
      "Import Export Code (IEC) Registration",
      "Statutory Auditor Appointment (ADT-1)",
      "Pollution & Environmental Clearances",
    ],
    stats: [
      { value: "Corporate", label: "Advisory" },
      { value: "Annual", label: "Mandate Sync" },
      { value: "Audit-Safe", label: "Records" },
    ],
  },
};

export default function ServicesSection({
  onOpenConsultationWithService,
}: ServicesSectionProps = {}) {
  const spa = useSPA();
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(
    () => [
      { label: "All Practices", value: "All", count: allServices.length },
      {
        label: "Tax & Compliance",
        value: "Taxation & Financial Compliance",
        count: allServices.filter(
          (s) => s.category === "Taxation & Financial Compliance"
        ).length,
      },
      {
        label: "Business Registration",
        value: "Business Registration",
        count: allServices.filter(
          (s) => s.category === "Business Registration"
        ).length,
      },
      {
        label: "Licenses & Permits",
        value: "Licenses & Regulatory Compliance",
        count: allServices.filter(
          (s) => s.category === "Licenses & Regulatory Compliance"
        ).length,
      },
    ],
    []
  );

  const filteredServices = useMemo(() => {
    return allServices.filter((service) => {
      const matchesCategory =
        selectedCategory === "All" || service.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.suitability.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleConsult = (serviceName: string) => {
    if (onOpenConsultationWithService) {
      onOpenConsultationWithService(serviceName);
    } else {
      spa.openConsultation(serviceName);
    }
  };

  return (
    <section
      ref={ref}
      id="services"
      className="py-20 lg:py-28 bg-[#F5F7FA] relative scroll-mt-20 overflow-hidden select-none"
    >
      {/* Static subtle background radial glows */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[radial-gradient(circle,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto space-y-4 transition-all duration-700 ${
            isInView ? "animate-section-reveal" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF1FF] text-[#163E8C] text-xs font-bold uppercase tracking-wider border border-blue-200/60 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#163E8C]" />
            <span>Practice Directory</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#080B12] font-heading">
            Our Services &amp; Compliance Scope
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Structured financial facilitation, corporate registrations, and
            statutory licensing managed with precision, transparent checklists,
            and complete regulatory compliance.
          </p>

          <p className="text-xs text-[#163E8C] font-semibold tracking-wide uppercase pt-1 inline-flex items-center gap-1.5 bg-blue-50/80 px-3 py-1 rounded-full border border-blue-100 hover:bg-blue-100/80 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-[#163E8C]" />
            <span>Click any card below to view documentation checklists &amp; step-by-step roadmap</span>
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1426] ${
                    isSelected
                      ? "bg-[#0B1426] text-white shadow-md scale-[1.02]"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-black"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-bold transition-all ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-white text-slate-600 border border-slate-200"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="size-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-[#163E8C]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across 15 services..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#163E8C]/30 focus:border-[#163E8C] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Services Grid with Modern Reference Cards */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {filteredServices.map((service, idx) => {
              const config = SERVICE_CONFIGS[service.id] || {
                icon: Layers,
                gradient: "bg-gradient-to-br from-blue-600 to-indigo-600",
                accentColor: "#163E8C",
                glowColor: "radial-gradient(circle, rgba(22,62,140,0.2) 0%, transparent 70%)",
                bullets: service.suitability.slice(0, 4),
                stats: [
                  { value: "Verified", label: "Compliance" },
                  { value: "Direct", label: "Support" },
                  { value: "Pan-India", label: "Scope" },
                ],
              };

              return (
                <div
                  key={service.id}
                  style={{ animationDelay: `${(idx % 6) * 0.05}s` }}
                  className="animate-card-reveal"
                >
                  <ServiceCardModern
                    service={service}
                    href={`/services/${service.slug}`}
                    icon={config.icon}
                    gradient={config.gradient}
                    accentColor={config.accentColor}
                    glowColor={config.glowColor}
                    bullets={config.bullets}
                    stats={config.stats}
                    backgroundImage={`/images/cards/card-${service.id}.webp`}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <p className="text-sm text-slate-500">
              No services matched your search &quot;{searchQuery}&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs font-semibold text-[#163E8C] underline hover:text-[#0B2458] cursor-pointer"
            >
              Reset filters and show all 15 services
            </button>
          </div>
        )}

        {/* Regulatory Scope Notice Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="size-4 text-[#163E8C] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Indian Compliance Note:</strong> Service applicability, tax rates, and document prerequisites depend on entity structure, turnover, and current notifications from the Income Tax Department, GST Council, MCA, EPFO, ESIC, and municipal corporations.
            </p>
          </div>
          <Link
            href="/contact"
            className="text-xs font-semibold text-[#163E8C] hover:text-[#0B2458] shrink-0 hover:underline cursor-pointer"
          >
            Consult Compliance Advisor →
          </Link>
        </div>
      </div>
    </section>
  );
}
