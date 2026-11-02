import React from "react";
import { ShieldCheck, Microscope, Flame, Zap, CheckCircle2 } from "lucide-react";

export default function QualityLabSection() {
  const protocols = [
    {
      title: "Optical & Marking Verification",
      icon: Microscope,
      standard: "MIL-STD-883 Method 2009",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      desc: "50x digital microscopic audit of component package dimensions, pin coplanarity, mold compound texture, and laser etching clarity against original manufacturer wafer specifications.",
      metric: "100% Visual Lot Audit"
    },
    {
      title: "Parametric LCR & Tolerance Testing",
      icon: Zap,
      standard: "IEC 60115 / EIA-481",
      image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80",
      desc: "Precision four-wire Kelvin sensing of chip resistor tolerances (±1% vs ±5%), DC bias characteristics, and resonant frequencies before reel respooling.",
      metric: "±0.05% Sensing Accuracy"
    },
    {
      title: "J-STD-033 Moisture Conditioning",
      icon: Flame,
      standard: "IPC/JEDEC J-STD-033D",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      desc: "Dry-bake chambers at 125°C to eliminate micro-moisture absorption. Vacuum sealing in heavy foil MBB with cobalt-free humidity indicator cards.",
      metric: "<5% RH Maintained"
    },
    {
      title: "ANSI/ESD S20.20 Static Control",
      icon: ShieldCheck,
      standard: "ANSI/ESD S20.20-2021",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
      desc: "Continuous conductive dissipative flooring, grounded wrist straps, and ionizer airflow benches across all sorting and fulfillment lines.",
      metric: "<100V Static Dissipation"
    }
  ];

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-700 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Inspection &amp; Reliability Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Component Quality Assurance &amp; Verification Suite
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every semiconductor reel, passive tray, and development board passes verified physical and parametric inspection to prevent assembly line rework and counterfeit intrusion.
          </p>
        </div>

        {/* 4 Frosted Glass Quality Cards with Real Laboratory Photography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {protocols.map((proto, idx) => {
            const Icon = proto.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-xl overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Real Laboratory & Testing Photography */}
                  <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                    <img
                      src={proto.image}
                      alt={proto.title}
                      className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/30 to-transparent"></div>
                    
                    {/* Floating Icon Badge */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-md text-sky-800 flex items-center justify-center shrink-0 border border-white/80 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Standard Badge */}
                    <div className="absolute bottom-2 left-3 right-3">
                      <span className="text-[10px] font-mono text-sky-200 block drop-shadow-sm truncate">
                        {proto.standard}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-700 transition-colors">
                      {proto.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {proto.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 mt-2">
                  <div className="pt-3 border-t border-slate-100/90 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Bench Metric:</span>
                    <span className="font-bold text-sky-800 font-mono">{proto.metric}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Lab Traceability Certificate Banner with Glassmorphic Container */}
        <div className="glass-panel rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs border border-white/90 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100/90 text-emerald-800 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                Certificate of Conformance (CoC) Available Upon Request
              </span>
              <span className="text-slate-500 text-[11px]">
                Traceable date codes, lot numbers, and manufacturer test reports included with commercial bulk dispatches.
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-600 bg-white/90 px-3 py-1.5 rounded-md border border-slate-200 shrink-0 font-medium">
            Audit Level: JEDEC-A114 Compliant
          </span>
        </div>

      </div>
    </section>
  );
}
