import {
  Layers,
  Users,
  FileCheck2,
  CalendarCheck2,
  MessagesSquare,
  Sparkles,
} from "lucide-react";

export default function WhyChooseSection() {
  const benefits = [
    {
      title: "One Place for Multiple Consultancy Needs",
      description:
        "Manage business formation, tax returns, regular bookkeeping, and licensing requirements without juggling multiple disconnected agents.",
      icon: Layers,
    },
    {
      title: "Individual & Business-Focused Solutions",
      description:
        "Service scopes tailored precisely to whether you are a salaried individual filing an ITR, a tech startup incorporating an LLP, or an operating enterprise.",
      icon: Users,
    },
    {
      title: "Clear Documentation Guidance",
      description:
        "Detailed, structured checklists upfront so you know exactly which proofs, identity records, and agreements are needed without last-minute surprises.",
      icon: FileCheck2,
    },
    {
      title: "Organized Compliance Support",
      description:
        "Systematic tracking of central, state, and municipal statutory schedules to support timely submissions and reduce penalty risks.",
      icon: CalendarCheck2,
    },
    {
      title: "Professional Communication",
      description:
        "Prompt, transparent, and direct communication regarding your filing status, document queries, and official acknowledgements.",
      icon: MessagesSquare,
    },
    {
      title: "Convenient Enquiry & Consultation",
      description:
        "Simple digital enquiry submission, rapid requirements intake, and structured follow-ups via your preferred communication channel.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-[#0B1426] text-xs font-semibold uppercase tracking-wider border border-slate-200">
            <span>Operational Standards &amp; Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#080B12] font-heading">
            Why Choose FINCORE?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Delivering clarity, structured coordination, and rigorous procedural
            execution for your financial and statutory commitments.
          </p>
        </div>

        {/* Clean Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-slate-400 hover:shadow-xl card-interactive space-y-4 group transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F5F7FA] text-[#163E8C] border border-slate-200/80 flex items-center justify-center group-hover:bg-[#163E8C] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#080B12] tracking-tight group-hover:text-[#163E8C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#687386] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
