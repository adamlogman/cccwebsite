import { Link } from "@tanstack/react-router";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryName, discountPercent, formatPrice, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Rating } from "./Rating";

export function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) return <span className="text-xs font-semibold text-destructive">Out of stock</span>;
  if (stock < 10) return <span className="text-xs font-semibold text-brand">Only {stock} left</span>;
  return <span className="text-xs font-semibold text-success">In stock</span>;
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWished } = useStore();
  const off = discountPercent(product);
  const wished = isWished(product.id);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link to="/product/$id" params={{ id: product.id }} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name} loading="lazy" width={816} height={816}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </Link>
        {off > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-xs font-bold text-brand-foreground">-{off}%</span>
        )}
        <button onClick={() => toggleWishlist(product.id)} aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-card/90 shadow-card backdrop-blur transition hover:scale-110">
          <Heart className={cn("size-4", wished ? "fill-destructive text-destructive" : "text-foreground")} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{categoryName(product.category)}</span>
          <StockBadge stock={product.stock} />
        </div>
        <Link to="/product/$id" params={{ id: product.id }} className="line-clamp-2 font-display font-semibold leading-snug hover:text-primary">
          {product.name}
        </Link>
        <Rating value={product.rating} count={product.reviewCount} />
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="font-display text-xl font-bold">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="text-sm text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>}
        </div>
        <div className="flex gap-2">
          <Button className="flex-1" onClick={() => addToCart(product.id)} disabled={product.stock <= 0}>
            <ShoppingCart /> {product.stock <= 0 ? "Sold out" : "Add to cart"}
          </Button>
          <Button variant="outline" size="icon" className="size-10" asChild>
            <Link to="/product/$id" params={{ id: product.id }} aria-label={`Details for ${product.name}`}><Eye /></Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
