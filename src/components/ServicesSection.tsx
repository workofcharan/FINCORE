"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Layers,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { allServices, ServiceItem } from "@/data/servicesData";
import { NotchedProjectCard } from "@/components/ui/notched-project-card";
import ServiceDetailModal from "@/components/ServiceDetailModal";
import { useSPA } from "@/context/SPAContext";
import { useInView } from "@/hooks/useInView";

interface ServicesSectionProps {
  onOpenConsultationWithService?: (serviceName: string) => void;
}

// Curated Unsplash images, custom badges and tag highlights for each service
const SERVICE_VISUALS: Record<
  string,
  {
    image: string;
    badge: string;
    tags: string[];
    accent?: string;
    imageClassName?: string;
  }
> = {
  "tax-filing": {
    image: "/images/tax-filing.png",
    badge: "ITR 1-7 Assessment",
    tags: ["ITR-1 to 7", "AIS Reconciliation", "Audit Ready"],
    accent: "#163E8C",
    imageClassName: "object-contain p-2 sm:p-3 bg-gradient-to-b from-blue-50/80 via-white to-slate-50",
  },
  "accounting-bookkeeping": {
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    badge: "Financial MIS",
    tags: ["Balance Sheet", "P&L Statements", "Ledger Audit"],
    accent: "#163E8C",
  },
  "gst-registration-filing": {
    image: "/images/gst.png",
    badge: "GSTN Compliance",
    tags: ["GSTR-1 & 3B", "Input Tax Credit", "E-Way Bills"],
    accent: "#163E8C",
    imageClassName: "object-contain p-2 sm:p-3 bg-gradient-to-b from-blue-50/80 via-white to-slate-50",
  },
  "tds": {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    badge: "Withholding Tax",
    tags: ["Form 24Q & 26Q", "Form 16/16A", "TRACES Portal"],
    accent: "#163E8C",
  },
  "tcs": {
    image: "/images/tcs.png",
    badge: "Tax Collection",
    tags: ["Form 27EQ", "Sec 206C", "Challan 281"],
    accent: "#163E8C",
    imageClassName: "object-contain p-2 sm:p-3 bg-gradient-to-b from-amber-50/70 via-white to-slate-50",
  },
  "provident-fund": {
    image: "/images/provident-fund.png",
    badge: "Social Security",
    tags: ["Monthly ECR", "UAN KYC", "EPFO Filings"],
    accent: "#163E8C",
    imageClassName: "object-cover",
  },
  "esi": {
    image: "/images/esi.png",
    badge: "Employee Health",
    tags: ["Medical Scheme", "ESIC Portal", "Statutory Register"],
    accent: "#163E8C",
    imageClassName: "object-cover",
  },
  "professional-tax": {
    image: "/images/professional-tax.png",
    badge: "State Statutory",
    tags: ["PTRC & PTEC", "State Slabs", "Form 5 Returns"],
    accent: "#163E8C",
    imageClassName: "object-contain p-2 sm:p-3 bg-gradient-to-b from-amber-50/70 via-white to-slate-50",
  },
  "company-incorporation": {
    image: "/images/company-incorporation.png",
    badge: "MCA Incorporation",
    tags: ["SPICe+ Part B", "DIN & DSC", "MOA & AOA"],
    accent: "#163E8C",
    imageClassName: "object-cover",
  },
  "partnership-registration": {
    image: "/images/partnership.png",
    badge: "ROC Registered",
    tags: ["LLP Agreement", "Form 11 & 8", "Partnership Deed"],
    accent: "#163E8C",
    imageClassName: "object-cover",
  },
  "business-registration": {
    image: "/images/business-registration.png",
    badge: "Startup Launch",
    tags: ["Udyam MSME", "Fast-track Setup", "Current A/c Help"],
    accent: "#163E8C",
    imageClassName: "object-contain p-2 sm:p-3 bg-gradient-to-b from-blue-50/80 via-white to-slate-50",
  },
  "trade-license": {
    image: "/images/trade-license.png",
    badge: "Municipal Permit",
    tags: ["Municipal Body", "Premises Verification", "Annual Renewal"],
    accent: "#163E8C",
    imageClassName: "object-cover",
  },
  "labour-license": {
    image: "/images/labour-license.png",
    badge: "Labour Dept",
    tags: ["Form A to D", "Shop & Est. Act", "Compliance Record"],
    accent: "#163E8C",
    imageClassName: "object-cover",
  },
  "food-license": {
    image: "/images/food-license.png",
    badge: "FSSAI Statutory",
    tags: ["Basic/State/Central", "FoSCoS Portal", "Hygiene Standard"],
    accent: "#163E8C",
    imageClassName: "object-contain p-2 sm:p-3 bg-gradient-to-b from-orange-50/70 via-white to-slate-50",
  },
  "regulatory-compliance": {
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    badge: "Corporate Audit",
    tags: ["Statutory Audit", "Secretarial Review", "Director KYC"],
    accent: "#163E8C",
  },
};

