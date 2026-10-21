"use client";

import React from "react";
import {
  ReceiptText,
  FileSpreadsheet,
  ShieldCheck,
  HeartPulse,
  Calculator,
  Layers,
  Briefcase,
  BookOpenCheck,
  Building2,
  Users2,
  FileCheck,
  Landmark,
  HardHat,
  Utensils,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { ServiceItem } from "@/data/servicesData";

interface ServiceCardProps {
  service: ServiceItem;
  onLearnMore: (service: ServiceItem) => void;
  onRequestConsultation: (service: ServiceItem) => void;
}

const iconMap: Record<string, React.ElementType> = {
  ReceiptText,
  FileSpreadsheet,
  ShieldCheck,
  HeartPulse,
  Calculator,
  Layers,
  Briefcase,
  BookOpenCheck,
  Building2,
  Users2,
  FileCheck,
  Landmark,
  HardHat,
  Utensils,
  ShieldAlert,
};

export default function ServiceCard({
  service,
  onLearnMore,
  onRequestConsultation,
}: ServiceCardProps) {
  const Icon = iconMap[service.iconName] || HelpCircle;
  const isTaxFiling = service.id === "tax-filing" || service.slug === "tax-filing";
  const isTds = service.id === "tds" || service.slug === "tds";
  const isGst =
    service.id === "gst-registration-filing" ||
    service.slug === "gst-registration-filing" ||
    service.id === "gst";
  const isEsi = service.id === "esi" || service.slug === "esi";
  const isTcs = service.id === "tcs" || service.slug === "tcs";
  const isPartnership =
    service.id === "partnership-registration" ||
    service.slug === "partnership-registration";
  const isTradeLicense =
    service.id === "trade-license" || service.slug === "trade-license";
  const isLabourLicense =
    service.id === "labour-license" || service.slug === "labour-license";
  const isProfessionalTax =
    service.id === "professional-tax" || service.slug === "professional-tax";
  const isProvidentFund =
    service.id === "provident-fund" || service.slug === "provident-fund";
  const isAccounting =
    service.id === "accounting-bookkeeping" ||
    service.slug === "accounting-bookkeeping";
  const isCompanyIncorporation =
    service.id === "company-incorporation" ||
    service.slug === "company-incorporation";
  const isFoodLicense =
    service.id === "food-license" || service.slug === "food-license";
  const isBusinessRegistration =
    service.id === "business-registration" ||
    service.slug === "business-registration";

  return (
    <div
      className={`rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-slate-400 card-interactive flex flex-col justify-between group relative overflow-hidden transition-all duration-300 ${
        isTaxFiling
          ? "bg-gradient-to-br from-white via-white to-blue-50/70"
          : isTds
          ? "bg-gradient-to-br from-white via-white to-slate-50/80"
          : isGst
          ? "bg-gradient-to-br from-white via-white to-amber-50/50"
          : isEsi
          ? "bg-gradient-to-br from-white via-white to-purple-50/60"
          : isTcs
          ? "bg-gradient-to-br from-white via-white to-amber-50/60"
          : isPartnership
          ? "bg-gradient-to-br from-white via-white to-sky-50/60"
          : isTradeLicense
          ? "bg-gradient-to-br from-white via-white to-amber-50/60"
          : isLabourLicense
          ? "bg-gradient-to-br from-white via-white to-orange-50/60"
          : isProfessionalTax
          ? "bg-gradient-to-br from-white via-white to-orange-50/50"
          : isProvidentFund
          ? "bg-gradient-to-br from-white via-white to-indigo-50/60"
          : isAccounting
          ? "bg-gradient-to-br from-white via-white to-teal-50/60"
          : isCompanyIncorporation
          ? "bg-gradient-to-br from-white via-white to-sky-50/60"
          : isFoodLicense
          ? "bg-gradient-to-br from-white via-white to-orange-50/50"
          : isBusinessRegistration
          ? "bg-gradient-to-br from-white via-white to-blue-50/60"
          : "bg-white"
      }`}
    >
      {/* Top accent indicator line with scale reveal on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0B1426] to-[#163E8C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* Tax Filing Custom Background Illustration */}
      {isTaxFiling && (
        <>
          <div
            className="absolute -right-3 -bottom-3 w-52 h-52 sm:w-60 sm:h-60 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-35 group-hover:opacity-50"
            style={{ backgroundImage: `url('/images/tax-filing.png')` }}
          />
          <div className="absolute right-0 bottom-0 w-44 h-44 bg-radial from-blue-400/20 via-sky-300/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      {/* TDS (Tax Deducted at Source) Custom Background Graphic */}
      {isTds && (
        <>
          <div
            className="absolute -right-2 -bottom-2 w-64 h-36 sm:w-72 sm:h-40 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-45 group-hover:opacity-65"
            style={{ backgroundImage: `url('/images/tds.png')` }}
          />
          <div className="absolute right-0 bottom-0 w-48 h-36 bg-radial from-slate-400/25 via-blue-200/15 to-transparent rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      {/* GST Registration and Filing Custom Background Graphic */}
      {isGst && (
        <>
          <div
            className="absolute -right-2 -bottom-2 w-64 h-40 sm:w-72 sm:h-44 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-40 group-hover:opacity-65"
            style={{ backgroundImage: `url('/images/gst.png')` }}
          />
          <div className="absolute right-0 bottom-0 w-48 h-40 bg-radial from-amber-400/20 via-orange-300/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      {/* ESI (Employee State Insurance) Custom Background Graphic */}
      {isEsi && (
        <>
          <div
            className="absolute -right-2 -bottom-2 w-64 h-36 sm:w-72 sm:h-40 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-40 group-hover:opacity-65 rounded-lg"
            style={{ backgroundImage: `url('/images/esi.png')` }}
          />
          <div className="absolute right-0 bottom-0 w-48 h-36 bg-radial from-purple-500/20 via-indigo-300/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      {/* TCS (Tax Collected at Source) Custom Background Graphic */}
      {isTcs && (
        <>
          <div
            className="absolute -right-2 -bottom-2 w-64 h-36 sm:w-72 sm:h-40 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-45 group-hover:opacity-75 rounded-lg"
            style={{ backgroundImage: `url('/images/tcs.png')` }}
          />
          <div className="absolute right-0 bottom-0 w-48 h-36 bg-radial from-amber-500/25 via-orange-200/15 to-transparent rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      {/* Partnership Firm Registration Custom Background Graphic */}
      {isPartnership && (
        <>
          <div
            className="absolute -right-2 -bottom-2 w-64 h-36 sm:w-72 sm:h-40 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-40 group-hover:opacity-65 rounded-lg"
            style={{ backgroundImage: `url('/images/partnership.png')` }}
          />
          <div className="absolute right-0 bottom-0 w-48 h-36 bg-radial from-blue-600/25 via-sky-300/15 to-transparent rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      {/* Trade License Custom Background Graphic */}
      {isTradeLicense && (
        <>
          <div
            className="absolute -right-2 -bottom-2 w-64 h-36 sm:w-72 sm:h-40 bg-cover bg-no-repeat bg-center pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-40 group-hover:opacity-65 rounded-lg"
            style={{ backgroundImage: `url('/images/trade-license.png')` }}
          />
          <div className="absolute right-0 bottom-0 w-48 h-36 bg-radial from-amber-600/25 via-yellow-200/15 to-transparent rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      {/* Labour License and Compliance Custom Background Graphic */}
      {isLabourLicense && (
        <>
          <div
            className="absolute -right-2 -bottom-2 w-56 h-44 sm:w-64 sm:h-48 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-40 group-hover:opacity-65 rounded-lg"
            style={{ backgroundImage: `url('/images/labour-license.png')` }}
          />
          <div className="absolute right-0 bottom-0 w-48 h-40 bg-radial from-amber-500/25 via-orange-200/15 to-transparent rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      {/* Professional Tax (PT) Custom Background Graphic */}
      {isProfessionalTax && (
        <>
          <div
            className="absolute -right-2 -bottom-2 w-64 h-36 sm:w-72 sm:h-40 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-40 group-hover:opacity-65 rounded-lg"
            style={{ backgroundImage: `url('/images/professional-tax.png')` }}
          />
          <div className="absolute right-0 bottom-0 w-48 h-36 bg-radial from-amber-500/25 via-orange-200/15 to-transparent rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      {/* Provident Fund (PF) Custom Background Graphic */}
      {isProvidentFund && (
        <>
          <div
            className="absolute -right-2 -bottom-2 w-64 h-36 sm:w-72 sm:h-40 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-40 group-hover:opacity-65 rounded-lg"
            style={{ backgroundImage: `url('/images/provident-fund.png')` }}
          />
          <div className="absolute right-0 bottom-0 w-48 h-36 bg-radial from-indigo-500/25 via-blue-200/15 to-transparent rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      {/* Accounting and Bookkeeping Custom Background Graphic */}
      {isAccounting && (
        <>
          <div
            className="absolute -right-2 -bottom-2 w-64 h-36 sm:w-72 sm:h-40 bg-cover bg-no-repeat bg-center pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-40 group-hover:opacity-65 rounded-lg"
            style={{ backgroundImage: `url('/images/accounting-bookkeeping.png')` }}
          />
          <div className="absolute right-0 bottom-0 w-48 h-36 bg-radial from-teal-600/25 via-emerald-200/15 to-transparent rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      {/* Company Incorporation Custom Background Graphic */}
      {isCompanyIncorporation && (
        <>
          <div
            className="absolute -right-2 -bottom-2 w-64 h-36 sm:w-72 sm:h-40 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-40 group-hover:opacity-65 rounded-lg"
            style={{ backgroundImage: `url('/images/company-incorporation.png')` }}
          />
          <div className="absolute right-0 bottom-0 w-48 h-36 bg-radial from-blue-500/25 via-sky-200/15 to-transparent rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      {/* Food License (FSSAI) Custom Background Graphic */}
      {isFoodLicense && (
        <>
          <div
            className="absolute -right-2 -bottom-2 w-64 h-36 sm:w-72 sm:h-40 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-40 group-hover:opacity-65 rounded-lg"
            style={{ backgroundImage: `url('/images/food-license.png')` }}
          />
          <div className="absolute right-0 bottom-0 w-48 h-36 bg-radial from-orange-500/25 via-emerald-200/15 to-transparent rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      {/* Business Registration Custom Background Graphic */}
      {isBusinessRegistration && (
        <>
          <div
            className="absolute -right-2 -bottom-2 w-64 h-36 sm:w-72 sm:h-40 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-40 group-hover:opacity-65 rounded-lg"
            style={{ backgroundImage: `url('/images/business-registration.png')` }}
          />
          <div className="absolute right-0 bottom-0 w-48 h-36 bg-radial from-blue-600/25 via-sky-200/15 to-transparent rounded-full blur-2xl pointer-events-none" />
        </>
      )}

      <div className="space-y-4 relative z-10">
        {/* Card Header: Icon with hover scale & Category Tag */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#0B1426] flex items-center justify-center group-hover:bg-[#0B1426] group-hover:text-white group-hover:scale-105 group-hover:-rotate-3 transition-all duration-300 shadow-2xs">
            <Icon className="w-6 h-6 transition-transform duration-300" />
          </div>
          <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 group-hover:border-slate-300 group-hover:text-black transition-colors font-mono">
            {service.category === "Taxation & Financial Compliance"
              ? "Tax & Finance"
              : service.category === "Business Registration"
              ? "Registration"
              : "Licensing"}
          </span>
        </div>

        {/* Service Name */}
        <h3 className="text-lg font-bold text-[#080B12] group-hover:text-[#163E8C] transition-colors line-clamp-1 font-heading">
          {service.name}
        </h3>

        {/* Concise Description */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
          {service.description}
        </p>

        {/* Applicability Tag */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
          <span>Applicable based on eligibility &amp; volume</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between gap-3 relative z-10">
        <button
          type="button"
          onClick={() => onLearnMore(service)}
          className="text-xs font-semibold text-slate-700 hover:text-black flex items-center gap-1.5 cursor-pointer py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-full group/btn"
        >
          <span>Learn More</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => onRequestConsultation(service)}
          className="btn-hover-shine text-xs font-semibold px-4 py-2 rounded-full bg-[#0B1426] text-white hover:bg-[#163E8C] transition-all shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1426]"
        >
          Request Consultation
        </button>
      </div>
    </div>
  );
}
