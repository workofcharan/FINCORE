"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  X,
  CheckCircle2,
  FileText,
  Clock,
  ShieldAlert,
  ArrowRight,
  ReceiptText,
  Building2,
  ShieldCheck,
  FileCheck,
} from "lucide-react";
import { ServiceItem } from "@/data/servicesData";
import { cn } from "@/lib/utils";

// Comprehensive visual and theme styling for every service modal
const SERVICE_MODAL_VISUALS: Record<
  string,
  {
    image: string;
    alt: string;
    bgTone: string;
  }
> = {
  "tax-filing": {
    image: "/images/cards/card-tax-filing.webp",
    alt: "Tax Filing (ITR 1-7)",
    bgTone: "from-blue-50/80 via-white to-blue-50/80 border-blue-200/80",
  },
  "gst-registration-filing": {
    image: "/images/cards/card-gst-registration-filing.webp",
    alt: "GST Registration & Filing",
    bgTone: "from-blue-50/80 via-white to-slate-50 border-blue-200/80",
  },
  "gst": {
    image: "/images/cards/card-gst-registration-filing.webp",
    alt: "GST Registration & Filing",
    bgTone: "from-blue-50/80 via-white to-slate-50 border-blue-200/80",
  },
  "provident-fund": {
    image: "/images/cards/card-provident-fund.webp",
    alt: "Provident Fund (PF) Compliance",
    bgTone: "from-indigo-50/70 via-white to-purple-50/70 border-indigo-200/70",
  },
  "pf": {
    image: "/images/cards/card-provident-fund.webp",
    alt: "Provident Fund (PF) Compliance",
    bgTone: "from-indigo-50/70 via-white to-purple-50/70 border-indigo-200/70",
  },
  "esi": {
    image: "/images/cards/card-esi.webp",
    alt: "ESI (Employee State Insurance)",
    bgTone: "from-purple-50/70 via-white to-indigo-50/70 border-purple-200/70",
  },
  "tds": {
    image: "/images/cards/card-tds.webp",
    alt: "TDS (Tax Deducted at Source)",
    bgTone: "from-slate-50 via-white to-slate-50 border-slate-200/80",
  },
  "tcs": {
    image: "/images/cards/card-tcs.webp",
    alt: "TCS (Tax Collected at Source)",
    bgTone: "from-amber-50/70 via-white to-yellow-50/70 border-amber-200/70",
  },
  "professional-tax": {
    image: "/images/cards/card-professional-tax.webp",
    alt: "Professional Tax (PT) Compliance",
    bgTone: "from-amber-50/70 via-white to-orange-50/70 border-amber-200/70",
  },
  "accounting-bookkeeping": {
    image: "/images/cards/card-accounting-bookkeeping.webp",
    alt: "Accounting & Bookkeeping",
    bgTone: "from-teal-50/70 via-white to-emerald-50/70 border-teal-200/70",
  },
  "company-incorporation": {
    image: "/images/cards/card-company-incorporation.webp",
    alt: "Company Incorporation & Setup",
    bgTone: "from-sky-50/70 via-white to-blue-50/70 border-sky-200/70",
  },
  "partnership-registration": {
    image: "/images/cards/card-partnership-registration.webp",
    alt: "Partnership Firm Registration",
    bgTone: "from-blue-50/70 via-white to-sky-50/70 border-blue-200/70",
  },
  "business-registration": {
    image: "/images/cards/card-business-registration.webp",
    alt: "Business Registration & MSME Udyam",
    bgTone: "from-blue-50/70 via-white to-sky-50/70 border-blue-200/70",
  },
  "trade-license": {
    image: "/images/cards/card-trade-license.webp",
    alt: "Municipal Trade License",
    bgTone: "from-amber-50/70 via-white to-amber-50/70 border-amber-200/70",
  },
  "labour-license": {
    image: "/images/cards/card-labour-license.webp",
    alt: "Labour License & Compliance",
    bgTone: "from-amber-50/70 via-white to-orange-50/70 border-amber-200/70",
  },
  "food-license": {
    image: "/images/cards/card-food-license.webp",
    alt: "Food License (FSSAI)",
    bgTone: "from-orange-50/70 via-white to-emerald-50/70 border-orange-200/70",
  },
  "other-licenses": {
    image: "/images/cards/card-other-licenses.webp",
    alt: "Specialized Business Permits & Clearances",
    bgTone: "from-slate-50 via-white to-blue-50 border-slate-200/80",
  },
};

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestConsultation: (service: ServiceItem) => void;
}

