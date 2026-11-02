import React from "react";
import { Link } from "react-router-dom";

export default function EnterpriseBanner({ compact = false }) {
  const pillars = [
    { label: "SEMICONDUCTORS", query: "Semiconductors & Discretes" },
    { label: "PASSIVE COMPONENTS", query: "Passive Components" },
    { label: "ACTIVE COMPONENTS", query: "Semiconductors & Discretes" },
    { label: "ELECTRONIC SOLUTIONS", query: "Embedded & Dev Boards" }
  ];

  return (
    <div className="w-full relative rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-md">
      
      {/* Original Pure Banner Container */}
      <div
        className={`w-full flex flex-col items-center justify-center ${
          compact ? "py-6 px-4" : "py-8 sm:py-12 md:py-14 px-4 sm:px-8"
        } text-center bg-white`}
      >
        {/* Emblem Graphic: Faithful high-precision vector recreation of the original banner design */}
        <div className="relative flex items-center justify-center w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] aspect-[16/10] my-1">
          <svg
            viewBox="0 0 500 320"
            className="w-full h-full drop-shadow-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="ElectroChip Enterprise AS Brand Emblem"
          >
            {/* Glowing Deep Cyan Orbital Ring looping around the A and S */}
            <path
              d="M 68,185 C 40,140 110,85 240,85 C 370,85 460,135 435,175 C 415,205 340,225 240,225 C 150,225 90,205 68,185 Z"
              stroke="#0284c7"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray="420 40 180"
              className="opacity-95"
            />
            {/* Inner glowing cyan accent line */}
            <path
              d="M 68,185 C 40,140 110,85 240,85 C 370,85 460,135 435,175 C 415,205 340,225 240,225 C 150,225 90,205 68,185 Z"
              stroke="#38bdf8"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Stylized Modern 'A' Glyph (Navy / Deep Dark Steel) */}
            <g fill="#0b1a30">
              <polygon points="160,50 205,50 255,225 210,225 195,170 145,170 128,225 80,225" />
            </g>
            {/* A counter cutout */}
            <polygon points="172,82 188,140 152,140" fill="#ffffff" />

            {/* Junction Accent Via Dot between A and S */}
            <circle cx="270" cy="210" r="14" fill="#0b1a30" />

            {/* Stylized 'S' Glyph with Circuit Trace Bars */}
            <g fill="#0b1a30">
              <path d="M 275,108 C 275,82 300,70 350,70 L 415,70 L 415,98 L 350,98 C 328,98 318,104 318,114 C 318,124 330,130 355,134 L 388,140 C 430,147 452,168 452,198 C 452,232 418,245 365,245 L 280,245 L 280,217 L 365,217 C 392,217 406,210 406,198 C 406,186 392,179 365,174 L 332,168 C 295,160 275,142 275,108 Z" />
            </g>

            {/* PCB Circuit Traces on Top-Right of 'S' */}
            <path
              d="M 405,82 L 435,82 L 452,62 L 472,62"
              stroke="#0b1a30"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="478" cy="62" r="7" fill="#0284c7" stroke="#0b1a30" strokeWidth="4" />

            <path
              d="M 390,102 L 420,102 L 436,118 L 458,118"
              stroke="#0b1a30"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="465" cy="118" r="7" fill="#0284c7" stroke="#0b1a30" strokeWidth="4" />

            {/* PCB Circuit Traces on Bottom-Right of 'S' */}
            <path
              d="M 395,208 L 420,208 L 438,190 L 460,190"
              stroke="#0b1a30"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="467" cy="190" r="7" fill="#0284c7" stroke="#0b1a30" strokeWidth="4" />

            <path
              d="M 390,230 L 430,230 L 450,250 L 472,250"
              stroke="#0b1a30"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="478" cy="250" r="7" fill="#0284c7" stroke="#0b1a30" strokeWidth="4" />
          </svg>
        </div>

        {/* Brand Name Typography matching the original banner layout */}
        <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-1.5">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[0.22em] text-[#0b1a30] uppercase text-balance">
            E N T E R P R I S E S
          </div>
          <div className="text-xs sm:text-sm font-semibold tracking-widest text-sky-700 uppercase">
            ElectroChip Division
          </div>
        </div>

        {/* Divider with Tagline */}
        <div className="w-full max-w-2xl my-3 sm:my-5 flex items-center justify-center gap-2 sm:gap-4 px-2">
          <div className="h-[1.5px] bg-slate-300 flex-1 max-w-[120px] sm:max-w-[180px]"></div>
          <p className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.14em] text-slate-700 uppercase whitespace-nowrap">
            COMPONENTS TODAY &nbsp;FOR A BRIGHTER TOMORROW
          </p>
          <div className="h-[1.5px] bg-slate-300 flex-1 max-w-[120px] sm:max-w-[180px]"></div>
        </div>

      </div>

      {/* Bottom 4-Pillars Strip matching original design */}
      <div className="w-full border-t border-slate-200/90 bg-slate-50 py-3 px-3 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-y-2 gap-x-3 sm:gap-x-6 text-[10px] sm:text-xs md:text-sm font-bold tracking-wider text-slate-700 uppercase">
          {pillars.map((pillar, idx) => (
            <React.Fragment key={pillar.label}>
              <Link
                to={`/products?category=${encodeURIComponent(pillar.query)}`}
                className="hover:text-sky-700 hover:underline transition-colors py-1 px-1.5 rounded focus:outline-none focus:ring-1 focus:ring-sky-600 whitespace-nowrap"
              >
                {pillar.label}
              </Link>
              {idx < pillars.length - 1 && (
                <span className="text-slate-300 select-none hidden sm:inline" aria-hidden="true">
                  |
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>
  );
}
