"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
} from "lucide-react";
import { useSPA } from "@/context/SPAContext";

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    text: string;
    score: number;
    tip: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    title: "GST Compliance & Turnover Status",
    subtitle: "Turnover exceeding ₹20L (Services) or ₹40L (Goods) requires mandatory GST registration.",
    options: [
      {
        text: "GST registered & monthly returns (GSTR-1 & 3B) filed regularly",
        score: 25,
        tip: "Excellent. Input tax credit is reconciled with GSTR-2B.",
      },
      {
        text: "GST registered, but filings are occasionally delayed",
        score: 12,
        tip: "Penalty risk: Late fee ₹50/day (₹20 for NIL) plus 18% annual interest.",
      },
      {
        text: "Turnover is below exemption limit; unregistered",
        score: 20,
        tip: "Compliant for now. Monitor seasonal turnover spikes closely.",
      },
      {
        text: "Turnover crossed threshold, but GST is NOT yet obtained",
        score: 0,
        tip: "Critical violation: Up to 100% tax penalty under Section 122 of CGST Act.",
      },
    ],
  },
  {
    id: 2,
    title: "Maintenance of Books of Accounts",
    subtitle: "Section 44AA of Income Tax Act mandates financial book maintenance for specified thresholds.",
    options: [
      {
        text: "Complete double-entry cloud accounting with monthly reconciliation",
        score: 25,
        tip: "Audit-ready standard. Zero ledger distortion.",
      },
      {
        text: "Maintained in spreadsheets/Excel or physical daybooks",
        score: 14,
        tip: "Moderate risk. High chance of missed expenses and GST ITC mismatches.",
      },
      {
        text: "Not formally maintained; assembled only during year-end tax filing",
        score: 5,
        tip: "Statutory risk: Penalty of ₹25,000 under Section 271A for failure to maintain books.",
      },
    ],
  },
  {
    id: 3,
    title: "TDS / TCS Compliance & Remittances",
    subtitle: "Deduction on rent, contractor fees, professional charges, and salary remittances.",
    options: [
      {
        text: "TDS deducted accurately, deposited by 7th, and 26Q/24Q filed quarterly",
        score: 25,
        tip: "Compliant. Zero interest under Section 201(1A).",
      },
      {
        text: "Deductions made, but payments or quarter returns frequently delayed",
        score: 10,
        tip: "Penalty risk: ₹200/day late fee under Section 234E plus interest.",
      },
      {
        text: "Not sure if TDS provisions apply to our vendor/contractor payments",
        score: 5,
        tip: "Disallowance risk: 30% of expenditure disallowed under Section 40(a)(ia).",
      },
      {
        text: "Individual salaried or micro entity with no TDS liabilities",
        score: 25,
        tip: "Zero liability verified.",
      },
    ],
  },
  {
    id: 4,
    title: "Annual Regulatory & Corporate Governance",
    subtitle: "MCA Annual RoC Filings (AOC-4/MGT-7), DIR-3 KYC, and Income Tax ITR-1 to 7.",
    options: [
      {
        text: "All annual returns and director KYC submitted within statutory deadlines",
        score: 25,
        tip: "Fully active status on MCA portal and Income Tax portal.",
      },
      {
        text: "Previous year ITR or MCA return pending or under verification defect",
        score: 6,
        tip: "High risk: MCA late fee of ₹100/day per form with zero cap.",
      },
      {
        text: "Sole proprietorship with timely personal ITR filing",
        score: 25,
        tip: "Compliant. Ensure AIS/TIS entries match reported revenues.",
      },
      {
        text: "Uncertain about RoC / Annual statutory calendar dates",
        score: 8,
        tip: "Director DIN deactivation and company strike-off hazard.",
      },
    ],
  },
];

