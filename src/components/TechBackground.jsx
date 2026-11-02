import React from "react";

export default function TechBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Real High-Resolution Industrial Electronics / Circuit Photography Background */}
      <img
        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80"
        alt="Electronics Circuit Hardware Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.07] scale-105 transition-transform duration-1000"
        loading="eager"
      />

      {/* 2. Micro Circuit Trace Vector Grid Overlay */}
      <svg
        className="absolute w-full h-full opacity-[0.035] text-slate-900"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="pcbGrid" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M 0 30 L 40 30 L 60 50 L 120 50" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 30 120 L 30 80 L 50 60 L 90 60 L 105 75 L 105 120" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 70 0 L 70 20 L 90 40 L 120 40" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="40" cy="30" r="3" fill="currentColor" />
            <circle cx="60" cy="50" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="90" cy="60" r="3" fill="currentColor" />
            <circle cx="105" cy="75" r="3" fill="currentColor" />
            <rect x="10" y="70" width="8" height="14" rx="1" fill="currentColor" />
            <rect x="22" y="70" width="8" height="14" rx="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pcbGrid)" />
      </svg>

      {/* 3. Ambient Soft Radiant Lighting Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-200/25 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-100/25 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[350px] bg-sky-100/20 rounded-full blur-3xl"></div>

      {/* 4. Frosted Glass Light Translucent Overlay for All Pages */}
      <div className="absolute inset-0 bg-slate-50/85 sm:bg-slate-50/80 backdrop-blur-[0.5px]"></div>
    </div>
  );
}
