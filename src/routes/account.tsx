import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState, PageHeader } from "@/components/site/PageHeader";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Kivora" },
      { name: "description", content: "Manage your Kivora profile and see your latest order." },
      { property: "og:title", content: "My Account — Kivora" },
      { property: "og:description", content: "Your Kivora account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Account,
});

function Account() {
  const { hydrated, user, setUser, lastOrder, wishlist, cartCount } = useStore();
  const navigate = useNavigate();
  if (!hydrated) return <div className="container-page mt-10 h-64 animate-pulse rounded-2xl bg-muted" />;
  if (!user)
    return (
      <div className="container-page mt-16">
        <EmptyState icon={<User className="size-7" />} title="You're not signed in" text="Sign in to view your account."
          action={<Button asChild><Link to="/login">Sign in</Link></Button>} />
      </div>
    );
  return (
    <>
      <PageHeader title={`Hi, ${user.name}`} crumb="Account" subtitle={user.email} />
      <div className="container-page mt-8 grid gap-5 md:grid-cols-3">
        <Link to="/cart" className="rounded-2xl border bg-card p-6 shadow-card hover:shadow-lift"><p className="text-sm text-muted-foreground">Items in cart</p><p className="font-display text-3xl font-bold">{cartCount}</p></Link>
        <Link to="/wishlist" className="rounded-2xl border bg-card p-6 shadow-card hover:shadow-lift"><p className="text-sm text-muted-foreground">Wishlist</p><p className="font-display text-3xl font-bold">{wishlist.length}</p></Link>
        <div className="rounded-2xl border bg-card p-6 shadow-card">
          <p className="text-sm text-muted-foreground">Latest order</p>
          {lastOrder ? (
            <Link to="/order-confirmation" className="font-display text-lg font-bold text-primary hover:underline">{lastOrder.id} · {formatPrice(lastOrder.total)}</Link>
          ) : <p className="font-display text-lg font-bold">None yet</p>}
        </div>
      </div>
      <div className="container-page mt-6">
        <Button variant="outline" onClick={() => { setUser(null); navigate({ to: "/" }); }}><LogOut /> Sign out</Button>
      </div>
    </>
  );
}
