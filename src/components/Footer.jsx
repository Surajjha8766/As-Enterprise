import React from "react";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo.jsx";
import { ShieldCheck, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      {/* Top Value Strip */}
      <div className="border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-sky-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white">Authentic Component Sourcing</div>
              <p className="text-xs text-slate-400 mt-0.5">
                Traceable parts sourced from verified manufacturers and franchised distributor networks.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-sky-400">
              <span className="font-bold font-mono text-sm">RFQ</span>
            </div>
            <div>
              <div className="font-semibold text-white">Commercial & Bulk Requisitions</div>
              <p className="text-xs text-slate-400 mt-0.5">
                Support for full tape-and-reel, cut tape, tube, and production tray quantities with custom BOM matching.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-sky-400">
              <span className="font-bold text-sm">ESD</span>
            </div>
            <div>
              <div className="font-semibold text-white">ESD-Controlled Handling</div>
              <p className="text-xs text-slate-400 mt-0.5">
                Moisture barrier packaging and antistatic handling for all semiconductor and passive lines.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white/5 p-3 rounded-lg inline-block">
              <BrandLogo size="md" linkToHome={true} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              ElectroChip Enterprise distributes electronic components, semiconductors, discrete devices, and industrial prototyping hardware to engineers, universities, and OEMs.
            </p>
            <div className="text-xs text-slate-400 space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>support@electrochip-enterprise.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>Commercial Desk: +1 (800) 555-CHIP</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Industrial Logistics Park, Electronics Hub</span>
              </div>
            </div>
          </div>

          {/* Catalog Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/products?category=Passive+Components" className="hover:text-white transition-colors">
                  Passive Components
                </Link>
              </li>
              <li>
                <Link to="/products?category=Semiconductors+%26+Discretes" className="hover:text-white transition-colors">
                  Semiconductors & Discretes
                </Link>
              </li>
              <li>
                <Link to="/products?category=Optoelectronics" className="hover:text-white transition-colors">
                  Optoelectronics (LEDs)
                </Link>
              </li>
              <li>
                <Link to="/products?category=Embedded+%26+Dev+Boards" className="hover:text-white transition-colors">
                  Embedded & Dev Boards
                </Link>
              </li>
              <li>
                <Link to="/products?category=Sensors+%26+Transducers" className="hover:text-white transition-colors">
                  Sensors & Gas Detection
                </Link>
              </li>
              <li>
                <Link to="/products?category=Prototyping+%26+Tools" className="hover:text-white transition-colors">
                  Prototyping & Soldering Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Company Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Company & Procurement
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About ElectroChip
                </Link>
              </li>
              <li>
                <Link to="/brands" className="hover:text-white transition-colors">
                  Verified Brands & MPNs
                </Link>
              </li>
              <li>
                <Link to="/partners" className="hover:text-white transition-colors">
                  Authorized Partners & Distribution
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Commercial FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Sourcing Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Compliance */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Compliance & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-preferences" className="hover:text-white transition-colors">
                  Cookie Preferences
                </Link>
              </li>
              <li>
                <span className="text-slate-500 text-[11px] block mt-4">
                  Pricing Notice: All prices listed are market benchmark prices or subject to formal quotation based on current manufacturing volume and currency exchange.
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="border-t border-slate-800/80 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {currentYear} ElectroChip Enterprise. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>RoHS & REACH Compliant Sourcing</span>
            <span>·</span>
            <span>Static Frontend Architecture</span>
            <span>·</span>
            <Link to="/cookie-preferences" className="hover:text-slate-300">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
