import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, PackageCheck, Cpu, ArrowRight, Layers, FileSpreadsheet, Building2, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Hero Header with Real Electronic Cleanroom Photography */}
      <div className="relative rounded-2xl overflow-hidden border border-white/80 shadow-md">
        <div className="absolute inset-0 z-0 bg-slate-950">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80"
            alt="Semiconductor Cleanroom Facility"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/60 to-slate-950/90"></div>
        </div>

        <div className="relative z-10 p-6 sm:p-12 max-w-3xl space-y-4 bg-white/85 sm:bg-white/80 backdrop-blur-md">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-800 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-700" />
            <span>About ElectroChip Enterprise</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Reliable Supply Chain for Electronic Components and Semiconductor Solutions
          </h1>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            ElectroChip Enterprise was established to bridge the gap between high-volume manufacturer production reels and the agile prototyping needs of hardware engineers, embedded developers, and industrial manufacturing teams.
          </p>
        </div>
      </div>

      {/* Core Competencies with Glassmorphic Cards & Real Imagery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-xl overflow-hidden flex flex-col justify-between shadow-xs">
          <div>
            <div className="h-36 w-full overflow-hidden bg-slate-900 relative">
              <img
                src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80"
                alt="Semiconductors"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 to-transparent"></div>
              <div className="absolute top-3 left-3 w-8 h-8 rounded bg-white/90 backdrop-blur-xs text-sky-800 flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h2 className="text-base font-bold text-slate-900">
                Semiconductor &amp; Discrete Distribution
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supplying standard active components, small-signal transistors (e.g. P2N2222A), operational amplifiers, microcontrollers, and application-specific integrated circuits with full lot traceability.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl overflow-hidden flex flex-col justify-between shadow-xs">
          <div>
            <div className="h-36 w-full overflow-hidden bg-slate-900 relative">
              <img
                src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80"
                alt="Passive Components"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 to-transparent"></div>
              <div className="absolute top-3 left-3 w-8 h-8 rounded bg-white/90 backdrop-blur-xs text-sky-800 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h2 className="text-base font-bold text-slate-900">
                Passive &amp; Electromechanical Lines
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Stocking precision SMD chip resistors (Walsin WR04X series), potentiometers (3386P series), high-reliability through-hole LEDs, DPDT switches, and custom dielectric capacitors.
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl overflow-hidden flex flex-col justify-between shadow-xs">
          <div>
            <div className="h-36 w-full overflow-hidden bg-slate-900 relative">
              <img
                src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80"
                alt="Prototyping & Lab"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 to-transparent"></div>
              <div className="absolute top-3 left-3 w-8 h-8 rounded bg-white/90 backdrop-blur-xs text-sky-800 flex items-center justify-center">
                <PackageCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h2 className="text-base font-bold text-slate-900">
                Prototyping &amp; Lab Consumables
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Providing MB-102 solderless breadboards, 40-pin Dupont jumper ribbons, single-sided phenolic copper clad PCBs, soldering stations, and rosin core solder wire for assembly benches.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sourcing Integrity Statement */}
      <div className="glass-panel rounded-xl p-6 sm:p-8 space-y-6 border border-white/90 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Our Quality &amp; Sourcing Integrity Standard
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Honest procurement without unverified or fabricated certification badges.
          </p>
        </div>

        <div className="prose text-xs sm:text-sm text-slate-600 space-y-4 max-w-none leading-relaxed">
          <p>
            In the electronic component industry, counterfeit avoidance and accurate manufacturer part number (MPN) validation are vital. ElectroChip Enterprise maintains strict supplier audit procedures to ensure that every chip resistor, transistor, and sensor module delivered to our clients corresponds exactly to the manufacturer datasheet specifications.
          </p>
          <p>
            We do not make unsubstantiated claims regarding unverified quality badges or fabricated ISO/AS9100 accreditations. Instead, we provide authentic transparency: we provide manufacturer lot codes, date codes upon request, and verify technical parameters against supplier documentation prior to dispatch.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-600">
          <div><strong className="text-slate-900">Storefront Brand:</strong> ElectroChip Enterprise</div>
          <div><strong className="text-slate-900">Catalog Scope:</strong> 30 Active Line Items</div>
          <div><strong className="text-slate-900">Procurement Desks:</strong> Global Sourcing</div>
        </div>
      </div>

      {/* Call to action */}
      <div className="p-8 glass-panel rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/90 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900">Have a custom Bill of Materials to source?</h3>
          <p className="text-xs text-slate-600">
            Our procurement engineers will review your component list and provide commercial quotes.
          </p>
        </div>
        <Link to="/contact" className="btn-primary text-xs shrink-0 py-2.5 px-5">
          <span>Contact Sourcing Team</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
