import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PackageSearch, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EmptyState, PageHeader } from "@/components/site/PageHeader";
import { ProductGrid } from "@/components/site/ProductCard";
import { categories, categoryName, filterProducts, products, type CategoryId, type SortKey } from "@/lib/products";
import { cn } from "@/lib/utils";

type ShopSearch = { q?: string | undefined; category?: CategoryId | undefined; sort?: SortKey | undefined; min?: number | undefined; max?: number | undefined; stock?: boolean | undefined };
const sorts: { id: SortKey; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
  { id: "discount", label: "Biggest discount" },
];

export const Route = createFileRoute("/shop")({
  validateSearch: (s: { q?: unknown; category?: unknown; sort?: unknown; min?: unknown; max?: unknown; stock?: unknown }): ShopSearch => {
    const num = (v: unknown) => (v === undefined || v === "" || isNaN(Number(v)) ? undefined : Number(v));
    return {
      q: typeof s.q === "string" && s.q ? s.q : undefined,
      category: categories.some((c) => c.id === s.category) ? (s.category as CategoryId) : undefined,
      sort: sorts.some((x) => x.id === s.sort) ? (s.sort as SortKey) : undefined,
      min: num(s.min),
      max: num(s.max),
      stock: s.stock === true || s.stock === "true" ? true : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Shop All Products — Kivora" },
      { name: "description", content: "Browse and filter phones, computers, electronics, fashion, shoes and home products by price, rating and category." },
      { property: "og:title", content: "Shop All Products — Kivora" },
      { property: "og:description", content: "Browse and filter our full catalogue by category, price and rating." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

const pricePresets = [
  { label: "Under $100", min: undefined, max: 100 },
  { label: "$100 – $500", min: 100, max: 500 },
  { label: "$500 – $1,000", min: 500, max: 1000 },
  { label: "Over $1,000", min: 1000, max: undefined },
];

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [showFilters, setShowFilters] = useState(false);
  const [minInput, setMinInput] = useState(search.min?.toString() ?? "");
  const [maxInput, setMaxInput] = useState(search.max?.toString() ?? "");
  const update = (patch: Partial<ShopSearch>) => navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const list = filterProducts(products, {
    q: search.q, category: search.category ?? "all", min: search.min, max: search.max, sort: search.sort, inStock: search.stock,
  });
  const title = search.category ? categoryName(search.category) : search.q ? `Results for "${search.q}"` : "All products";
  const hasFilters = !!(search.q || search.category || search.min != null || search.max != null || search.stock);

  const chip = (active: boolean) =>
    cn("w-full rounded-lg px-3 py-2 text-left text-sm transition", active ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-accent");

  return (
    <>
      <PageHeader title={title} crumb="Shop" subtitle={`${list.length} product${list.length === 1 ? "" : "s"} found`} />
      <div className="container-page mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className={cn("space-y-6 lg:block", showFilters ? "block" : "hidden")} aria-label="Filters">
          <div className="rounded-2xl border bg-card p-4 shadow-card">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Category</h2>
            <div className="space-y-1">
              <button className={chip(!search.category)} onClick={() => update({ category: undefined })}>All categories</button>
              {categories.map((c) => (
                <button key={c.id} className={chip(search.category === c.id)} onClick={() => update({ category: c.id })}>{c.name}</button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-4 shadow-card">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Price</h2>
            <div className="space-y-1">
              {pricePresets.map((p) => (
                <button key={p.label} className={chip(search.min === p.min && search.max === p.max)}
                  onClick={() => { update({ min: p.min, max: p.max }); setMinInput(p.min?.toString() ?? ""); setMaxInput(p.max?.toString() ?? ""); }}>
                  {p.label}
                </button>
              ))}
            </div>
            <form className="mt-3 flex items-center gap-2"
              onSubmit={(e) => { e.preventDefault(); update({ min: minInput ? Number(minInput) : undefined, max: maxInput ? Number(maxInput) : undefined }); }}>
              <input type="number" min={0} value={minInput} onChange={(e) => setMinInput(e.target.value)} placeholder="Min" aria-label="Minimum price"
                className="h-9 w-full rounded-lg border bg-background px-2 text-sm" />
              <span className="text-muted-foreground">–</span>
              <input type="number" min={0} value={maxInput} onChange={(e) => setMaxInput(e.target.value)} placeholder="Max" aria-label="Maximum price"
                className="h-9 w-full rounded-lg border bg-background px-2 text-sm" />
              <Button type="submit" size="sm" className="h-9">Go</Button>
            </form>
          </div>
          <div className="rounded-2xl border bg-card p-4 shadow-card">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
              <input type="checkbox" checked={!!search.stock} onChange={(e) => update({ stock: e.target.checked || undefined })} className="size-4 accent-primary" />
              In stock only
            </label>
          </div>
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <Button variant="outline" className="lg:hidden" onClick={() => setShowFilters((s) => !s)}>
              <SlidersHorizontal /> {showFilters ? "Hide filters" : "Filters"}
            </Button>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={() => { navigate({ search: {} }); setMinInput(""); setMaxInput(""); }}>
                <X /> Clear filters
              </Button>
            )}
            <label className="ml-auto flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort by</span>
              <select value={search.sort ?? "featured"} onChange={(e) => update({ sort: e.target.value === "featured" ? undefined : (e.target.value as SortKey) })}
                className="h-10 rounded-lg border bg-card px-3 text-sm font-medium">
                {sorts.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </label>
          </div>
          {list.length ? (
            <ProductGrid products={list} />
          ) : (
            <EmptyState icon={<PackageSearch className="size-7" />} title="No products match" text="Try a different search term or loosen your filters."
              action={<Button onClick={() => { navigate({ search: {} }); setMinInput(""); setMaxInput(""); }}>Reset filters</Button>} />
          )}
        </div>
      </div>
    </>
  );
}
