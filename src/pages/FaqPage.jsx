import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ChevronDown, ChevronUp, FileText, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

export default function FaqPage() {
  const { openRfqModal } = useCart();
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      category: "Product Sourcing & Catalog",
      items: [
        {
          q: "What is the source of the components listed on this website?",
          a: "All 30 components on this website are directly transcribed from the uploaded Component Price List spreadsheet. Every part number (e.g. Walsin WR04X102JTL, onsemi P2N2222A, Winsen ZE16B-CO) is preserved with its exact specification notes."
        },
        {
          q: "Why are some components marked 'Quote Required'?",
          a: "Certain line items—such as Row #19 (USB Cable, listed with quantity 0) and Row #23 (Capacitor, with dielectric and capacitance unspecified)—require customer confirmation of exact electrical and physical parameters before procurement desks can issue a binding quote."
        },
        {
          q: "Are the chip resistors supplied on tape & reel or cut tape?",
          a: "Standard small-quantity orders are supplied as continuous cut tape with ESD protective bagging. Full reels (typically 10,000 units per reel for 0402 SMD resistors) can be quoted via the RFQ tool."
        }
      ]
    },
    {
      category: "Commercial Requisitions & Pricing",
      items: [
        {
          q: "How are the catalog prices calculated?",
          a: "Unit prices represent realistic market benchmarks from authorized electronic distributor channels for standard order quantities. Prices are indicative and subject to currency and manufacturing volume fluctuations."
        },
        {
          q: "Can I receive formal corporate invoices for tax and accounting?",
          a: "Yes. When submitting an order requisition or RFQ, include your company's Tax ID / VAT / GST and Purchase Order (PO) reference. Official commercial invoices are generated upon procurement verification."
        },
        {
          q: "How does the demonstration checkout work?",
          a: "In this static frontend deployment, checkout creates a structured order reference in browser memory. No live financial charges or payment card details are collected or processed."
        }
      ]
    },
    {
      category: "Packaging, Delivery & Returns",
      items: [
        {
          q: "What packaging standards are used for sensitive semiconductors?",
          a: "ElectroChip adheres to standard EIA-481 packaging with antistatic dissipative bags and moisture barrier protection for active and discrete components."
        },
        {
          q: "What is the return and replacement policy?",
          a: "Unopened components in original manufacturer packaging and sealed tape are eligible for technical evaluation and replacement if found defective against manufacturer datasheet tolerances. [Policy marked for business configuration]."
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
          Knowledge Base &amp; Policies
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Frequently Asked Questions (FAQ)
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Detailed answers on component sourcing, manufacturer part numbers, packaging configurations, and commercial quotations.
        </p>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-8">
        {faqs.map((section, sIdx) => (
          <div key={sIdx} className="space-y-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
              {section.category}
            </h2>

            <div className="space-y-2">
              {section.items.map((item, iIdx) => {
                const globalIdx = sIdx * 10 + iIdx;
                const isOpen = openIdx === globalIdx;

                return (
                  <div
                    key={iIdx}
                    className="glass-card rounded-xl border border-white/90 overflow-hidden shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : globalIdx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-sky-700 shrink-0" />
                        <span>{item.q}</span>
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still need help */}
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <div className="font-bold text-slate-900">Have a custom specification question?</div>
          <div className="text-slate-500 mt-0.5">
            Submit your complete Bill of Materials for verification by component engineers.
          </div>
        </div>
        <button
          onClick={() => openRfqModal()}
          className="btn-primary text-xs shrink-0"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Submit BOM Question</span>
        </button>
      </div>

    </div>
  );
}
