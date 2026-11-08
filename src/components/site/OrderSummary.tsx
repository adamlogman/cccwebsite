import { formatPrice } from "@/lib/products";

export function OrderSummary({ subtotal, shipping, tax, total, children }: { subtotal: number; shipping: number; tax: number; total: number; children?: React.ReactNode }) {
  return (
    <div className="space-y-3 rounded-2xl border bg-card p-6 shadow-card">
      <h2 className="text-lg font-semibold">Order summary</h2>
      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Estimated tax (8%)</span><span>{formatPrice(tax)}</span></div>
      <div className="flex justify-between border-t pt-3 font-display text-lg font-bold"><span>Total</span><span>{formatPrice(total)}</span></div>
      {children}
    </div>
  );
}

