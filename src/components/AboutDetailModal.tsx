"use client";

import React, { useEffect, useState } from "react";
import {
  X,
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
  Award,
} from "lucide-react";
import { aboutPillarsData, AboutPillarItem } from "@/data/aboutPillarsData";

interface AboutDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPillarId?: string | null;
  onOpenConsultation: () => void;
}

export default function AboutDetailModal({
  isOpen,
  onClose,
  initialPillarId,
  onOpenConsultation,
}: AboutDetailModalProps) {
  const [activePillarId, setActivePillarId] = useState<string>("clear-guidance");

  // Synchronize initial pillar when opened
  useEffect(() => {
    if (initialPillarId) {
      setActivePillarId(initialPillarId);
    }
  }, [initialPillarId, isOpen]);

  // Handle body scroll locking & keyboard escape
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

  if (!isOpen) return null;

  const currentPillar =
    aboutPillarsData.find((p) => p.id === activePillarId) || aboutPillarsData[0];
  const Icon = currentPillar.icon;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 lg:p-6 bg-[#080B12]/80 backdrop-blur-md animate-fade-in overscroll-none select-none"
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
      aria-labelledby="about-modal-title"
    >
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-blue-100 overflow-hidden animate-modal-pop overscroll-contain select-text"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0B2458] via-[#0D2E6E] to-[#163E8C] text-white p-5 sm:p-7 relative overflow-hidden shrink-0">
          {/* Subtle background glow effect */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
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

          <div className="relative z-10 space-y-3 pr-14 sm:pr-16">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
                {currentPillar.category}
              </span>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                {currentPillar.metric}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white text-[#163E8C] flex items-center justify-center shrink-0 shadow-md">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2
                  id="about-modal-title"
                  className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight"
                >
                  {currentPillar.title}
                </h2>
                <p className="text-xs sm:text-sm text-blue-200 font-medium">
                  {currentPillar.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar Switcher Navigation Bar (Allows instant switching between all 3 cards) */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1 hidden sm:inline-block">
            View Pillar:
          </span>
          {aboutPillarsData.map((pillar) => {
            const TabIcon = pillar.icon;
            const isActive = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillarId(pillar.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#163E8C] text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200"
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{pillar.title}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-sm text-[#080B12]">
          {/* Section 1: Overview & Scope */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#163E8C] flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>Practice Scope &amp; Concept</span>
            </h3>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2 text-slate-700 leading-relaxed text-xs sm:text-sm">
              <p>{currentPillar.overview}</p>
            </div>
          </div>

          {/* Section 2: Core Focus Areas (2x2 Grid) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#163E8C] flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Execution Methodologies &amp; Core Pillars</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {currentPillar.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#163E8C]/40 transition-colors space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-[#163E8C] flex items-center justify-center text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#080B12]">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-7">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Key Deliverables (What You Receive) */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#163E8C] flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Actionable Deliverables &amp; Outcomes</span>
            </h3>
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 border border-blue-100/90">
              <ul className="space-y-2.5">
                {currentPillar.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#163E8C] shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 4: Risk Protection & Statutory Safeguard */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 text-amber-900 space-y-1.5">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                {currentPillar.riskProtection.heading}
              </h4>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed pl-6">
              {currentPillar.riskProtection.description}
            </p>
            <div className="pl-6 pt-1 text-[11px] font-mono font-medium text-amber-800">
              Statutory Reference: {currentPillar.riskProtection.statutoryRef}
            </div>
          </div>

          {/* Section 5: Associated Services in this Scope */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#163E8C] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Directly Supported FINCORE Practice Services</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {currentPillar.recommendedServices.map((svc, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1"
                >
                  <div className="text-xs font-bold text-[#080B12] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#163E8C]" />
                    <span>{svc.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {svc.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-7 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Have questions about how this applies to your entity or filings?
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="btn-hover-shine w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#163E8C] hover:bg-[#0B2458] text-white text-xs font-semibold shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163E8C] cursor-pointer"
            >
              <span>Speak with an Advisor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
