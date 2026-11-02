import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PRODUCTS, CATEGORIES, VERIFIED_BRANDS } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import { useCart } from "../context/CartContext.jsx";
import { 
  Search, 
  Filter, 
  X, 
  FileText, 
  Layers, 
  ArrowUpDown,
  CheckCircle2,
  SlidersHorizontal
} from "lucide-react";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openRfqModal } = useCart();

  // URL state sync
  const queryParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "All";

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("all"); // 'all' | 'in_stock' | 'quote_only'
  const [sortBy, setSortBy] = useState("srNo_asc"); // 'srNo_asc' | 'price_asc' | 'price_desc' | 'name_asc'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if query params change
  useEffect(() => {
    if (queryParam !== searchTerm) {
      setSearchTerm(queryParam);
    }
  }, [queryParam]);

  useEffect(() => {
    if (categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Update query params on search/category change
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", cat);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    const newParams = new URLSearchParams(searchParams);
    if (!val.trim()) {
      newParams.delete("q");
    } else {
      newParams.set("q", val);
    }
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setAvailabilityFilter("all");
    setSortBy("srNo_asc");
    setSearchParams({});
  };

  // Extract unique brands from catalog
  const availableBrands = useMemo(() => {
    const set = new Set();
    PRODUCTS.forEach((p) => {
      if (p.brand && p.brand !== "Standard Sourcing" && p.brand !== "Prototyping Standard" && p.brand !== "Standard Opto" && p.brand !== "Tools & Equipment" && p.brand !== "Thermal Solutions" && p.brand !== "Motion & Actuation" && p.brand !== "Industrial Grade" && p.brand !== "Industrial Switchgear" && p.brand !== "Standard Cabling" && p.brand !== "Standard Prototyping" && p.brand !== "Soldering Consumables" && p.brand !== "Custom Specification" && p.brand !== "Standard Opto Display") {
        set.add(p.brand);
      }
    });
    return ["All", ...Array.from(set)];
  }, []);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesMpn = (product.mpn || "").toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesMpn && !matchesCat) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }

      // Brand
      if (selectedBrand !== "All" && product.brand !== selectedBrand) {
        return false;
      }

      // Availability / Quote
      if (availabilityFilter === "in_stock" && product.quoteOnly) {
        return false;
      }
      if (availabilityFilter === "quote_only" && !product.quoteOnly) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "srNo_asc") {
        return a.srNo - b.srNo;
      }
      if (sortBy === "name_asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "price_asc") {
        const pA = a.unitPrice || 999999;
        const pB = b.unitPrice || 999999;
        return pA - pB;
      }
      if (sortBy === "price_desc") {
        const pA = a.unitPrice || -1;
        const pB = b.unitPrice || -1;
        return pB - pA;
      }
      return 0;
    });
  }, [searchTerm, selectedCategory, selectedBrand, availabilityFilter, sortBy]);

  const hasActiveFilters = 
    searchTerm.trim() !== "" || 
    selectedCategory !== "All" || 
    selectedBrand !== "All" || 
    availabilityFilter !== "all" || 
    sortBy !== "srNo_asc";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Page Title & Breadcrumb Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Home</span>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900 font-medium">Component Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Electronic Components &amp; Semiconductor Catalog
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Complete active price list transcribed directly from source spreadsheet. Research-verified market benchmarks with confirmed manufacturer part numbers (MPNs).
          </p>
        </div>

        {/* Global Catalog Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => openRfqModal()}
            className="btn-secondary text-xs"
          >
            <FileText className="w-3.5 h-3.5 text-sky-700" />
            <span>Submit Custom BOM</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block space-y-6 bg-white p-5 border border-slate-200 rounded-lg">
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-sky-700" />
              <span>Catalog Filters</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-sky-700 hover:text-sky-900 font-medium"
              >
                Reset
              </button>
            )}
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Search Catalog
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Part number, name..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded outline-none focus:border-sky-600"
              />
              {searchTerm && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-2">
              Engineering Categories
            </label>
            <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
              {CATEGORIES.map((cat) => {
                const count = cat === "All"
                  ? PRODUCTS.length
                  : PRODUCTS.filter((p) => p.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-sky-50 text-sky-900 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    <span className="text-[10px] text-slate-400 tabular-nums">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability / Quoting Status */}
          <div className="border-t border-slate-200 pt-4">
            <label className="block text-xs font-medium text-slate-700 mb-2">
              Procurement Status
            </label>
            <div className="space-y-1 text-xs">
              {[
                { id: "all", label: "All Items (30)" },
                { id: "in_stock", label: "Direct Purchasable (28)" },
                { id: "quote_only", label: "RFQ Only / Spec Open (2)" }
              ].map((opt) => (
                <label key={opt.id} className="flex items-center gap-2 cursor-pointer py-1">
                  <input
                    type="radio"
                    name="availability"
                    checked={availabilityFilter === opt.id}
                    onChange={() => setAvailabilityFilter(opt.id)}
                    className="text-sky-600 focus:ring-sky-500"
                  />
                  <span className={availabilityFilter === opt.id ? "font-medium text-slate-900" : "text-slate-600"}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Verified Brands */}
          {availableBrands.length > 1 && (
            <div className="border-t border-slate-200 pt-4">
              <label className="block text-xs font-medium text-slate-700 mb-2">
                Manufacturer / Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded p-1.5 outline-none focus:border-sky-600 bg-white"
              >
                {availableBrands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          )}

          {/* Help Box */}
          <div className="border-t border-slate-200 pt-4 text-xs text-slate-500 space-y-1">
            <span className="font-semibold text-slate-700 block">Looking for a specific reel?</span>
            <p className="text-[11px] leading-relaxed">
              Full 10k Walsin reels, custom trimmer potentiometers, and alternative LED wavelengths are available via custom quote.
            </p>
          </div>
        </aside>

        {/* Products Results Grid Area */}
        <main className="lg:col-span-3 space-y-4">
          
          {/* Controls Bar: Item count, sort & mobile filter trigger */}
          <div className="bg-white p-3 sm:p-4 border border-slate-200 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 tabular-nums">
                {filteredProducts.length}
              </span>
              <span className="text-slate-500">
                {filteredProducts.length === 1 ? "component listed" : "components listed"}
              </span>
              {selectedCategory !== "All" && (
                <span className="text-slate-400">
                  in <strong className="text-slate-700">{selectedCategory}</strong>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              {/* Mobile Filter Toggle */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden btn-secondary text-xs py-1.5 px-3"
              >
                <Filter className="w-3.5 h-3.5 text-sky-700" />
                <span>Filters</span>
              </button>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-700 outline-none focus:border-sky-600 bg-white"
                >
                  <option value="srNo_asc">Spreadsheet Order (1-30)</option>
                  <option value="name_asc">Name (A - Z)</option>
                  <option value="price_asc">Price (Low to High)</option>
                  <option value="price_desc">Price (High to Low)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Chips Bar (Unboxed clean text) */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 bg-slate-100/60 p-2.5 rounded border border-slate-200">
              <span className="font-medium text-slate-700">Active filters:</span>
              {searchTerm && (
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                  Search: "{searchTerm}"
                  <button onClick={() => handleSearchChange("")}><X className="w-3 h-3 text-slate-400" /></button>
                </span>
              )}
              {selectedCategory !== "All" && (
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                  Category: {selectedCategory}
                  <button onClick={() => handleCategorySelect("All")}><X className="w-3 h-3 text-slate-400" /></button>
                </span>
              )}
              {selectedBrand !== "All" && (
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                  Brand: {selectedBrand}
                  <button onClick={() => setSelectedBrand("All")}><X className="w-3 h-3 text-slate-400" /></button>
                </span>
              )}
              {availabilityFilter !== "all" && (
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                  Status: {availabilityFilter === "in_stock" ? "Direct Purchasable" : "RFQ Only"}
                  <button onClick={() => setAvailabilityFilter("all")}><X className="w-3 h-3 text-slate-400" /></button>
                </span>
              )}
              <button
                onClick={handleClearFilters}
                className="text-sky-700 hover:text-sky-900 underline text-[11px] ml-auto"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Cards Grid: 2 items per row on mobile (grid-cols-2) */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                No matching components found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No catalog items match your search for "{searchTerm}". ElectroChip sources custom passives and semiconductors not listed in standard BOM tables.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="btn-secondary text-xs"
                >
                  Clear Filters
                </button>
                <button
                  type="button"
                  onClick={() => openRfqModal()}
                  className="btn-primary text-xs"
                >
                  Request Custom Sourcing
                </button>
              </div>
            </div>
          )}

          {/* Catalog Footnote */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              Source file: <span className="font-mono text-slate-700">Component Price List.xlsx</span> (30 rows, complete)
            </div>
            <div className="text-[11px] text-slate-400">
              Need full reel packaging or manufacturer CoC? Submit an RFQ.
            </div>
          </div>

        </main>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-t-lg sm:rounded-lg p-6 max-h-[85vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-semibold text-slate-900 text-sm">Filter Products</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategorySelect(e.target.value)}
                className="form-input text-xs"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Status</label>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="form-input text-xs"
              >
                <option value="all">All Items</option>
                <option value="in_stock">Direct Purchasable</option>
                <option value="quote_only">RFQ Only</option>
              </select>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  handleClearFilters();
                  setMobileFilterOpen(false);
                }}
                className="btn-secondary w-1/2 text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn-primary w-1/2 text-xs"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