export default function ReadinessScorecard() {
  const { openConsultation } = useSPA();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectOption = (score: number) => {
    const updated = [...answers, score];
    setAnswers(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const resetDiagnostic = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const totalScore = answers.reduce((acc, curr) => acc + curr, 0);

  const getScoreReport = () => {
    if (totalScore >= 85) {
      return {
        level: "Excellent Compliance Health",
        color: "text-emerald-400",
        badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
        icon: ShieldCheck,
        summary:
          "Your operational and statutory processes demonstrate high discipline. Your risk of departmental notice, late fees, or ITC disallowance is very low.",
        action: "Maintain your rhythm with FINCORE's ongoing quarterly review service.",
      };
    } else if (totalScore >= 55) {
      return {
        level: "Moderate Exposure • Timely Remediation Advised",
        color: "text-amber-400",
        badge: "bg-amber-500/20 text-amber-300 border-amber-400/30",
        icon: AlertTriangle,
        summary:
          "You have key compliance tracks active, but gaps in filing frequency, reconciliation, or book maintenance expose your enterprise to cumulative interest and Section 234E penalties.",
        action: "Book a 15-minute diagnostic session with FINCORE to clear overdue reconciliations.",
      };
    } else {
      return {
        level: "Critical Statutory Risk • Immediate Action Required",
        color: "text-rose-400",
        badge: "bg-rose-500/20 text-rose-300 border-rose-400/30",
        icon: ShieldAlert,
        summary:
          "Severe regulatory exposure identified. Unregistered status post-threshold, unfiled GST/MCA returns, or missing books create compounding penalties and possible portal freeze.",
        action: "Request immediate priority remediation advisory from FINCORE's senior team.",
      };
    }
  };

  const report = getScoreReport();

  return (
    <section id="readiness" className="py-20 lg:py-28 bg-[#0B2458] text-white relative overflow-hidden">
      {/* Visual background lighting */}
      <div className="absolute inset-0 bg-dark-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>2-Minute Regulatory Health Assessment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading">
            Is Your Business 100% Statutorily Protected?
          </h2>

          <p className="text-base text-blue-100/90 max-w-xl mx-auto font-normal">
            Take this interactive 4-step diagnostic to check your GST, MCA, TDS, and accounting compliance health according to official Indian statutory standards.
          </p>
        </div>

        {/* Diagnostic Container */}
        <div className="rounded-3xl bg-slate-900/85 border border-slate-700/80 shadow-2xl p-6 sm:p-10 backdrop-blur-2xl">
          {!isCompleted ? (
            <div className="space-y-8">
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Question {currentStep + 1} of {questions.length}</span>
                  <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 rounded-full"
                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Content */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  Statutory Track #{questions[currentStep].id}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {questions[currentStep].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {questions[currentStep].subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(opt.score)}
                    className="w-full p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-400 hover:bg-slate-800/60 text-left transition-all duration-200 cursor-pointer group flex items-start gap-3.5"
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 text-cyan-400 text-xs font-bold font-mono flex items-center justify-center shrink-0 transition-colors mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {opt.text}
                      </p>
                      <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                        {opt.tip}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Card */
            <div className="space-y-8 animate-fade-in text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
                <div className="w-24 h-24 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center shrink-0 shadow-inner">
                  <span className={`text-3xl font-extrabold font-heading ${report.color}`}>
                    {totalScore}%
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Health Score</span>
                </div>

                <div className="space-y-2">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${report.badge}`}>
                    <report.icon className="w-4 h-4" />
                    <span>{report.level}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Statutory Compliance Diagnosis
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {report.summary}
                  </p>
                </div>
              </div>

              {/* Action Recommendation */}
              <div className="p-4 rounded-xl bg-blue-950/50 border border-blue-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left space-y-0.5">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                    Recommended Next Step
                  </span>
                  <p className="text-xs font-semibold text-slate-200">
                    {report.action}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={resetDiagnostic}
                    className="p-2.5 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                    title="Retake Diagnostic"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => openConsultation(`Statutory Score Remediation (${totalScore}%)`)}
                    className="flex-1 sm:flex-none btn-hover-shine px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-900/30"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Book Immediate Remediation Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
