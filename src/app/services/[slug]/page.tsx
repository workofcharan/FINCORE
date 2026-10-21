import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ConsultationForm from "@/components/ConsultationForm";
import { servicesData, allServices } from "@/data/servicesData";
import {
  CheckCircle2,
  FileCheck,
  Search,
  ArrowRight,
  ShieldAlert,
  ArrowLeft,
  PhoneCall,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

const SERVICE_VISUALS: Record<
  string,
  {
    image: string;
    badge: string;
    tags: string[];
    accent?: string;
    imageClassName?: string;
  }
> = {
  "tax-filing": {
    image: "/images/tax-filing.png",
    badge: "ITR 1-7 Assessment",
    tags: ["ITR-1 to 7", "AIS Reconciliation", "Audit Ready"],
    accent: "#163E8C",
    imageClassName: "object-contain p-2 sm:p-3 bg-gradient-to-b from-blue-50/80 via-white to-slate-50",
  },
  "accounting-bookkeeping": {
    image: "/images/accounting-bookkeeping.png",
    badge: "Financial MIS",
    tags: ["Balance Sheet", "P&L Statements", "Ledger Audit"],
    accent: "#163E8C",
  },
  "gst-registration-filing": {
    image: "/images/gst.png",
    badge: "GSTN Compliance",
    tags: ["GSTR-1 & 3B", "Input Tax Credit", "E-Way Bills"],
    accent: "#163E8C",
    imageClassName: "object-contain p-2 sm:p-3 bg-gradient-to-b from-blue-50/80 via-white to-slate-50",
  },
  "tds": {
    image: "/images/tds.png",
    badge: "Withholding Tax",
    tags: ["Form 24Q & 26Q", "Form 16/16A", "TRACES Portal"],
    accent: "#163E8C",
  },
  "tcs": {
    image: "/images/tcs.png",
    badge: "Tax Collection",
    tags: ["Form 27EQ", "Sec 206C", "Challan 281"],
    accent: "#163E8C",
    imageClassName: "object-contain p-2 sm:p-3 bg-gradient-to-b from-amber-50/70 via-white to-slate-50",
  },
  "provident-fund": {
    image: "/images/provident-fund.png",
    badge: "Social Security",
    tags: ["Monthly ECR", "UAN KYC", "EPFO Filings"],
    accent: "#163E8C",
    imageClassName: "object-cover",
  },
  "esi": {
    image: "/images/esi.png",
    badge: "Employee Health",
    tags: ["Medical Scheme", "ESIC Portal", "Statutory Register"],
    accent: "#163E8C",
    imageClassName: "object-cover",
  },
  "professional-tax": {
    image: "/images/professional-tax.png",
    badge: "State Statutory",
    tags: ["PTRC & PTEC", "State Slabs", "Form 5 Returns"],
    accent: "#163E8C",
    imageClassName: "object-contain p-2 sm:p-3 bg-gradient-to-b from-amber-50/70 via-white to-slate-50",
  },
  "company-incorporation": {
    image: "/images/company-incorporation.png",
    badge: "MCA Incorporation",
    tags: ["SPICe+ Part B", "DIN & DSC", "MOA & AOA"],
    accent: "#163E8C",
    imageClassName: "object-cover",
  },
  "partnership-registration": {
    image: "/images/partnership.png",
    badge: "ROC Registered",
    tags: ["LLP Agreement", "Form 11 & 8", "Partnership Deed"],
    accent: "#163E8C",
    imageClassName: "object-cover",
  },
  "business-registration": {
    image: "/images/business-registration.png",
    badge: "Startup Launch",
    tags: ["Udyam MSME", "Fast-track Setup", "Current A/c Help"],
    accent: "#163E8C",
  },
  "trade-license": {
    image: "/images/trade-license.png",
    badge: "Municipal Permit",
    tags: ["Municipal Body", "Premises Verification", "Annual Renewal"],
    accent: "#163E8C",
    imageClassName: "object-cover",
  },
  "labour-license": {
    image: "/images/labour-license.png",
    badge: "Labour Dept",
    tags: ["Form A to D", "Shop & Est. Act", "Compliance Record"],
    accent: "#163E8C",
    imageClassName: "object-cover",
  },
  "food-license": {
    image: "/images/food-license.png",
    badge: "FSSAI Statutory",
    tags: ["Basic/State/Central", "FoSCoS Portal", "Hygiene Standard"],
    accent: "#163E8C",
  },
  "regulatory-compliance": {
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    badge: "Corporate Audit",
    tags: ["Statutory Audit", "Secretarial Review", "Director KYC"],
    accent: "#163E8C",
  },
};

function getSubServiceSlug(name: string): string | null {
  const n = name.toLowerCase();
  if (n.includes("tax filing") || n.includes("income tax")) return "tax-filing";
  if (n.includes("gst")) return "gst-registration-filing";
  if (n.includes("provident fund") || n.includes("(pf)") || n.includes("epfo")) return "provident-fund";
  if (n.includes("esi") || n.includes("employee state insurance")) return "esi";
  if (n.includes("tds")) return "tds";
  if (n.includes("tcs")) return "tcs";
  if (n.includes("professional tax") || n.includes("(pt)")) return "professional-tax";
  if (n.includes("accounting") || n.includes("bookkeeping")) return "accounting-bookkeeping";
  if (n.includes("company incorporation") || n.includes("private limited")) return "company-incorporation";
  if (n.includes("partnership")) return "partnership-registration";
  if (n.includes("trade license")) return "trade-license";
  if (n.includes("labour")) return "labour-license";
  if (n.includes("food license") || n.includes("fssai")) return "food-license";
  if (n.includes("other") || n.includes("specialized")) return "other-licenses";
  return null;
}

export async function generateStaticParams() {
  const categorySlugs = servicesData.map((svc) => svc.slug);
  const individualSlugs = allServices.map((svc) => svc.slug);
  const uniqueSlugs = Array.from(new Set([...categorySlugs, ...individualSlugs]));
  return uniqueSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = servicesData.find((s) => s.slug === slug);
  if (category) {
    return {
      title: `${category.title} | FINCORE Consultancy Services`,
      description: category.shortDescription,
    };
  }

  const item = allServices.find((s) => s.slug === slug);
  if (item) {
    return {
      title: `${item.name} | FINCORE Consultancy Services`,
      description: item.description,
    };
  }

  return {
    title: "Service Practice | FINCORE Consultancy Services",
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;

  // 1. Check if slug matches a Category Hub
  const category = servicesData.find((s) => s.slug === slug);

  // 2. Check if slug matches an Individual Service Practice
  const individualService = allServices.find((s) => s.slug === slug);

  // If neither matches, 404
  if (!category && !individualService) {
    notFound();
  }

  // ==========================================
  // VIEW A: CATEGORY HUB (e.g. taxation-compliance, business-registration, licenses-compliance)
  // ==========================================
  if (category) {
    return (
      <>
        <PageHero
          badge={`Practice Area 0${category.categoryNumber}`}
          title={category.title}
          subtitle={category.tagline}
          breadcrumbs={[
            { name: "Services", href: "/services" },
            { name: category.title },
          ]}
        />

        <section className="py-20 bg-white font-serif">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* Navigation Back */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#163E8C] hover:text-[#0B2458] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All 15 Services Directory</span>
              </Link>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#163E8C]" />
                <span>Comprehensive Domain Practice Hub</span>
              </div>
            </div>

            {/* Section 1: What the Service Means & Who Needs It */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#163E8C] bg-[#EAF1FF] px-2.5 py-1 rounded">
                    Domain Overview
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#080B12]">
                    What This Service Entails
                  </h2>
                  <p className="text-sm text-[#080B12] leading-relaxed font-medium">
                    {category.shortDescription}
                  </p>
                  <p className="text-sm text-[#687386] leading-relaxed">
                    {category.whatItMeans}
                  </p>
                </div>

                {/* How FINCORE Assists */}
                <div className="pt-4 space-y-3">
                  <h3 className="text-lg font-bold text-[#080B12]">
                    How FINCORE Can Assist You
                  </h3>
                  <div className="space-y-2.5">
                    {category.howFincoreAssists.map((assist, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#163E8C] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-[#080B12] leading-relaxed">
                          {assist}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Who Needs It Box */}
              <div className="lg:col-span-5 bg-[#F5F7FA] rounded-2xl p-6 sm:p-7 border border-slate-200/90 space-y-4 relative overflow-hidden">
                {slug === "taxation-compliance" && (
                  <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bg-white border border-blue-100 shadow-2xs">
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-blue-50/50 text-center">
                      <img
                        src="/images/tax-filing.png"
                        alt="Tax Filing & Compliance"
                        className="h-20 sm:h-24 object-contain"
                      />
                      <span className="text-[9px] font-bold text-[#0B2458] mt-1 uppercase tracking-wider">
                        Tax Filing
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-amber-50/50 text-center">
                      <img
                        src="/images/gst.png"
                        alt="GST Registration & Filing"
                        className="h-20 sm:h-24 object-contain rounded"
                      />
                      <span className="text-[9px] font-bold text-[#080B12] mt-1 uppercase tracking-wider">
                        GST Filing
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50/80 text-center">
                      <img
                        src="/images/tds.png"
                        alt="TDS Withholding Compliance"
                        className="h-20 sm:h-24 object-contain rounded"
                      />
                      <span className="text-[9px] font-bold text-[#080B12] mt-1 uppercase tracking-wider">
                        TDS
                      </span>
                    </div>
                  </div>
                )}
                {slug === "business-registration" && (
                  <div className="flex flex-col sm:flex-row items-center gap-3.5 p-3 rounded-xl bg-white border border-blue-200/80 shadow-2xs">
                    <img
                      src="/images/business-registration.png"
                      alt="Business Registration & Formation"
                      className="h-20 sm:h-24 object-contain rounded-lg drop-shadow-xs"
                    />
                    <div className="space-y-1 text-center sm:text-left">
                      <h4 className="text-xs font-bold text-[#080B12]">
                        Company &amp; Business Registration
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-tight">
                        Comprehensive formation advisory including Sole Proprietorship, Partnership Firm, LLP, and Private Limited SPICe+.
                      </p>
                    </div>
                  </div>
                )}
                {slug === "licenses-compliance" && (
                  <div className="flex flex-col sm:flex-row items-center gap-3.5 p-3 rounded-xl bg-white border border-amber-200/80 shadow-2xs">
                    <img
                      src="/images/trade-license.png"
                      alt="Municipal Trade License"
                      className="h-20 sm:h-24 object-cover rounded-lg drop-shadow-xs"
                    />
                    <div className="space-y-1 text-center sm:text-left">
                      <h4 className="text-xs font-bold text-[#080B12]">
                        Municipal Trade License
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-tight">
                        Local civic body clearance, commercial premises verification &amp; statutory renewals.
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2.5 text-base font-bold text-[#080B12]">
                  <Search className="w-5 h-5 text-[#163E8C]" />
                  <span>Who Needs This Service?</span>
                </div>
                <p className="text-xs text-[#687386]">
                  This consultancy practice is configured to assist:
                </p>
                <ul className="space-y-2.5">
                  {category.whoNeedsIt.map((item, idx) => (
                    <li
                      key={idx}
                      className="p-3 rounded-lg bg-white border border-slate-200/60 text-xs text-[#080B12] flex items-start gap-2.5 leading-snug"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#163E8C] shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <a
                    href="#service-enquiry"
                    className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-[#163E8C] text-white hover:bg-[#0B2458] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Consultation for This Domain</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Section 2: Subservices & Breakdown */}
            <div className="space-y-6">
              <div className="border-t border-slate-200 pt-12">
                <span className="text-xs font-bold uppercase tracking-wider text-[#163E8C] bg-[#EAF1FF] px-2.5 py-1 rounded">
                  Practice Breakdown
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#080B12] mt-2">
                  Specialized Solutions Under {category.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.subServices.map((sub, idx) => {
                  const subSlug = getSubServiceSlug(sub.name);
                  const isSubTds = sub.name.toLowerCase().includes("tds");
                  const isSubTax = sub.name.toLowerCase().includes("tax filing") || sub.name.toLowerCase().includes("income tax");
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
                      key={idx}
                      className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400/60 hover:shadow-xl card-interactive transition-all flex flex-col justify-between relative overflow-hidden group"
                    >
                      {isSubBusinessRegistration && (
                        <>
                          <div
                            className="absolute -right-2 -bottom-2 w-48 h-28 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-35 group-hover:opacity-60 rounded"
                            style={{ backgroundImage: `url('/images/business-registration.png')` }}
                          />
                          <div className="absolute right-0 bottom-0 w-36 h-24 bg-radial from-blue-500/20 via-sky-100/10 to-transparent rounded-full blur-xl pointer-events-none" />
                        </>
                      )}
                      {isSubFoodLicense && (
                        <>
                          <div
                            className="absolute -right-2 -bottom-2 w-48 h-28 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-35 group-hover:opacity-60 rounded"
                            style={{ backgroundImage: `url('/images/food-license.png')` }}
                          />
                          <div className="absolute right-0 bottom-0 w-36 h-24 bg-radial from-orange-500/20 via-emerald-100/10 to-transparent rounded-full blur-xl pointer-events-none" />
                        </>
                      )}
                      {isSubCompanyIncorporation && (
                        <>
                          <div
                            className="absolute -right-2 -bottom-2 w-48 h-28 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-35 group-hover:opacity-60 rounded"
                            style={{ backgroundImage: `url('/images/company-incorporation.png')` }}
                          />
                          <div className="absolute right-0 bottom-0 w-36 h-24 bg-radial from-blue-500/20 via-sky-100/10 to-transparent rounded-full blur-xl pointer-events-none" />
                        </>
                      )}
                      {isSubAccounting && (
                        <>
                          <div
                            className="absolute -right-2 -bottom-2 w-48 h-28 bg-cover bg-no-repeat bg-center pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-35 group-hover:opacity-60 rounded"
                            style={{ backgroundImage: `url('/images/accounting-bookkeeping.png')` }}
                          />
                          <div className="absolute right-0 bottom-0 w-36 h-24 bg-radial from-teal-500/20 via-emerald-100/10 to-transparent rounded-full blur-xl pointer-events-none" />
                        </>
                      )}
                      {isSubProvidentFund && (
                        <>
                          <div
                            className="absolute -right-2 -bottom-2 w-48 h-28 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-35 group-hover:opacity-60 rounded"
                            style={{ backgroundImage: `url('/images/provident-fund.png')` }}
                          />
                          <div className="absolute right-0 bottom-0 w-36 h-24 bg-radial from-indigo-500/20 via-blue-100/10 to-transparent rounded-full blur-xl pointer-events-none" />
                        </>
                      )}
                      {isSubProfessionalTax && (
                        <>
                          <div
                            className="absolute -right-2 -bottom-2 w-48 h-28 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-35 group-hover:opacity-60 rounded"
                            style={{ backgroundImage: `url('/images/professional-tax.png')` }}
                          />
                          <div className="absolute right-0 bottom-0 w-36 h-24 bg-radial from-amber-500/20 via-orange-100/10 to-transparent rounded-full blur-xl pointer-events-none" />
                        </>
                      )}
                      {isSubLabourLicense && (
                        <>
                          <div
                            className="absolute -right-2 -bottom-2 w-48 h-28 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-35 group-hover:opacity-60 rounded"
                            style={{ backgroundImage: `url('/images/labour-license.png')` }}
                          />
                          <div className="absolute right-0 bottom-0 w-36 h-24 bg-radial from-amber-500/20 via-orange-100/10 to-transparent rounded-full blur-xl pointer-events-none" />
                        </>
                      )}
                      {isSubTradeLicense && (
                        <>
                          <div
                            className="absolute -right-2 -bottom-2 w-48 h-28 bg-cover bg-no-repeat bg-center pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-35 group-hover:opacity-60 rounded"
                            style={{ backgroundImage: `url('/images/trade-license.png')` }}
                          />
                          <div className="absolute right-0 bottom-0 w-36 h-24 bg-radial from-amber-500/20 via-yellow-100/10 to-transparent rounded-full blur-xl pointer-events-none" />
                        </>
                      )}
                      {isSubPartnership && (
                        <>
                          <div
                            className="absolute -right-2 -bottom-2 w-48 h-28 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-30 group-hover:opacity-55 rounded"
                            style={{ backgroundImage: `url('/images/partnership.png')` }}
                          />
                          <div className="absolute right-0 bottom-0 w-36 h-24 bg-radial from-blue-400/20 via-sky-100/10 to-transparent rounded-full blur-xl pointer-events-none" />
                        </>
                      )}
                      {isSubTcs && (
                        <>
                          <div
                            className="absolute -right-2 -bottom-2 w-48 h-28 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-30 group-hover:opacity-55 rounded"
                            style={{ backgroundImage: `url('/images/tcs.png')` }}
                          />
                          <div className="absolute right-0 bottom-0 w-36 h-24 bg-radial from-amber-400/20 via-yellow-100/10 to-transparent rounded-full blur-xl pointer-events-none" />
                        </>
                      )}
                      {isSubEsi && (
                        <>
                          <div
                            className="absolute -right-2 -bottom-2 w-48 h-28 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-30 group-hover:opacity-55 rounded"
                            style={{ backgroundImage: `url('/images/esi.png')` }}
                          />
                          <div className="absolute right-0 bottom-0 w-36 h-24 bg-radial from-purple-400/20 via-indigo-100/10 to-transparent rounded-full blur-xl pointer-events-none" />
                        </>
                      )}
                      {isSubGst && (
                        <>
                          <div
                            className="absolute -right-2 -bottom-2 w-48 h-28 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-30 group-hover:opacity-55"
                            style={{ backgroundImage: `url('/images/gst.png')` }}
                          />
                          <div className="absolute right-0 bottom-0 w-36 h-24 bg-radial from-amber-300/20 via-orange-100/10 to-transparent rounded-full blur-xl pointer-events-none" />
                        </>
                      )}
                      {isSubTds && (
                        <>
                          <div
                            className="absolute -right-2 -bottom-2 w-48 h-28 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-25 group-hover:opacity-45"
                            style={{ backgroundImage: `url('/images/tds.png')` }}
                          />
                          <div className="absolute right-0 bottom-0 w-36 h-24 bg-radial from-slate-300/20 via-blue-100/10 to-transparent rounded-full blur-xl pointer-events-none" />
                        </>
                      )}
                      {isSubTax && (
                        <>
                          <div
                            className="absolute -right-2 -bottom-2 w-36 h-36 bg-contain bg-no-repeat bg-right-bottom pointer-events-none transition-all duration-500 group-hover:scale-105 opacity-25 group-hover:opacity-40"
                            style={{ backgroundImage: `url('/images/tax-filing.png')` }}
                          />
                          <div className="absolute right-0 bottom-0 w-32 h-32 bg-radial from-blue-300/20 to-transparent rounded-full blur-xl pointer-events-none" />
                        </>
                      )}
                      <div className="space-y-3 relative z-10">
                        <h4 className="text-base font-bold text-[#080B12] group-hover:text-[#163E8C] transition-colors">
                          {sub.name}
                        </h4>
                        <p className="text-xs text-[#687386] leading-relaxed">
                          {sub.description}
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-slate-100 relative z-10 space-y-2">
                        <div>
                          <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                            Applicable For:
                          </span>
                          <p className="text-xs font-medium text-[#163E8C]">
                            {sub.suitableFor}
                          </p>
                        </div>
                        {subSlug && subSlug !== slug && (
                          <div className="pt-1">
                            <Link
                              href={`/services/${subSlug}`}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#163E8C] hover:text-[#0B2458] group-hover:underline"
                            >
                              <span>Explore Detailed Practice Guide</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Key Requirements and Documents Checklist */}
            <div className="space-y-6">
              <div className="border-t border-slate-200 pt-12">
                <span className="text-xs font-bold uppercase tracking-wider text-[#163E8C] bg-[#EAF1FF] px-2.5 py-1 rounded">
                  Document Readiness
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#080B12] mt-2">
                  Key Requirements &amp; Documentation Checklist
                </h2>
                <p className="text-xs text-[#687386] max-w-2xl mt-1">
                  Having these records organized accelerates portal verification
                  and minimizes departmental scrutiny.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.keyRequirements.map((req, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200/90 space-y-4"
                  >
                    <div className="flex items-center gap-2 text-sm font-bold text-[#080B12]">
                      <FileCheck className="w-4 h-4 text-[#163E8C]" />
                      <span>{req.title}</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#687386]">
                      {req.items.map((doc, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-[#163E8C] font-bold">&bull;</span>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: General Process Steps */}
            <div className="space-y-6">
              <div className="border-t border-slate-200 pt-12">
                <span className="text-xs font-bold uppercase tracking-wider text-[#163E8C] bg-[#EAF1FF] px-2.5 py-1 rounded">
                  Procedural Roadmap
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-[#080B12] mt-2">
                  The General Process Workflow
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs"
                  >
                    <span className="text-xs font-bold text-[#163E8C] font-mono bg-[#EAF1FF] px-2.5 py-1 rounded">
                      STAGE 0{step.step}
                    </span>
                    <h4 className="text-sm font-bold text-[#080B12]">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#687386] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Regulatory Disclaimer Banner for this Service */}
            <div className="p-5 rounded-2xl bg-[#EAF1FF]/40 border border-blue-200 text-xs text-slate-700 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#163E8C] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="text-[#080B12] font-semibold">
                  Important Regulatory Notice:
                </strong>
                <p className="leading-relaxed">{category.regulatoryNotice}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Consultation Section for this Service */}
        <div id="service-enquiry">
          <ConsultationForm initialService={category.title} />
        </div>
      </>
    );
  }

  // ==========================================
  // VIEW B: INDIVIDUAL SERVICE PRACTICE PAGE (e.g. tax-filing, provident-fund, trade-license, etc.)
  // ==========================================
  const service = individualService!;
  const visual = SERVICE_VISUALS[service.slug];
  const relatedServices = allServices
    .filter((s) => s.categorySlug === service.categorySlug && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <PageHero
        badge={`${service.category} Practice`}
        title={service.name}
        subtitle={service.description}
        breadcrumbs={[
          { name: "Services", href: "/services" },
          { name: service.category, href: `/services/${service.categorySlug}` },
          { name: service.name },
        ]}
      />

      <section className="py-16 sm:py-20 bg-white font-serif">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Top Navigation Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <Link
              href={`/services/${service.categorySlug}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#163E8C] hover:text-[#0B2458] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to {service.category} Hub</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/services"
                className="text-xs font-semibold text-slate-500 hover:text-[#163E8C] transition-colors"
              >
                All 15 Practices Directory
              </Link>
              <span className="text-slate-300">•</span>
              <a
                href="#service-enquiry"
                className="text-xs font-bold text-[#163E8C] hover:underline"
              >
                Fast Enquiry ↓
              </a>
            </div>
          </div>

          {/* Main 2-Column Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column (8 cols): Overview, Suitability, Steps */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-12">
              {/* Overview & Scope */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#163E8C] bg-[#EAF1FF] px-2.5 py-1 rounded inline-block">
                  Practice Scope &amp; Advisory
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#080B12]">
                  What {service.name} Entails
                </h2>
                <p className="text-base text-slate-700 leading-relaxed font-medium">
                  {service.description}
                </p>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-sm text-slate-600 leading-relaxed">
                  {service.whatItMeans}
                </div>
              </div>

              {/* Suitability / Who Needs It */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-bold text-[#080B12]">
                  <Search className="w-5 h-5 text-[#163E8C]" />
                  <span>Who Needs This Service?</span>
                </div>
                <p className="text-xs text-slate-500">
                  This statutory practice is structured to assist the following entity profiles:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.suitability.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3 hover:border-blue-200 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-800 leading-snug font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Procedural Roadmap */}
              <div className="space-y-6 pt-4 border-t border-slate-200">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#163E8C] bg-[#EAF1FF] px-2.5 py-1 rounded inline-block">
                    Execution Workflow
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-[#080B12]">
                    4-Stage Procedural Roadmap
                  </h3>
                  <p className="text-xs text-slate-500">
                    How our compliance desk prepares, reviews, and submits your filings.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.processSteps.map((step) => (
                    <div
                      key={step.step}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold font-mono text-[#163E8C] bg-[#EAF1FF] px-2 py-0.5 rounded">
                          STAGE 0{step.step}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">FINCORE Method</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#080B12]">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regulatory Notice Banner */}
              <div className="p-5 rounded-2xl bg-[#EAF1FF]/40 border border-blue-200 text-xs text-slate-700 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-[#163E8C] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="text-[#080B12] font-semibold">
                    Statutory &amp; Regulatory Notice:
                  </strong>
                  <p className="leading-relaxed">{service.regulatoryNotice}</p>
                </div>
              </div>
            </div>

            {/* Right Column (4-5 cols): Visual Card, Document Checklist, Advisory Card */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6">
              {/* Visual Showcase Card */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-md">
                {visual && (
                  <div className="relative h-48 sm:h-52 w-full bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-100">
                    <img
                      src={visual.image}
                      alt={service.name}
                      className={`w-full h-full ${visual.imageClassName || "object-cover"}`}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#0B2458]/90 text-white font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                        {visual.badge}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#163E8C]">
                      {service.category}
                    </span>
                    <h3 className="text-base font-bold text-[#080B12]">
                      {service.name}
                    </h3>
                  </div>

                  {visual && visual.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {visual.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-slate-100 text-slate-700 border border-slate-200/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-2">
                    <a
                      href="#service-enquiry"
                      className="w-full py-3 px-4 rounded-xl bg-[#163E8C] text-white text-xs font-bold hover:bg-[#0B2458] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <span>Request Consultation for This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Key Documents Checklist */}
              <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#080B12]">
                  <FileCheck className="w-4 h-4 text-[#163E8C]" />
                  <span>Required Documents Checklist</span>
                </div>
                <p className="text-xs text-slate-500">
                  Keep these documents accessible for fast departmental verification:
                </p>
                <ul className="space-y-2.5">
                  {service.keyDocuments.map((doc, dIdx) => (
                    <li
                      key={dIdx}
                      className="p-2.5 rounded-lg bg-white border border-slate-200/70 text-xs text-slate-800 flex items-start gap-2.5 leading-snug"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#163E8C] shrink-0 mt-1.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Help / Working Hours Card */}
              <div className="p-5 rounded-2xl bg-[#0B2458] text-white space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-200">
                  <PhoneCall className="w-3.5 h-3.5 text-blue-300" />
                  <span>Immediate Assistance</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Have an urgent notice deadline or compliance query? Reach our senior desk directly:
                </p>
                <div className="space-y-1.5 text-xs text-slate-200 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-300 font-sans font-bold">Desk:</span>
                    <a href="tel:+919449448995" className="hover:underline text-white font-bold">
                      +91 94494 48995
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <Clock className="w-3 h-3 text-blue-300 shrink-0" />
                    <span>Mon - Sat: 9:30 AM – 6:30 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <MapPin className="w-3 h-3 text-blue-300 shrink-0" />
                    <span>HBR Layout, Bengaluru</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Practices in Same Domain */}
          {relatedServices.length > 0 && (
            <div className="pt-12 border-t border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#163E8C] bg-[#EAF1FF] px-2.5 py-1 rounded inline-block">
                    Peer Practices
                  </span>
                  <h3 className="text-xl font-bold text-[#080B12] mt-1">
                    Other Services in {service.category}
                  </h3>
                </div>
                <Link
                  href={`/services/${service.categorySlug}`}
                  className="text-xs font-semibold text-[#163E8C] hover:underline flex items-center gap-1"
                >
                  <span>Explore full domain hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedServices.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/services/${rel.slug}`}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#163E8C]">
                        {rel.category}
                      </span>
                      <h4 className="text-sm font-bold text-[#080B12] group-hover:text-[#163E8C] transition-colors">
                        {rel.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {rel.description}
                      </p>
                    </div>
                    <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#163E8C]">
                      <span>View Practice Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Embedded Consultation Section for this Service */}
      <div id="service-enquiry">
        <ConsultationForm initialService={service.name} />
      </div>
    </>
  );
}