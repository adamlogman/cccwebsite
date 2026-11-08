import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState, PageHeader } from "@/components/site/PageHeader";
import { ProductGrid } from "@/components/site/ProductCard";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Wishlist — Kivora" },
      { name: "description", content: "Products you've saved for later at Kivora." },
      { property: "og:title", content: "My Wishlist — Kivora" },
      { property: "og:description", content: "Products you've saved for later." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { hydrated, wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <>
      <PageHeader title="Wishlist" subtitle={hydrated ? `${items.length} saved item${items.length === 1 ? "" : "s"}` : "Loading…"} />
      <div className="container-page mt-8">
        {!hydrated ? <div className="h-64 animate-pulse rounded-2xl bg-muted" /> : items.length ? <ProductGrid products={items} /> : (
          <EmptyState icon={<Heart className="size-7" />} title="Your wishlist is empty" text="Tap the heart on any product to save it here for later."
            action={<Button asChild><Link to="/shop" search={{}}>Discover products</Link></Button>} />
        )}
      </div>
    </>
  );
}
