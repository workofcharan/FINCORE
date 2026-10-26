"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  ReceiptText,
  Building2,
  ShieldCheck,
  ArrowRight,
  Menu,
  X,
  PhoneCall,
  Sparkles,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { useSPA } from "@/context/SPAContext";
import { cn } from "@/lib/utils";

interface ShadcnNavbarProps {
  onOpenConsultation?: () => void;
}

export default function ShadcnNavbar({ onOpenConsultation }: ShadcnNavbarProps) {
  const spa = useSPA();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const progressRef = React.useRef<HTMLDivElement>(null);

  // Determine current active section from URL pathname
  const isHome = pathname === "/";
  const isAbout = pathname?.startsWith("/about");
  const isServices = pathname?.startsWith("/services");
  const isContact = pathname?.startsWith("/contact");

  // Throttled high-performance scroll handling via requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const shouldScrolled = scrollY > 20;
          if (shouldScrolled !== lastScrolled) {
            lastScrolled = shouldScrolled;
            setIsScrolled(shouldScrolled);
          }

          if (progressRef.current) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
            progressRef.current.style.width = `${Math.max(progress, 4)}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleConsultation = () => {
    setMobileMenuOpen(false);
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      spa.openConsultation();
    }
  };

  const getSectionLabel = () => {
    if (isHome) return "Home";
    if (isAbout) return "About Us";
    if (isServices) return "Services";
    if (isContact) return "Contact Desk";
    if (pathname?.startsWith("/privacy")) return "Privacy Policy";
    if (pathname?.startsWith("/terms")) return "Terms & Conditions";
    if (pathname?.startsWith("/disclaimer")) return "Disclaimer";
    return "Home";
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="w-full max-w-6xl pointer-events-auto">
        <div
          className={cn(
            "relative w-full rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 transition-all duration-300 flex items-center justify-between",
            "bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md shadow-slate-900/5",
            isScrolled && "shadow-lg border-slate-300/80 bg-white/98"
          )}
        >
          {/* Continuous Scroll / Location Bar along bottom of the Navbar Capsule */}
          <div className="absolute -bottom-[1px] left-6 right-6 h-[2.5px] bg-slate-100/80 rounded-full overflow-hidden pointer-events-none">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-[#163E8C] via-blue-500 to-[#163E8C] rounded-full transition-[width] duration-100 ease-out shadow-xs"
              style={{ width: "4%" }}
            />
          </div>

          {/* Brand Logo & Current Location Badge */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            >
              <div className="size-9 rounded-xl bg-gradient-to-br from-[#163E8C] to-[#0B2458] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <span className="font-bold text-lg font-heading tracking-tight">F</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-[#080B12] font-heading leading-tight group-hover:text-[#163E8C] transition-colors">
                  FINCORE
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                  Consultancy
                </span>
              </div>
            </Link>

            {/* Current Location Badge */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-[11px] font-medium text-slate-600 transition-all">
              <MapPin className="size-3 text-[#163E8C]" />
              <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">At:</span>
              <span className="font-bold text-[#163E8C]">{getSectionLabel()}</span>
            </div>
          </div>

          {/* Desktop Navigation with shadcn NavigationMenu & Active Location Bars */}
          <div className="hidden md:flex items-center justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1 relative">
                {/* 1. Home */}
                <NavigationMenuItem className="relative">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "cursor-pointer text-xs rounded-full px-3.5 py-1.5 transition-all",
                        isHome
                          ? "bg-[#EAF1FF] text-[#163E8C] font-bold"
                          : "text-slate-700 hover:text-[#163E8C] hover:bg-slate-100/70 font-semibold"
                      )}
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                  {/* Location Bar Indicator */}
                  {isHome && (
                    <span
                      className="absolute -bottom-1.5 left-3 right-3 h-[2.5px] bg-[#163E8C] rounded-full shadow-xs animate-in fade-in-0 zoom-in-95 duration-200"
                      aria-hidden="true"
                    />
                  )}
                </NavigationMenuItem>

                {/* 2. About */}
                <NavigationMenuItem className="relative">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/about"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "cursor-pointer text-xs rounded-full px-3.5 py-1.5 transition-all",
                        isAbout
                          ? "bg-[#EAF1FF] text-[#163E8C] font-bold"
                          : "text-slate-700 hover:text-[#163E8C] hover:bg-slate-100/70 font-semibold"
                      )}
                    >
                      About
                    </Link>
                  </NavigationMenuLink>
                  {/* Location Bar Indicator */}
                  {isAbout && (
                    <span
                      className="absolute -bottom-1.5 left-3 right-3 h-[2.5px] bg-[#163E8C] rounded-full shadow-xs animate-in fade-in-0 zoom-in-95 duration-200"
                      aria-hidden="true"
                    />
                  )}
                </NavigationMenuItem>

                {/* 3. Services Dropdown */}
                <NavigationMenuItem className="relative">
                  <NavigationMenuTrigger
                    onClick={() => {
                      if (pathname === "/services") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        router.push("/services");
                      }
                    }}
                    className={cn(
                      "cursor-pointer text-xs rounded-full px-3.5 py-1.5 transition-all data-popup-open:bg-slate-100/80 data-open:bg-slate-100/80",
                      isServices
                        ? "bg-[#EAF1FF] text-[#163E8C] font-bold"
                        : "text-slate-700 hover:text-[#163E8C] hover:bg-slate-100/70 font-semibold"
                    )}
                  >
                    Services
                  </NavigationMenuTrigger>
                  {/* Location Bar Indicator */}
                  {isServices && (
                    <span
                      className="absolute -bottom-1.5 left-3 right-3 h-[2.5px] bg-[#163E8C] rounded-full shadow-xs animate-in fade-in-0 zoom-in-95 duration-200"
                      aria-hidden="true"
                    />
                  )}

                  <NavigationMenuContent className="bg-white p-5 md:w-[680px] lg:w-[740px] rounded-2xl shadow-2xl border border-slate-200/90 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h4 className="text-sm font-bold text-[#080B12] font-heading">
                          Statutory Practice &amp; Advisory Directory
                        </h4>
                        <p className="text-xs text-slate-500">
                          15 specialized compliance, taxation &amp; registration practices
                        </p>
                      </div>
                      <Link
                        href="/services"
                        className="text-xs font-semibold text-[#163E8C] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All 15 Services</span>
                        <ChevronRight className="size-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {/* Column 1 */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#163E8C] uppercase tracking-wide">
                          <ReceiptText className="size-3.5" />
                          <span>Taxation &amp; Finance</span>
                        </div>
                        <ul className="space-y-1.5 text-xs">
                          <li>
                            <Link
                              href="/services/tax-filing"
                              className="block p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                            >
                              <div className="font-semibold text-slate-800 group-hover:text-[#163E8C]">
                                Income Tax (ITR) Filing
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1">
                                Individual &amp; Corporate ITR 1-7
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/services/gst-registration-filing"
                              className="block p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                            >
                              <div className="font-semibold text-slate-800 group-hover:text-[#163E8C]">
                                GST Registration &amp; Filing
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1">
                                Monthly GSTR-1, 3B &amp; Annual
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/services/accounting-bookkeeping"
                              className="block p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                            >
                              <div className="font-semibold text-slate-800 group-hover:text-[#163E8C]">
                                Accounting &amp; Bookkeeping
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1">
                                MIS, ledger &amp; balance sheets
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Column 2 */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wide">
                          <Building2 className="size-3.5" />
                          <span>Business Registration</span>
                        </div>
                        <ul className="space-y-1.5 text-xs">
                          <li>
                            <Link
                              href="/services/company-incorporation"
                              className="block p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                            >
                              <div className="font-semibold text-slate-800 group-hover:text-amber-700">
                                Private Limited Company
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1">
                                SPICe+ MCA incorporation &amp; DIN
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/services/partnership-registration"
                              className="block p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                            >
                              <div className="font-semibold text-slate-800 group-hover:text-amber-700">
                                LLP &amp; Partnership Setup
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1">
                                Deed drafting &amp; ROC filing
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/services/business-registration"
                              className="block p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                            >
                              <div className="font-semibold text-slate-800 group-hover:text-amber-700">
                                Sole Proprietorship
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1">
                                Udyam MSME &amp; fast startup setup
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Column 3 */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wide">
                          <ShieldCheck className="size-3.5" />
                          <span>Licenses &amp; Compliance</span>
                        </div>
                        <ul className="space-y-1.5 text-xs">
                          <li>
                            <Link
                              href="/services/food-license"
                              className="block p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                            >
                              <div className="font-semibold text-slate-800 group-hover:text-emerald-700">
                                FSSAI Food Business License
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1">
                                Basic, State &amp; Central licenses
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/services/trade-license"
                              className="block p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                            >
                              <div className="font-semibold text-slate-800 group-hover:text-emerald-700">
                                Municipal Trade License
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1">
                                Local commercial permits
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/services/provident-fund"
                              className="block p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                            >
                              <div className="font-semibold text-slate-800 group-hover:text-emerald-700">
                                PF &amp; ESI Payroll Compliance
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1">
                                Labour law statutory safety
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Bottom banner in dropdown */}
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-xl border border-blue-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="size-4 text-[#163E8C]" />
                        <span className="text-xs font-medium text-slate-700">
                          Need custom business structuring or audit support?
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleConsultation}
                        className="text-xs font-bold text-[#163E8C] hover:text-[#0B2458] flex items-center gap-1 cursor-pointer"
                      >
                        <span>Schedule Call</span>
                        <ArrowRight className="size-3" />
                      </button>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 4. Contact */}
                <NavigationMenuItem className="relative">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "cursor-pointer text-xs rounded-full px-3.5 py-1.5 transition-all",
                        isContact
                          ? "bg-[#EAF1FF] text-[#163E8C] font-bold"
                          : "text-slate-700 hover:text-[#163E8C] hover:bg-slate-100/70 font-semibold"
                      )}
                    >
                      Contact
                    </Link>
                  </NavigationMenuLink>
                  {/* Location Bar Indicator */}
                  {isContact && (
                    <span
                      className="absolute -bottom-1.5 left-3 right-3 h-[2.5px] bg-[#163E8C] rounded-full shadow-xs animate-in fade-in-0 zoom-in-95 duration-200"
                      aria-hidden="true"
                    />
                  )}
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleConsultation}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#163E8C] hover:bg-[#0B2458] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-md cursor-pointer group"
            >
              <span>Book Consultation</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-slate-700 hover:text-black rounded-lg hover:bg-slate-100 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel with Active Location Indicators */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-5 bg-white rounded-3xl border border-slate-200/90 shadow-2xl space-y-4 animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
              <span className="text-slate-500 font-medium">Current Location:</span>
              <span className="font-bold text-[#163E8C] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
                {getSectionLabel()}
              </span>
            </div>

            <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-800">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-3 py-2.5 rounded-xl transition-colors flex items-center justify-between",
                  isHome
                    ? "bg-[#EAF1FF] text-[#163E8C] font-bold"
                    : "hover:bg-slate-100 text-slate-700"
                )}
              >
                <span>Home</span>
                {isHome && (
                  <span className="size-2 rounded-full bg-[#163E8C]" />
                )}
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-3 py-2.5 rounded-xl transition-colors flex items-center justify-between",
                  isAbout
                    ? "bg-[#EAF1FF] text-[#163E8C] font-bold"
                    : "hover:bg-slate-100 text-slate-700"
                )}
              >
                <span>About Us</span>
                {isAbout && (
                  <span className="size-2 rounded-full bg-[#163E8C]" />
                )}
              </Link>
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-3 py-2.5 rounded-xl transition-colors flex items-center justify-between",
                  isServices
                    ? "bg-[#EAF1FF] text-[#163E8C] font-bold"
                    : "hover:bg-slate-100 text-slate-700"
                )}
              >
                <span>Services (15 Practices)</span>
                {isServices ? (
                  <span className="size-2 rounded-full bg-[#163E8C]" />
                ) : (
                  <span className="text-[10px] font-mono bg-blue-100 text-[#163E8C] px-2 py-0.5 rounded-full">
                    Directory
                  </span>
                )}
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-3 py-2.5 rounded-xl transition-colors flex items-center justify-between",
                  isContact
                    ? "bg-[#EAF1FF] text-[#163E8C] font-bold"
                    : "hover:bg-slate-100 text-slate-700"
                )}
              >
                <span>Contact &amp; Office</span>
                {isContact && (
                  <span className="size-2 rounded-full bg-[#163E8C]" />
                )}
              </Link>
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleConsultation}
                className="w-full py-2.5 rounded-xl bg-[#163E8C] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <PhoneCall className="size-3.5" />
                <span>Book Direct Consultation</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
