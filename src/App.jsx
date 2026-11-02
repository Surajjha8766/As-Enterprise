import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import RfqModal from "./components/RfqModal.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import TechBackground from "./components/TechBackground.jsx";

// Page Views
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import BrandsPage from "./pages/BrandsPage.jsx";
import PartnersPage from "./pages/PartnersPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.jsx";
import FaqPage from "./pages/FaqPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import CookiePreferencesPage from "./pages/CookiePreferencesPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Router>
      <CartProvider>
        <SmoothScroll />
        <div className="relative min-h-screen flex flex-col text-slate-900 overflow-x-hidden">
          {/* Global Technical PCB Background Image with Frosted Light Overlay on All Pages */}
          <TechBackground />
          
          {/* Main App Content Layer */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/partners" element={<PartnersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/cookie-preferences" element={<CookiePreferencesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <RfqModal />
          </div>
        </div>
      </CartProvider>
    </Router>
  );
}
