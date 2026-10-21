"use client";

import React, { useEffect } from "react";
import { X, ShieldAlert, FileText, Scale } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export type LegalDocType = "privacy" | "terms" | "disclaimer" | null;

interface LegalModalProps {
  type: LegalDocType;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  useEffect(() => {
    if (!type) return;

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
  }, [type, onClose]);

  if (!type) return null;

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
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-blue-100 overflow-hidden animate-modal-pop overscroll-contain select-text"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B2458] text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10 text-blue-200">
              {type === "privacy" && <ShieldAlert className="w-5 h-5" />}
              {type === "terms" && <Scale className="w-5 h-5" />}
              {type === "disclaimer" && <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {type === "privacy" && "Privacy Notice & Data Handling"}
                {type === "terms" && "Terms and Conditions"}
                {type === "disclaimer" && "Regulatory & Statutory Disclaimer"}
              </h3>
              <p className="text-xs text-blue-200">
                FINCORE Consultancy Services &bull; Legal Compliance
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="p-2 rounded-lg bg-white/15 hover:bg-white/30 active:scale-95 text-white transition-all cursor-pointer z-50 pointer-events-auto"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed">
          {type === "privacy" && (
            <>
              <div className="p-3 bg-blue-50 rounded-lg text-[#163E8C] font-medium border border-blue-100">
                FINCORE respects client confidentiality. Information submitted via consultation forms is used strictly to communicate and evaluate service scope.
              </div>
              <h4 className="text-sm font-bold text-[#080B12]">1. Information Collected</h4>
              <p>
                We only collect basic identification and contact details (name, email, phone number, and brief description of requirements) voluntarily supplied through our website enquiry forms.
              </p>
              <h4 className="text-sm font-bold text-[#080B12]">2. No Sensitive Banking Data Stored</h4>
              <p>
                We never ask for or store sensitive credentials such as net banking passwords, UPI PINs, Aadhaar biometrics, or credit card information on this public web application.
              </p>
              <h4 className="text-sm font-bold text-[#080B12]">3. Third-Party Sharing</h4>
              <p>
                We do not sell, rent, or trade client information to commercial brokers or third-party marketing companies. Data is shared with government portals (MCA, GST, Income Tax) exclusively during executed filing mandates authorized by the client.
              </p>
            </>
          )}

          {type === "terms" && (
            <>
              <div className="p-3 bg-blue-50 rounded-lg text-[#163E8C] font-medium border border-blue-100">
                By browsing FINCORE Consultancy Services or submitting a consultation request, you acknowledge our terms of engagement.
              </div>
              <h4 className="text-sm font-bold text-[#080B12]">1. Consultancy Scope</h4>
              <p>
                FINCORE provides professional advisory and document preparation facilitation. All services are governed by written engagement scopes agreed upon prior to portal filing.
              </p>
              <h4 className="text-sm font-bold text-[#080B12]">2. Client Documentation Responsibilities</h4>
              <p>
                The client is responsible for providing genuine, truthful, and legally accurate financial statements, invoices, and KYC proofs. FINCORE does not bear liability for penalties arising from falsified or suppressed client records.
              </p>
              <h4 className="text-sm font-bold text-[#080B12]">3. Statutory Authority Discretion</h4>
              <p>
                Statutory approvals, trademark registrations, GST allocations, and municipal licenses remain at the sole discretion of respective Indian government authorities.
              </p>
            </>
          )}

          {type === "disclaimer" && (
            <>
              <div className="p-3 bg-amber-50 rounded-lg text-amber-900 font-medium border border-amber-200">
                <strong>Statutory Notice:</strong> FINCORE CONSULTANCY SERVICES provides facilitation, documentation, and consultancy assistance for business registrations, statutory filings, and compliance.
              </div>
              <p>
                {siteConfig.disclaimer}
              </p>
              <p>
                The information provided on this website is for general informational awareness only and should not be construed as legal advice or formal audit opinion. Applicability depends on your specific business structure, revenue thresholds, and current statutory enactments.
              </p>
              <p>
                FINCORE does not represent itself as a chartered accountancy firm, law firm, or government agency unless explicitly verified and licensed under applicable bar or institute regulations.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#163E8C] hover:bg-[#0B2458] text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
