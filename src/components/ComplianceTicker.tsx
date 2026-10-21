"use client";

import React from "react";
import { Calendar, AlertCircle, ShieldCheck, Clock, ArrowUpRight } from "lucide-react";

interface ComplianceDeadline {
  id: string;
  act: string;
  title: string;
  dueDate: string;
  frequency: string;
  penaltyRisk: "High" | "Medium" | "Statutory";
  description: string;
}

const deadlines: ComplianceDeadline[] = [
  {
    id: "gstr-3b",
    act: "GST Act",
    title: "GSTR-3B Monthly Return",
    dueDate: "20th of Every Month",
    frequency: "Monthly",
    penaltyRisk: "High",
    description: "Summary return of outward supplies & input tax credit (ITC) reconciliation.",
  },
  {
    id: "tds-deposit",
    act: "Income Tax Act",
    title: "TDS / TCS Monthly Deposit",
    dueDate: "7th of Every Month",
    frequency: "Monthly",
    penaltyRisk: "High",
    description: "Mandatory tax deducted at source remittance via Challan ITNS 281.",
  },
  {
    id: "pf-esi",
    act: "Labour Laws",
    title: "EPFO & ESIC Contribution",
    dueDate: "15th of Every Month",
    frequency: "Monthly",
    penaltyRisk: "Medium",
    description: "Employee and employer statutory provident fund and health insurance remittance.",
  },
  {
    id: "advance-tax",
    act: "Income Tax Act",
    title: "Advance Tax Installments",
    dueDate: "15 Jun | 15 Sep | 15 Dec | 15 Mar",
    frequency: "Quarterly",
    penaltyRisk: "High",
    description: "Interest Section 234B & 234C applicability for tax liability exceeding ₹10,000.",
  },
  {
    id: "itr-filing",
    act: "Direct Tax",
    title: "Annual Income Tax Return (ITR)",
    dueDate: "31st July (Non-Audit) / 31st Oct (Audit)",
    frequency: "Annual",
    penaltyRisk: "High",
    description: "Mandatory submission for individuals, proprietorships, LLPs & corporates.",
  },
  {
    id: "mca-annual",
    act: "Companies Act",
    title: "MCA Annual Filings (AOC-4 & MGT-7)",
    dueDate: "30 Days & 60 Days post AGM",
    frequency: "Annual",
    penaltyRisk: "High",
    description: "Financial statements and annual return filing with the Registrar of Companies.",
  },
];

export default function ComplianceTicker() {
  return (
    <div className="bg-[#070E1E] border-y border-slate-800/80 py-3 relative overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold truncate max-w-[230px] sm:max-w-none">
            Indian Statutory Due Date Watchlist • FY 2025–26
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-blue-300/80 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>FINCORE Compliance Calendar Sync</span>
        </div>
      </div>

      {/* Marquee ticker track */}
      <div className="relative overflow-hidden w-full select-none">
        {/* Soft edge blur gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#070E1E] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#070E1E] to-transparent z-10 pointer-events-none" />

        <div className="animate-ticker py-1">
          {/* Duplicate list to achieve continuous loop */}
          {[...deadlines, ...deadlines].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="inline-flex items-center gap-3 px-4 py-2 mx-2 rounded-full bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-850 transition-all duration-200 shrink-0 text-left group shadow-xs"
            >
              <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-105 transition-transform">
                <Calendar className="w-3 h-3" />
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono uppercase tracking-tight text-amber-300 font-bold bg-amber-950/70 px-2 py-0.5 rounded-full border border-amber-800/40">
                  {item.act}
                </span>
                <span className="text-xs font-semibold text-slate-100 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300 text-[11px] font-medium flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {item.dueDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
