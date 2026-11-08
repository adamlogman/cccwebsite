import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { addLine, setLineQty, type CartLine } from "./cart-math";
import { getProduct, type Product } from "./products";

export type Order = {
  id: string;
  date: string;
  items: { id: string; name: string; qty: number; price: number }[];
  total: number;
  name: string;
  email: string;
  address: string;
  delivery: string;
  payment: string;
};

type StoreCtx = {
  hydrated: boolean;
  cart: CartLine[];
  cartItems: { product: Product; qty: number }[];
  cartCount: number;
  subtotal: number;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWished: (id: string) => boolean;
  user: { name: string; email: string } | null;
  setUser: (u: { name: string; email: string } | null) => void;
  lastOrder: Order | null;
  setLastOrder: (o: Order) => void;
  dark: boolean;
  toggleDark: () => void;
};

const Ctx = createContext<StoreCtx | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setCart(load("kivora.cart", []));
    setWishlist(load("kivora.wishlist", []));
    setUser(load("kivora.user", null));
    setLastOrder(load("kivora.lastOrder", null));
    setDark(load("kivora.dark", false));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem("kivora.cart", JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("kivora.wishlist", JSON.stringify(wishlist)); }, [wishlist, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("kivora.user", JSON.stringify(user)); }, [user, hydrated]);
  useEffect(() => { if (hydrated && lastOrder) localStorage.setItem("kivora.lastOrder", JSON.stringify(lastOrder)); }, [lastOrder, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("kivora.dark", JSON.stringify(dark));
    document.documentElement.classList.toggle("dark", dark);
  }, [dark, hydrated]);

  const addToCart = useCallback((id: string, qty = 1) => {
    const p = getProduct(id);
    if (!p) return;
    if (p.stock <= 0) { toast.error(`${p.name} is out of stock`); return; }
    setCart((c) => addLine(c, id, qty, p.stock));
    toast.success("Added to cart", { description: `${qty} × ${p.name}` });
  }, []);
  const setQty = useCallback((id: string, qty: number) => {
    const p = getProduct(id);
    setCart((c) => setLineQty(c, id, qty, p?.stock ?? 99));
  }, []);
  const removeFromCart = useCallback((id: string) => {
    setCart((c) => c.filter((l) => l.id !== id));
    toast("Removed from cart");
  }, []);
  const toggleWishlist = useCallback((id: string) => {
    setWishlist((w) => {
      const has = w.includes(id);
      toast(has ? "Removed from wishlist" : "Saved to wishlist");
      return has ? w.filter((x) => x !== id) : [...w, id];
    });
  }, []);

  const value = useMemo<StoreCtx>(() => {
    const cartItems = cart
      .map((l) => ({ product: getProduct(l.id)!, qty: l.qty }))
      .filter((x) => x.product);
    return {
      hydrated, cart, cartItems,
      cartCount: cart.reduce((s, l) => s + l.qty, 0),
      subtotal: Math.round(cartItems.reduce((s, x) => s + x.product.price * x.qty, 0) * 100) / 100,
      addToCart, setQty, removeFromCart, clearCart: () => setCart([]),
      wishlist, toggleWishlist, isWished: (id) => wishlist.includes(id),
      user, setUser, lastOrder, setLastOrder,
      dark, toggleDark: () => setDark((d) => !d),
    };
  }, [hydrated, cart, wishlist, user, lastOrder, dark, addToCart, setQty, removeFromCart, toggleWishlist]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be used inside StoreProvider");
  return v;
}
