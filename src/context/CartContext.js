import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext(null);
const LS_KEY = "tienda_cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const setQty = (id, cantidad) => {
    const qty = Number(cantidad);
    if (!Number.isFinite(qty) || qty < 1) return;
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, cantidad: qty } : i)));
  };

  const removeFromCart = (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto del carrito?")) return;
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const value = useMemo(
    () => ({ cart, addToCart, setQty, removeFromCart, clearCart, total }),
    [cart, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
