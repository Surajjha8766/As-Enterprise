import React, { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";

export default function CookiePreferencesPage() {
  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem("electrochip_cookie_prefs");
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return {
      essential: true, // Always true & disabled
      functional: false,
      analytics: false
    };
  });

  const [savedToast, setSavedToast] = useState(false);

  const handleToggle = (key) => {
    if (key === "essential") return;
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    try {
      localStorage.setItem("electrochip_cookie_prefs", JSON.stringify(preferences));
    } catch {
      // Ignore
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleAcceptAll = () => {
    const allOn = { essential: true, functional: true, analytics: true };
    setPreferences(allOn);
    try {
      localStorage.setItem("electrochip_cookie_prefs", JSON.stringify(allOn));
    } catch {
      // Ignore
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
          Privacy Settings
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Cookie &amp; Storage Preferences
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Manage your browser storage and consent settings. ElectroChip Enterprise never loads non-essential scripts prior to explicit consent.
        </p>
      </div>

      {savedToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Your cookie preferences have been saved for this browser.</span>
        </div>
      )}

      {/* Preferences Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
        
        {/* Strictly Essential */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">Strictly Essential Storage</span>
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Always Active
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Required for basic website operations, including shopping basket persistence across page changes, theme rendering, and session security. Cannot be disabled.
            </p>
          </div>
          <input
            type="checkbox"
            checked={true}
            disabled
            className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 opacity-60 cursor-not-allowed"
          />
        </div>

        {/* Functional */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="font-bold text-slate-900 text-sm">Functional Preferences</div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Remembers your preferred product table sorting and active catalog filters between visits.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.functional}
            onChange={() => handleToggle("functional")}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
          />
        </div>

        {/* Analytics */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="font-bold text-slate-900 text-sm">Performance &amp; Analytics</div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Provides aggregated, anonymized metrics on catalog search terms and page response times to optimize component lookup speed.
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.analytics}
            onChange={() => handleToggle("analytics")}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="btn-secondary text-xs"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn-primary text-xs"
          >
            Save Preferences
          </button>
        </div>

      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-500 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
        <span>
          ElectroChip Enterprise does not partner with third-party behavioral advertising brokers or data harvesting brokers.
        </span>
      </div>

    </div>
  );
}
