import Link from "next/link";
import {
  UserCheck,
  Laptop,
  Rocket,
  Factory,
  Briefcase,
  Building,
  Store,
  UtensilsCrossed,
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";
import { clientCategories } from "@/data/clientCategories";

export default function WhoWeServeSection() {
  const iconMap: Record<string, typeof UserCheck> = {
    UserCheck,
    Laptop,
    Rocket,
    Factory,
    Briefcase,
    Building,
    Store,
    UtensilsCrossed,
  };

  return (
    <section id="who-we-serve" className="py-20 lg:py-24 bg-[#F5F7FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF1FF] border border-blue-200/80 text-[#163E8C] text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#163E8C]" />
            <span>Client Trust &amp; Verified Engagements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#080B12] font-heading">
            Trusted by Founders, Exporters &amp; Professionals
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Real experiences from business leaders and individuals who depend on FINCORE for punctual statutory submissions and disciplined financial administration.
          </p>
        </div>

        {/* 8 Polished Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientCategories.map((category) => {
            const Icon = iconMap[category.iconName] || UserCheck;

            return (
              <div
                key={category.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-400 card-interactive flex flex-col justify-between group transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-2xl bg-slate-100 text-[#0B1426] flex items-center justify-center group-hover:bg-[#0B1426] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#080B12] group-hover:text-[#163E8C] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#163E8C] mt-0.5">
                      {category.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-[#687386] leading-relaxed">
                    {category.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Tailored Solutions:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {category.recommendedServices.slice(0, 2).map((rec, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#163E8C] shrink-0" />
                          <span className="truncate">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <Link
                    href={`/contact?clientType=${
                      category.id === "individuals-salaried" ||
                      category.id === "freelancers-consultants"
                        ? "individual"
                        : "business"
                    }#consultation`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#163E8C] group-hover:text-[#0B2458] transition-colors"
                  >
                    <span>Request Tailored Scope</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/who-we-serve"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#163E8C] hover:text-[#0B2458] underline underline-offset-4 transition-colors"
          >
            <span>Learn in detail how we customize compliance per industry sector</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
