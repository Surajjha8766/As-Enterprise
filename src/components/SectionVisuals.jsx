import React from "react";

// Realistic Silicon Chip & Semiconductor Die Visual
export function SemiconductorVisual({ className = "w-full h-40" }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-linear-to-br from-slate-900 via-slate-800 to-sky-950 flex items-center justify-center p-3 shadow-inner ${className}`}>
      <svg viewBox="0 0 240 160" className="w-full h-full drop-shadow-md" fill="none">
        <defs>
          <linearGradient id="waferGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="chipMetal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* Silicon Wafer Grid Backdrop */}
        <circle cx="120" cy="80" r="70" fill="url(#waferGrad)" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 2" />
        
        {/* QFP / QFN Microcontroller IC Package */}
        <rect x="75" y="40" width="90" height="80" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="2" />
        <circle cx="85" cy="50" r="3" fill="#64748b" />

        {/* Laser Etched Die Text */}
        <text x="120" y="75" fill="#f8fafc" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="1">
          ELECTROCHIP
        </text>
        <text x="120" y="90" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">
          SEMICONDUCTOR
        </text>

        {/* Quad Gull-Wing Metal Lead Pins (Top, Bottom, Left, Right) */}
        {/* Top Pins */}
        {[85, 95, 105, 115, 125, 135, 145, 155].map((x) => (
          <rect key={x} x={x - 2} y="32" width="4" height="9" fill="url(#chipMetal)" rx="1" />
        ))}
        {/* Bottom Pins */}
        {[85, 95, 105, 115, 125, 135, 145, 155].map((x) => (
          <rect key={x} x={x - 2} y="119" width="4" height="9" fill="url(#chipMetal)" rx="1" />
        ))}
        {/* Left Pins */}
        {[50, 60, 70, 80, 90, 100, 110].map((y) => (
          <rect key={y} x="67" y={y - 2} width="9" height="4" fill="url(#chipMetal)" rx="1" />
        ))}
        {/* Right Pins */}
        {[50, 60, 70, 80, 90, 100, 110].map((y) => (
          <rect key={y} x="164" y={y - 2} width="9" height="4" fill="url(#chipMetal)" rx="1" />
        ))}

        {/* Electric circuit connection trace glowing */}
        <path d="M 120 40 L 120 15 L 180 15" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="180" cy="15" r="3" fill="#38bdf8" />
      </svg>
      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-[10px] font-mono text-sky-400 border border-sky-500/30">
        QFP-64 Semiconductor
      </div>
    </div>
  );
}

// Realistic SMD Carrier Tape & Reel Visual for Passives
export function PassiveReelVisual({ className = "w-full h-40" }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center p-3 shadow-inner ${className}`}>
      <svg viewBox="0 0 240 160" className="w-full h-full drop-shadow-md" fill="none">
        <defs>
          <linearGradient id="tapePlastic" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="solderPad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>

        {/* 7-inch Plastic Component Reel Flange */}
        <circle cx="65" cy="80" r="55" fill="#0f172a" stroke="#475569" strokeWidth="3" />
        <circle cx="65" cy="80" r="35" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <circle cx="65" cy="80" r="14" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
        <text x="65" y="83" fill="#94a3b8" fontSize="7" fontFamily="sans-serif" textAnchor="middle">10K REEL</text>

        {/* Embossed Carrier Tape peeling off to the right */}
        <path d="M 65 30 L 220 30 L 220 70 L 65 70" fill="url(#tapePlastic)" stroke="#475569" strokeWidth="1.5" />
        
        {/* Sprocket Holes on top edge of tape */}
        {[75, 95, 115, 135, 155, 175, 195, 215].map((x) => (
          <circle key={x} cx={x} cy="37" r="3" fill="#020617" stroke="#64748b" strokeWidth="0.5" />
        ))}

        {/* SMD 0402 Chip Components sitting in pocket cavities */}
        {[85, 125, 165, 205].map((x) => (
          <g key={x}>
            {/* Pocket well */}
            <rect x={x - 12} y="44" width="24" height="20" rx="2" fill="#020617" stroke="#334155" />
            {/* 0402 ceramic body */}
            <rect x={x - 9} y="47" width="18" height="14" rx="1.5" fill="#0f172a" stroke="#475569" />
            {/* Silver electrodes */}
            <rect x={x - 9} y="47" width="4" height="14" fill="url(#solderPad)" />
            <rect x={x + 5} y="47" width="4" height="14" fill="url(#solderPad)" />
            <text x={x} y="57" fill="#e2e8f0" fontSize="5" fontFamily="monospace" textAnchor="middle">102</text>
          </g>
        ))}

        {/* Clear mylar cover tape reflection highlight */}
        <line x1="65" y1="42" x2="220" y2="42" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" />
      </svg>
      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
        0402 Tape &amp; Reel
      </div>
    </div>
  );
}

