import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Kivora" },
      { name: "description", content: "Kivora is a modern online store bringing quality tech, fashion and home products to shoppers everywhere." },
      { property: "og:title", content: "About Us — Kivora" },
      { property: "og:description", content: "Our story, mission and values." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader title="About Kivora" subtitle="Quality products, fair prices and a shopping experience that respects your time." />
      <div className="container-page mt-12 grid gap-12 lg:grid-cols-2">
        <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p><b className="text-foreground">Kivora</b> started with a simple idea: shopping online should feel as effortless as it does exciting. We bring together the latest technology, everyday fashion and thoughtful home goods in one beautifully simple store.</p>
          <p>Every product is hand-selected by our team for quality and value. We partner with trusted brands, ship fast and stand behind every order with a 30-day return promise.</p>
          <Button asChild variant="brand" size="lg"><Link to="/shop" search={{}}>Explore the store</Link></Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[["50k+", "Happy customers"], ["1,200+", "Products"], ["4.8★", "Average rating"], ["48h", "Average delivery"]].map(([n, l]) => (
            <div key={l} className="rounded-2xl border bg-card p-6 shadow-card">
              <p className="font-display text-3xl font-bold text-primary">{n}</p>
              <p className="mt-1 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="container-page mt-16 grid gap-5 md:grid-cols-3">
        {[
          { icon: Sparkles, t: "Curated quality", d: "We test and review products so you don't have to." },
          { icon: Users, t: "Customer first", d: "Real people answer support 24/7 — no bots, no runaround." },
          { icon: Leaf, t: "Responsible", d: "Recyclable packaging and carbon-offset delivery on every order." },
        ].map(({ icon: Icon, t, d }) => (
          <div key={t} className="rounded-2xl border bg-card p-6 shadow-card">
            <div className="grid size-12 place-items-center rounded-xl bg-accent text-primary"><Icon className="size-6" /></div>
            <h2 className="mt-4 text-lg font-semibold">{t}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </>
  );
}
