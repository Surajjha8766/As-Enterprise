import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, HelpCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
        <HelpCircle className="w-8 h-8 text-sky-700" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase font-mono font-semibold text-sky-800 tracking-wider">
          Error 404 · Page Not Found
        </span>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Requested Specification Not Found
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          The URL or component document you are seeking has been moved, re-indexed, or is currently unavailable.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary text-xs">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>
        <Link to="/products" className="btn-secondary text-xs">
          <Search className="w-3.5 h-3.5 text-sky-700" />
          <span>Browse 30-Item Catalog</span>
        </Link>
      </div>
    </div>
  );
}
