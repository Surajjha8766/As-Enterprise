import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { X, CheckCircle, FileText, Send, AlertCircle } from "lucide-react";

export default function RfqModal() {
  const { rfqModalOpen, closeRfqModal, rfqActiveProduct } = useCart();

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    targetQuantity: rfqActiveProduct?.requireQty || 100,
    targetDate: "",
    projectScope: "",
    targetUnitPrice: "",
    consent: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!rfqModalOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.contactPerson.trim() || !formData.email.trim()) {
      setErrorMsg("Please provide your name and business email address.");
      return;
    }
    if (!formData.email.includes("@")) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }
    if (formData.targetQuantity <= 0) {
      setErrorMsg("Target quantity must be greater than zero.");
      return;
    }

    setErrorMsg("");
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMsg("");
    closeRfqModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-700" />
            <h3 className="text-base font-semibold text-slate-900">
              Request Commercial Quotation (RFQ)
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
            aria-label="Close RFQ Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Quotation Requisition Prepared
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your RFQ for <strong className="text-slate-900">{rfqActiveProduct?.name || "Specified Components"}</strong> has been generated with Reference ID <code className="bg-slate-100 px-2 py-0.5 rounded text-xs font-mono font-semibold text-sky-800">RFQ-{Math.floor(100000 + Math.random() * 900000)}</code>.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded p-4 text-left text-xs space-y-1.5 text-slate-700 font-mono">
                <div><strong>Part:</strong> {rfqActiveProduct?.name}</div>
                <div><strong>MPN:</strong> {rfqActiveProduct?.mpn || "To be confirmed"}</div>
                <div><strong>Requested Quantity:</strong> {formData.targetQuantity} units</div>
                <div><strong>Contact:</strong> {formData.contactPerson} ({formData.email})</div>
                {formData.companyName && <div><strong>Company:</strong> {formData.companyName}</div>}
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 text-left">
                <strong>Static Frontend Notice:</strong> In this frontend deployment, quotes are prepared locally. To transmit directly to ElectroChip procurement desks, contact <span className="font-semibold underline">sales@electrochip-enterprise.com</span> with your reference ID.
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="btn-primary"
                >
                  Return to Catalog
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {rfqActiveProduct && (
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                    Target Component
                  </div>
                  <div className="font-semibold text-slate-900 text-sm mt-0.5">
                    {rfqActiveProduct.name}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {rfqActiveProduct.description}
                  </div>
                  {rfqActiveProduct.mpn && (
                    <div className="text-xs font-mono text-sky-800 mt-1">
                      Manufacturer Part Number: {rfqActiveProduct.mpn}
                    </div>
                  )}
                </div>
              )}

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Elena Rostova"
                    className="form-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@company.com"
                    className="form-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. TechCorp Solutions"
                    className="form-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Target Requisition Quantity *
                  </label>
                  <input
                    type="number"
                    name="targetQuantity"
                    min="1"
                    value={formData.targetQuantity}
                    onChange={handleChange}
                    required
                    className="form-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Technical Specifications & Packaging Requirements
                </label>
                <textarea
                  name="projectScope"
                  rows="3"
                  value={formData.projectScope}
                  onChange={handleChange}
                  placeholder="Specify tolerance, package type (e.g. SMD Reel / Bulk Tray), date code requirement, or target price..."
                  className="form-input text-xs"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="rfq-consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-0.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <label htmlFor="rfq-consent" className="text-[11px] text-slate-500">
                  I agree to receive a formal commercial quotation and technical specification sheet based on the provided parameters.
                </label>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  Generate Requisition
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