export default function ServiceDetailModal({
  service,
  isOpen,
  onClose,
  onRequestConsultation,
}: ServiceDetailModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const scrollY = window.scrollY;
    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  const visual =
    SERVICE_MODAL_VISUALS[service.id] ||
    SERVICE_MODAL_VISUALS[service.slug] ||
    SERVICE_MODAL_VISUALS["other-licenses"];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#080B12]/80 backdrop-blur-md animate-fade-in overscroll-none select-none"
      onClick={onClose}
      onWheel={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-blue-100 overflow-hidden animate-modal-pop overscroll-contain select-text"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="shrink-0 bg-gradient-to-r from-[#0B2458] via-[#0F3277] to-[#163E8C] text-white p-5 sm:p-7 relative overflow-hidden border-b border-blue-900/40">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-radial from-sky-400/20 via-blue-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-lg bg-white/15 hover:bg-white/30 active:scale-95 text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer z-50 pointer-events-auto"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Content Grid */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pr-10 sm:pr-14 relative z-10">
            {/* Title & Description Column */}
            <div className="space-y-2.5 min-w-0 flex-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/15 text-blue-100 text-xs font-semibold tracking-wide border border-white/20 backdrop-blur-xs">
                <span>{service.category}</span>
              </div>
              <h2 id="modal-title" className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {service.name}
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-normal max-w-xl">
                {service.description}
              </p>
            </div>

            {/* Right Side: Cleanly Framed Service Badge / Graphic */}
            {visual && (
              <div className="hidden sm:flex shrink-0 w-36 h-24 lg:w-44 lg:h-28 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-inner items-center justify-center overflow-hidden">
                <img
                  src={visual.image}
                  alt={visual.alt}
                  className="w-full h-full object-contain rounded-lg drop-shadow-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 text-sm text-[#080B12]">
          {/* Section 1: Overview */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#163E8C] flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              Service Overview &amp; Meaning
            </h3>

            {visual && (
              <div
                className={cn(
                  "flex items-center justify-center p-3 sm:p-4 rounded-xl bg-gradient-to-r border shadow-2xs overflow-hidden",
                  visual.bgTone
                )}
              >
                <img
                  src={visual.image}
                  alt={visual.alt}
                  className="h-32 sm:h-40 max-w-full object-contain rounded-lg drop-shadow-xs"
                />
              </div>
            )}

            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              {service.whatItMeans}
            </p>
          </div>

          {/* Section 2: Who It Is For */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#163E8C] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Suitability &amp; Applicability (Where Applicable)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.suitability.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-lg bg-[#F5F8FF] border border-blue-100 text-xs text-slate-800"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#163E8C] shrink-0 mt-1.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Key Documents Needed */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#163E8C] flex items-center gap-1.5">
              <FileCheck className="w-4 h-4" />
              Key Prerequisite Documents
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-200">
              {service.keyDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-[#163E8C] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Workflow Steps */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#163E8C] flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Standard Process Workflow
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.processSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-1"
                >
                  <div className="text-xs font-bold text-[#0B2458] flex items-center gap-1.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 text-[#163E8C]">
                      Step {step.step}
                    </span>
                    <span>{step.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Regulatory Scope Notice */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              <strong>Statutory Scope Notice:</strong> {service.regulatoryNotice}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 sm:px-7 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Have questions about applicability or documents for your business?
          </p>
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
            <Link
              href={`/services/${service.slug}`}
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#163E8C] transition-colors text-center"
            >
              Full Page Guide &rarr;
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestConsultation(service);
              }}
              className="btn-hover-shine inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#163E8C] hover:bg-[#0B2458] text-white text-xs font-semibold shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163E8C]"
            >
              <span>Consult Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
