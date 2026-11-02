import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import ComponentVisual from "./ComponentVisual.jsx";
import { ShoppingCart, FileText } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart, openRfqModal } = useCart();

  if (!product) return null;

  const { id, name, category, mpn, unitPrice, priceUnit, quoteOnly, brand, inStock } = product;

  return (
    <div className="group glass-card glass-card-hover rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 border border-slate-200/90 shadow-xs hover:shadow-md">
      <div>
        {/* Visual Slot */}
        <Link to={`/products/${id}`} className="block relative focus:outline-none" tabIndex={-1}>
          <ComponentVisual product={product} className="w-full h-32 sm:h-44 bg-slate-50/70" />
          
          {/* Quiet Status Label */}
          <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 text-[9px] sm:text-[11px] font-medium tracking-tight">
            {quoteOnly ? (
              <span className="text-amber-800 bg-amber-50/95 border border-amber-200/80 px-1.5 py-0.5 rounded shadow-xs">
                Quote
              </span>
            ) : inStock ? (
              <span className="text-emerald-800 bg-emerald-50/95 border border-emerald-200/80 px-1.5 py-0.5 rounded shadow-xs">
                In Stock
              </span>
            ) : (
              <span className="text-slate-600 bg-slate-100/90 px-1.5 py-0.5 rounded shadow-xs">
                Lead Time
              </span>
            )}
          </div>
        </Link>

        {/* Content Area with responsive compact padding for 2-column mobile */}
        <div className="p-2.5 sm:p-4">
          {/* Metadata line */}
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[9px] sm:text-[10px] text-slate-600 truncate">
              {category}
            </span>
            {brand && brand !== "Standard Sourcing" && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="truncate text-[9px] sm:text-[11px] text-sky-700 font-medium">{brand}</span>
              </>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
            <Link to={`/products/${id}`} className="hover:text-sky-700 transition-colors">
              {name}
            </Link>
          </h3>

          {/* MPN identification */}
          <div className="mt-1 text-[10px] sm:text-xs font-mono text-slate-500 truncate">
            {mpn ? <span>MPN: {mpn}</span> : <span>Spec: Standard</span>}
          </div>
        </div>
      </div>

      {/* Footer Area with Price and Action */}
      <div className="p-2.5 sm:p-4 pt-0 mt-1 sm:mt-2 border-t border-slate-100/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex flex-col">
          {quoteOnly ? (
            <span className="text-xs sm:text-sm font-semibold text-slate-800">RFQ Required</span>
          ) : (
            <div className="flex items-baseline gap-0.5 sm:gap-1">
              <span className="text-xs sm:text-base font-bold text-slate-900 tabular-nums">
                ${unitPrice.toFixed(3).replace(/0$/, "")}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500">/ ea</span>
            </div>
          )}
          <span className="text-[9px] sm:text-[10px] text-slate-400 truncate max-w-[120px] hidden sm:block">
            {quoteOnly ? "Custom pricing" : priceUnit}
          </span>
        </div>

        {/* Action Button */}
        <div className="w-full sm:w-auto">
          {quoteOnly ? (
            <button
              type="button"
              onClick={() => openRfqModal(product)}
              className="btn-secondary text-[11px] sm:text-xs py-1 sm:py-1.5 px-2 sm:px-3 text-sky-700 border-sky-200 hover:bg-sky-50 w-full sm:w-auto justify-center"
            >
              <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Quote</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="btn-primary text-[11px] sm:text-xs py-1 sm:py-1.5 px-2 sm:px-3 w-full sm:w-auto justify-center"
              aria-label={`Add ${name} to cart`}
            >
              <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
