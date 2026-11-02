import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import BrandLogo from "./BrandLogo.jsx";
import { ShoppingCart, Search, Menu, X, FileText, ArrowRight } from "lucide-react";

export default function Navbar() {
  const { cartCount, openRfqModal } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Brands", to: "/brands" },
    { label: "Partners", to: "/partners" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 truncate">
            <span className="font-semibold text-sky-400">Commercial Sourcing Desk</span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">
              Bulk Reel & Packaging Options Available for OEMs, EMS & Labs
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-slate-400 text-[11px]">
            <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <span>·</span>
            <button
              onClick={() => openRfqModal()}
              className="hover:text-sky-300 transition-colors font-medium flex items-center gap-1"
            >
              <FileText className="w-3 h-3 text-sky-400" />
              <span>Submit RFQ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav Links) - Zone 3 (Action) */}
      <header className="sticky top-0 z-40 glass-nav border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single Brand Element */}
          <div className="shrink-0">
            <BrandLogo size="md" />
          </div>

          {/* Zone 2: 5 Clean Single-Line Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                    isActive
                      ? "text-slate-900 border-sky-600 font-semibold"
                      : "border-transparent hover:text-slate-900 hover:border-slate-300"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Zone 3: Primary Action Cluster */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Toggle */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors flex items-center"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sky-600 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center tabular-nums">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => openRfqModal()}
              className="hidden sm:inline-flex btn-primary text-xs"
            >
              Request Quote
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar Drawer */}
        {searchOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-3 shadow-inner">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by part number (e.g. WR04X102JTL, P2N2222A), component name, or category..."
                  className="w-full pl-9 pr-24 py-2 border border-slate-200 rounded text-sm outline-none focus:border-sky-600"
                  autoFocus
                />
                <button
                  type="submit"
                  className="btn-primary text-xs absolute right-1 py-1 px-3"
                >
                  Search
                </button>
              </form>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2">
                <span className="font-medium text-slate-700">Quick Searches:</span>
                <Link to="/products?q=WR04" className="hover:text-sky-600">SMD Resistors</Link>
                <span>·</span>
                <Link to="/products?q=Arduino" className="hover:text-sky-600">Arduino UNO</Link>
                <span>·</span>
                <Link to="/products?q=ZE16B" className="hover:text-sky-600">Gas Sensors</Link>
                <span>·</span>
                <Link to="/products?q=LED" className="hover:text-sky-600">Through-Hole LEDs</Link>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded text-sm font-medium ${
                      isActive
                        ? "bg-sky-50 text-sky-800 font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openRfqModal();
                }}
                className="btn-primary w-full text-center"
              >
                Request Commercial Quotation
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
