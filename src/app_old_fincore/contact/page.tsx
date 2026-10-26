import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import ConsultationForm from "@/components/ConsultationForm";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ShieldAlert,
  FileText,
  Loader2,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Contact & Consultation | FINCORE Consultancy Services",
  description:
    "Request a consultation or contact FINCORE CONSULTANCY SERVICES for your taxation, company registration, accounting, and licensing requirements in India.",
};

interface ContactPageProps {
  searchParams: Promise<{
    service?: string;
  }>;
}

async function ContactFormWrapper({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const params = await searchParams;
  const initialService = params?.service || "Tax Filing";
  return <ConsultationForm initialService={initialService} />;
}

export default function ContactPage({ searchParams }: ContactPageProps) {
  return (
    <>
      <PageHero
        badge="Connect With Our Advisory Desk"
        title="Contact & Consultation Helpdesk"
        subtitle="Have a question about your tax filing, business registration, or compliance calendar? Reach out to our team or submit your requirement below for a structured consultation proposal."
        breadcrumbs={[{ name: "Contact" }]}
      />

      {/* Office & Direct Communication Cards */}
      <section className="py-12 bg-white border-b border-slate-200 font-serif">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone Card / Online Consultation Desk Card */}
            {siteConfig.phone.isConfigured && siteConfig.phone.display ? (
              <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200/80 card-interactive hover:shadow-lg space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#163E8C] flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Enquiry Line
                  </span>
                  <p className="text-sm font-bold text-[#080B12] mt-0.5">
                    {siteConfig.phone.display}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Available during standard business hours
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200/80 card-interactive hover:shadow-lg space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#163E8C] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Consultation Desk
                  </span>
                  <p className="text-sm font-bold text-[#080B12] mt-0.5">
                    Online Inquiries Active
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Direct call line provided upon request
                  </p>
                </div>
              </div>
            )}

            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#163E8C] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Direct Email
                </span>
                <p className="text-sm font-bold text-[#080B12] mt-0.5">
                  {siteConfig.email.display}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  For document checklists & scopes
                </p>
              </div>
            </div>

            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#163E8C] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Office Location
                </span>
                <p className="text-sm font-bold text-[#080B12] mt-0.5">
                  {siteConfig.address.street}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  {siteConfig.address.city}, {siteConfig.address.state},{" "}
                  {siteConfig.address.country}
                </p>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#163E8C] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Consultation Hours
                </span>
                <p className="text-xs font-bold text-[#080B12] mt-0.5">
                  Mon - Fri: 9:30 AM - 6:30 PM
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Sat: 10:00 AM - 2:30 PM IST
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Consultation Form Section wrapped in Suspense for Next.js 16 Partial Prerender */}
      <Suspense
        fallback={
          <div className="py-24 text-center bg-white flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#163E8C]" />
            <p className="text-xs text-slate-500">Loading consultation desk...</p>
          </div>
        }
      >
        <ContactFormWrapper searchParams={searchParams} />
      </Suspense>

      {/* Direct WhatsApp Prompt Banner */}
      <section className="py-12 bg-[#F5F7FA] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#163E8C] text-white mx-auto shadow-md">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#080B12]">
            Need a Quick WhatsApp Response?
          </h3>
          <p className="text-xs sm:text-sm text-[#687386] max-w-xl mx-auto">
            You can message our enquiry desk directly on WhatsApp. Once official
            messaging details are connected, queries will be routed directly to
            the assigned compliance specialist.
          </p>
          <div>
            <a
              href={
                siteConfig.whatsapp.isConfigured && siteConfig.whatsapp.number
                  ? `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
                      siteConfig.whatsapp.message
                    )}`
                  : "#consultation"
              }
              target={
                siteConfig.whatsapp.isConfigured && siteConfig.whatsapp.number
                  ? "_blank"
                  : undefined
              }
              rel={
                siteConfig.whatsapp.isConfigured && siteConfig.whatsapp.number
                  ? "noopener noreferrer"
                  : undefined
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#163E8C] hover:bg-[#0B2458] transition-colors"
            >
              <span>
                {siteConfig.whatsapp.isConfigured
                  ? "Connect on WhatsApp"
                  : "Submit Consultation Request"}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="py-8 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-[#163E8C] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Public Inquiry Integrity:</strong> Never transmit bank
              account login credentials, tax portal passwords, or credit card
              details via public web inquiry forms. FINCORE will only request
              verified business records through formal, encrypted client channels
              after executing a mutual scope arrangement.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}