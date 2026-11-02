import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import ComponentVisual from "./ComponentVisual.jsx";
import { 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  ShoppingCart,
  Scan,
  Sparkles,
  Radio,
  FileCheck
} from "lucide-react";

export default function HeroHardwareShowcase() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  // 4 Featured Spotlight Hardware Components for the Interactive Visualizer
  const spotlightComponents = [
    {
      id: "EC-017",
      name: "ATmega328P Microcontroller",
      mpn: "ATMEGA328P-PU",
      package: "DIP-28",
      category: "Semiconductors",
      brand: "Microchip / Atmel",
      price: 3.50,
      stock: 50,
      voltage: "1.8V - 5.5V",
      clock: "20 MHz Max",
      desc: "8-bit AVR RISC microcontroller with 32KB ISP flash memory and 10-bit ADC.",
      type: "microcontroller",
      accent: "cyan",
      diagnostic: {
        pins: "28/28 Coplanar",
        die: "Silicon Rev B",
        moisture: "J-STD-033 Level 1",
        rohs: "100% Pb-Free"
      }
    },
    {
      id: "EC-010",
      name: "1KΩ SMD 0402 Resistor",
      mpn: "WR04X102JTL",
      package: "0402 SMD (1005)",
      category: "Passive Components",
      brand: "Walsin Technology",
      price: 0.02,
      stock: 5000,
      voltage: "50V Working",
      clock: "±5% Tolerance",
      desc: "High-stability thick film chip resistor engineered for automated high-speed SMT placement.",
      type: "resistor",
      accent: "emerald",
      diagnostic: {
        pins: "2/2 Solder Terminals",
        die: "RuO2 Thick Film",
        moisture: "Hermetic Tape Reel",
        rohs: "AEC-Q200 Qualified"
      }
    },
    {
      id: "EC-018",
      name: "ZE16B-CO Electrochemical Sensor",
      mpn: "ZE16B-CO",
      package: "4-Pin Modular DIP",
      category: "Sensors & Transducers",
      brand: "Winsen Sensor",
      price: 18.50,
      stock: 25,
      voltage: "3.7V - 5.5V DC",
      clock: "0 - 500 ppm Range",
      desc: "Calibrated industrial electrochemical carbon monoxide detection probe with UART and analog output.",
      type: "sensor",
      accent: "amber",
      diagnostic: {
        pins: "4-Pin Gold Headers",
        die: "Potentiostatic Cell",
        moisture: "Sealed Housing",
        rohs: "Factory Calibrated"
      }
    },
    {
      id: "EC-022",
      name: "Arduino UNO R3 Dev Board",
      mpn: "A000066",
      package: "Board Form Factor",
      category: "Embedded & Dev",
      brand: "Arduino Ecosystem",
      price: 24.50,
      stock: 15,
      voltage: "7V - 12V Input",
      clock: "16 MHz Crystal",
      desc: "Original ATmega328P open hardware prototyping board with standard headers and USB interface.",
      type: "dev_board",
      accent: "sky",
      diagnostic: {
        pins: "32 Header Sockets",
        die: "Dual MCU Bridge",
        moisture: "Anti-Static Bag",
        rohs: "CE / FCC Certified"
      }
    }
  ];

  const current = spotlightComponents[activeTab];

  const handleScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setTimeout(() => setScanComplete(false), 3000);
    }, 900);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      
      {/* Ambient background glow behind card */}
      <div className="absolute -inset-1 bg-linear-to-r from-sky-500/20 via-cyan-400/20 to-blue-600/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 pointer-events-none"></div>

      {/* Main Glassmorphic Hardware Card */}
      <div className="relative glass-panel rounded-2xl border border-white/90 p-4 sm:p-6 shadow-xl backdrop-blur-md overflow-hidden">
        
        {/* Animated Scanner Laser Line */}
        {isScanning && (
          <div className="absolute inset-x-0 h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400/80 z-30 animate-pulse transition-all duration-1000 top-1/2"></div>
        )}

        {/* Top Header: Hardware Radar & Quick Selector Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-950 text-cyan-400 flex items-center justify-center border border-cyan-500/30 shadow-xs">
              <Cpu className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-sky-800 font-bold flex items-center gap-1.5">
                <span>INTERACTIVE COMPONENT DECK</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              <h3 className="text-xs font-semibold text-slate-800">
                Direct Line Item Inspector
              </h3>
            </div>
          </div>

          {/* Quick Component Switcher */}
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200">
            {spotlightComponents.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(idx);
                  setScanComplete(false);
                }}
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-all ${
                  activeTab === idx
                    ? "bg-sky-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                }`}
              >
                {idx === 0 ? "MCU" : idx === 1 ? "SMD" : idx === 2 ? "Sensor" : "UNO"}
              </button>
            ))}
          </div>
        </div>

        {/* Central Display: Real Hardware Schematic Visual + Live Specs */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 items-center">
          
          {/* Visual Component Render Box */}
          <div className="sm:col-span-5 relative bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl p-4 flex flex-col items-center justify-center min-h-[180px] border border-cyan-500/30 shadow-inner group overflow-hidden">
            {/* PCB Grid Background */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]"></div>
            
            {/* High Precision Component Vector */}
            <div className="relative z-10 w-28 h-28 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <ComponentVisual type={current.type} name={current.name} />
            </div>

            {/* Verification Chip Stamp */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-cyan-300/90 border-t border-cyan-500/25 pt-1.5">
              <span>PKG: {current.package}</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 inline" />
                VERIFIED
              </span>
            </div>
          </div>

          {/* Right Column: Spec Details & Metrics */}
          <div className="sm:col-span-7 space-y-2.5">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-sky-800 bg-sky-100/90 px-1.5 py-0.5 rounded font-semibold border border-sky-200">
                  {current.mpn}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {current.brand}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                {current.name}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2 mt-0.5 leading-relaxed">
                {current.desc}
              </p>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-0.5">
              <div className="bg-slate-50/90 rounded-lg p-2 border border-slate-200/80">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">Operating V</span>
                <span className="font-semibold text-slate-800 text-[11px] font-mono">{current.voltage}</span>
              </div>
              <div className="bg-slate-50/90 rounded-lg p-2 border border-slate-200/80">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">Rating / Speed</span>
                <span className="font-semibold text-slate-800 text-[11px] font-mono">{current.clock}</span>
              </div>
            </div>

            {/* Pricing & Stock Banner */}
            <div className="flex items-center justify-between pt-0.5">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-medium">Indicative Price</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">
                    ${current.price.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-slate-500">USD / ea</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase block font-medium">Warehouse Stock</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {current.stock.toLocaleString()} units
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Diagnostic Audit Bar (Expands when scanned) */}
        {scanComplete && (
          <div className="mt-3 p-2.5 rounded-lg bg-slate-950 text-white border border-cyan-400/50 text-[11px] font-mono animate-fadeIn flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>LAB AUDIT PASS</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 text-[10px]">
              <span>Pins: <strong className="text-cyan-300">{current.diagnostic.pins}</strong></span>
              <span>Die: <strong className="text-cyan-300">{current.diagnostic.die}</strong></span>
              <span>RoHS: <strong className="text-emerald-400">{current.diagnostic.rohs}</strong></span>
            </div>
          </div>
        )}

        {/* Bottom Action Footer */}
        <div className="mt-3.5 pt-3.5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleScan}
              disabled={isScanning}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors shadow-xs"
            >
              <Scan className={`w-3.5 h-3.5 ${isScanning ? "animate-spin text-cyan-600" : ""}`} />
              <span>{isScanning ? "Scanning..." : scanComplete ? "✓ Lab Verified" : "Run Diagnostic"}</span>
            </button>
            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
              MIL-STD-883 Solderability
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const prod = {
                  id: current.id,
                  name: current.name,
                  mpn: current.mpn,
                  unitPrice: current.price,
                  priceUnit: "per piece",
                  category: current.category,
                  brand: current.brand,
                  pricingType: "verified_indicative"
                };
                addToCart(prod, 1);
              }}
              className="btn-primary py-1.5 px-3.5 text-xs font-semibold shadow-xs"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
            <Link
              to={`/products/${current.id}`}
              className="p-1.5 text-slate-400 hover:text-sky-700 transition-colors rounded-md hover:bg-slate-100"
              title="View full datasheet"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
