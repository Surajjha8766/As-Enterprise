import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Technical Sourcing Inquiry",
    message: "",
    consent: true,
    websiteTrap: "" // Honeypot spam prevention
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Honeypot check
    if (formData.websiteTrap) {
      return; // Silently reject bot spam
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please complete all required fields (Name, Email, Message).");
      return;
    }

    if (!formData.email.includes("@")) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }

    if (!formData.consent) {
      setErrorMsg("You must consent to data processing for communication.");
      return;
    }

    setErrorMsg("");
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
          Support &amp; Inquiries
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Contact ElectroChip Procurement Desks
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Need technical documentation, volume reel quotes, or advice on passive and semiconductor alternatives? Reach out to our component specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Contacts */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-xl p-6 space-y-6 border border-white/90 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200/80 pb-2">
              Commercial Desks
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5 border border-sky-100">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Commercial Inquiries</div>
                  <div className="text-slate-600 font-mono mt-0.5">sales@electrochip-enterprise.com</div>
                  <div className="text-[11px] text-slate-400">Response within 24 business hours</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5 border border-sky-100">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Telephone Desk</div>
                  <div className="text-slate-600 font-mono mt-0.5">+1 (800) 555-CHIP (2447)</div>
                  <div className="text-[11px] text-slate-400">Mon - Fri: 8:00 AM - 6:00 PM EST</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5 border border-sky-100">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Fulfillment Facility</div>
                  <div className="text-slate-600 mt-0.5 leading-relaxed">
                    Logistics Park, Semiconductor Distribution Center<br />
                    Suite 400, Industrial Parkway
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200/80 pt-4 text-[11px] text-slate-500 space-y-1">
              <strong>Technical RFQs:</strong> For complete bill of materials matching, prefer the direct RFQ tool on our catalog pages.
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 glass-panel rounded-xl p-6 sm:p-8 space-y-5 border border-white/90 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200/80 pb-2">
            Send an Inquiry
          </h2>

          {/* Honest static frontend transparency note */}
          <div className="p-3 bg-amber-50/90 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Static Frontend Architecture Notice</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              This is a static frontend deployment. Submissions are processed locally in the browser and will not reach an external mail server without connecting a backend email webhook or API endpoint.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Inquiry Prepared Locally</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you, <strong>{formData.name}</strong>. Your message regarding "<strong>{formData.subject}</strong>" has been validated and recorded for this session.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-secondary text-xs mt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Spam Honeypot - hidden from human users */}
              <input
                type="text"
                name="websiteTrap"
                value={formData.websiteTrap}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Full name"
                    className="form-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Email Address *
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

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Inquiry Topic
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input text-xs"
                >
                  <option value="Technical Sourcing Inquiry">Technical Sourcing Inquiry</option>
                  <option value="Volume Reel / Packaging Quotation">Volume Reel / Packaging Quotation</option>
                  <option value="Part Number (MPN) Verification">Part Number (MPN) Verification</option>
                  <option value="Delivery / Shipping Timeline">Delivery / Shipping Timeline</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Detail your component part numbers, quantities, or specific questions..."
                  className="form-input text-xs"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="contact-consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-0.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <label htmlFor="contact-consent" className="text-[11px] text-slate-500">
                  I agree that the information entered will be processed for the purpose of answering my inquiry.
                </label>
              </div>

              <div className="pt-2 flex justify-end">
                <button type="submit" className="btn-primary text-xs">
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
