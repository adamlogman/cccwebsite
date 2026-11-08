import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState, PageHeader } from "@/components/site/PageHeader";
import { computeTotals, FREE_SHIPPING_THRESHOLD } from "@/lib/cart-math";
import { formatPrice } from "@/lib/products";
import { OrderSummary } from "@/components/site/OrderSummary";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Shopping Cart — Kivora" },
      { name: "description", content: "Review the items in your Kivora cart, update quantities and proceed to checkout." },
      { property: "og:title", content: "Your Shopping Cart — Kivora" },
      { property: "og:description", content: "Review your cart and proceed to checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { hydrated, cartItems, subtotal, setQty, removeFromCart, cartCount } = useStore();
  const totals = computeTotals(subtotal, "standard");
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <>
      <PageHeader title="Shopping cart" subtitle={hydrated ? `${cartCount} item${cartCount === 1 ? "" : "s"}` : "Loading…"} />
      <div className="container-page mt-8">
        {!hydrated ? (
          <div className="h-64 animate-pulse rounded-2xl bg-muted" />
        ) : cartItems.length === 0 ? (
          <EmptyState icon={<ShoppingBag className="size-7" />} title="Your cart is empty" text="Looks like you haven't added anything yet. Explore our products and find something you love."
            action={<Button asChild><Link to="/shop" search={{}}>Start shopping</Link></Button>} />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {remaining > 0 ? (
                <div className="rounded-xl bg-accent px-4 py-3 text-sm">Add <b>{formatPrice(remaining)}</b> more for free standard delivery.</div>
              ) : (
                <div className="rounded-xl bg-success/15 px-4 py-3 text-sm font-semibold text-success">🎉 You've unlocked free standard delivery!</div>
              )}
              {cartItems.map(({ product: p, qty }) => (
                <div key={p.id} className="flex gap-4 rounded-2xl border bg-card p-4 shadow-card">
                  <Link to="/product/$id" params={{ id: p.id }} className="shrink-0">
                    <img src={p.image} alt={p.name} className="size-24 rounded-xl object-cover sm:size-28" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <Link to="/product/$id" params={{ id: p.id }} className="font-display font-semibold hover:text-primary">{p.name}</Link>
                      <button onClick={() => removeFromCart(p.id)} aria-label={`Remove ${p.name}`} className="text-muted-foreground hover:text-destructive"><Trash2 className="size-4" /></button>
                    </div>
                    <p className="text-sm text-muted-foreground">{formatPrice(p.price)} each</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-lg border" role="group" aria-label="Quantity">
                        <button className="grid size-9 place-items-center hover:text-primary" onClick={() => setQty(p.id, qty - 1)} aria-label="Decrease"><Minus className="size-4" /></button>
                        <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                        <button className="grid size-9 place-items-center hover:text-primary disabled:opacity-40" disabled={qty >= p.stock} onClick={() => setQty(p.id, qty + 1)} aria-label="Increase"><Plus className="size-4" /></button>
                      </div>
                      <span className="font-display text-lg font-bold">{formatPrice(p.price * qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 lg:sticky lg:top-40 lg:self-start">
              <OrderSummary {...totals}>
                <Button asChild size="lg" variant="brand" className="w-full"><Link to="/checkout">Proceed to checkout <ArrowRight /></Link></Button>
                <Button asChild variant="ghost" className="w-full"><Link to="/shop" search={{}}>Continue shopping</Link></Button>
              </OrderSummary>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
