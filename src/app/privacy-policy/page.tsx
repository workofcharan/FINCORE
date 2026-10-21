import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy | FINCORE Consultancy Services",
  description:
    "Data protection practices and client privacy policy for FINCORE CONSULTANCY SERVICES in compliance with Indian regulatory standards.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        badge="Legal & Governance"
        title="Privacy Policy"
        subtitle="How FINCORE collects, handles, stores, and protects client information during consultation and statutory filing coordination."
        breadcrumbs={[{ name: "Privacy Policy" }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-[#080B12]">
          <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200/90 text-xs sm:text-sm text-[#687386] leading-relaxed">
            <strong className="text-[#080B12]">
              Commitment to Client Data Confidentiality:
            </strong>{" "}
            FINCORE CONSULTANCY SERVICES recognizes that financial ledgers, tax
            declarations, and corporate documents are sensitive assets. We treat
            all records with the highest degree of confidentiality and adhere to
            sound data protection practices under Indian law.
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-[#080B12] flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#163E8C]" />
              <span>1. Information We Collect</span>
            </h2>
            <p className="text-sm text-[#687386] leading-relaxed">
              When you submit a consultation request through our website, we
              collect:
            </p>
            <ul className="list-disc pl-6 text-xs sm:text-sm text-[#687386] space-y-1">
              <li>Your full name, email address, and telephone number</li>
              <li>Entity classification (Individual vs. Commercial Business)</li>
              <li>Proposed or registered business name (if applicable)</li>
              <li>Practice category required and brief narrative of requirements</li>
              <li>Preferred contact method and consent records</li>
            </ul>
            <p className="text-sm text-[#687386] leading-relaxed">
              Once an engagement scope is formally agreed upon, we may collect
              statutory documentation such as PAN cards, Aadhaar KYC, electricity
              bills, rent agreements, bank statements, or prior ITRs strictly for
              the purpose of preparing your application or return.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-[#080B12] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#163E8C]" />
              <span>2. Purpose of Data Processing</span>
            </h2>
            <p className="text-sm text-[#687386] leading-relaxed">
              We process your information solely for:
            </p>
            <ul className="list-disc pl-6 text-xs sm:text-sm text-[#687386] space-y-1">
              <li>Reviewing eligibility and preparing consultation scope estimates</li>
              <li>Drafting statutory registration, licensing, and return schedules</li>
              <li>Communicating filing status, official acknowledgements, and notices</li>
              <li>Complying with applicable Indian laws and regulatory recordkeeping</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-[#080B12] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#163E8C]" />
              <span>3. Data Protection & Non-Disclosure</span>
            </h2>
            <p className="text-sm text-[#687386] leading-relaxed">
              FINCORE does not sell, trade, rent, or lease your personal or
              business records to marketing agencies, lead brokers, or third
              parties. Your information is shared exclusively with:
            </p>
            <ul className="list-disc pl-6 text-xs sm:text-sm text-[#687386] space-y-1">
              <li>
                Authorized government portals (MCA, Income Tax, GSTN, FSSAI) as
                mandated to execute your requested filings
              </li>
              <li>
                Professional certifiers (such as independent practicing CAs or
                CSs) when statutory attestation is required by law
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-[#080B12] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#163E8C]" />
              <span>4. Contact Our Privacy Desk</span>
            </h2>
            <p className="text-sm text-[#687386] leading-relaxed">
              If you have any questions regarding your personal information or
              wish to request updates to your records, contact our privacy desk
              at{" "}
              <a
                href={`mailto:${siteConfig.email.value}`}
                className="text-[#163E8C] font-semibold underline"
              >
                {siteConfig.email.display}
              </a>
              .
            </p>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#687386]">
            <span>Last Updated: October 2026</span>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:text-[#163E8C]">
                Terms & Conditions
              </Link>
              <Link href="/disclaimer" className="hover:text-[#163E8C]">
                Disclaimer
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
