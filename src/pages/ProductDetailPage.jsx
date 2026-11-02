import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products.js";
import ComponentVisual from "../components/ComponentVisual.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useCart } from "../context/CartContext.jsx";
import { 
  ShoppingCart, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft, 
  ShieldCheck, 
  Package, 
  HelpCircle,
  Truck
} from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openRfqModal } = useCart();

  const product = PRODUCTS.find((p) => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Component Not Found</h1>
        <p className="text-sm text-slate-600">
          The requested component ID does not exist in our active catalog price list.
        </p>
        <Link to="/products" className="btn-primary inline-flex mt-4 text-xs">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const {
    name,
    category,
    description,
    mpn,
    brand,
    requireQty,
    unitPrice,
    priceUnit,
    packSize,
    quoteOnly,
    specs = {},
    features = [],
    inStock
  } = product;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  // Find related products in the same category, excluding current product
  const relatedProducts = PRODUCTS
    .filter((p) => p.category === category && p.id !== product.id)
    .slice(0, 3);

  // If not enough in same category, pad with other products
  const displayRelated = relatedProducts.length > 0 
    ? relatedProducts 
    : PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Navigation Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-900">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/products" className="hover:text-slate-900">Catalog</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/products?category=${encodeURIComponent(category)}`} className="hover:text-slate-900">
          {category}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-slate-900 font-medium truncate max-w-[200px]">{name}</span>
      </nav>

      {/* Main Contiguous Product Showcase & Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Hardware Schematic */}
        <div className="lg:col-span-6 glass-panel rounded-xl p-6 space-y-4 border border-white/90 shadow-sm">
          <div className="relative border border-slate-200/80 rounded-lg bg-white/80 p-4 flex items-center justify-center min-h-[340px]">
            <ComponentVisual product={product} className="w-full h-72" />
          </div>

          {/* Hardware Identification Bar */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-white/70 p-3.5 rounded-lg border border-slate-200/80">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold">
                Catalog Item No.
              </span>
              <span className="font-mono font-medium text-slate-900">
                Row #{product.srNo} · ID: {product.id}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold">
                Spreadsheet Requirement
              </span>
              <span className="font-mono font-medium text-slate-900 tabular-nums">
                {requireQty} units
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-6 glass-panel rounded-xl p-6 sm:p-8 space-y-6 border border-white/90 shadow-sm">
          
          {/* Metadata & Title */}
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <span className="font-semibold text-sky-700 uppercase tracking-wider text-[11px]">
                {category}
              </span>
              {brand && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-slate-700">{brand}</span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
              {name}
            </h1>

            <div className="mt-2 flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-500">MPN:</span>
              <span className="font-bold text-sky-900 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                {mpn || "Standard RFQ Sourcing"}
              </span>
            </div>
          </div>

          {/* Pricing & Packaging */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            {quoteOnly ? (
              <div>
                <div className="text-xs uppercase font-semibold text-amber-700 tracking-wider">
                  RFQ Requisition Required
                </div>
                <div className="text-xl font-bold text-slate-900 mt-1">
                  Custom Quotation Only
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {product.note || "This component has open electrical parameters or zero initial quantity in the provided price list. Request a verified supplier quote."}
                </p>
              </div>
            ) : (
              <div>
                <div className="text-xs text-slate-500 font-medium">Indicative Benchmark Price</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold text-slate-900 tabular-nums">
                    ${unitPrice.toFixed(3).replace(/0$/, "")}
                  </span>
                  <span className="text-xs text-slate-500">
                    {priceUnit || "per unit"}
                  </span>
                </div>
                {packSize && (
                  <div className="text-xs text-slate-600 mt-1">
                    Standard Packaging: <span className="font-medium text-slate-800">{packSize}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description from Spreadsheet */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Spreadsheet Description &amp; Verification Note
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white border-l-2 border-sky-600 pl-3 py-1">
              "{description}"
            </p>
          </div>

          {/* Purchase Actions or RFQ */}
          {quoteOnly ? (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => openRfqModal(product)}
                className="btn-primary w-full py-3 text-sm justify-center"
              >
                <FileText className="w-4 h-4" />
                <span>Submit Requisition for Custom Quote</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-2 border-t border-slate-100">
              {/* Quantity selector */}
              <div className="flex items-center gap-4">
                <label className="text-xs font-medium text-slate-700 shrink-0">
                  Quantity:
                </label>
                <div className="flex items-center border border-slate-200 rounded">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 text-sm font-semibold"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="99999"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-16 text-center text-xs font-semibold py-1.5 outline-none tabular-nums"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 text-sm font-semibold"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-500 tabular-nums">
                  Total: ${(unitPrice * quantity).toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn-secondary py-2.5 text-xs justify-center text-slate-900 border-slate-300 hover:bg-slate-50"
                >
                  <ShoppingCart className="w-4 h-4 text-sky-700" />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="btn-primary py-2.5 text-xs justify-center"
                >
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Added Feedback Toast */}
              {addedToast && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Added {quantity} unit(s) of {name} to your cart.</span>
                </div>
              )}
            </div>
          )}

          {/* Commercial Trust Notes */}
          <div className="border-t border-slate-200 pt-4 grid grid-cols-2 gap-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0" />
              <span>Full Manufacturer Traceability</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-sky-700 shrink-0" />
              <span>ESD Packaging &amp; Fast Dispatch</span>
            </div>
          </div>

        </div>
      </div>

      {/* Technical Specifications Table */}
      <section className="glass-panel rounded-xl p-6 sm:p-8 space-y-6 border border-white/90 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Engineering Specifications &amp; Parameters
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified electrical, physical, and packaging characteristics for {name}.
          </p>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 w-1/3">Parameter</th>
                <th className="py-3 px-4">Specification Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-700">Manufacturer Part Number (MPN)</td>
                <td className="py-2.5 px-4 font-mono text-slate-900">{mpn || "Standard Generic Specification"}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-700">Primary Category</td>
                <td className="py-2.5 px-4 text-slate-900">{category}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-700">Brand / Ecosystem</td>
                <td className="py-2.5 px-4 text-slate-900">{brand}</td>
              </tr>
              {Object.entries(specs).map(([key, val]) => (
                <tr key={key}>
                  <td className="py-2.5 px-4 font-semibold text-slate-700">{key}</td>
                  <td className="py-2.5 px-4 text-slate-900">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {features.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Key Engineering Features
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              {features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Related Products from Catalog */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Related Components in Catalog
          </h2>
          <Link to="/products" className="text-xs font-semibold text-sky-700 hover:text-sky-900">
            View All Components &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {displayRelated.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </section>

    </div>
  );
}
