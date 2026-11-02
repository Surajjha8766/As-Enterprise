import React, { useState } from "react";
import { ShieldCheck, Mail, CheckCircle, Send, FileText, Handshake } from "lucide-react";

export default function PartnersPage() {
  const [partnerType, setPartnerType] = useState("EMS / Contract Manufacturer");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-sky-700 flex items-center gap-1.5">
          <Handshake className="w-4 h-4" />
          <span>Distribution &amp; Partnerships</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Partner Network &amp; Distribution Inquiries
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          ElectroChip Enterprise believes in absolute transparency. We do not display fabricated partner badges or invented client logos. Instead, we invite commercial partners, EMS assemblers, and component manufacturers to establish verified sourcing agreements.
        </p>
      </div>

      {/* Sourcing Partnership Pillars with Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-xl p-5 space-y-2 border border-white/90 shadow-xs">
          <div className="text-xs font-bold text-sky-800 uppercase tracking-wider">
            For Contract Manufacturers (EMS)
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Scheduled Buffer Stock</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Consignment storage and scheduled reel delivery for passive components and semiconductors to prevent assembly line stoppages.
          </p>
        </div>

        <div className="glass-card rounded-xl p-5 space-y-2 border border-white/90 shadow-xs">
          <div className="text-xs font-bold text-sky-800 uppercase tracking-wider">
            For Hardware Startups &amp; Labs
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Agile BOM Sourcing</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Small-pack quantities for functional prototypes, breadboards, jumper wires, sensors, and development boards without prohibitive minimum order quantities.
          </p>
        </div>

        <div className="glass-card rounded-xl p-5 space-y-2 border border-white/90 shadow-xs">
          <div className="text-xs font-bold text-sky-800 uppercase tracking-wider">
            For Component Manufacturers
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Direct Line Inclusion</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Distribute your discrete semiconductors, passives, and electromechanical products through ElectroChip’s engineering customer base.
          </p>
        </div>
      </div>

      {/* Partnership Inquiry Form */}
      <div className="glass-panel rounded-xl p-6 sm:p-8 space-y-6 border border-white/90 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Submit a Partnership or Supply Inquiry
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Connect with our supplier relations and vendor onboarding team.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50/90 border border-emerald-200 rounded-lg text-center space-y-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Inquiry Prepared Successfully</h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Thank you, <strong className="text-slate-900">{contactName}</strong>. Your inquiry for <strong className="text-slate-900">{companyName}</strong> has been logged in this demonstration session.
            </p>
            <p className="text-[11px] text-slate-500">
              Frontend notice: For direct procurement inquiries, reach our commercial desk at <span className="font-mono text-sky-700 font-semibold">partners@electrochip-enterprise.com</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Apex Electronics Assembly"
                  className="form-input text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="form-input text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Business Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="procurement@company.com"
                  className="form-input text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Partnership Category
                </label>
                <select
                  value={partnerType}
                  onChange={(e) => setPartnerType(e.target.value)}
                  className="form-input text-xs"
                >
                  <option value="EMS / Contract Manufacturer">EMS / Contract Manufacturer</option>
                  <option value="Original Component Manufacturer">Original Component Manufacturer</option>
                  <option value="Franchised Distributor">Franchised Distributor</option>
                  <option value="Academic / Research Institution">Academic / Research Institution</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Collaboration Scope or Requirements
              </label>
              <textarea
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your manufacturing volumes, components needed, or distribution inquiry..."
                className="form-input text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button type="submit" className="btn-primary text-xs">
                <Send className="w-3.5 h-3.5" />
                <span>Submit Partnership Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}
