import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, Heart, Minus, Plus, RotateCcw, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductGrid, StockBadge } from "@/components/site/ProductCard";
import { Rating } from "@/components/site/Rating";
import { categoryName, discountPercent, formatPrice, getProduct, products } from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Kivora` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Kivora` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Product unavailable — Kivora" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

const views = ["object-center", "object-left scale-125", "object-right scale-125", "object-top scale-150"];

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isWished } = useStore();
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);
  const [tab, setTab] = useState<"specs" | "reviews">("specs");
  const off = discountPercent(p);
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).concat(products.filter((x) => x.category !== p.category)).slice(0, 4);
  const max = Math.max(1, p.stock);

  return (
    <div className="container-page py-8">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-primary">Home</Link><ChevronRight className="size-3" />
        <Link to="/shop" search={{ category: p.category }} className="hover:text-primary">{categoryName(p.category)}</Link><ChevronRight className="size-3" />
        <span className="text-foreground">{p.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-3xl border bg-card shadow-card">
            <img key={view} src={p.image} alt={p.name} width={816} height={816} className={cn("size-full object-cover transition duration-500 animate-rise", views[view])} />
            {off > 0 && <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-sm font-bold text-brand-foreground">-{off}%</span>}
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {views.map((v, i) => (
              <button key={i} onClick={() => setView(i)} aria-label={`View image ${i + 1}`}
                className={cn("aspect-square overflow-hidden rounded-xl border-2 bg-card transition", view === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100")}>
                <img src={p.image} alt="" loading="lazy" className={cn("size-full object-cover", v)} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">{p.brand}</p>
            <h1 className="mt-1 text-3xl font-bold md:text-4xl">{p.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <Rating value={p.rating} count={p.reviewCount} />
              <StockBadge stock={p.stock} />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold">{formatPrice(p.price)}</span>
            {p.oldPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatPrice(p.oldPrice)}</span>
                <span className="rounded-full bg-success/15 px-2.5 py-1 text-sm font-semibold text-success">You save {formatPrice(p.oldPrice - p.price)}</span>
              </>
            )}
          </div>
          <p className="leading-relaxed text-muted-foreground">{p.description}</p>

          <div className="flex flex-wrap items-center gap-3 border-y py-5">
            <div className="flex items-center rounded-xl border bg-card" role="group" aria-label="Quantity">
              <button className="grid size-11 place-items-center hover:text-primary disabled:opacity-40" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Decrease quantity"><Minus className="size-4" /></button>
              <span className="w-10 text-center font-semibold" aria-live="polite">{qty}</span>
              <button className="grid size-11 place-items-center hover:text-primary disabled:opacity-40" onClick={() => setQty((q) => Math.min(max, q + 1))} disabled={qty >= max} aria-label="Increase quantity"><Plus className="size-4" /></button>
            </div>
            <Button size="lg" className="flex-1" onClick={() => addToCart(p.id, qty)} disabled={p.stock <= 0}>
              <ShoppingCart /> {p.stock <= 0 ? "Out of stock" : "Add to cart"}
            </Button>
            <Button size="lg" variant="outline" onClick={() => toggleWishlist(p.id)} aria-label="Toggle wishlist">
              <Heart className={cn(isWished(p.id) && "fill-destructive text-destructive")} />
            </Button>
          </div>

          <ul className="grid gap-3 text-sm sm:grid-cols-3">
            <li className="flex items-center gap-2"><Truck className="size-4 text-primary" /> Free delivery over $100</li>
            <li className="flex items-center gap-2"><RotateCcw className="size-4 text-primary" /> 30-day returns</li>
            <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> 1-year warranty</li>
          </ul>

          <div className="rounded-2xl border bg-card shadow-card">
            <div className="flex border-b" role="tablist">
              {(["specs", "reviews"] as const).map((t) => (
                <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
                  className={cn("flex-1 px-4 py-3 text-sm font-semibold transition", tab === t ? "border-b-2 border-primary text-primary" : "text-muted-foreground")}>
                  {t === "specs" ? "Specifications" : `Reviews (${p.reviews.length})`}
                </button>
              ))}
            </div>
            <div className="p-5">
              {tab === "specs" ? (
                <dl className="divide-y text-sm">
                  {Object.entries(p.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 py-2.5"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
                  ))}
                </dl>
              ) : (
                <ul className="space-y-4">
                  {p.reviews.map((r, i) => (
                    <li key={i} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between"><span className="font-semibold">{r.author}</span><span className="text-xs text-muted-foreground">{r.date}</span></div>
                      <Rating value={r.rating} className="mt-1" />
                      <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="mb-6 text-2xl font-bold">You may also like</h2>
        <ProductGrid products={related} />
      </section>
    </div>
  );
}
