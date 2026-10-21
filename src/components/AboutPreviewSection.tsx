import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Compass,
  FileCheck,
  Scale,
} from "lucide-react";

export default function AboutPreviewSection() {
  const values = [
    {
      title: "Clear Communication & Practical Guidance",
      description:
        "We translate complex statutory jargon into straightforward, actionable requirements tailored to your scenario.",
      icon: Compass,
    },
    {
      title: "Organized Documentation & Filing Support",
      description:
        "Every application, challan, and schedule is prepared with systematic checklists to eliminate omissions.",
      icon: FileCheck,
    },
    {
      title: "Tailored to Individual & Business Scales",
      description:
        "Whether you are an independent freelancer or an expanding enterprise, our workflow aligns with your exact transaction volume.",
      icon: Scale,
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Mission & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#EAF1FF] text-[#163E8C] text-xs font-semibold uppercase tracking-wider border border-blue-200/50">
              About FINCORE Consultancy Services
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#080B12] leading-tight">
              Simplifying Finance. <br />
              <span className="text-[#163E8C] italic">Empowering Businesses.</span>
            </h2>

            <p className="text-base text-[#687386] leading-relaxed">
              FINCORE CONSULTANCY SERVICES is a dedicated consultancy firm
              focused on helping individuals, startups, entrepreneurs, and
              commercial entities navigate India&apos;s dynamic financial,
              taxation, and corporate regulatory landscape.
            </p>

            <p className="text-sm text-[#687386] leading-relaxed">
              From corporate incorporation and municipal licensing to day-to-day
              bookkeeping and GST compliance, we manage procedural complexities
              so founders and professionals can direct their focus toward
              sustainable growth.
            </p>

            {/* Core Commitments */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 group">
                <CheckCircle2 className="w-5 h-5 text-[#163E8C] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-[#080B12] font-medium leading-snug">
                  Support throughout the entire registration and compliance lifecycle.
                </span>
              </div>
              <div className="flex items-start gap-3 group">
                <CheckCircle2 className="w-5 h-5 text-[#163E8C] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-[#080B12] font-medium leading-snug">
                  Transparent service scope with clear documentation prerequisites.
                </span>
              </div>
              <div className="flex items-start gap-3 group">
                <CheckCircle2 className="w-5 h-5 text-[#163E8C] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-[#080B12] font-medium leading-snug">
                  Professional client communication and prompt query handling.
                </span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/about"
                className="btn-hover-shine inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#163E8C] hover:bg-[#0B2458] transition-all shadow-sm hover:shadow-md"
              >
                <span>Read Full About Us</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold text-[#163E8C] hover:text-[#0B2458] transition-colors"
              >
                Contact Our Advisors &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Values & Advisory Approach Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#F5F7FA] rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-[#080B12] tracking-tight">
                Our Advisory Approach
              </h3>

              <div className="space-y-4">
                {values.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-slate-200/60 shadow-xs card-interactive space-y-1.5 hover:border-blue-300"
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#080B12]">
                        <div className="p-1.5 rounded-md bg-[#EAF1FF] text-[#163E8C] transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-[#687386] leading-relaxed pl-8">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Regulatory Integrity Note */}
              <div className="p-3.5 rounded-lg bg-[#EAF1FF]/60 border border-blue-200 text-xs text-[#163E8C] flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-[#163E8C] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  We believe in verified accuracy. We avoid unverified claims or
                  misleading guarantees, focusing on sound legal preparation and
                  transparent compliance.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