export default function ServicesSection({
  onOpenConsultationWithService,
}: ServicesSectionProps) {
  const spa = useSPA();
  const handleConsult =
    onOpenConsultationWithService || ((svc: string) => spa.openConsultation(svc));

  const { ref, isInView } = useInView({ threshold: 0.08 });

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const categories = [
    { label: "All Services", value: "All", count: 15 },
    { label: "Taxation & Financial Compliance", value: "Taxation & Financial Compliance", count: 8 },
    { label: "Business Registration", value: "Business Registration", count: 3 },
    { label: "Licenses & Regulatory Compliance", value: "Licenses & Regulatory Compliance", count: 4 },
  ];

  const filteredServices = useMemo(() => {
    return allServices.filter((service) => {
      const matchesCategory =
        selectedCategory === "All" || service.category === selectedCategory;
      const matchesQuery =
        !searchQuery.trim() ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section ref={ref} id="services" className="py-20 lg:py-28 bg-[#F5F7FA] relative scroll-mt-20 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none animate-subtle-pulse" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none animate-subtle-float" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto space-y-4 transition-all duration-700 ${
            isInView ? "animate-section-reveal" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF1FF] text-[#163E8C] text-xs font-bold uppercase tracking-wider border border-blue-200/60 shadow-xs">
            <Layers className="size-3.5" />
            <span>Statutory Practice Directory</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-4.5xl font-extrabold tracking-tight text-[#080B12] font-heading">
            Our Services
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Practical support for your financial, taxation, registration, and business compliance needs across India.
          </p>
        </div>

        {/* Filter Controls: Category Tabs & Search Bar */}
        <div
          className={`flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-3 sm:p-4 rounded-3xl border border-slate-200/90 shadow-xs transition-all duration-700 delay-150 ${
            isInView ? "animate-section-reveal" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1426] hover:scale-[1.03] active:scale-[0.98] ${
                    isSelected
                      ? "bg-[#0B1426] text-white shadow-md scale-[1.02]"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-black"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold transition-all ${
                      isSelected ? "bg-white/20 text-white" : "bg-white text-slate-600 border border-slate-200"
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
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#163E8C]/30 focus:border-[#163E8C] transition-all shadow-2xs"
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

        {/* Services Grid with NotchedProjectCards */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredServices.map((service, idx) => {
              const visual = SERVICE_VISUALS[service.id] || {
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
                badge: service.category,
                tags: [service.category],
                accent: "#163E8C",
              };

              return (
                <div
                  key={service.id}
                  style={{ animationDelay: `${(idx % 6) * 0.08}s` }}
                  className={isInView ? "animate-card-reveal" : "opacity-0"}
                >
                  <NotchedProjectCard
                    href={`/services/${service.slug}`}
                    title={service.name}
                    description={service.description}
                    image={visual.image}
                    imageAlt={service.name}
                    imageClassName={visual.imageClassName}
                    badge={visual.badge}
                    tags={visual.tags}
                    monochrome={false}
                    surface="#F5F7FA"
                    accent={visual.accent || "#163E8C"}
                    accentForeground="#FFFFFF"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveModalService(service);
                    }}
                    className="bg-transparent"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
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
          <button
            type="button"
            onClick={() => handleConsult("General Advisory")}
            className="text-xs font-semibold text-[#163E8C] hover:text-[#0B2458] shrink-0 hover:underline cursor-pointer"
          >
            Check Applicability for Your Case &rarr;
          </button>
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={activeModalService}
        isOpen={!!activeModalService}
        onClose={() => setActiveModalService(null)}
        onRequestConsultation={(svc) => {
          setActiveModalService(null);
          handleConsult(svc.name);
        }}
      />
    </section>
  );
}
