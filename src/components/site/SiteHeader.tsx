import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Moon, Search, ShoppingCart, Sun, User, X } from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/products";
import { useStore } from "@/lib/store";
import { Logo } from "./Logo";

function CountBadge({ n }: { n: number }) {
  if (!n) return null;
  return <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold text-brand-foreground">{n}</span>;
}

export function SiteHeader() {
  const { cartCount, wishlist, user, dark, toggleDark } = useStore();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate({ to: "/shop", search: { q: q.trim() || undefined } });
  };

  const iconBtn = "relative grid size-10 place-items-center rounded-full transition hover:bg-navy-foreground/10";

  return (
    <header className="sticky top-0 z-40 bg-navy text-navy-foreground shadow-lift">
      <div className="bg-brand-gradient py-1.5 text-center text-xs font-semibold text-brand-foreground">
        Free standard delivery on orders over $100 · 30-day easy returns
      </div>
      <div className="container-page flex h-16 items-center gap-4">
        <button className={`${iconBtn} lg:hidden`} onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <Logo />
        <form onSubmit={submit} className="mx-auto hidden max-w-xl flex-1 md:flex" role="search">
          <label htmlFor="site-search" className="sr-only">Search products</label>
          <div className="flex w-full overflow-hidden rounded-xl bg-card text-card-foreground">
            <input id="site-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search phones, laptops, sneakers…"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground" />
            <button type="submit" className="bg-brand px-4 text-brand-foreground" aria-label="Search"><Search className="size-4" /></button>
          </div>
        </form>
        <nav className="ml-auto flex items-center gap-1 md:ml-0" aria-label="Account">
          <button onClick={toggleDark} className={iconBtn} aria-label="Toggle dark mode">
            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <Link to={user ? "/account" : "/login"} className={`${iconBtn} hidden sm:grid`} aria-label="Account"><User className="size-5" /></Link>
          <Link to="/wishlist" className={iconBtn} aria-label="Wishlist"><Heart className="size-5" /><CountBadge n={wishlist.length} /></Link>
          <Link to="/cart" className={iconBtn} aria-label="Cart"><ShoppingCart className="size-5" /><CountBadge n={cartCount} /></Link>
        </nav>
      </div>
      <div className="hidden border-t border-navy-foreground/10 lg:block">
        <nav className="container-page flex h-11 items-center gap-6 text-sm" aria-label="Categories">
          <Link to="/shop" search={{}} className="font-semibold text-brand">All products</Link>
          {categories.map((c) => (
            <Link key={c.id} to="/shop" search={{ category: c.id }} className="text-navy-foreground/80 transition hover:text-navy-foreground">{c.name}</Link>
          ))}
          <span className="ml-auto flex gap-5 text-navy-foreground/70">
            <Link to="/about" className="hover:text-navy-foreground">About</Link>
            <Link to="/contact" className="hover:text-navy-foreground">Contact</Link>
          </span>
        </nav>
      </div>
      {open && (
        <div className="border-t border-navy-foreground/10 lg:hidden">
          <div className="container-page space-y-3 py-4">
            <form onSubmit={submit} className="flex overflow-hidden rounded-xl bg-card text-card-foreground md:hidden" role="search">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" aria-label="Search products"
                className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none" />
              <button type="submit" className="bg-brand px-4 text-brand-foreground" aria-label="Search"><Search className="size-4" /></button>
            </form>
            <nav className="grid gap-1 text-sm" onClick={() => setOpen(false)}>
              <Link to="/shop" search={{}} className="rounded-lg px-3 py-2 font-semibold hover:bg-navy-foreground/10">All products</Link>
              {categories.map((c) => (
                <Link key={c.id} to="/shop" search={{ category: c.id }} className="rounded-lg px-3 py-2 hover:bg-navy-foreground/10">{c.name}</Link>
              ))}
              <Link to="/about" className="rounded-lg px-3 py-2 hover:bg-navy-foreground/10">About us</Link>
              <Link to="/contact" className="rounded-lg px-3 py-2 hover:bg-navy-foreground/10">Contact</Link>
              <Link to={user ? "/account" : "/login"} className="rounded-lg px-3 py-2 hover:bg-navy-foreground/10">{user ? "My account" : "Sign in"}</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