// Realistic Digital Inspection Microscope Visual for Quality Lab
export function LabMicroscopeVisual({ className = "w-full h-44" }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-linear-to-br from-slate-900 via-sky-950 to-slate-900 flex items-center justify-center p-3 shadow-inner ${className}`}>
      <svg viewBox="0 0 240 160" className="w-full h-full drop-shadow-md" fill="none">
        <defs>
          <linearGradient id="scopeMetal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>

        {/* Crosshair optical measurement reticle overlay */}
        <circle cx="120" cy="80" r="62" fill="none" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />
        <circle cx="120" cy="80" r="42" fill="none" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
        <line x1="40" y1="80" x2="200" y2="80" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.5" />
        <line x1="120" y1="15" x2="120" y2="145" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.5" />

        {/* Magnified Solder Joint Pad in Crosshairs */}
        <rect x="90" y="55" width="60" height="50" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        {/* Molten meniscus solder joint */}
        <path d="M 90 70 C 105 75 135 75 150 70 L 150 100 C 135 105 105 105 90 100 Z" fill="url(#scopeMetal)" />
        <circle cx="120" cy="85" r="4" fill="#38bdf8" fillOpacity="0.4" />

        {/* Digital Inspection Scale Indicators */}
        <text x="50" y="30" fill="#38bdf8" fontSize="8" fontFamily="monospace">MAG: 50.0X</text>
        <text x="50" y="42" fill="#94a3b8" fontSize="7" fontFamily="monospace">PITCH: 0.50mm</text>
        <text x="185" y="30" fill="#10b981" fontSize="8" fontFamily="monospace" textAnchor="end">PASS: JEDEC</text>
        <text x="185" y="42" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="end">COPLANAR: OK</text>
      </svg>
      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-[10px] font-mono text-sky-400 border border-sky-500/30">
        50x Optical Reticle
      </div>
    </div>
  );
}

// Realistic SMT High-Speed Feeder for BOM Calculator
export function SmtFeederVisual({ className = "w-full h-44" }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center p-3 shadow-inner ${className}`}>
      <svg viewBox="0 0 240 160" className="w-full h-full drop-shadow-md" fill="none">
        <defs>
          <linearGradient id="machineMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* Automated SMT Feeder Chassis */}
        <rect x="30" y="30" width="180" height="100" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="2" />
        <rect x="40" y="40" width="160" height="24" rx="2" fill="#1e293b" />
        
        {/* Status LED indicators */}
        <circle cx="50" cy="52" r="3" fill="#10b981" />
        <circle cx="62" cy="52" r="3" fill="#38bdf8" />
        <text x="75" y="55" fill="#f8fafc" fontSize="8" fontFamily="monospace" fontWeight="bold">SMT FEEDER · LANE 04</text>
        <text x="185" y="55" fill="#10b981" fontSize="7" fontFamily="monospace" textAnchor="end">READY</text>

        {/* Indexing Gear & Tape Track */}
        <rect x="40" y="72" width="160" height="45" rx="3" fill="#020617" stroke="#1e293b" />
        {/* Sprocket drive wheel */}
        <circle cx="70" cy="94" r="15" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="6 3" />
        <circle cx="70" cy="94" r="6" fill="#334155" />

        {/* Component Tape Track */}
        <line x1="85" y1="94" x2="190" y2="94" stroke="#0284c7" strokeWidth="3" />
        {[100, 125, 150, 175].map((x) => (
          <rect key={x} x={x - 5} y="88" width="10" height="12" rx="1" fill="url(#machineMetal)" />
        ))}
      </svg>
      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-[10px] font-mono text-sky-400 border border-sky-500/30">
        Yamaha/Juki Feeder SMT
      </div>
    </div>
  );
}
