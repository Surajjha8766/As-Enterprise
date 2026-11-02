import React from "react";
import { Link } from "react-router-dom";
import { Cpu, Factory, Activity, GraduationCap, ArrowRight } from "lucide-react";

export default function IndustrySolutionsSection() {
  const industries = [
    {
      title: "Contract Electronics & SMT Assembly",
      icon: Factory,
      tagline: "High-Speed SMT Feeders",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      desc: "Bulk reel packaging for Walsin WR04X series 0402 SMD chip resistors (10k reels) engineered for seamless automated pick-and-place nozzle feeds with zero tape jamming.",
      catalogSample: "Walsin WR04X102JTL, WR04X2001FTL",
      targetCategory: "Passive Components"
    },
    {
      title: "IoT & Environmental Sensing Systems",
      icon: Activity,
      tagline: "Industrial Gas Detection",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      desc: "Calibrated ZE16B-CO carbon monoxide sensor modules with UART digital and PWM outputs for residential safety alarms, warehouse air monitors, and building automation.",
      catalogSample: "Winsen ZE16B-CO Sensor Module",
      targetCategory: "Sensors & Transducers"
    },
    {
      title: "Robotics & Industrial Electromechanical",
      icon: Cpu,
      tagline: "Actuation & Motor Drives",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      desc: "12V high-torque DC motors, DPDT panel-mount 6-pin toggle switches, and 12V brushless cooling fans designed for rugged industrial control cabinets and automated test jigs.",
      catalogSample: "12V DC Motor, DPDT 6P Switch",
      targetCategory: "Electromechanical"
    },
    {
      title: "R&D Labs & Academic Prototyping",
      icon: GraduationCap,
      tagline: "Rapid Hardware Iteration",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
      desc: "MB-102 830-tie-point solderless breadboards, 40-pin Dupont multi-color jumper ribbons, 10x15 cm copper-clad PCBs, and temperature-controlled soldering irons for engineering workstations.",
      catalogSample: "Arduino UNO R3, MB-102 Board",
      targetCategory: "Prototyping & Tools"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-700 mb-1">
            Industry Applications
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Tailored Component Solutions by Engineering Sector
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Supplying standard active and passive electronics tailored to strict industrial operating environments.
          </p>
        </div>
        <Link
          to="/products"
          className="text-xs sm:text-sm font-semibold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1 shrink-0"
        >
          <span>Explore Full BOM</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 4 Glassmorphism Industry Cards with Real Application Photography */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {industries.map((ind, idx) => {
          const Icon = ind.icon;
          return (
            <div
              key={idx}
              className="glass-card glass-card-hover rounded-xl overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Real High-Resolution Industry Photography Header */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/30 to-transparent"></div>
                  
                  {/* Floating Glassmorphic Icon Badge */}
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-white/90 backdrop-blur-md text-sky-800 flex items-center justify-center shrink-0 border border-white/80 shadow-sm">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Tagline Badge */}
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <span className="text-[10px] font-semibold text-sky-200 uppercase tracking-wider block drop-shadow-sm">
                      {ind.tagline}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 space-y-2.5">
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-700 transition-colors">
                    {ind.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {ind.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 mt-2">
                <div className="pt-3 border-t border-slate-100/90 space-y-2">
                  <div className="text-[11px] text-slate-500 truncate">
                    <span className="font-medium text-slate-700">Catalog Lines: </span>
                    <span className="font-mono text-slate-600">{ind.catalogSample}</span>
                  </div>
                  <Link
                    to={`/products?category=${encodeURIComponent(ind.targetCategory)}`}
                    className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Filter {ind.targetCategory}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
