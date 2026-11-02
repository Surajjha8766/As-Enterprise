import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import ComponentVisual from "../components/ComponentVisual.jsx";
import { Trash2, ArrowRight, ArrowLeft, ShoppingBag, ShieldCheck } from "lucide-react";

export default function CartPage() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    shipping, 
    estimatedTax, 
    total,
    openRfqModal
  } = useCart();

  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Your Cart is Empty</h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          You currently have no active components in your order basket. Explore our active price list to add electronic components, semiconductors, or tools.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Link to="/products" className="btn-primary text-xs">
            Browse Product Catalog
          </Link>
          <button onClick={() => openRfqModal()} className="btn-secondary text-xs">
            Submit BOM for Quote
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Order Basket &amp; Requisition
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review quantities and technical packaging before proceeding to customer checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-slate-500 hover:text-red-600 transition-colors"
        >
          Clear Basket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cart Itemized List */}
        <div className="lg:col-span-8 glass-panel rounded-xl overflow-hidden divide-y divide-slate-200/80 border border-white/90 shadow-xs">
          {cartItems.map((item) => (
            <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              {/* Product Info */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-16 h-16 rounded-lg border border-slate-200/80 bg-white/90 shrink-0 overflow-hidden flex items-center justify-center">
                  <ComponentVisual product={item} className="w-16 h-16" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-sky-700 block tracking-wider">
                    {item.category}
                  </span>
                  <Link
                    to={`/products/${item.id}`}
                    className="font-semibold text-slate-900 text-sm hover:text-sky-700 transition-colors truncate block"
                  >
                    {item.name}
                  </Link>
                  <div className="text-xs font-mono text-slate-500 mt-0.5">
                    MPN: {item.mpn || "Standard Spec"}
                  </div>
                </div>
              </div>

              {/* Quantity Stepper & Price Calculation */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                {/* Stepper */}
                <div className="flex items-center border border-slate-200 rounded">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    className="w-14 text-center text-xs font-semibold py-1 outline-none tabular-nums"
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[70px]">
                  <div className="font-bold text-slate-900 text-sm tabular-nums">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-400 tabular-nums">
                    @ ${item.unitPrice.toFixed(3)}/ea
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 glass-panel rounded-xl p-6 space-y-4 border border-white/90 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200">
            Requisition Summary
          </h2>

          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Components Subtotal</span>
              <span className="font-semibold text-slate-900 tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {shipping === 0 ? "Free (over $150)" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Business Sales Tax (5%)</span>
              <span className="font-semibold text-slate-900 tabular-nums">${estimatedTax.toFixed(2)}</span>
            </div>

            <div className="border-t border-slate-200 pt-3 flex justify-between text-sm font-bold text-slate-900">
              <span>Total Estimated Amount</span>
              <span className="text-base text-sky-900 tabular-nums">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => navigate("/checkout")}
              className="btn-primary w-full py-2.5 text-xs justify-center"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/products"
              className="btn-secondary w-full py-2.5 text-xs justify-center text-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Orders undergo technical verification before dispatch. Packaging conforms to EIA-481 ESD standards.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
