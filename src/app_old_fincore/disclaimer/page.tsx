import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { ShieldAlert, FileText, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Professional & Regulatory Disclaimer | FINCORE Consultancy Services",
  description:
    "Official regulatory disclaimer, legal jurisdiction notice, statutory limitations, and scope of consultancy services provided by FINCORE CONSULTANCY SERVICES in India.",
};

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        badge="Regulatory Notice"
        title="Professional & Statutory Disclaimer"
        subtitle="Transparent disclosures regarding our consultancy scope, authority approvals, government timelines, and regulatory limitations."
        breadcrumbs={[{ name: "Disclaimer" }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-[#080B12]">
          {/* Key Callout Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#EAF1FF]/60 border border-blue-200 space-y-4">
            <div className="flex items-center gap-3 text-lg font-bold text-[#163E8C]">
              <ShieldAlert className="w-6 h-6 shrink-0" />
              <span>Core Operational Disclaimer</span>
            </div>
            <p className="text-sm text-[#080B12] leading-relaxed">
              {siteConfig.disclaimer}
            </p>
          </div>

          {/* Section 1: Scope of Advisory Services */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-[#080B12] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#163E8C]" />
              <span>1. Nature & Scope of Advisory Services</span>
            </h2>
            <p className="text-sm text-[#687386] leading-relaxed">
              FINCORE CONSULTANCY SERVICES operates as a private commercial
              consultancy providing administrative facilitation, accounting
              compilation, documentation collation, and e-filing coordination.
              FINCORE is not a government agency, not affiliated with the Ministry
              of Corporate Affairs (MCA), the Income Tax Department, the Goods
              and Services Tax Network (GSTN), or any municipal corporation.
            </p>
            <p className="text-sm text-[#687386] leading-relaxed">
              Where specific statutes mandate certification or representation by
              practicing chartered accountants, company secretaries, cost
              accountants, or advocates (such as Section 44AB Tax Audits,
              statutory company audits, or court litigation), such specialized
              attestations are conducted strictly through independently authorized
              practitioners in compliance with the Chartered Accountants Act,
              1949 and Advocates Act, 1961.
            </p>
          </div>

          {/* Section 2: No Guaranteed Approvals or Outcomes */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-[#080B12] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#163E8C]" />
              <span>2. No Guaranteed Government Approvals or Timelines</span>
            </h2>
            <p className="text-sm text-[#687386] leading-relaxed">
              All registrations, statutory licenses, tax assessment orders, and
              corporate charters are issued solely at the discretion of the
              competent government authorities after their independent review of
              submitted documentation, site inspections (where mandated), and
              statutory scrutiny.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#687386] pl-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#163E8C] shrink-0 mt-0.5" />
                <span>
                  FINCORE does NOT guarantee corporate name approval by the
                  Registrar of Companies (RoC).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#163E8C] shrink-0 mt-0.5" />
                <span>
                  FINCORE does NOT guarantee tax refunds, reduced tax liability,
                  or absence of statutory scrutiny from the Income Tax
                  Department.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#163E8C] shrink-0 mt-0.5" />
                <span>
                  FINCORE does NOT guarantee specific timeframes for government
                  portal processing, as departmental queues and server downtime
                  are beyond our control.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3: Client Responsibility for Accuracy */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-[#080B12] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#163E8C]" />
              <span>3. Client Responsibility & Truthfulness of Records</span>
            </h2>
            <p className="text-sm text-[#687386] leading-relaxed">
              Clients are strictly responsible for providing authentic, complete,
              and legally valid documents, financial registers, bank statements,
              and identity proofs. FINCORE relies entirely on the accuracy and
              completeness of the information furnished by the client and shall
              not be liable for penalties, delays, or rejections resulting from
              falsified, misstated, or omitted documentation.
            </p>
          </div>

          {/* Section 4: Informational Content Only */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-[#080B12] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#163E8C]" />
              <span>4. Website Content & General Guidance</span>
            </h2>
            <p className="text-sm text-[#687386] leading-relaxed">
              The articles, checklists, FAQs, and service descriptions published
              on this website are intended exclusively for general guidance and
              informational purposes. They do not constitute formal legal or tax
              opinions. Indian laws and compliance rates change periodically
              through official notifications and budget amendments; clients must
              execute a specific engagement scope with our consultancy to receive
              binding advisory tailored to their current scenario.
            </p>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#687386]">
            <span>Last Updated: October 2026</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-[#163E8C]">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#163E8C]">
                Terms & Conditions
              </Link>
              <Link href="/contact" className="hover:text-[#163E8C]">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
