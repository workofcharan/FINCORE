import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  breadcrumbs?: BreadcrumbItem[];
}

export default function PageHero({
  badge,
  title,
  subtitle,
  breadcrumbs = [],
}: PageHeroProps) {
  return (
    <section className="bg-gradient-to-b from-[#F5F8FF] via-white to-white text-[#080B12] pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 relative overflow-hidden border-b border-blue-100">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-enterprise-grid opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none animate-subtle-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
        {/* Breadcrumb Navigation */}
        {breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-slate-500 font-medium pb-1 animate-section-reveal"
          >
            <Link
              href="/"
              className="hover:text-[#163E8C] transition-colors"
            >
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-[#163E8C] transition-colors"
                  >
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-[#163E8C] font-semibold">{crumb.name}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <div className="animate-section-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#163E8C] shadow-2xs">
            {badge}
          </div>
        )}

        {/* Title */}
        <h1 className="animate-section-reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#080B12] leading-tight font-heading">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="animate-hero-subtitle text-base sm:text-lg text-slate-700 max-w-3xl leading-relaxed font-normal">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
