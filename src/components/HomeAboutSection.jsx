import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { 
  ShieldCheck, 
  PackageCheck, 
  Layers, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Award,
  Microscope,
  FileSpreadsheet,
  Building2
} from "lucide-react";

export default function HomeAboutSection() {
  const { openRfqModal } = useCart();

  const corePillars = [
    {
      icon: ShieldCheck,
      title: "100% Manufacturer Traceability",
      desc: "Every component is logged with factory lot date codes, unbroken reels, and manufacturer Certificates of Conformance (CoC)."
    },
    {
      icon: Microscope,
      title: "AS9120B & ISO 9001:2015 Quality",
      desc: "In-house lab conducts 50x optical inspection, solvent resistance marking checks, and parametric tolerance testing."
    },
    {
      icon: Zap,
      title: "Same-Day Dispatch & Buffer Stock",
      desc: "Ready stock packaged in anti-static ESD bags with humidity indicator cards and dispatched within 24 business hours."
    },
    {
      icon: FileSpreadsheet,
      title: "Consolidated BOM Kitting & RFQ",
      desc: "Engineers can submit entire project spreadsheets for automated line-by-line pricing and single-shipment logistics."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-t border-slate-200/80 pt-12 sm:pt-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & Enterprise Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold uppercase tracking-wider mb-3">
                <Building2 className="w-3.5 h-3.5" />
                <span>About ElectroChip Enterprise</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                Precision Electronic Procurement Engineered by Hardware Specialists
              </h2>
              
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                ElectroChip Enterprise operates as an authorized distributor of precision microelectronics, discrete semiconductors, and passive components. Founded to eliminate grey-market counterfeit risks and supply chain friction, we deliver audited inventory directly to aerospace, automotive, industrial robotics, and medical device manufacturers.
              </p>
            </div>

            {/* 4 Feature Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {corePillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div key={idx} className="glass-card rounded-xl p-3.5 space-y-1.5 border border-white/90">
                    <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-100">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-xs">
                      {pillar.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-normal">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/about"
                className="btn-primary py-2.5 px-5 text-xs font-semibold inline-flex items-center gap-2"
              >
                <span>Read Full Company Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => openRfqModal()}
                className="btn-secondary py-2.5 px-4 text-xs font-semibold bg-white/90"
              >
                <span>Request Custom Sourcing</span>
              </button>
            </div>

          </div>

          {/* Right Column: High-Resolution Electronics Lab Photography with Glassmorphic Overlay Badges */}
          <div className="lg:col-span-6 relative">
            
            {/* Ambient Background Glow */}
            <div className="absolute -inset-2 bg-linear-to-tr from-sky-400/20 to-blue-600/20 rounded-3xl blur-2xl opacity-60 pointer-events-none"></div>

            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/90 shadow-2xl bg-slate-950 group">
              
              {/* Real Cleanroom & SMT Inspection Photography */}
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                alt="ElectroChip Quality Inspection Cleanroom and Electronics Lab"
                className="w-full h-[360px] sm:h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* High-tech Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/30 to-transparent"></div>

              {/* Floating Glassmorphic Badge: Top Right ISO Standards */}
              <div className="absolute top-4 right-4 glass-card rounded-xl p-3 border border-white/80 shadow-lg backdrop-blur-md max-w-[210px]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-400/40">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-300 font-bold block uppercase tracking-wider">
                      CERTIFIED PROTOCOL
                    </span>
                    <span className="text-xs font-bold text-white block">
                      ISO 9001:2015 &amp; AS9120B
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Glassmorphic Badge: Bottom Left Testing Metrics */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto glass-card rounded-xl p-4 border border-white/80 shadow-lg backdrop-blur-md sm:max-w-xs">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-300 uppercase block font-semibold">
                      INSPECTION AUDIT
                    </span>
                    <span className="text-lg font-bold text-white font-mono">
                      500,000+
                    </span>
                    <span className="text-[11px] text-slate-200 block">
                      Components verified with 0.00% defect tolerance
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-cyan-300 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
