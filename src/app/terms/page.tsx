import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { FileText, ShieldAlert, Scale, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Terms and Conditions | FINCORE Consultancy Services",
  description:
    "Standard terms of service and engagement framework for FINCORE CONSULTANCY SERVICES in India.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        badge="Engagement Terms"
        title="Terms and Conditions"
        subtitle="Standard terms governing website usage, consultation inquiries, and professional service engagements with FINCORE CONSULTANCY SERVICES."
        breadcrumbs={[{ name: "Terms & Conditions" }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-[#080B12]">
          <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200/90 text-xs sm:text-sm text-[#687386] leading-relaxed">
            These Terms and Conditions govern your access to the website of{" "}
            <strong className="text-[#080B12]">{siteConfig.legalName}</strong>{" "}
            and establish the preliminary framework for consultation and service
            delivery. By accessing this platform or submitting an enquiry, you
            agree to these terms.
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-[#080B12] flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#163E8C]" />
              <span>1. Consultation & Engagement Framework</span>
            </h2>
            <p className="text-sm text-[#687386] leading-relaxed">
              Submitting an enquiry via our web forms does not automatically
              establish an attorney-client or formal professional retainership.
              A formal engagement is constituted only upon:
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#687386] pl-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#163E8C] shrink-0 mt-0.5" />
                <span>Mutual written agreement on specific service scope and deliverables</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#163E8C] shrink-0 mt-0.5" />
                <span>Submission of verified, required client documentation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#163E8C] shrink-0 mt-0.5" />
                <span>Payment of agreed professional and applicable statutory government fees</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-[#080B12] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#163E8C]" />
              <span>2. Government & Statutory Fees</span>
            </h2>
            <p className="text-sm text-[#687386] leading-relaxed">
              Consultancy fee estimates provided by FINCORE are exclusive of
              official government portal fees, stamp duties, municipal levies,
              and statutory penalty charges, unless explicitly stated as an
              inclusive commercial quote. Government fees are paid directly to
              the statutory authorities or disbursed on the client&apos;s
              behalf against official government payment receipts.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-[#080B12] flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#163E8C]" />
              <span>3. Limitation of Liability & Force Majeure</span>
            </h2>
            <p className="text-sm text-[#687386] leading-relaxed">
              FINCORE shall not be liable for any delays, loss of business, or
              administrative rejections caused by:
            </p>
            <ul className="list-disc pl-6 text-xs sm:text-sm text-[#687386] space-y-1">
              <li>Incomplete, fraudulent, or delayed documentation provided by the client</li>
              <li>Government portal downtime, server failures, or unexpected regulatory policy changes</li>
              <li>Rejection of proposed company names, trademarks, or trade permits by statutory registrars</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-[#080B12] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#163E8C]" />
              <span>4. Governing Law & Jurisdiction</span>
            </h2>
            <p className="text-sm text-[#687386] leading-relaxed">
              These terms shall be governed by and construed in accordance with
              the laws of India. Any disputes arising out of or related to these
              terms or services rendered shall be subject to the exclusive
              jurisdiction of the competent courts in {siteConfig.address.city},{" "}
              {siteConfig.address.state}, India.
            </p>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#687386]">
            <span>Last Updated: October 2026</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-[#163E8C]">
                Privacy Policy
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
