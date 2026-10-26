"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ServiceItem } from "@/data/servicesData";

export interface ServiceCardModernProps {
  service: ServiceItem;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  accentColor: string;
  glowColor: string;
  bullets: string[];
  stats: { value: string; label: string }[];
  backgroundImage?: string;
  className?: string;
}

export function ServiceCardModern({
  service,
  href,
  icon: Icon,
  gradient,
  accentColor,
  glowColor,
  bullets,
  stats,
  backgroundImage,
  className,
}: ServiceCardModernProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col justify-between rounded-3xl bg-white p-7 sm:p-8",
        "border border-slate-200/80 shadow-md shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-300/60",
        "hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer overflow-hidden select-none block",
        className
      )}
    >
      {/* Dynamic bottom-right warm aura matching reference image */}
      <div
        className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl z-0"
        style={{ background: glowColor }}
      />

      {/* Standardized Related Card Background Image */}
      {backgroundImage && (
        <div className="absolute top-0 right-0 w-56 sm:w-64 h-48 sm:h-52 overflow-hidden pointer-events-none rounded-tr-3xl z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center opacity-30 group-hover:opacity-55 group-hover:scale-108 transition-all duration-500 ease-out"
          />
          {/* Multi-directional gradient wash ensuring seamless blend into card */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
      )}

      {/* Top right subtle accent dot */}
      <span
        className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full transition-all duration-300 group-hover:scale-125 opacity-70 group-hover:opacity-100 z-10"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />

      {/* Card Content Top */}
      <div className="relative z-10">
        {/* Squircle Gradient Icon Badge */}
        <div
          className={cn(
            "w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white shadow-md shadow-slate-900/10",
            "group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ease-out",
            gradient
          )}
        >
          <Icon className="w-6.5 h-6.5 sm:w-7 sm:h-7 text-white stroke-[2.2]" />
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-5 group-hover:text-[#163E8C] transition-colors duration-200 font-heading">
          {service.name}
        </h3>

        {/* 2-line Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5 line-clamp-2">
          {service.description}
        </p>

        {/* 4 Feature Points with Accent Colored Bullets */}
        <ul className="space-y-2.5 my-6">
          {bullets.map((bullet, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2.5 text-xs text-slate-700 font-medium"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0 group-hover:scale-125 transition-transform"
                style={{ backgroundColor: accentColor }}
              />
              <span className="truncate">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom 3-Metric Strip */}
      <div className="pt-5 border-t border-slate-100 grid grid-cols-3 gap-2 relative z-10 bg-white/60 backdrop-blur-xs rounded-xl px-2 -mx-2">
        {stats.map((st, idx) => (
          <div key={idx} className="flex flex-col">
            <span
              className="text-sm sm:text-base font-extrabold tracking-tight"
              style={{ color: accentColor }}
            >
              {st.value}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5 truncate">
              {st.label}
            </span>
          </div>
        ))}
      </div>
    </Link>
  );
}
