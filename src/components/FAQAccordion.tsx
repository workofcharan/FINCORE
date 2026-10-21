"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, ShieldAlert } from "lucide-react";
import { faqsData } from "@/data/faqsData";

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "general", label: "General & Scopes" },
    { id: "taxation", label: "Tax & GST" },
    { id: "registration", label: "Company Registration" },
    { id: "accounting", label: "Bookkeeping" },
    { id: "licensing", label: "Licenses" },
  ];

  const filteredFaqs =
    activeCategory === "all"
      ? faqsData
      : faqsData.filter((item) => item.category === activeCategory);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-20 lg:py-24 bg-[#F5F7FA] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#EAF1FF] text-[#163E8C] text-xs font-semibold uppercase tracking-wider border border-blue-200/50">
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#080B12]">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#687386] leading-relaxed">
            Transparent answers regarding our service scope, documentation
            prerequisites, filing timelines, and engagement framework.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#163E8C] text-white shadow-md scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-300 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-blue-400/80 shadow-md ring-1 ring-blue-100"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163E8C] transition-colors hover:bg-slate-50/50"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-[#080B12] flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#163E8C] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#163E8C]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#687386] leading-relaxed border-t border-slate-100 pl-13 animate-fade-in">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Notice on Timelines & Estimates */}
        <div className="mt-10 p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-start gap-3 shadow-2xs">
          <ShieldAlert className="w-4 h-4 text-[#163E8C] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-800">Please Note:</strong> All statutory processing durations and authority approval outcomes depend strictly on government departments (such as MCA, Income Tax Department, GSTN, and Municipal Corporations) following submission of complete, verified documentation.
          </p>
        </div>
      </div>
    </section>
  );
}
