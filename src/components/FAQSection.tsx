"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles, MessageCircleQuestion } from "lucide-react";
import { faqsData } from "@/data/faqsData";

interface FAQSectionProps {
  onOpenConsultation?: () => void;
}

export default function FAQSection({ onOpenConsultation }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string>("faq-1");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = [
    { label: "All Questions", value: "all" },
    { label: "General Advisory", value: "general" },
    { label: "Taxation & GST", value: "taxation" },
    { label: "Business Registration", value: "registration" },
    { label: "Accounting", value: "accounting" },
    { label: "Licensing", value: "licensing" },
  ];

  const filteredFaqs = faqsData.filter((item) => {
    if (categoryFilter === "all") return true;
    return item.category === categoryFilter;
  });

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section id="faqs" className="py-20 lg:py-24 bg-[#F5F7FA] relative scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF1FF] text-[#163E8C] text-xs font-bold uppercase tracking-wider border border-blue-200/60">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Queries</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#080B12]">
            Frequently Asked Questions
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            Essential answers on Indian taxation, corporate registration, accounting maintenance, and licensing procedures.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategoryFilter(cat.value)}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                categoryFilter === cat.value
                  ? "bg-[#0B1426] text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all duration-200 hover:border-blue-300"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:bg-blue-50/50"
                >
                  <span className="text-sm sm:text-base font-bold text-[#080B12] flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#163E8C] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <div className={`p-1 rounded-md text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#163E8C]" : ""}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fade-in">
                    <p className="bg-slate-50/80 p-3.5 rounded-lg border border-slate-100">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        {onOpenConsultation && (
          <div className="text-center pt-4">
            <p className="text-xs text-slate-500">
              Have a specific compliance question not covered here?{" "}
              <button
                type="button"
                onClick={onOpenConsultation}
                className="text-[#163E8C] font-semibold underline underline-offset-4 hover:text-[#0B2458] cursor-pointer"
              >
                Request a dedicated consultation proposal &rarr;
              </button>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
