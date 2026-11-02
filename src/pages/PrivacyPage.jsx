import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Eye, Database } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
          Transparency &amp; Governance
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Privacy Policy &amp; Data Handling Disclosure
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last revised: October 2026 · ElectroChip Enterprise
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-sky-700" />
            <span>1. Overview &amp; Static Architecture Disclosure</span>
          </h2>
          <p>
            This website operates as a client-side React single-page application. ElectroChip Enterprise does not operate background tracking beacons, unauthorized ad networks, or covert cross-site profiling engines.
          </p>
        </section>

        <section className="space-y-2 border-t border-slate-100 pt-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Eye className="w-4 h-4 text-sky-700" />
            <span>2. Information Handled in Your Browser</span>
          </h2>
          <p>
            During your interaction with this storefront, the following data may be processed strictly within your local browser environment:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
            <li><strong>Shopping Basket State:</strong> Non-sensitive component identifiers and quantities stored temporarily in browser memory or <code>localStorage</code> to maintain your basket between page navigations.</li>
            <li><strong>Order Requisition Forms:</strong> Contact and delivery information entered during demonstration checkout or RFQ requests is held in temporary memory solely to generate a printable confirmation receipt.</li>
          </ul>
        </section>

        <section className="space-y-2 border-t border-slate-100 pt-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-700" />
            <span>3. Critical Security &amp; Backend Limitations</span>
          </h2>
          <p>
            As a static frontend implementation without a dedicated backend server:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
            <li>No real payment credentials (credit cards, CVV, bank PINs) are ever requested, processed, or stored.</li>
            <li>Authoritative inventory tracking and payment settlement require trusted server-side and banking integrations before orders can be fulfilled commercially.</li>
            <li>Customer data submitted via the contact or checkout forms is not stored on a remote database without integration of a secure server-side API.</li>
          </ul>
        </section>

        <section className="space-y-2 border-t border-slate-100 pt-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-sky-700" />
            <span>4. Cookie Preferences &amp; Opt-Out</span>
          </h2>
          <p>
            This website uses only essential session mechanics. We do not load non-essential marketing or analytics scripts prior to explicit consent. You may configure your choices at any time on our{" "}
            <Link to="/cookie-preferences" className="text-sky-700 underline font-semibold">
              Cookie Preferences page
            </Link>.
          </p>
        </section>

        <section className="space-y-2 border-t border-slate-100 pt-4">
          <h2 className="text-base font-bold text-slate-900">
            5. Contacting the Data Protection Officer
          </h2>
          <p>
            For privacy inquiries or technical questions regarding data handling practices, contact <span className="font-mono text-slate-800 font-medium">privacy@electrochip-enterprise.com</span>.
          </p>
        </section>

      </div>

    </div>
  );
}
