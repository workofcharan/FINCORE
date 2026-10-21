import Link from "next/link";
import {
  ReceiptText,
  Building2,
  Calculator,
  ShieldCheck,
  Users2,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { servicesData } from "@/data/servicesData";

export default function ServicesGrid() {
  const iconMap: Record<string, typeof ReceiptText> = {
    ReceiptText,
    Building2,
    Calculator,
    ShieldCheck,
    Users2,
    Briefcase,
  };

  return (
    <section id="services" className="py-20 lg:py-24 bg-[#F5F7FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#EAF1FF] text-[#163E8C] text-xs font-semibold uppercase tracking-wider border border-blue-200/50">
            Comprehensive Corporate Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#080B12]">
            Our Core Consultancy Practices
          </h2>
          <p className="text-base text-[#687386] leading-relaxed">
            Organized corporate solutions spanning statutory filings, business
            incorporation, accounting maintenance, and licensing facilitation.
          </p>
        </div>

        {/* 6 Category Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const Icon = iconMap[service.iconName] || ReceiptText;

            return (
              <div
                key={service.slug}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-2xl hover:border-blue-400/60 card-interactive flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle top border accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#163E8C] to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-5">
                  {/* Card Header with Icon & Category Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#EAF1FF] text-[#163E8C] flex items-center justify-center group-hover:bg-[#163E8C] group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold tracking-wider font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 group-hover:border-blue-200 group-hover:text-[#163E8C] transition-colors">
                      0{service.categoryNumber}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-[#080B12] group-hover:text-[#163E8C] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-medium text-[#163E8C]">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Short Description */}
                  <p className="text-sm text-[#687386] leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>

                  {/* Highlight Subservices */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Key Practice Areas
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#080B12]">
                      {service.subServices.slice(0, 3).map((sub, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#163E8C] shrink-0 mt-0.5 group-hover:text-blue-600 transition-colors" />
                          <span className="leading-tight">{sub.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {service.slug === "licenses-approvals" && (
                    <div className="text-[11px] text-amber-900 bg-amber-50 rounded-md p-2.5 border border-amber-200/80 leading-tight">
                      *Approvals &amp; licenses are issued subject to relevant municipal / government authority discretion.
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-semibold text-[#163E8C] hover:text-[#0B2458] flex items-center gap-1 group-hover:translate-x-1 transition-all"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/contact?service=${encodeURIComponent(
                      service.title
                    )}#consultation`}
                    className="btn-hover-shine text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-[#EAF1FF] text-[#163E8C] hover:bg-[#163E8C] hover:text-white transition-all shadow-2xs"
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 text-center">
          <p className="text-sm text-[#687386]">
            Need a tailored scope combining registration, accounting, and monthly compliance?{" "}
            <Link
              href="/contact#consultation"
              className="text-[#163E8C] font-semibold underline underline-offset-4 hover:text-[#0B2458] transition-colors"
            >
              Request a comprehensive consultation proposal &rarr;
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
