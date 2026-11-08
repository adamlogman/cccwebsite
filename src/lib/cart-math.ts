export type CartLine = { id: string; qty: number };

export const FREE_SHIPPING_THRESHOLD = 100;
export const TAX_RATE = 0.08;
export const deliveryOptions = [
  { id: "standard", name: "Standard delivery", eta: "3–5 business days", price: 5.99 },
  { id: "express", name: "Express delivery", eta: "1–2 business days", price: 14.99 },
  { id: "pickup", name: "Store pickup", eta: "Ready tomorrow", price: 0 },
] as const;
export type DeliveryId = (typeof deliveryOptions)[number]["id"];

export function addLine(lines: CartLine[], id: string, qty: number, max: number): CartLine[] {
  const existing = lines.find((l) => l.id === id);
  if (existing) return lines.map((l) => (l.id === id ? { ...l, qty: Math.min(max, l.qty + qty) } : l));
  return [...lines, { id, qty: Math.min(max, qty) }];
}

export function setLineQty(lines: CartLine[], id: string, qty: number, max: number): CartLine[] {
  if (qty <= 0) return lines.filter((l) => l.id !== id);
  return lines.map((l) => (l.id === id ? { ...l, qty: Math.min(max, qty) } : l));
}

export function computeTotals(subtotal: number, delivery: DeliveryId = "standard") {
  const opt = deliveryOptions.find((d) => d.id === delivery)!;
  const shipping =
    subtotal === 0 ? 0 : delivery === "standard" && subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : opt.price;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  return { subtotal, shipping, tax, total: Math.round((subtotal + shipping + tax) * 100) / 100 };
}
