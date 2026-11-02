import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products.js";
import ProductCard from "./ProductCard.jsx";
import { 
  ArrowRight, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  PackageCheck,
  Volume2,
  Filter
} from "lucide-react";

export default function HomeCategoryTabsSection() {
  const [activeTab, setActiveTab] = useState("All");

  const categories = [
    { id: "All", name: "All Components", icon: Filter },
    { id: "Passive Components", name: "Passive Components", icon: Layers },
    { id: "Optoelectronics", name: "Optoelectronics", icon: CheckCircle2 },
    { id: "Prototyping & Tools", name: "Prototyping & Tools", icon: PackageCheck },
    { id: "Semiconductors & Discretes", name: "Semiconductors", icon: Cpu },
    { id: "Sensors & Transducers", name: "Sensors", icon: ShieldCheck },
    { id: "Acoustic Components", name: "Acoustics", icon: Volume2 },
    { id: "Embedded & Dev Boards", name: "Embedded & Dev", icon: Zap },
  ];

  // Filter products by active tab
  const filteredProducts = activeTab === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category.toLowerCase().includes(activeTab.toLowerCase()) || activeTab.toLowerCase().includes(p.category.toLowerCase()));

  // Limit to exactly 6 products as requested by user ("6 dikhao baki all product par bhej do thike")
  const displayedProducts = filteredProducts.slice(0, 6);
  const remainingCount = Math.max(0, filteredProducts.length - 6);

  // Determine destination URL for "View All"
  const targetCategoryUrl = activeTab === "All" 
    ? "/products" 
    : `/products?category=${encodeURIComponent(activeTab)}`;

  return (
    <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
      <div className="border-t border-slate-200/80 pt-10 sm:pt-14">
        
        {/* Section Heading & Overview */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-700 mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Catalog Navigation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Explore Products by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1 max-w-xl">
              Select an engineering category tab below to preview live stock line items. Displaying top 6 verified parts per domain.
            </p>
          </div>

          <Link
            to={targetCategoryUrl}
            className="text-xs sm:text-sm font-semibold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1.5 shrink-0 self-start md:self-auto"
          >
            <span>View All {filteredProducts.length} in {activeTab === "All" ? "Catalog" : activeTab}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tab Menu Navigation (Horizontal Scrollable for Mobile, Clean Wrap on Desktop) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-3.5 px-3.5 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const count = cat.id === "All" 
              ? PRODUCTS.length 
              : PRODUCTS.filter((p) => p.category.toLowerCase().includes(cat.id.toLowerCase()) || cat.id.toLowerCase().includes(p.category.toLowerCase())).length;
            
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border ${
                  isActive
                    ? "bg-sky-900 text-white border-sky-900 shadow-md shadow-sky-950/15 scale-102"
                    : "glass-card text-slate-700 border-white/90 hover:bg-white hover:text-slate-900"
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${isActive ? "text-cyan-300" : "text-sky-700"}`} />
                <span>{cat.name}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-sky-800 text-cyan-200" : "bg-slate-100 text-slate-600"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Grid: 2 columns on mobile (grid-cols-2), 3 on desktop */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner: View Remaining Products in Catalog */}
        <div className="mt-6 sm:mt-8 glass-panel rounded-xl p-4 sm:p-5 border border-white/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
              <span>Showing 6 of {filteredProducts.length} verified components in {activeTab === "All" ? "Full Catalog" : activeTab}</span>
              {remainingCount > 0 && (
                <span className="text-[10px] font-mono bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-semibold">
                  +{remainingCount} more
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600">
              Access complete manufacturer datasheets, packaging reel specifications, and bulk volume discount pricing.
            </p>
          </div>

          <Link
            to={targetCategoryUrl}
            className="btn-primary py-2 px-5 text-xs font-semibold whitespace-nowrap shrink-0 w-full sm:w-auto text-center"
          >
            <span>View All {activeTab === "All" ? "30 Products" : `${activeTab} (${filteredProducts.length})`}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
