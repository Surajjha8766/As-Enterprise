import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS } from "../data/products.js";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "electrochip_cart_items_v1";

export function CartProvider({ children }) {
  // Load initial non-sensitive items { id, quantity } from local storage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Re-hydrate with actual product catalog to ensure integrity
          return parsed
            .map((item) => {
              const product = PRODUCTS.find((p) => p.id === item.id);
              if (!product || product.quoteOnly) return null;
              return {
                ...product,
                quantity: Math.max(1, parseInt(item.quantity, 10) || 1)
              };
            })
            .filter(Boolean);
        }
      }
    } catch {
      // LocalStorage not available or parse error
    }
    // Default initial demonstration cart with flagship sample items
    const defaultItem1 = PRODUCTS.find((p) => p.id === "EC-010"); // Arduino Uno R3
    const defaultItem2 = PRODUCTS.find((p) => p.id === "EC-012"); // 1k Resistor
    return [
      defaultItem1 ? { ...defaultItem1, quantity: 2 } : null,
      defaultItem2 ? { ...defaultItem2, quantity: 5 } : null
    ].filter(Boolean);
  });

  // RFQ (Request for Quote) Requisition Drawer State
  const [rfqItems, setRfqItems] = useState([]);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqActiveProduct, setRfqActiveProduct] = useState(null);

  // Sync non-sensitive cart items (id & quantity only)
  useEffect(() => {
    try {
      const minimal = cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity
      }));
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(minimal));
    } catch {
      // Ignore storage errors
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    if (!product || product.quoteOnly) {
      openRfqModal(product);
      return;
    }

    const qty = Math.max(1, parseInt(quantity, 10) || 1);

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        return updated;
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: Math.min(99999, qty) } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  // RFQ handlers
  const openRfqModal = (product = null) => {
    setRfqActiveProduct(product);
    setRfqModalOpen(true);
  };

  const closeRfqModal = () => {
    setRfqModalOpen(false);
    setRfqActiveProduct(null);
  };

  const addRfqItem = (product, targetQty = 100, customNotes = "") => {
    if (!product) return;
    setRfqItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, targetQty, customNotes }
            : item
        );
      }
      return [...prev, { ...product, targetQty, customNotes }];
    });
  };

  const removeRfqItem = (productId) => {
    setRfqItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => {
    if (!item.unitPrice) return acc;
    return acc + item.unitPrice * item.quantity;
  }, 0);

  // Enterprise standard shipping rules: Flat $15 or free above $150
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15.0;
  const estimatedTax = subtotal * 0.05; // 5% estimated business sales tax
  const total = subtotal + (subtotal > 0 ? shipping + estimatedTax : 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        shipping,
        estimatedTax,
        total,
        // RFQ
        rfqItems,
        rfqModalOpen,
        rfqActiveProduct,
        openRfqModal,
        closeRfqModal,
        addRfqItem,
        removeRfqItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
