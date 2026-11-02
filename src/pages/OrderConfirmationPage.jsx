import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Printer, 
  ArrowRight, 
  FileSpreadsheet, 
  ShieldCheck, 
  PackageCheck 
} from "lucide-react";

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  const [soundMuted, setSoundMuted] = useState(false);

  // Subtle Web Audio API chime tone (positive harmonic frequencies)
  const playConfirmationChime = () => {
    if (soundMuted) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const playTone = (freq, start, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      // Soft dual chime (E5 -> G#5)
      playTone(659.25, 0.0, 0.35);
      playTone(830.61, 0.12, 0.45);
    } catch {
      // Audio autoplay policy handled silently
    }
  };

  useEffect(() => {
    if (order && !soundMuted) {
      playConfirmationChime();
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">No Active Order Found</h1>
        <p className="text-sm text-slate-600">
          You have not submitted an order requisition in this browser session.
        </p>
        <Link to="/products" className="btn-primary inline-flex text-xs">
          Browse Catalog
        </Link>
      </div>
    );
  }

  const { orderReference, items, deliveryDetails, financials, createdAt } = order;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Sound Mute & Print Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSoundMuted(!soundMuted);
              if (soundMuted) playConfirmationChime();
            }}
            className="flex items-center gap-1.5 hover:text-slate-800 transition-colors"
          >
            {soundMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span>Audio Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Audio Enabled</span>
              </>
            )}
          </button>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 hover:text-slate-800 transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print Requisition Receipt</span>
        </button>
      </div>

      {/* Confirmation Hero Card */}
      <div className="glass-panel rounded-xl p-6 sm:p-8 text-center space-y-4 border border-white/90 shadow-sm">
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs uppercase font-semibold text-emerald-700 tracking-wider">
            Requisition Generated Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Order Reference: <span className="font-mono text-sky-900">{orderReference}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto">
            Your component order requisition has been recorded for the current browser session. A confirmation record has been prepared for dispatch and procurement processing.
          </p>
        </div>

        {/* Limitation Notice */}
        <div className="p-3 bg-white/70 border border-slate-200/80 rounded-lg text-left text-xs text-slate-600 max-w-xl mx-auto space-y-1">
          <div className="font-semibold text-slate-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-700" />
            <span>Static Demonstration Status</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            This order has been staged locally in memory without processing payment cards or credentials. For commercial fulfillment, provide Reference <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono font-bold text-slate-900">{orderReference}</code> to <span className="text-sky-700 font-medium">orders@electrochip-enterprise.com</span>.
          </p>
        </div>
      </div>

      {/* Order Details Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Delivery Details */}
        <div className="glass-panel rounded-xl p-6 space-y-3 border border-white/90 shadow-xs">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200/80 pb-2">
            Delivery &amp; Customer Information
          </h2>
          <div className="text-xs space-y-1 text-slate-700">
            <div><strong className="text-slate-900">Recipient:</strong> {deliveryDetails.fullName}</div>
            <div><strong className="text-slate-900">Email:</strong> {deliveryDetails.email}</div>
            <div><strong className="text-slate-900">Address:</strong> {deliveryDetails.address}</div>
            {deliveryDetails.locality && <div><strong className="text-slate-900">Locality:</strong> {deliveryDetails.locality}</div>}
            <div><strong className="text-slate-900">City / State:</strong> {deliveryDetails.city}, {deliveryDetails.state} {deliveryDetails.pinCode}</div>
            <div><strong className="text-slate-900">Country:</strong> {deliveryDetails.country}</div>
            {deliveryDetails.purchaseOrderRef && (
              <div className="pt-1 text-sky-900 font-mono font-medium">
                PO Reference: {deliveryDetails.purchaseOrderRef}
              </div>
            )}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="glass-panel rounded-xl p-6 space-y-3 border border-white/90 shadow-xs">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            Pricing &amp; Requisition Total
          </h2>
          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Components Subtotal</span>
              <span className="font-semibold text-slate-900 tabular-nums">${financials.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Logistics / Handling</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                {financials.shipping === 0 ? "Free" : `$${financials.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (5%)</span>
              <span className="font-semibold text-slate-900 tabular-nums">${financials.estimatedTax.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-slate-900">
              <span>Final Requisition Amount</span>
              <span className="text-sky-900 tabular-nums">${financials.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Itemized Requisition Table */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Ordered Components ({items.length} line items)
        </h2>

        <div className="border border-slate-200 rounded overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-3">Part Description</th>
                <th className="py-2.5 px-3">MPN</th>
                <th className="py-2.5 px-3 text-center">Quantity</th>
                <th className="py-2.5 px-3 text-right">Unit Price</th>
                <th className="py-2.5 px-3 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{item.name}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">{item.mpn || "Standard"}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums">{item.quantity}</td>
                  <td className="py-2.5 px-3 text-right tabular-nums">${item.unitPrice.toFixed(3)}</td>
                  <td className="py-2.5 px-3 text-right font-semibold text-slate-900 tabular-nums">
                    ${item.totalPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
        <Link to="/products" className="btn-primary text-xs">
          <span>Continue Shopping Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link to="/" className="btn-secondary text-xs">
          Return to Homepage
        </Link>
      </div>

    </div>
  );
}
