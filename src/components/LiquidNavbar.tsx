"use client";

import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";
import { Home, Briefcase, CircleUser, Mail, ArrowRight } from "lucide-react";
import { useSPA } from "@/context/SPAContext";

interface NavLink {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const NAV_LINKS: NavLink[] = [
  { id: "hero", label: "Home", href: "#hero", icon: Home },
  { id: "about", label: "About", href: "#about", icon: CircleUser },
  { id: "services", label: "Services", href: "#services", icon: Briefcase },
  { id: "contact", label: "Contact", href: "#contact", icon: Mail },
];

interface LiquidNavbarProps {
  onOpenConsultation?: () => void;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function LiquidNavbar({ onOpenConsultation }: LiquidNavbarProps) {
  const spa = useSPA();
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState<string>("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Measurements for the sliding embossed liquid glass bubble
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Secondary liquid hover droplet measurements
  const [hoverStyle, setHoverStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Mouse coordinate tracker for dynamic liquid glass light refraction
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, visible: false });

  const navRef = useRef<HTMLElement | null>(null);
  const linksContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Smoothly measure and update the active liquid bubble position
  const updateIndicator = useCallback((targetId: string) => {
    const target = itemRefs.current[targetId];
    const container = linksContainerRef.current;
    if (target && container) {
      const targetRect = target.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      if (targetRect.width > 0) {
        setIndicatorStyle({
          left: targetRect.left - containerRect.left,
          width: targetRect.width,
          opacity: 1,
        });
        setIsReady(true);
      }
    }
  }, []);

  // Sync active section based on route or scroll position
  useEffect(() => {
    if (pathname && pathname !== "/") {
      if (pathname.startsWith("/about")) {
        setActiveSection("about");
        return;
      }
      if (pathname.startsWith("/services")) {
        setActiveSection("services");
        return;
      }
      if (pathname.startsWith("/contact")) {
        setActiveSection("contact");
        return;
      }
    }

    const sectionIds = ["contact", "services", "about", "hero"];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Top of page
      if (window.scrollY < 120) {
        setActiveSection("hero");
        return;
      }

      // Bottom of page -> contact
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        setActiveSection("contact");
        return;
      }

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 120) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Synchronously measure on mount and resize
  useIsomorphicLayoutEffect(() => {
    updateIndicator(activeSection);

    const handleResize = () => {
      updateIndicator(activeSection);
    };

    window.addEventListener("resize", handleResize);
    const timeout = setTimeout(() => updateIndicator(activeSection), 50);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, [activeSection, updateIndicator]);

  // Pointer movement tracking for liquid light refraction
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, visible: false }));
    setHoveredSection(null);
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  // Hover over individual tabs
  const handleItemHover = (id: string) => {
    setHoveredSection(id);
    if (id === activeSection) {
      setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const target = itemRefs.current[id];
    const container = linksContainerRef.current;
    if (target && container) {
      const targetRect = target.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setHoverStyle({
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        opacity: 1,
      });
    }
  };

  const handleItemLeave = () => {
    setHoveredSection(null);
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  // Smooth scroll or navigate
  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith("#")) {
      const targetId = href.replace("#", "");
      setActiveSection(targetId);

      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        if (typeof window !== "undefined" && window.history.pushState) {
          window.history.pushState(null, "", href);
        }
      } else {
        window.location.href = "/" + href;
      }
    } else {
      window.location.href = href;
    }
  };

  // Open consultation modal
  const handleConsultationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      spa.openConsultation();
    }
  };

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="w-full max-w-4xl pointer-events-auto flex flex-col items-center">
        {/* =============================================================
            TRANSLUCENT LIQUID GLASS CAPSULE (MATCHING REFERENCE)
            ============================================================= */}
        <nav
          ref={navRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          role="navigation"
          aria-label="Main Navigation"
          className="group relative flex items-center justify-between w-full rounded-full py-2 sm:py-2.5 px-3.5 sm:px-5 transition-all duration-500 select-none liquid-crystal-capsule"
        >
          {/* Concentric Inner Liquid Glass Bevel Contour */}
          <div className="liquid-crystal-inner-rim" />

          {/* Top Specular Glare Crest (Signature Optical Light Catch) */}
          <div className="liquid-specular-crest" />

          {/* Ambient Outer Halo Pulse */}
          <div className="pointer-events-none absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-400/20 via-white/15 to-sky-400/20 blur-xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700 animate-liquid-glow" />

          {/* Dynamic Interactive Pointer Refraction Light */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 overflow-hidden"
            style={{
              opacity: mousePos.visible ? 1 : 0,
              background: `radial-gradient(190px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.22), rgba(147, 197, 253, 0.12) 40%, transparent 80%)`,
            }}
          />

          {/* =============================================================
              1. BRAND LOGO & 3D LIQUID ORB
              ============================================================= */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick("#hero", e)}
            className="relative z-10 flex items-center gap-2 sm:gap-2.5 px-2 py-1 rounded-full group/logo transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 shrink-0"
          >
            {/* 3D Liquid Orb */}
            <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0">
              <div className="absolute inset-0 rounded-full bg-sky-300/40 blur-sm animate-liquid-orb" />
              <div
                className="relative w-full h-full rounded-full overflow-hidden shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),0_2px_8px_rgba(0,0,0,0.5)]"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #BAE6FD 0%, #38BDF8 35%, #2563EB 75%, #0B1E48 100%)",
                }}
              >
                <svg
                  className="absolute inset-0 w-full h-full opacity-75 animate-liquid-spin"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="3.5"
                    strokeDasharray="18 12 8 16"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="25"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="2.5"
                    strokeDasharray="12 10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="12"
                    fill="rgba(255,255,255,0.7)"
                  />
                </svg>
                <div className="absolute top-1 left-1.5 w-2 h-1.5 rounded-full bg-white blur-[0.2px] -rotate-45 pointer-events-none" />
              </div>
            </div>

            {/* Typography */}
            <span className="font-heading font-extrabold text-[15px] sm:text-[16px] tracking-[0.06em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] group-hover/logo:text-sky-100 transition-colors">
              FINCORE
            </span>
          </a>

          {/* =============================================================
              2. CENTER LIQUID GLASS DOCK (4 ICONS: HOME, ABOUT, SERVICES, CONTACT)
              ============================================================= */}
          <div
            ref={linksContainerRef}
            className="hidden md:flex relative items-center p-1 rounded-full bg-white/[0.08] border border-white/[0.25] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.25)] shrink-0"
          >
            {/* Sliding Embossed Liquid Glass Active Bubble */}
            {isReady && (
              <div
                className="absolute top-1 bottom-1 rounded-full pointer-events-none z-0 liquid-glass-bubble"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                  opacity: indicatorStyle.opacity,
                }}
              />
            )}

            {/* Hover Droplet */}
            <div
              className="absolute top-1 bottom-1 rounded-full pointer-events-none z-0 transition-all duration-200 ease-out"
              style={{
                left: `${hoverStyle.left}px`,
                width: `${hoverStyle.width}px`,
                opacity: hoverStyle.opacity,
                background: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            />

            {/* The 4 Liquid Glass Items */}
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              const isHovered = hoveredSection === link.id;
              const useStaticActive = isActive && !isReady;
              const Icon = link.icon;

              return (
                <a
                  key={link.id}
                  ref={(el) => {
                    itemRefs.current[link.id] = el;
                  }}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, e)}
                  onMouseEnter={() => handleItemHover(link.id)}
                  onMouseLeave={handleItemLeave}
                  className={`group/item relative z-10 flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full transition-all duration-300 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    useStaticActive ? "liquid-glass-bubble" : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Clean Minimalist Outline Icon (Matching Reference) */}
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive
                        ? "icon-liquid-active scale-105"
                        : "icon-liquid-inactive group-hover/item:scale-105"
                    }`}
                    strokeWidth={1.8}
                  />

                  {/* Sleek Label on Desktop */}
                  <span
                    className={`hidden lg:inline text-[13.5px] tracking-tight transition-all duration-200 ${
                      isActive
                        ? "text-white font-bold drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
                        : "text-white/80 group-hover/item:text-white font-medium"
                    }`}
                  >
                    {link.label}
                  </span>

                  {/* Floating Liquid Glass Tooltip on Hover (for icon-centric view) */}
                  <div
                    className={`lg:hidden pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[11px] font-medium text-white bg-slate-900/90 backdrop-blur-md border border-white/30 shadow-lg transition-all duration-200 ${
                      isHovered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-1"
                    }`}
                  >
                    {link.label}
                  </div>
                </a>
              );
            })}
          </div>

          {/* =============================================================
              3. LIQUID GLASS CTA BUTTON ("Consultation")
              ============================================================= */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleConsultationClick}
              className="group/btn relative inline-flex items-center justify-center px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full overflow-hidden liquid-btn-glass cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98] shrink-0"
            >
              {/* Fluid Shimmer Wave Beam */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/45 to-transparent" />

              {/* Pulsing Liquid Cyan Beacon */}
              <span className="relative flex h-2 w-2 mr-1.5 sm:mr-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_10px_#38BDF8]" />
              </span>

              {/* CTA Label */}
              <span className="relative z-10 text-[12.5px] sm:text-[13.5px] font-semibold text-white tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] whitespace-nowrap">
                <span className="hidden sm:inline">Consultation</span>
                <span className="sm:hidden">Consult</span>
              </span>

              {/* Micro-animated Right Arrow */}
              <ArrowRight className="hidden sm:inline-block w-3.5 h-3.5 ml-1.5 text-white opacity-85 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all duration-200 shrink-0" />
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.12] hover:bg-white/[0.2] border border-white/35 transition-all text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
              aria-label={isMobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-3.5 h-2.5 flex flex-col justify-between items-center">
                <span
                  className={`block h-0.5 w-3.5 bg-white rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-3.5 bg-white rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-3.5 bg-white rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* =============================================================
            4. MOBILE LIQUID GLASS DRAWER
            ============================================================= */}
        {isMobileMenuOpen && (
          <div className="md:hidden w-full mt-2 rounded-3xl liquid-crystal-capsule p-3.5 animate-fade-in-up">
            <div className="flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                const Icon = link.icon;

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-[14.5px] font-medium transition-all duration-200 ${
                      isActive
                        ? "liquid-glass-bubble text-white font-bold"
                        : "text-white/80 hover:text-white hover:bg-white/[0.12]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? "icon-liquid-active" : "icon-liquid-inactive"
                        }`}
                        strokeWidth={1.8}
                      />
                      <span>{link.label}</span>
                    </div>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#FFFFFF]" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                    )}
                  </a>
                );
              })}

              <div className="pt-2 mt-1 border-t border-white/15">
                <button
                  type="button"
                  onClick={handleConsultationClick}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl liquid-btn-glass text-white font-semibold text-[14px] shadow-lg active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
