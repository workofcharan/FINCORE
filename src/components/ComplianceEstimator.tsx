"use client";

import React, { useState } from "react";
import {
  Calculator,
  CheckCircle2,
  Building,
  User,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  FileText,
  Clock,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { useSPA } from "@/context/SPAContext";

type EntityType = "salaried" | "freelancer" | "proprietor" | "llp" | "pvtltd";

interface EntityOption {
  id: EntityType;
  title: string;
  tagline: string;
  icon: typeof Building;
  recommendedServices: string[];
}

const entityOptions: EntityOption[] = [
  {
    id: "salaried",
    title: "Salaried / Individual",
    tagline: "Form 16, Capital Gains & AIS/TIS Reconciliation",
    icon: User,
    recommendedServices: ["ITR-1/ITR-2 Filing", "AIS & Form 26AS Matching", "Tax Optimization Advisory"],
  },
  {
    id: "freelancer",
    title: "Freelancer / Consultant",
    tagline: "Section 44ADA Presumptive Taxation & GST",
    icon: Briefcase,
    recommendedServices: ["Section 44ADA ITR-4", "GST LUT for Export of Services", "Quarterly Advance Tax Computation"],
  },
  {
    id: "proprietor",
    title: "Sole Proprietorship",
    tagline: "Local Retail, Trading & Small Business",
    icon: TrendingUp,
    recommendedServices: ["GST Registration & Monthly Returns", "ITR-3 / ITR-4 Business Filing", "MSME / Udyam Certificate", "Trade License"],
  },
  {
    id: "llp",
    title: "Partnership / LLP",
    tagline: "Multi-Partner Firm & Limited Liability",
    icon: Layers,
    recommendedServices: ["LLP Formation & Deed Drafting", "Monthly GST (GSTR-1 & 3B)", "Form 8 & Form 11 Annual Filing", "TDS Returns (24Q/26Q)"],
  },
  {
    id: "pvtltd",
    title: "Private Limited (Startup)",
    tagline: "High Growth, MCA Governance & Equity",
    icon: Building,
    recommendedServices: [
      "MCA SPICe+ Company Incorporation",
      "Statutory Audit Preparation",
      "Double-Entry Bookkeeping",
      "GSTR-1 & 3B Filing",
      "AOC-4 & MGT-7 RoC Filings",
      "TDS & PF/ESI Remittances",
    ],
  },
];

const availableAddons = [
  { id: "gst", name: "GST Registration & Monthly GSTR-1/3B", category: "Taxation" },
  { id: "itr", name: "Annual Income Tax Return (ITR-1 to 7)", category: "Taxation" },
  { id: "books", name: "Cloud Accounting & Double-Entry Bookkeeping", category: "Accounting" },
  { id: "mca", name: "MCA RoC Annual Filings & Statutory Registers", category: "Corporate" },
  { id: "tds", name: "TDS / TCS Quarterly Filings & Form 16A", category: "Payroll" },
  { id: "licenses", name: "FSSAI Food License / Municipal Trade License", category: "Licensing" },
  { id: "udyam", name: "MSME / Udyam Statutory Registration", category: "Registration" },
];

export default function ComplianceEstimator() {
  const { openConsultation } = useSPA();
  const [selectedEntity, setSelectedEntity] = useState<EntityType>("pvtltd");
  const [turnoverBracket, setTurnoverBracket] = useState<string>("20L-1Cr");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "gst",
    "itr",
    "books",
    "mca",
    "tds",
  ]);

  const activeEntityData = entityOptions.find((e) => e.id === selectedEntity)!;

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const getEstimatedFilingsCount = () => {
    let count = 0;
    if (selectedServices.includes("gst")) count += 24; // 12 GSTR-1 + 12 GSTR-3B
    if (selectedServices.includes("itr")) count += 1;
    if (selectedServices.includes("mca")) count += 3; // AOC-4, MGT-7, DIR-3 KYC
    if (selectedServices.includes("tds")) count += 4; // Quarterly 26Q
    if (selectedServices.includes("books")) count += 12; // Monthly reconciliations
    return Math.max(1, count);
  };

  const handleLaunchConsultation = () => {
    openConsultation(
      `${activeEntityData.title} Compliance Package (${turnoverBracket})`
    );
  };

  return (
    <section id="estimator" className="py-20 lg:py-28 bg-[#070E1E] text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-dark-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Statutory Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading">
            Indian Business Compliance &amp; Tax Estimator
          </h2>
          <p className="text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Configure your legal entity structure and transaction scale to instantly preview mandatory filings, regulatory oversight bodies, and customized advisory scopes.
          </p>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls: Left Column (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Select Entity Type */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                  Step 1 • Select Legal Entity Type
                </span>
                <span className="text-xs text-slate-400 font-mono">5 Formats Available</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {entityOptions.map((entity) => {
                  const Icon = entity.icon;
                  const isSelected = selectedEntity === entity.id;
                  return (
                    <button
                      key={entity.id}
                      type="button"
                      onClick={() => setSelectedEntity(entity.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3 relative ${
                        isSelected
                          ? "bg-blue-950/60 border-cyan-400/80 shadow-lg shadow-cyan-900/20"
                          : "bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-cyan-500 text-slate-950"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4
                            className={`text-xs font-bold truncate ${
                              isSelected ? "text-cyan-300" : "text-white"
                            }`}
                          >
                            {entity.title}
                          </h4>
                          {isSelected && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug mt-0.5 line-clamp-1">
                          {entity.tagline}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Turnover / Scale */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                  Step 2 • Estimated Annual Turnover
                </span>
                <span className="text-xs text-slate-400 font-mono">Statutory Thresholds</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { label: "Below ₹20L", sub: "GST Exemption Limit", value: "<20L" },
                  { label: "₹20L – ₹50L", sub: "Standard GST Track", value: "20L-50L" },
                  { label: "₹50L – ₹1.5Cr", sub: "Presumptive / Regular", value: "20L-1Cr" },
                  { label: "Above ₹1.5Cr", sub: "Mandatory Audit Track", value: ">1.5Cr" },
                ].map((tier) => (
                  <button
                    key={tier.value}
                    type="button"
                    onClick={() => setTurnoverBracket(tier.value)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      turnoverBracket === tier.value
                        ? "bg-gradient-to-b from-blue-900/80 to-[#163E8C]/80 border-cyan-400 text-white shadow-md shadow-blue-900/40"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    <span className="block text-xs font-bold">{tier.label}</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5 font-mono">{tier.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Customize Regulatory Scopes */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                  Step 3 • Select Required Advisory Scopes
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedServices.length} Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableAddons.map((addon) => {
                  const isChecked = selectedServices.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleService(addon.id)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? "bg-blue-950/40 border-cyan-500/60 text-slate-100"
                          : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase block">
                          {addon.category}
                        </span>
                        <span className="text-xs font-semibold block truncate">
                          {addon.name}
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                          isChecked
                            ? "bg-cyan-500 border-cyan-400 text-slate-950"
                            : "border-slate-700 bg-slate-900"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Card: Right Column (lg:col-span-5) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#0B2458] via-[#0C1E45] to-[#070E1E] border border-blue-500/30 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-2xl">
              <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
                    Live Statutory Diagnosis
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1.5">
                    {activeEntityData.title} Package
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-blue-200">Scale Tier</span>
                  <p className="text-xs font-bold text-emerald-400 font-mono">{turnoverBracket}</p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-blue-200 uppercase font-mono flex items-center gap-1">
                    <FileText className="w-3 h-3 text-cyan-300" />
                    Annual Filings
                  </span>
                  <p className="text-2xl font-extrabold text-white font-heading">
                    ~{getEstimatedFilingsCount()}
                    <span className="text-xs font-normal text-blue-200 ml-1">returns/yr</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-blue-200 uppercase font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    Setup Timeline
                  </span>
                  <p className="text-2xl font-extrabold text-white font-heading">
                    5–10
                    <span className="text-xs font-normal text-blue-200 ml-1">work days</span>
                  </p>
                </div>
              </div>

              {/* Included Services Checklist */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-blue-200 font-bold">
                  Recommended Core Scope Checklist
                </h4>
                <div className="space-y-2">
                  {activeEntityData.recommendedServices.map((svc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{svc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Regulators */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300 font-mono">
                <span className="text-blue-200">Jurisdiction Regulators:</span>
                <span className="text-cyan-300 font-bold">CBDT • CBIC • MCA • EPFO</span>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleLaunchConsultation}
                className="w-full btn-hover-shine py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-[#163E8C] to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-900/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Pre-fill &amp; Request This Advisory Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400 leading-snug">
                Transparent statutory review • Zero initial obligation • WhatsApp / Callback follow-up
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
