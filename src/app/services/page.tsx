import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ServicesSection from "@/components/ServicesSection";
import ConsultationForm from "@/components/ConsultationForm";
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

export const metadata: Metadata = {
  title: "Our Services | Tax, Registration, Accounting & Licensing Consultancy",
  description:
    "Comprehensive directory of consultancy services offered by FINCORE in India: Taxation & GST, Company Incorporation, Bookkeeping, Trade & FSSAI Licensing, and Payroll compliance.",
};

export default function ServicesPage() {
  const iconMap: Record<string, typeof ReceiptText> = {
    ReceiptText,
    Building2,
    Calculator,
    ShieldCheck,
    Users2,
    Briefcase,
  };

  return (
    <>
      <PageHero
        badge="Service Directory"
        title="Comprehensive Financial & Statutory Solutions"
        subtitle="Explore our specialized consultancy categories covering individual taxation, business incorporation, accounting maintenance, payroll, and municipal licensing."
        breadcrumbs={[{ name: "Services" }]}
      />

      {/* 15 Practice Interactive Grid with Search & Filters */}
      <ServicesSection />

      <section className="py-20 bg-[#F5F7FA] font-serif">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Intro Overview */}
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#080B12]">
              Structured Compliance by Domain
            </h2>
            <p className="text-sm text-[#687386] leading-relaxed">
              Every category below represents a distinct practice area where our
              consultancy provides documentation support, portal submission
              coordination, and statutory advisory. Click any practice for deep
              checklists, eligibility guidelines, and process workflows.
            </p>
          </div>

          {/* Detailed Service Cards */}
          <div className="space-y-12">
            {servicesData.map((category) => {
              const Icon = iconMap[category.iconName] || ReceiptText;

              return (
                <div
                  key={category.slug}
                  id={category.slug}
                  className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/90 shadow-sm hover:border-blue-400/60 hover:shadow-xl card-interactive transition-all space-y-8 relative overflow-hidden group"
                >
                  {category.slug === "taxation-compliance" && (
                    <>
                      <div
                        className="absolute right-4 -bottom-4 w-48 h-48 sm:w-64 sm:h-64 bg-contain bg-no-repeat bg-right-bottom opacity-15 group-hover:opacity-25 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                        style={{ backgroundImage: `url('/images/tax-filing.png')` }}
                      />
                      <div className="absolute right-0 bottom-0 w-48 h-48 bg-radial from-blue-400/10 to-transparent rounded-full blur-2xl pointer-events-none" />
                    </>
                  )}
                  {category.slug === "business-registration" && (
                    <>
                      <div
                        className="absolute right-4 -bottom-4 w-48 h-48 sm:w-64 sm:h-64 bg-contain bg-no-repeat bg-right-bottom opacity-15 group-hover:opacity-25 group-hover:scale-105 transition-all duration-500 pointer-events-none"
                        style={{ backgroundImage: `url('/images/business-registration.png')` }}
                      />
                      <div className="absolute right-0 bottom-0 w-48 h-48 bg-radial from-blue-600/10 to-transparent rounded-full blur-2xl pointer-events-none" />
                    </>
                  )}
                  {category.slug === "licenses-compliance" && (
                    <>
                      <div
                        className="absolute right-4 -bottom-4 w-48 h-48 sm:w-64 sm:h-64 bg-cover bg-no-repeat bg-center opacity-15 group-hover:opacity-25 group-hover:scale-105 transition-all duration-500 pointer-events-none rounded-xl"
                        style={{ backgroundImage: `url('/images/trade-license.png')` }}
                      />
                      <div className="absolute right-0 bottom-0 w-48 h-48 bg-radial from-amber-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
                    </>
                  )}
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-[#EAF1FF] text-[#163E8C] flex items-center justify-center shrink-0">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono text-[#163E8C] bg-[#EAF1FF] px-2 py-0.5 rounded">
                            CATEGORY 0{category.categoryNumber}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#080B12] mt-1">
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/services/${category.slug}`}
                        className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#EAF1FF] text-[#163E8C] hover:bg-[#163E8C] hover:text-white transition-colors"
                      >
                        View Full Details &rarr;
                      </Link>
                      <Link
                        href={`/contact?service=${encodeURIComponent(
                          category.title
                        )}#consultation`}
                        className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#163E8C] text-white hover:bg-[#0B2458] transition-colors"
                      >
                        Enquire
                      </Link>
                    </div>
                  </div>

                  {/* Descriptions & Value */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                    <div className="lg:col-span-7 space-y-4">
                      {category.slug === "taxation-compliance" && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="flex flex-col items-center sm:items-start gap-2.5 p-3 rounded-xl bg-gradient-to-r from-blue-50/80 via-white to-blue-50/80 border border-blue-100/80">
                            <img
                              src="/images/tax-filing.png"
                              alt="Tax Filing Compliance"
                              className="h-16 sm:h-18 object-contain drop-shadow-xs"
                            />
                            <div className="space-y-0.5 text-center sm:text-left">
                              <h4 className="text-xs font-bold text-[#0B2458]">
                                Income Tax Filing
                              </h4>
                              <p className="text-[10px] text-slate-600 leading-tight">
                                Complete ITR preparation &amp; AIS matching.
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-center sm:items-start gap-2.5 p-3 rounded-xl bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 border border-amber-200/80">
                            <img
                              src="/images/gst.png"
                              alt="GST Registration & Filing"
                              className="h-16 sm:h-18 object-contain rounded drop-shadow-xs"
                            />
                            <div className="space-y-0.5 text-center sm:text-left">
                              <h4 className="text-xs font-bold text-[#080B12]">
                                GST Registration &amp; Filing
                              </h4>
                              <p className="text-[10px] text-slate-600 leading-tight">
                                GSTR-1, 3B filings &amp; Input Tax Credit matching.
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-center sm:items-start gap-2.5 p-3 rounded-xl bg-gradient-to-r from-slate-50/90 via-white to-slate-50/90 border border-slate-200/90">
                            <img
                              src="/images/tds.png"
                              alt="TDS & Withholding Compliance"
                              className="h-16 sm:h-18 object-contain rounded-lg drop-shadow-xs"
                            />
                            <div className="space-y-0.5 text-center sm:text-left">
                              <h4 className="text-xs font-bold text-[#080B12]">
                                TDS / TCS Withholding
                              </h4>
                              <p className="text-[10px] text-slate-600 leading-tight">
                                24Q/26Q returns &amp; Form 16/16A certificates.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {category.slug === "business-registration" && (
                        <div className="flex flex-col sm:flex-row items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-blue-50/80 via-white to-sky-50/80 border border-blue-200/80">
                          <img
                            src="/images/partnership.png"
                            alt="Partnership Firm Registration"
                            className="h-16 sm:h-18 object-contain rounded-lg drop-shadow-xs"
                          />
                          <div className="space-y-0.5 text-center sm:text-left">
                            <h4 className="text-xs font-bold text-[#080B12]">
                              Partnership Firm Registration
                            </h4>
                            <p className="text-[10px] text-slate-600 leading-tight">
                              Deed drafting, RoF filing, PAN &amp; bank account setup for partners.
                            </p>
                          </div>
                        </div>
                      )}

                      {category.slug === "licenses-compliance" && (
                        <div className="flex flex-col sm:flex-row items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 border border-amber-200/80">
                          <img
                            src="/images/trade-license.png"
                            alt="Municipal Trade License"
                            className="h-16 sm:h-18 object-cover rounded-lg drop-shadow-xs"
                          />
                          <div className="space-y-0.5 text-center sm:text-left">
                            <h4 className="text-xs font-bold text-[#080B12]">
                              Municipal Trade License
                            </h4>
                            <p className="text-[10px] text-slate-600 leading-tight">
                              Local civic body clearance, commercial premises verification &amp; statutory renewals.
                            </p>
                          </div>
                        </div>
                      )}

                      <p className="text-sm text-[#080B12] font-medium leading-relaxed">
                        {category.shortDescription}
                      </p>
                      <p className="text-xs text-[#687386] leading-relaxed">
                        {category.whatItMeans}
                      </p>

                      {category.regulatoryNotice && (
                        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                          <strong>Regulatory Scope:</strong> {category.regulatoryNotice}
                        </div>
                      )}
                    </div>

                    {/* Subservices Grid */}
                    <div className="lg:col-span-5 bg-[#F5F7FA] rounded-xl p-5 border border-slate-200/80 space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Practices Covered:
                      </span>
                      <div className="space-y-2.5">
                        {category.subServices.map((sub, i) => {
                          const isSubTds = sub.name.toLowerCase().includes("tds");
                          const isSubGst = sub.name.toLowerCase().includes("gst");
                          const isSubEsi =
                            sub.name.toLowerCase().includes("esi") ||
                            sub.name.toLowerCase().includes("employee state insurance");
                          const isSubTcs =
                            sub.name.toLowerCase().includes("tcs") ||
                            sub.name.toLowerCase().includes("tax collected at source");
                          const isSubPartnership =
                            sub.name.toLowerCase().includes("partnership");
                          const isSubTradeLicense =
                            sub.name.toLowerCase().includes("trade license");
                          const isSubLabourLicense =
                            sub.name.toLowerCase().includes("labour");
                          const isSubProfessionalTax =
                            sub.name.toLowerCase().includes("professional tax") ||
                            sub.name.toLowerCase().includes("(pt)");
                          const isSubProvidentFund =
                            sub.name.toLowerCase().includes("provident fund") ||
                            sub.name.toLowerCase().includes("(pf)") ||
                            sub.name.toLowerCase().includes("epfo");
                          const isSubAccounting =
                            sub.name.toLowerCase().includes("accounting") ||
                            sub.name.toLowerCase().includes("bookkeeping");
                          const isSubCompanyIncorporation =
                            sub.name.toLowerCase().includes("company incorporation") ||
                            sub.name.toLowerCase().includes("incorporation");
                          const isSubFoodLicense =
                            sub.name.toLowerCase().includes("food license") ||
                            sub.name.toLowerCase().includes("fssai");
                          const isSubBusinessRegistration =
                            sub.name.toLowerCase().includes("business registration") ||
                            sub.name.toLowerCase().includes("sole proprietorship") ||
                            sub.name.toLowerCase().includes("udyam");
                          return (
                            <div
                              key={i}
                              className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-2xs space-y-1 relative overflow-hidden group"
                            >
                              {isSubBusinessRegistration && (
                                <div
                                  className="absolute right-0 top-0 bottom-0 w-28 bg-contain bg-no-repeat bg-right opacity-30 group-hover:opacity-55 transition-all duration-300 pointer-events-none rounded"
                                  style={{ backgroundImage: `url('/images/business-registration.png')` }}
                                />
                              )}
                              {isSubFoodLicense && (
                                <div
                                  className="absolute right-0 top-0 bottom-0 w-28 bg-contain bg-no-repeat bg-right opacity-30 group-hover:opacity-55 transition-all duration-300 pointer-events-none rounded"
                                  style={{ backgroundImage: `url('/images/food-license.png')` }}
                                />
                              )}
                              {isSubCompanyIncorporation && (
                                <div
                                  className="absolute right-0 top-0 bottom-0 w-28 bg-contain bg-no-repeat bg-right opacity-30 group-hover:opacity-55 transition-all duration-300 pointer-events-none rounded"
                                  style={{ backgroundImage: `url('/images/company-incorporation.png')` }}
                                />
                              )}
                              {isSubAccounting && (
                                <div
                                  className="absolute right-0 top-0 bottom-0 w-28 bg-cover bg-no-repeat bg-center opacity-30 group-hover:opacity-55 transition-all duration-300 pointer-events-none rounded"
                                  style={{ backgroundImage: `url('/images/accounting-bookkeeping.png')` }}
                                />
                              )}
                              {isSubProvidentFund && (
                                <div
                                  className="absolute right-0 top-0 bottom-0 w-28 bg-contain bg-no-repeat bg-right opacity-30 group-hover:opacity-55 transition-all duration-300 pointer-events-none rounded"
                                  style={{ backgroundImage: `url('/images/provident-fund.png')` }}
                                />
                              )}
                              {isSubProfessionalTax && (
                                <div
                                  className="absolute right-0 top-0 bottom-0 w-28 bg-contain bg-no-repeat bg-right opacity-30 group-hover:opacity-55 transition-all duration-300 pointer-events-none rounded"
                                  style={{ backgroundImage: `url('/images/professional-tax.png')` }}
                                />
                              )}
                              {isSubLabourLicense && (
                                <div
                                  className="absolute right-0 top-0 bottom-0 w-28 bg-contain bg-no-repeat bg-right opacity-30 group-hover:opacity-55 transition-all duration-300 pointer-events-none rounded"
                                  style={{ backgroundImage: `url('/images/labour-license.png')` }}
                                />
                              )}
                              {isSubTradeLicense && (
                                <div
                                  className="absolute right-0 top-0 bottom-0 w-28 bg-cover bg-no-repeat bg-center opacity-30 group-hover:opacity-55 transition-all duration-300 pointer-events-none rounded"
                                  style={{ backgroundImage: `url('/images/trade-license.png')` }}
                                />
                              )}
                              {isSubPartnership && (
                                <div
                                  className="absolute right-0 top-0 bottom-0 w-28 bg-contain bg-no-repeat bg-right opacity-30 group-hover:opacity-55 transition-all duration-300 pointer-events-none rounded"
                                  style={{ backgroundImage: `url('/images/partnership.png')` }}
                                />
                              )}
                              {isSubTds && (
                                <div
                                  className="absolute right-0 top-0 bottom-0 w-28 bg-contain bg-no-repeat bg-right opacity-25 group-hover:opacity-45 transition-all duration-300 pointer-events-none"
                                  style={{ backgroundImage: `url('/images/tds.png')` }}
                                />
                              )}
                              {isSubGst && (
                                <div
                                  className="absolute right-0 top-0 bottom-0 w-28 bg-contain bg-no-repeat bg-right opacity-25 group-hover:opacity-45 transition-all duration-300 pointer-events-none"
                                  style={{ backgroundImage: `url('/images/gst.png')` }}
                                />
                              )}
                              {isSubEsi && (
                                <div
                                  className="absolute right-0 top-0 bottom-0 w-28 bg-contain bg-no-repeat bg-right opacity-30 group-hover:opacity-55 transition-all duration-300 pointer-events-none rounded"
                                  style={{ backgroundImage: `url('/images/esi.png')` }}
                                />
                              )}
                              {isSubTcs && (
                                <div
                                  className="absolute right-0 top-0 bottom-0 w-28 bg-contain bg-no-repeat bg-right opacity-30 group-hover:opacity-55 transition-all duration-300 pointer-events-none rounded"
                                  style={{ backgroundImage: `url('/images/tcs.png')` }}
                                />
                              )}
                              <div className="text-xs font-bold text-[#080B12] flex items-center gap-1.5 relative z-10">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#163E8C] shrink-0" />
                                <span>{sub.name}</span>
                              </div>
                              <p className="text-[11px] text-[#687386] leading-tight pl-5 relative z-10">
                                {sub.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>
                      Tailored packages available based on operational volume and legal form.
                    </span>
                    <Link
                      href={`/services/${category.slug}`}
                      className="text-[#163E8C] font-semibold flex items-center gap-1 hover:underline"
                    >
                      <span>Explore Requirements & Workflow</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ConsultationForm />
    </>
  );
}
