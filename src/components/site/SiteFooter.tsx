import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { categories } from "@/lib/products";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-navy text-navy-foreground">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-navy-foreground/70">Everything you love, delivered. Tech, fashion and home essentials curated for modern living.</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Shop</h3>
          <ul className="space-y-2 text-sm text-navy-foreground/75">
            {categories.map((c) => (
              <li key={c.id}><Link to="/shop" search={{ category: c.id }} className="hover:text-navy-foreground">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Company</h3>
          <ul className="space-y-2 text-sm text-navy-foreground/75">
            <li><Link to="/about" className="hover:text-navy-foreground">About us</Link></li>
            <li><Link to="/contact" className="hover:text-navy-foreground">Contact</Link></li>
            <li><Link to="/wishlist" className="hover:text-navy-foreground">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-navy-foreground">Cart</Link></li>
            <li><Link to="/login" className="hover:text-navy-foreground">Sign in</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Get in touch</h3>
          <ul className="space-y-3 text-sm text-navy-foreground/75">
            <li className="flex gap-2"><MapPin className="size-4 shrink-0" /> KG 7 Ave, Kigali, Rwanda</li>
            <li className="flex gap-2"><Phone className="size-4 shrink-0" /> +250 788 000 000</li>
            <li className="flex gap-2"><Mail className="size-4 shrink-0" /> hello@kivora.shop</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-navy-foreground/60 sm:flex-row">
          <span>© 2026 Kivora. University demonstration project — no real payments are processed.</span>
          <span>Visa · Mastercard · PayPal · Mobile Money</span>
        </div>
      </div>
    </footer>
  );
}
