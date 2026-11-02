import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { ShieldCheck, AlertCircle, ArrowRight, ArrowLeft, Lock } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, subtotal, shipping, estimatedTax, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    pinCode: "",
    country: "United States",
    purchaseOrderRef: "",
    notes: "",
    marketingConsent: false
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Your Basket is Empty</h1>
        <p className="text-sm text-slate-600">
          You must add electronic components to your basket before proceeding to checkout.
        </p>
        <Link to="/products" className="btn-primary inline-flex text-xs">
          Browse Catalog
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();

    // Client-side validation of mandatory fields
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.pinCode.trim()
    ) {
      setErrorMsg("Please complete all mandatory delivery and contact fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    // Generate unique session order reference
    const orderReference = `ECE-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderSummary = {
      orderReference,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        mpn: item.mpn,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.unitPrice * item.quantity
      })),
      deliveryDetails: { ...formData },
      financials: {
        subtotal,
        shipping,
        estimatedTax,
        total
      },
      createdAt: new Date().toISOString()
    };

    // Clear cart memory and pass state to order confirmation
    setTimeout(() => {
      clearCart();
      navigate("/order-confirmation", { state: { order: orderSummary } });
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <Link to="/cart" className="hover:text-slate-900">Cart</Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-900 font-medium">Checkout</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Delivery Details &amp; Order Requisition
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Direct guest checkout. No customer account creation or password required.
        </p>
      </div>

      {/* Honest Limitation Notice */}
      <div className="p-4 bg-sky-50 border border-sky-200 rounded-lg text-xs text-sky-900 space-y-1">
        <div className="font-semibold flex items-center gap-1.5 text-sky-950">
          <ShieldCheck className="w-4 h-4 text-sky-700" />
          <span>Frontend Demonstration Notice</span>
        </div>
        <p className="text-sky-800 leading-relaxed">
          This order requisition generates an authenticated session receipt and purchase reference. In this frontend deployment, no actual payment card or banking information is collected or processed. Real merchant transactions are processed via formal commercial invoicing or procurement desks.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Checkout Form & Order Summary */}
      <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Delivery & Contact Info */}
        <div className="lg:col-span-7 glass-panel rounded-xl p-6 space-y-5 border border-white/90 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            1. Customer &amp; Delivery Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="e.g. Alex Morgan"
                className="form-input text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Business / Personal Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@organization.com"
                className="form-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Street / Facility Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Building, street, suite, or lab facility"
              className="form-input text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Area / Locality / Department
              </label>
              <input
                type="text"
                name="locality"
                value={formData.locality}
                onChange={handleChange}
                placeholder="e.g. Hardware Engineering Dept"
                className="form-input text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="e.g. Austin"
                className="form-input text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                State / Region *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                placeholder="e.g. Texas"
                className="form-input text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Postal / PIN Code *
              </label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                required
                placeholder="e.g. 78701"
                className="form-input text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Country *
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="form-input text-xs"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Internal Purchase Order (PO) Reference (Optional)
            </label>
            <input
              type="text"
              name="purchaseOrderRef"
              value={formData.purchaseOrderRef}
              onChange={handleChange}
              placeholder="e.g. PO-2026-LAB-04"
              className="form-input text-xs"
            />
          </div>

          <div className="pt-2">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Delivery or Inspection Notes
            </label>
            <textarea
              name="notes"
              rows="2"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Special handling instructions, ESD labeling, or dock delivery notes..."
              className="form-input text-xs"
            />
          </div>

          {/* Marketing consent - Unchecked by default */}
          <div className="pt-2 border-t border-slate-100 flex items-start gap-2">
            <input
              type="checkbox"
              id="marketingConsent"
              name="marketingConsent"
              checked={formData.marketingConsent}
              onChange={handleChange}
              className="mt-0.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <label htmlFor="marketingConsent" className="text-[11px] text-slate-500">
              (Optional) Keep me informed of new component stock additions, reel availability, and semiconductor catalog updates.
            </label>
          </div>
        </div>

        {/* Right Summary: Requisition Overview */}
        <div className="lg:col-span-5 glass-panel rounded-xl p-6 space-y-5 border border-white/90 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            2. Requisition Review ({cartItems.length} items)
          </h2>

          {/* Itemized summary */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 text-xs">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center gap-2 border-b border-slate-100 pb-2">
                <div className="truncate">
                  <div className="font-semibold text-slate-900 truncate">{item.name}</div>
                  <div className="text-[10px] text-slate-500">
                    Qty: {item.quantity} · ${item.unitPrice.toFixed(3)}/ea
                  </div>
                </div>
                <div className="font-bold text-slate-900 tabular-nums shrink-0">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Financial Breakdown */}
          <div className="border-t border-slate-200 pt-3 space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900 tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping &amp; Handling</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Sales Tax (5%)</span>
              <span className="font-semibold text-slate-900 tabular-nums">${estimatedTax.toFixed(2)}</span>
            </div>

            <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-bold text-slate-900">
              <span>Order Total</span>
              <span className="text-sky-900 tabular-nums">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Final Action Button */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3 text-sm justify-center"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? "Generating Requisition..." : "Confirm & Generate Order Requisition"}</span>
            </button>

            <Link
              to="/cart"
              className="btn-secondary w-full py-2 text-xs justify-center text-slate-600"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Basket</span>
            </Link>
          </div>

          <p className="text-[10px] text-slate-400 text-center leading-relaxed">
            By clicking confirm, your order reference is saved locally in this session. ElectroChip will prepare dispatch documentation upon procurement desk verification.
          </p>

        </div>

      </form>
    </div>
  );
}
