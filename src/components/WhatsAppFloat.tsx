"use client";

import { MessageSquareText } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function WhatsAppFloat() {
  const isReady = siteConfig.whatsapp.isConfigured && siteConfig.whatsapp.number;
  const whatsappUrl = isReady
    ? `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
        siteConfig.whatsapp.message
      )}`
    : "/contact#consultation";

  return (
    <aside
      aria-label="Direct Consultation Support"
      className="fixed bottom-6 right-6 z-40 flex items-center group font-sans"
    >
      {/* Tooltip on Hover */}
      <span className="hidden md:inline-block mr-3 px-3 py-1.5 rounded-lg bg-[#0B2458] text-white text-xs font-semibold shadow-lg border border-blue-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {isReady ? "Quick WhatsApp Desk" : "Book a Consultation"}
      </span>

      <a
        href={whatsappUrl}
        target={isReady ? "_blank" : undefined}
        rel={isReady ? "noopener noreferrer" : undefined}
        aria-label="Contact FINCORE Consultation Desk"
        className="btn-hover-shine w-13 h-13 rounded-full bg-[#163E8C] text-white border-2 border-white/20 shadow-xl shadow-blue-950/40 hover:bg-[#0B2458] hover:scale-105 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-400/40"
      >
        <MessageSquareText className="w-6 h-6" />
      </a>
    </aside>
  );
}
