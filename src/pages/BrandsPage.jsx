import React from "react";
import { Link } from "react-router-dom";
import { VERIFIED_BRANDS, PRODUCTS } from "../data/products.js";
import { ShieldCheck, ArrowRight, ExternalLink, Award } from "lucide-react";

export default function BrandsPage() {
  const brandImages = {
    "Walsin Technology": "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80",
    "Winsen Electronics": "https://images.unsplash.com/photo-1580894732479-7a5525b6a550?auto=format&fit=crop&w=800&q=80",
    "Arduino (Ecosystem)": "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800&q=80",
    "ON Semiconductor / Fairchild": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
          Catalog Manufacturers
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Verified Brands &amp; Manufacturer Part Numbers
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          In strict compliance with our sourcing integrity standards, this directory lists only the manufacturers and brands present in our active component spreadsheet. We do not invent official distributor partnerships or unconfirmed relationships.
        </p>
      </div>

      {/* Brands Grid with Real Imagery and Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {VERIFIED_BRANDS.map((brand, idx) => {
          // Find matching products in catalog
          const matchingProducts = PRODUCTS.filter(
            (p) => brand.catalogParts.includes(p.mpn) || p.brand.includes(brand.name.split(" ")[0])
          );

          const imgUrl = brandImages[brand.name] || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";

          return (
            <div key={idx} className="glass-card rounded-xl overflow-hidden space-y-4 border border-white/90 shadow-sm flex flex-col justify-between">
              <div>
                {/* Brand Image Header */}
                <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                  <img
                    src={imgUrl}
                    alt={brand.name}
                    className="w-full h-full object-cover opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/30 to-transparent"></div>
                  
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-slate-900 border border-white/80 shadow-xs">
                    {brand.name}
                  </div>

                  <span className="absolute top-3 right-3 text-[10px] font-semibold text-emerald-800 bg-emerald-50/95 border border-emerald-200/80 px-2 py-0.5 rounded shadow-xs">
                    {brand.status}
                  </span>

                  <div className="absolute bottom-2 left-3 text-[11px] text-sky-200">
                    Region: {brand.country}
                  </div>
                </div>

                <div className="p-6 pt-4 space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {brand.focus}
                  </p>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider block mb-2">
                      Matching Catalog Line Items:
                    </span>
                    <div className="space-y-1.5">
                      {matchingProducts.map((p) => (
                        <Link
                          key={p.id}
                          to={`/products/${p.id}`}
                          className="p-2 bg-white/70 rounded-lg border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/50 flex items-center justify-between text-xs transition-colors group"
                        >
                          <div className="truncate">
                            <span className="font-semibold text-slate-900 group-hover:text-sky-800 truncate block">
                              {p.name}
                            </span>
                            <span className="font-mono text-[11px] text-slate-500">
                              MPN: {p.mpn}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-900 tabular-nums shrink-0 ml-2">
                            {p.quoteOnly ? "RFQ" : `$${p.unitPrice.toFixed(3)}`}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Sourcing Clarification Notice */}
      <div className="glass-panel rounded-xl p-6 text-xs text-slate-600 space-y-2 border border-white/90 shadow-xs">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sky-700" />
          <span>Procurement Channel Notice</span>
        </h3>
        <p className="leading-relaxed">
          ElectroChip Enterprise procures components from franchised distributors, original equipment manufacturers, and audited global inventory partners. All manufacturer trademarks and part numbers remain the intellectual property of their respective owners and are referenced solely for technical identification.
        </p>
      </div>

    </div>
  );
}
