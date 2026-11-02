import React, { useState } from "react";
import { PRODUCTS } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { Calculator, FileText, CheckCircle2, ArrowRight, Layers, Sparkles } from "lucide-react";
import { SmtFeederVisual } from "./SectionVisuals.jsx";

export default function BomEstimatorSection() {
  const { openRfqModal, addToCart } = useCart();
  const [selectedProductId, setSelectedProductId] = useState("EC-012"); // 1k SMD Resistor default
  const [volumeTier, setVolumeTier] = useState(1000); // 100, 1000, 10000

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  // Dynamic volume pricing tier logic based on realistic distributor scales
  const basePrice = product.unitPrice || 1.0;
  let discountMultiplier = 1.0;
  let packagingType = "Standard Tray / Cut Tape";

  if (volumeTier >= 10000) {
    discountMultiplier = 0.65; // 35% reel discount
    packagingType = "Full Tape & Reel (Factory Sealed)";
  } else if (volumeTier >= 1000) {
    discountMultiplier = 0.85; // 15% pack discount
    packagingType = "Continuous Cut Tape / Ammo Pack";
  } else {
    packagingType = "Cut Tape / ESD Static Bag";
  }

  const tieredUnitPrice = basePrice * discountMultiplier;
  const estimatedTotal = tieredUnitPrice * volumeTier;
  const estimatedSavings = (basePrice * volumeTier) - estimatedTotal;

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      {/* Subtle ambient lighting mesh background */}
      <div className="absolute inset-0 ambient-glow-mesh pointer-events-none opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-700 mb-1 flex items-center gap-1.5">
              <Calculator className="w-4 h-4" />
              <span>Procurement Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              BOM Reel &amp; Volume Pricing Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Model production savings for full tape-and-reel quantities versus engineering prototypes.
            </p>
          </div>
        </div>

        {/* Glassmorphic Calculator Container */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border border-white/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Product Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Select Catalog Component:
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white/90 border border-slate-200 rounded-lg p-3 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100 font-medium text-slate-900 shadow-xs"
                >
                  {PRODUCTS.filter(p => !p.quoteOnly).map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} {p.mpn ? `(${p.mpn})` : ""} — ${p.unitPrice?.toFixed(3)}/ea
                    </option>
                  ))}
                </select>
              </div>

              {/* Volume Tier Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Select Target Volume:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { qty: 100, label: "100 Units", sub: "Prototype Tray" },
                    { qty: 1000, label: "1,000 Units", sub: "Cut Tape Pack" },
                    { qty: 10000, label: "10,000 Units", sub: "Full OEM Reel" }
                  ].map((tier) => (
                    <button
                      key={tier.qty}
                      type="button"
                      onClick={() => setVolumeTier(tier.qty)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        volumeTier === tier.qty
                          ? "bg-sky-50/90 border-sky-600 shadow-xs ring-1 ring-sky-600 text-sky-950"
                          : "bg-white/80 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm tabular-nums">{tier.label}</div>
                      <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">{tier.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Package Format Details with Realistic SMT Feeder Visual */}
              <div className="space-y-3">
                <SmtFeederVisual className="w-full h-36 border border-slate-200/80" />
                <div className="p-3.5 bg-white/80 border border-slate-200 rounded-lg text-xs space-y-1">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-sky-700" />
                    <span>Packaging Specification: {packagingType}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Compliant with EIA-481 pick-and-place carrier tape standards. Vacuum sealed with moisture barrier bag and desiccant.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Glass Calculation Card */}
            <div className="lg:col-span-5">
              <div className="glass-card rounded-xl p-6 sm:p-7 border border-white/90 shadow-md space-y-5">
                
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
                    Tiered Quote Estimate
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Volume Verified
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-slate-500">Estimated Unit Price:</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                        ${tieredUnitPrice.toFixed(4).replace(/0$/, "")}
                      </span>
                      {discountMultiplier < 1 && (
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {Math.round((1 - discountMultiplier) * 100)}% Volume Savings
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline text-xs">
                    <span className="text-slate-600">Total Lot Cost ({volumeTier.toLocaleString()} pcs):</span>
                    <span className="text-lg font-bold text-sky-900 tabular-nums">
                      ${estimatedTotal.toFixed(2)}
                    </span>
                  </div>

                  {estimatedSavings > 0 && (
                    <div className="flex justify-between items-center text-xs text-emerald-800 bg-emerald-50/80 p-2 rounded border border-emerald-100">
                      <span>Total Savings vs Single Unit:</span>
                      <span className="font-bold tabular-nums">${estimatedSavings.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-3 space-y-2">
                  <button
                    type="button"
                    onClick={() => openRfqModal(product)}
                    className="btn-primary w-full py-2.5 text-xs justify-center"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Generate Official RFQ for {volumeTier.toLocaleString()} Units</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => addToCart(product, volumeTier)}
                    className="btn-secondary w-full py-2 text-xs justify-center text-slate-700 bg-white/90"
                  >
                    Add {volumeTier.toLocaleString()} to Basket
                  </button>
                </div>

                <div className="text-[10px] text-slate-400 text-center leading-relaxed">
                  Lead time: Standard items dispatch in 24 hours. Custom tape/reel reels dispatch in 3-5 business days.
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
