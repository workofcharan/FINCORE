import {
  FileText,
  Building2,
  Receipt,
  BookOpenCheck,
  CheckCircle2,
} from "lucide-react";

export default function HighlightsBar() {
  const highlights = [
    {
      num: "01",
      title: "Comprehensive Financial Support",
      description: "Structured advisory for individuals and growing businesses",
      icon: FileText,
    },
    {
      num: "02",
      title: "Business Registration Assistance",
      description: "End-to-end documentation for Private Limited, LLP & Firms",
      icon: Building2,
    },
    {
      num: "03",
      title: "Tax & GST Compliance",
      description: "Accurate filing, timely submissions & credit reconciliation",
      icon: Receipt,
    },
    {
      num: "04",
      title: "Accounting & Bookkeeping",
      description: "Organized ledgers, expense tracking & trial balance readiness",
      icon: BookOpenCheck,
    },
  ];

  return (
    <section className="bg-[#FAF9F6] border-b border-slate-200/80 py-10 sm:py-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-[#0B1426] border border-slate-200 flex items-center justify-center group-hover:bg-[#0B1426] group-hover:text-white transition-all duration-300 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400 group-hover:text-amber-600 transition-colors">
                    {item.num}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-[#080B12] tracking-tight leading-snug group-hover:text-[#163E8C] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
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
