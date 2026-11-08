import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/site/PageHeader";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Kivora" },
      { name: "description", content: "Thank you for your order. Here are your Kivora order details." },
      { property: "og:title", content: "Order Confirmed — Kivora" },
      { property: "og:description", content: "Your Kivora order has been placed." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Confirmation,
});

function Confirmation() {
  const { hydrated, lastOrder: o } = useStore();
  if (!hydrated) return <div className="container-page mt-10 h-80 animate-pulse rounded-2xl bg-muted" />;
  if (!o)
    return (
      <div className="container-page mt-16">
        <EmptyState icon={<PackageOpen className="size-7" />} title="No recent order" text="Once you place an order, its confirmation will appear here."
          action={<Button asChild><Link to="/shop" search={{}}>Start shopping</Link></Button>} />
      </div>
    );
  return (
    <div className="container-page mt-12 max-w-2xl">
      <div className="animate-rise rounded-3xl border bg-card p-8 text-center shadow-lift">
        <CheckCircle2 className="mx-auto size-16 text-success" />
        <h1 className="mt-4 text-3xl font-bold">Thank you, {o.name.split(" ")[0]}!</h1>
        <p className="mt-2 text-muted-foreground">Your order <b className="text-foreground">{o.id}</b> has been placed. A confirmation was sent to {o.email}.</p>
        <div className="mt-8 space-y-3 rounded-2xl bg-muted p-5 text-left text-sm">
          {o.items.map((i) => (
            <div key={i.id} className="flex justify-between"><span>{i.qty} × {i.name}</span><span className="font-semibold">{formatPrice(i.price * i.qty)}</span></div>
          ))}
          <div className="flex justify-between border-t pt-3 font-display text-base font-bold"><span>Total paid</span><span>{formatPrice(o.total)}</span></div>
        </div>
        <dl className="mt-6 grid gap-4 text-left text-sm sm:grid-cols-3">
          <div><dt className="text-muted-foreground">Ship to</dt><dd className="font-medium">{o.address}</dd></div>
          <div><dt className="text-muted-foreground">Delivery</dt><dd className="font-medium">{o.delivery}</dd></div>
          <div><dt className="text-muted-foreground">Payment</dt><dd className="font-medium">{o.payment} (simulated)</dd></div>
        </dl>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="brand" size="lg"><Link to="/shop" search={{}}>Continue shopping</Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/">Back to home</Link></Button>
        </div>
      </div>
    </div>
  );
}
