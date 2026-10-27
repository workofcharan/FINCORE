"use client";

import * as React from "react";
import HalftoneWordmarkFooter, {
  type FooterColumn,
} from "@/components/ui/halftone-wordmark-footer";
import { siteConfig } from "@/data/siteConfig";
import { LegalDocType } from "@/components/LegalModal";
import { useSPA } from "@/context/SPAContext";
import { ShieldCheck, CheckCircle2, ArrowRight, ArrowUp } from "lucide-react";

interface FincoreFooterProps {
  onOpenLegal?: (type: LegalDocType) => void;
  onOpenConsultation?: () => void;
}

const CSS = `
.fincore-footer-wrap {
  background: #080B14;
  color: #EAF1FF;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
`;

/** Matches the dot pitch to the viewport so the word stays legible on phones. */
function useDotGap() {
  const [gap, setGap] = React.useState(6);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const apply = () => setGap(mq.matches ? 4 : 6);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return gap;
}

export default function FincoreFooter({
  onOpenLegal,
  onOpenConsultation,
}: FincoreFooterProps = {}) {
  const spa = useSPA();
  const handleOpenLegal = onOpenLegal || spa.openLegal;
  const handleOpenConsult = onOpenConsultation || spa.openConsultation;
  const dotGap = useDotGap();
  const [currentYear, setCurrentYear] = React.useState<number>(2026);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const columns: FooterColumn[] = [
    {
      title: "Visit & Contact",
      links: [
        {
          label: `${siteConfig.address.street}`,
          href:
            "https://maps.google.com/?q=" +
            encodeURIComponent(
              `${siteConfig.address.street}, ${siteConfig.address.city}`
            ),
        },
        {
          label: `${siteConfig.address.city}, ${siteConfig.address.state}`,
          href:
            "https://maps.google.com/?q=" +
            encodeURIComponent(
              `${siteConfig.address.city}, ${siteConfig.address.state}`
            ),
        },
        {
          label: `${siteConfig.phone.display}`,
          href: `tel:${siteConfig.phone.value}`,
        },
        {
          label: `${siteConfig.email.display}`,
          href: `mailto:${siteConfig.email.display}`,
        },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "Home", href: "/" },
        { label: "About FINCORE", href: "/about" },
        { label: "Practice Directory", href: "/services" },
        { label: "Consultation Desk", href: "/contact" },
      ],
    },
    {
      title: "Practice Areas",
      links: [
        { label: "Income Tax Advisory", href: "/services/tax-filing" },
        {
          label: "GST Registration & Returns",
          href: "/services/gst-registration-filing",
        },
        {
          label: "Company Incorporation",
          href: "/services/business-registration",
        },
        {
          label: "Accounting & Bookkeeping",
          href: "/services/accounting-bookkeeping",
        },
      ],
    },
    {
      title: "Governance & Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Statutory Disclaimer", href: "/disclaimer" },
        { label: "Request Consultation", href: "#", onClick: () => handleOpenConsult() },
      ],
    },
  ];

  return (
    <div id="footer-section" className="fincore-footer-wrap">
      <style>{CSS}</style>
      <HalftoneWordmarkFooter
        wordmark="FINCORE"
        label="FINCORE Consultancy Services"
        meta={`©${currentYear} FINCORE Consultancy Services · Financial, Tax & Corporate Advisory, India`}
        columns={columns}
        palette={{
          background: "#080B14",
          ink: "#EAF1FF",
          warm: "#38BDF8", // Electric cyan/sky blue
        }}
        dotGap={dotGap}
        radius={90}
        crop={0.12}
        grain={0.45}
        fontFamily={'"Plus Jakarta Sans", "Inter Tight", "Helvetica Neue", Arial, system-ui, sans-serif'}
        fontWeight={900}
        height="auto"
      >
        {/* Trust Badges & Action */}
        <div className="pt-2">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Pan-India Statutory Support</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs text-emerald-200 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>Verified Compliance Advisory</span>
            </div>
            <div className="flex items-center gap-2.5 ml-auto">
              <button
                type="button"
                onClick={() => handleOpenConsult()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#163E8C] hover:bg-[#0B2458] border border-blue-400/40 text-xs font-semibold text-white transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
              >
                <span>Request Advisory Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all duration-200 cursor-pointer active:scale-95 group"
                aria-label="Back to top"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </HalftoneWordmarkFooter>
    </div>
  );
}
