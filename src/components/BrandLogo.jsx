import React from "react";
import { Link } from "react-router-dom";

export default function BrandLogo({ showTagline = false, size = "md", linkToHome = true }) {
  const isSm = size === "sm";
  const isLg = size === "lg";

  const content = (
    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
      {/* Precision Vector Emblem inspired directly by uploaded logo */}
      <svg
        className={
          isSm 
            ? "w-7 h-7 sm:w-8 sm:h-8 shrink-0" 
            : isLg 
            ? "w-10 h-10 sm:w-12 sm:h-12 shrink-0" 
            : "w-8 h-8 sm:w-10 sm:h-10 shrink-0"
        }
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ElectroChip Enterprise Brand Mark"
      >
        {/* Deep Tech Navy Background circle soft container */}
        <rect width="120" height="120" rx="14" fill="#0f2442" />
        
        {/* Orbital Cyan Energy Ellipse Ring */}
        <path
          d="M 12,68 C 10,42 36,22 72,25 C 102,28 116,46 110,60 C 104,74 80,88 46,84 C 24,81 13,74 12,68 Z"
          stroke="var(--accent, #0284c7)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeDasharray="140 10"
        />

        {/* Dynamic 'A' Structure */}
        <polygon
          points="40,24 55,24 68,88 53,88 48,66 32,66 26,88 12,88"
          fill="#ffffff"
        />
        {/* 'A' Counter hole */}
        <polygon points="40,38 45,54 35,54" fill="#0f2442" />

        {/* Dynamic 'S' Structure with Circuit Traces */}
        <path
          d="M 64,48 C 64,40 70,36 82,36 L 98,36 L 98,46 L 78,46 C 74,46 72,48 72,51 C 72,54 75,56 80,57 L 90,60 C 100,63 104,70 104,77 C 104,86 96,92 82,92 L 62,92 L 62,82 L 82,82 C 87,82 90,80 90,77 C 90,74 87,72 82,71 L 72,68 C 66,65 64,58 64,48 Z"
          fill="#38bdf8"
        />

        {/* Circuit Trace Extensions & Solder Via Nodes */}
        {/* Trace 1 Top right */}
        <path d="M 98,40 L 110,40" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="110" cy="40" r="3" fill="#38bdf8" />
        
        {/* Trace 2 Middle right */}
        <path d="M 102,62 L 112,62" stroke="var(--accent, #0284c7)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="112" cy="62" r="3" fill="#ffffff" />

        {/* Trace 3 Bottom right */}
        <path d="M 92,86 L 106,86" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="106" cy="86" r="3" fill="#38bdf8" />
      </svg>

      <div className="flex flex-col min-w-0">
        <div className="flex items-baseline gap-1 sm:gap-1.5 leading-none truncate">
          <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg md:text-xl truncate">
            ElectroChip
          </span>
          <span className="font-semibold text-sky-700 tracking-widest text-[10px] sm:text-xs uppercase shrink-0">
            Enterprise
          </span>
        </div>
        
        {showTagline && (
          <span className="text-[9px] sm:text-[10px] text-slate-500 tracking-wide font-medium mt-0.5 sm:mt-1 uppercase truncate">
            Components Today for a Brighter Tomorrow
          </span>
        )}
      </div>
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="inline-flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 rounded min-w-0">
        {content}
      </Link>
    );
  }

  return content;
}
