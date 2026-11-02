import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, VERIFIED_BRANDS } from "../data/products.js";
import EnterpriseBanner from "../components/EnterpriseBanner.jsx";
import CyberCompanion from "../components/CyberCompanion.jsx";
import HeroHardwareShowcase from "../components/HeroHardwareShowcase.jsx";
import HomeCategoryTabsSection from "../components/HomeCategoryTabsSection.jsx";
import HomeAboutSection from "../components/HomeAboutSection.jsx";
import QualityLabSection from "../components/QualityLabSection.jsx";
import IndustrySolutionsSection from "../components/IndustrySolutionsSection.jsx";
import { useCart } from "../context/CartContext.jsx";
import { 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  FileText,
  PackageCheck,
  Zap,
  Sparkles,
  Search
} from "lucide-react";

export default function HomePage() {
  const { openRfqModal } = useCart();
  const heroContainerRef = useRef(null);

  // Category taxonomy with authentic high-resolution electronics photography
  const popularCategories = [
    { 
      name: "Passive Components", 
      count: "7 Items", 
      desc: "SMD chip resistors, trimpots & custom ceramic capacitors", 
      icon: Layers,
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Semiconductors & Discretes", 
      count: "1 Item", 
      desc: "Silicon wafer dies, NPN bipolar transistors (TO-92)", 
      icon: Cpu,
      image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Optoelectronics", 
      count: "6 Items", 
      desc: "3mm & 5mm indicator LEDs in red, green, yellow, blue", 
      icon: CheckCircle2,
      image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Embedded & Dev Boards", 
      count: "1 Item", 
      desc: "ATmega328P Arduino UNO R3 hardware platform", 
      icon: Zap,
      image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Sensors & Transducers", 
      count: "1 Item", 
      desc: "Electrochemical CO gas sensor modules & environmental probes", 
      icon: ShieldCheck,
      image: "https://images.unsplash.com/photo-1580894732479-7a5525b6a550?auto=format&fit=crop&w=800&q=80"
    },
    { 
      name: "Prototyping & Tools", 
      count: "7 Items", 
      desc: "Breadboards, jumper ribbons, soldering stations, copper PCBs", 
      icon: PackageCheck,
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-20 pb-12">
      
      {/* 1. HERO SECTION: Left Side Text, Right Side Hardware Showcase & Background Cursor-Move Cyber Bot */}
      <section 
        ref={heroContainerRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 overflow-visible"
      >
        {/* Animated Cyber Robot Companion ("VoltBot") Tracking Cursor Movement in Background */}
        <CyberCompanion containerRef={heroContainerRef} />

        {/* Enterprise Brand Banner with Real Semiconductor Photography & Responsive Emblem */}
        <div className="mb-6 sm:mb-8">
          <EnterpriseBanner />
        </div>

        {/* Dual-Column Main Hero: Left Side Text + Right Side Interactive Hardware Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Bold Text, Enterprise Trust Badge, CTAs & Quick Filters */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Live Certified Sourcing Kicker */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-700">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-slate-900">AS9120B &amp; ISO 9001:2015</span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="text-sky-700 font-medium">Commercial Sourcing Desk</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Precision Electronic Components &amp; Direct Sourcing Supply
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Access 30 active inventory line items with confirmed manufacturer specifications, guaranteed factory traceability, and same-day dispatch for engineering production.
              </p>
            </div>

            {/* Action Buttons: Primary Catalog CTA + Secondary BOM RFQ */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/products"
                className="btn-primary py-2.5 px-5 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-md shadow-sky-950/15"
              >
                <span>Explore 30 Catalog Parts</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => openRfqModal()}
                className="btn-secondary py-2.5 px-4 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 bg-white/90 shadow-xs"
              >
                <FileText className="w-4 h-4 text-sky-700" />
                <span>Request BOM Quote</span>
              </button>
            </div>

            {/* Quick Sourcing Tags */}
            <div className="pt-2">
              <div className="text-[11px] font-mono text-slate-500 mb-1.5 flex items-center gap-1.5">
                <Search className="w-3 h-3 text-sky-600" />
                <span>Popular Part Requisitions:</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                {[
                  { label: "SMD 0402 Resistors", query: "Passive Components" },
                  { label: "ZE16B-CO Sensor", query: "Sensors & Transducers" },
                  { label: "Arduino UNO R3", query: "Embedded & Dev Boards" },
                  { label: "5mm Indicator LEDs", query: "Optoelectronics" },
                  { label: "ATmega328P MCU", query: "Semiconductors & Discretes" }
                ].map((tag, i) => (
                  <Link
                    key={i}
                    to={`/products?category=${encodeURIComponent(tag.query)}`}
                    className="text-slate-700 hover:text-sky-700 hover:underline font-medium transition-colors"
                  >
                    {tag.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Enterprise Trust Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200/90">
              <div className="space-y-0.5">
                <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 block">30</span>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">Verified MPNs</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-700 block">100%</span>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">Traceable</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xl sm:text-2xl font-bold font-mono text-sky-700 block">0.00%</span>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">Defect Rate</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 block">24hr</span>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">RFQ Turnaround</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Hardware Visualizer & Component Deck */}
          <div className="lg:col-span-6">
            <HeroHardwareShowcase />
          </div>

        </div>
      </section>

      {/* 2. PRODUCT CATEGORY TAB MENU: Interactive category tabs showing max 6 products per tab + direct catalog link */}
      <HomeCategoryTabsSection />

      {/* 3. ABOUT SECTION: Left side narrative + Right side high-resolution cleanroom laboratory image */}
      <HomeAboutSection />

      {/* 4. PRODUCT DOMAINS TAXONOMY: Real Engineering Photography Matching Each Sector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-200/80 pt-10 sm:pt-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-700 mb-1">
                Component Taxonomy
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Browse by Engineering Domain
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                Explore our catalog categorized by electronic hardware disciplines with verified component tolerances.
              </p>
            </div>
            <Link
              to="/products"
              className="text-xs sm:text-sm font-semibold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1 shrink-0"
            >
              <span>All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {popularCategories.map((cat, idx) => {
              const IconComponent = cat.icon;
              return (
                <Link
                  key={idx}
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="glass-card glass-card-hover rounded-xl overflow-hidden group flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 border border-slate-200/80"
                >
                  <div>
                    {/* Real Domain Photography with Glassmorphic Badge */}
                    <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/25 to-transparent"></div>
                      
                      {/* Floating Icon Glass Badge */}
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-md text-sky-800 flex items-center justify-center shrink-0 border border-white/80 shadow-xs">
                        <IconComponent className="w-4 h-4" />
                      </div>

                      {/* Count Badge */}
                      <div className="absolute bottom-2.5 right-3">
                        <span className="text-[10px] font-mono text-white/90 bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded border border-white/20">
                          {cat.count}
                        </span>
                      </div>
                    </div>

                    {/* Text Details */}
                    <div className="p-4 space-y-1">
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-700 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="pt-2.5 border-t border-slate-100/90 flex items-center justify-between text-xs font-semibold text-sky-700 group-hover:text-sky-900">
                      <span>Explore domain</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. INDUSTRY SOLUTIONS SECTION: Real Application Photography for All 4 Sectors */}
      <IndustrySolutionsSection />

      {/* 6. QUALITY ASSURANCE & RELIABILITY LAB SECTION: Real Lab / Testing Imagery for All 4 Modules */}
      <QualityLabSection />

      {/* 7. VERIFIED BRANDS IN CATALOG: Glassmorphic Corporate Traceability Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-200/80 pt-10 sm:pt-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-700 mb-1">
                Authentic Traceability
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Verified Brands in Catalog
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Manufacturer-certified electronic components with verified production standards.
              </p>
            </div>
            <Link
              to="/brands"
              className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1 shrink-0"
            >
              <span>Explore Brand Profiles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VERIFIED_BRANDS.map((brand, i) => (
              <div
                key={i}
                className="p-5 glass-card glass-card-hover rounded-xl space-y-2.5 flex flex-col justify-between border border-slate-200/80"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{brand.name}</span>
                    <span className="text-[10px] text-slate-500 font-medium px-1.5 py-0.5 bg-slate-100 rounded">
                      {brand.country}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{brand.focus}</p>
                </div>

                <div className="pt-2.5 border-t border-slate-100/90 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Sample MPN:</span>
                  <span className="font-mono text-sky-800 font-medium">{brand.catalogParts[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BOM REQUISITION / RFQ CALL TO ACTION: Frosted Glass Container with Real Electronics Bench Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-white/90 shadow-md">
          {/* Real Electronics Engineering Workstation Background */}
          <div className="absolute inset-0 z-0 bg-slate-950">
            <img
              src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1600&q=80"
              alt="Electronics Engineering Workstation"
              className="w-full h-full object-cover opacity-25"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-900/90 via-sky-950/70 to-slate-900/90"></div>
          </div>

          {/* Frosted Glass Content */}
          <div className="relative z-10 p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/85 sm:bg-white/80 backdrop-blur-md">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-800 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-sky-700" />
                <span>Custom Requisition Desk</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Need custom part numbers or bulk reels?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                Submit your Bill of Materials (BOM) or line item list. Our component sourcing specialists verify inventory availability, lead times, and deliver formal quotes within 24 business hours.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={() => openRfqModal()}
                className="btn-primary py-2.5 px-5 text-xs font-semibold w-full sm:w-auto text-center"
              >
                <FileText className="w-4 h-4" />
                <span>Submit BOM Request</span>
              </button>
              <Link
                to="/contact"
                className="btn-secondary py-2.5 px-5 text-xs font-semibold w-full sm:w-auto text-center bg-white/90"
              >
                Contact Sourcing Desk
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
