"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  ArrowRight,
  ArrowUp,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { LegalDocType } from "@/components/LegalModal";
import { useSPA } from "@/context/SPAContext";

interface FooterProps {
  onOpenLegal?: (type: LegalDocType) => void;
  onOpenConsultation?: () => void;
}

export default function Footer({ onOpenLegal, onOpenConsultation }: FooterProps) {
  const spa = useSPA();
  const handleOpenLegal = onOpenLegal || spa.openLegal;
  const handleOpenConsult = onOpenConsultation || spa.openConsultation;

  const [currentYear, setCurrentYear] = React.useState<number>(2026);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About FINCORE", href: "/about" },
    { name: "Practice Directory", href: "/services" },
    { name: "Engagement Process", href: "/about#process" },
    { name: "Consultation Desk", href: "/contact" },
  ];

  const practiceAreas = [
    { name: "Income Tax (ITR) Advisory", href: "/services/tax-filing" },
    { name: "GST Filing & Periodic Returns", href: "/services/gst-registration-filing" },
    { name: "Accounting & Bookkeeping", href: "/services/accounting-bookkeeping" },
    { name: "Company Registration (Pvt Ltd & LLP)", href: "/services/business-registration" },
    { name: "Municipal Trade License", href: "/services/trade-license" },
    { name: "Payroll & Statutory Compliance", href: "/services/provident-fund" },
  ];

  return (
    <footer className="relative bg-[#13377E] text-blue-100 pt-16 sm:pt-20 pb-12 overflow-hidden border-t border-white/20">
      {/* Top Hairline Glowing Gradient Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-sky-400/[0.12] rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-blue-400/[0.10] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        {/* Main 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/15">
          {/* Column 1: Brand & Profile (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-3.5 group focus:outline-none"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-white/30 via-white/15 to-transparent p-[1.5px] shadow-lg shadow-black/20 group-hover:shadow-black/30 transition-all duration-300 shrink-0">
                <div className="w-full h-full rounded-[14px] bg-[#0E2960] flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white font-heading">
                  FINCORE
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-200">
                  Consultancy Services
                </span>
              </div>
            </Link>

            <p className="text-sm text-blue-100/90 leading-relaxed max-w-sm">
              Professional statutory facilitation and financial administration. Assisting businesses, entrepreneurs, and individuals navigate tax compliance, registrations, and corporate governance across India.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white font-medium w-fit">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-200 shrink-0" />
                <span>Pan-India Statutory Support</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs text-emerald-200 font-medium w-fit">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>Verified Compliance Advisory</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-blue-100/80 hover:text-white transition-all duration-200 inline-flex items-center gap-2 group py-0.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-300/40 group-hover:w-2 group-hover:bg-white transition-all duration-200" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Practice Areas (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
              Practice Areas
            </h3>
            <ul className="space-y-2.5 text-sm">
              {practiceAreas.map((area) => (
                <li key={area.name}>
                  <Link
                    href={area.href}
                    className="text-blue-100/80 hover:text-white transition-all duration-200 inline-flex items-center gap-2 group py-0.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-300/40 group-hover:w-2 group-hover:bg-white transition-all duration-200" />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                      {area.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Executive Desk (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Executive Desk
            </h3>
            <ul className="space-y-3.5 text-sm text-blue-100">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-200" />
                </div>
                <span className="text-xs leading-relaxed text-blue-100/85">
                  {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state}
                </span>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-emerald-300" />
                </div>
                <a
                  href={`tel:${siteConfig.phone.value}`}
                  className="text-xs text-white hover:text-emerald-200 transition-colors font-medium tracking-wide"
                >
                  {siteConfig.phone.display}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-sky-400/20 border border-sky-400/30 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-sky-200" />
                </div>
                <a
                  href={`mailto:${siteConfig.email.display}`}
                  className="text-xs text-white hover:text-sky-200 transition-colors font-medium"
                >
                  {siteConfig.email.display}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-amber-200" />
                </div>
                <div className="text-xs text-blue-100/85 leading-tight space-y-1">
                  <p>{siteConfig.businessHours.weekdays}</p>
                  <p className="text-blue-200/70">{siteConfig.businessHours.saturday}</p>
                </div>
              </li>
            </ul>

            {/* High-Contrast Interactive Consultation CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleOpenConsult()}
                className="footer-consult-btn w-full relative overflow-hidden group inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#080B14] font-bold text-xs sm:text-[13px] tracking-tight shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer active:scale-[0.98] border border-white"
                style={{ color: "#080B14", backgroundColor: "#FFFFFF" }}
              >
                <span
                  className="font-bold whitespace-nowrap"
                  style={{ color: "#080B14" }}
                >
                  Request Advisory Consultation
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#080B14] group-hover:translate-x-1 transition-transform shrink-0" style={{ color: "#080B14" }} />
              </button>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer Notice Card with Glassmorphic Finish */}
        <div className="p-5 sm:p-6 rounded-2xl bg-black/25 border border-white/15 backdrop-blur-md text-xs text-blue-100/85 leading-relaxed flex flex-col sm:flex-row items-start gap-4 shadow-inner">
          <div className="p-2.5 rounded-xl bg-amber-400/20 border border-amber-400/30 text-amber-300 shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span>Statutory Compliance &amp; Practice Scope Notice</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/15 text-blue-100 font-mono font-normal">
                Advisory Disclosure
              </span>
            </h4>
            <p className="text-[11.5px] text-blue-100/80 leading-relaxed">
              {siteConfig.disclaimer}
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal Links & Back To Top */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-blue-100/75 gap-4 pt-2">
          <p className="text-blue-100/80 text-center md:text-left">
            &copy; {currentYear} {siteConfig.legalName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/privacy-policy"
              className="text-blue-100/80 hover:text-white transition-colors cursor-pointer py-1"
            >
              Privacy Policy
            </Link>
            <span className="text-white/30 hidden sm:inline">&bull;</span>
            <Link
              href="/terms"
              className="text-blue-100/80 hover:text-white transition-colors cursor-pointer py-1"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-white/30 hidden sm:inline">&bull;</span>
            <Link
              href="/disclaimer"
              className="text-blue-100/80 hover:text-white transition-colors cursor-pointer py-1"
            >
              Statutory Disclaimer
            </Link>
            <span className="text-white/30 hidden sm:inline">&bull;</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-blue-100/80 hover:text-white transition-colors cursor-pointer group py-1"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 group-hover:bg-white group-hover:text-[#13377E] flex items-center justify-center transition-all duration-200">
                <ArrowUp className="w-3 h-3 text-blue-100 group-hover:text-[#13377E] group-hover:-translate-y-0.5 transition-all" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
