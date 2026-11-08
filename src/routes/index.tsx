import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/site/ProductCard";
import { Rating } from "@/components/site/Rating";
import { categories, discountPercent, formatPrice, products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kivora — Shop Tech, Fashion & Home Essentials" },
      { name: "description", content: "Discover the latest phones, laptops, audio, fashion, shoes and home décor with daily deals and fast delivery." },
      { property: "og:title", content: "Kivora — Shop Tech, Fashion & Home Essentials" },
      { property: "og:description", content: "Latest phones, laptops, fashion and home décor with daily deals and fast delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const testimonials = [
  { name: "Amina Kayitesi", role: "Student, Kigali", text: "Ordered my laptop on Monday and it arrived Wednesday. Packaging was premium and the price beat every other store.", rating: 5 },
  { name: "James Otieno", role: "Software engineer", text: "The filters actually work. I found exactly the headphones I wanted in under a minute.", rating: 5 },
  { name: "Sophie Laurent", role: "Designer", text: "Beautiful selection of home pieces. Kivora has become my go-to for gifts.", rating: 4 },
];

function SectionTitle({ eyebrow, title, link }: { eyebrow: string; title: string; link?: { label: string; search: Record<string, string> } }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-bold md:text-3xl">{title}</h2>
      </div>
      {link && (
        <Link to="/shop" search={link.search} className="flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
          {link.label} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}

function Index() {
  const featured = products.filter((p) => p.tags.includes("featured")).slice(0, 4);
  const best = products.filter((p) => p.tags.includes("bestseller")).slice(0, 4);
  const deals = products.filter((p) => p.tags.includes("deal")).sort((a, b) => discountPercent(b) - discountPercent(a)).slice(0, 3);
  const [email, setEmail] = useState("");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero text-navy-foreground">
        <img src={hero} alt="Smartphone, laptop, headphones, sneakers and jacket" width={1600} height={912}
          className="absolute inset-0 size-full object-cover object-right opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
        <div className="container-page relative py-20 md:py-32">
          <div className="max-w-xl animate-rise">
            <span className="inline-block rounded-full bg-brand/20 px-3 py-1 text-xs font-semibold text-brand">Autumn Mega Sale · up to 30% off</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
              Everything you love,<br /><span className="text-brand">delivered.</span>
            </h1>
            <p className="mt-5 text-lg text-navy-foreground/80">
              The latest phones, laptops and gadgets alongside fashion and home essentials — curated, fairly priced and at your door in days.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="brand" size="lg" asChild><Link to="/shop" search={{}}>Shop now <ArrowRight /></Link></Button>
              <Button variant="glass" size="lg" asChild><Link to="/shop" search={{ sort: "discount" }}>View deals</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="container-page -mt-8 relative z-10">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border bg-card p-4 shadow-lift md:grid-cols-4 md:p-6">
          {[
            { icon: Truck, t: "Free delivery", d: "On orders over $100" },
            { icon: RotateCcw, t: "30-day returns", d: "No questions asked" },
            { icon: ShieldCheck, t: "Secure checkout", d: "Encrypted payments" },
            { icon: Headphones, t: "24/7 support", d: "We're here to help" },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex items-center gap-3">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-primary"><Icon className="size-5" /></div>
              <div><p className="text-sm font-semibold">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-page mt-20">
        <SectionTitle eyebrow="Browse" title="Popular categories" link={{ label: "All products", search: {} }} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link key={c.id} to="/shop" search={{ category: c.id }}
              className="group overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift">
              <div className="aspect-square overflow-hidden bg-muted">
                <img src={c.image} alt={c.name} loading="lazy" className="size-full object-cover transition duration-500 group-hover:scale-110" />
              </div>
              <div className="p-3">
                <p className="font-display text-sm font-semibold leading-tight">{c.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page mt-20">
        <SectionTitle eyebrow="Hand-picked" title="Featured products" link={{ label: "See more", search: {} }} />
        <ProductGrid products={featured} />
      </section>

      {/* Deals */}
      <section className="mt-20 bg-hero py-16 text-navy-foreground">
        <div className="container-page">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">Limited time</p>
              <h2 className="mt-1 text-2xl font-bold md:text-3xl">Special offers & discounts</h2>
            </div>
            <Button variant="brand" asChild><Link to="/shop" search={{ sort: "discount" }}>All deals <ArrowRight /></Link></Button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {deals.map((p) => (
              <Link key={p.id} to="/product/$id" params={{ id: p.id }}
                className="group flex items-center gap-4 rounded-2xl border border-navy-foreground/10 bg-navy-foreground/5 p-4 transition hover:bg-navy-foreground/10">
                <img src={p.image} alt={p.name} loading="lazy" className="size-24 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0">
                  <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-brand-foreground">Save {discountPercent(p)}%</span>
                  <p className="mt-2 truncate font-display font-semibold">{p.name}</p>
                  <p className="mt-1"><span className="text-lg font-bold">{formatPrice(p.price)}</span> <span className="text-sm text-navy-foreground/60 line-through">{formatPrice(p.oldPrice!)}</span></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page mt-20">
        <SectionTitle eyebrow="Customer favourites" title="Best sellers" link={{ label: "Top rated", search: { sort: "rating" } }} />
        <ProductGrid products={best} />
      </section>

      {/* Testimonials */}
      <section className="container-page mt-20">
        <SectionTitle eyebrow="Reviews" title="Loved by thousands of shoppers" />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border bg-card p-6 shadow-card">
              <Rating value={t.rating} />
              <blockquote className="mt-4 text-sm leading-relaxed">"{t.text}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-accent font-display font-bold text-primary">{t.name[0]}</span>
                <span><span className="block text-sm font-semibold">{t.name}</span><span className="text-xs text-muted-foreground">{t.role}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-page mt-20">
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-8 text-brand-foreground md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold md:text-3xl">Get 10% off your first order</h2>
            <p className="mt-2 text-brand-foreground/80">Join our newsletter for exclusive deals, new arrivals and style inspiration.</p>
            <form className="mt-6 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (!/^\S+@\S+\.\S+$/.test(email)) { toast.error("Please enter a valid email address"); return; }
                toast.success("You're subscribed!", { description: "Use code WELCOME10 at checkout." });
                setEmail("");
              }}>
              <label htmlFor="newsletter" className="sr-only">Email address</label>
              <input id="newsletter" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                className="h-12 flex-1 rounded-xl bg-card px-4 text-card-foreground outline-none ring-navy focus:ring-2" />
              <Button type="submit" variant="navy" size="lg">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
