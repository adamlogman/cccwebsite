import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CreditCard, Loader2, Lock, ShoppingBag, Smartphone, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EmptyState, PageHeader } from "@/components/site/PageHeader";
import { computeTotals, deliveryOptions, type DeliveryId } from "@/lib/cart-math";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { OrderSummary } from "@/components/site/OrderSummary";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — Kivora" },
      { name: "description", content: "Enter your details, choose delivery and complete your Kivora order." },
      { property: "og:title", content: "Secure Checkout — Kivora" },
      { property: "og:description", content: "Complete your Kivora order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const payments = [
  { id: "card", label: "Credit / debit card", icon: CreditCard },
  { id: "paypal", label: "PayPal", icon: Wallet },
  { id: "momo", label: "Mobile Money", icon: Smartphone },
] as const;

type Form = Record<"firstName" | "lastName" | "email" | "phone" | "address" | "city" | "zip" | "country" | "cardName" | "cardNumber" | "expiry" | "cvc", string>;
const empty: Form = { firstName: "", lastName: "", email: "", phone: "", address: "", city: "", zip: "", country: "Rwanda", cardName: "", cardNumber: "", expiry: "", cvc: "" };

function Field({ label, name, value, error, onChange, className, ...rest }: { label: string; name: keyof Form; value: string; error?: string | undefined; onChange: (n: keyof Form, v: string) => void; className?: string | undefined } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "name" | "value">) {
  return (
    <label className={cn("block text-sm", className)}>
      <span className="mb-1.5 block font-medium">{label}</span>
      <input name={name} value={value} onChange={(e) => onChange(name, e.target.value)} aria-invalid={!!error}
        className={cn("h-11 w-full rounded-lg border bg-background px-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20", error && "border-destructive")} {...rest} />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Checkout() {
  const { hydrated, cartItems, subtotal, clearCart, setLastOrder, user } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>(() => ({ ...empty }));
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [delivery, setDelivery] = useState<DeliveryId>("standard");
  const [payment, setPayment] = useState<(typeof payments)[number]["id"]>("card");
  const [processing, setProcessing] = useState(false);
  const totals = computeTotals(subtotal, delivery);
  const set = (n: keyof Form, v: string) => { setForm((f) => ({ ...f, [n]: v })); setErrors((e) => ({ ...e, [n]: undefined })); };

  useEffect(() => {
    if (user) setForm((f) => (f.email ? f : { ...f, email: user.email, firstName: user.name.split(" ")[0] ?? "", lastName: user.name.split(" ").slice(1).join(" ") }));
  }, [user]);

  const validate = () => {
    const e: Partial<Record<keyof Form, string>> = {};
    const req: (keyof Form)[] = ["firstName", "lastName", "email", "phone", "address", "city", "zip", "country"];
    req.forEach((k) => { if (!form[k].trim()) e[k] = "Required"; });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (form.phone && !/^[+\d\s()-]{7,}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (payment === "card") {
      if (!form.cardName.trim()) e.cardName = "Required";
      if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ""))) e.cardNumber = "Card number must be 16 digits";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) e.expiry = "Use MM/YY";
      if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = "3–4 digits";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) { toast.error("Please fix the highlighted fields"); return; }
    setProcessing(true);
    setTimeout(() => {
      const opt = deliveryOptions.find((d) => d.id === delivery)!;
      setLastOrder({
        id: `KV-${Date.now().toString().slice(-8)}`,
        date: new Date().toISOString(),
        items: cartItems.map(({ product, qty }) => ({ id: product.id, name: product.name, qty, price: product.price })),
        total: totals.total,
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        address: `${form.address}, ${form.city} ${form.zip}, ${form.country}`,
        delivery: `${opt.name} (${opt.eta})`,
        payment: payments.find((p) => p.id === payment)!.label,
      });
      clearCart();
      navigate({ to: "/order-confirmation" });
    }, 1400);
  };

  if (hydrated && cartItems.length === 0 && !processing) {
    return (
      <>
        <PageHeader title="Checkout" />
        <div className="container-page mt-8">
          <EmptyState icon={<ShoppingBag className="size-7" />} title="Nothing to check out" text="Your cart is empty. Add some products first."
            action={<Button asChild><Link to="/shop" search={{}}>Browse products</Link></Button>} />
        </div>
      </>
    );
  }

  const section = "rounded-2xl border bg-card p-6 shadow-card";
  return (
    <>
      <PageHeader title="Checkout" subtitle={<span className="inline-flex items-center gap-1"><Lock className="size-3.5" /> Demo checkout — no real payment is taken</span>} />
      <form onSubmit={placeOrder} noValidate className="container-page mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className={section}>
            <h2 className="mb-4 text-lg font-semibold">1. Customer information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" name="firstName" value={form.firstName} error={errors.firstName} onChange={set} autoComplete="given-name" />
              <Field label="Last name" name="lastName" value={form.lastName} error={errors.lastName} onChange={set} autoComplete="family-name" />
              <Field label="Email" name="email" type="email" value={form.email} error={errors.email} onChange={set} autoComplete="email" />
              <Field label="Phone" name="phone" type="tel" value={form.phone} error={errors.phone} onChange={set} autoComplete="tel" />
            </div>
          </section>
          <section className={section}>
            <h2 className="mb-4 text-lg font-semibold">2. Shipping address</h2>
            <div className="grid gap-4 sm:grid-cols-6">
              <Field className="sm:col-span-6" label="Street address" name="address" value={form.address} error={errors.address} onChange={set} autoComplete="street-address" />
              <Field className="sm:col-span-3" label="City" name="city" value={form.city} error={errors.city} onChange={set} />
              <Field className="sm:col-span-1" label="Postcode" name="zip" value={form.zip} error={errors.zip} onChange={set} />
              <Field className="sm:col-span-2" label="Country" name="country" value={form.country} error={errors.country} onChange={set} />
            </div>
          </section>
          <section className={section}>
            <h2 className="mb-4 text-lg font-semibold">3. Delivery option</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {deliveryOptions.map((d) => {
                const price = computeTotals(subtotal, d.id).shipping;
                return (
                  <label key={d.id} className={cn("cursor-pointer rounded-xl border-2 p-4 transition", delivery === d.id ? "border-primary bg-accent" : "hover:border-primary/40")}>
                    <input type="radio" name="delivery" className="sr-only" checked={delivery === d.id} onChange={() => setDelivery(d.id)} />
                    <span className="block font-semibold">{d.name}</span>
                    <span className="block text-xs text-muted-foreground">{d.eta}</span>
                    <span className="mt-2 block font-display font-bold">{price === 0 ? "Free" : formatPrice(price)}</span>
                  </label>
                );
              })}
            </div>
          </section>
          <section className={section}>
            <h2 className="mb-4 text-lg font-semibold">4. Payment method</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {payments.map(({ id, label, icon: Icon }) => (
                <label key={id} className={cn("flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition", payment === id ? "border-primary bg-accent" : "hover:border-primary/40")}>
                  <input type="radio" name="payment" className="sr-only" checked={payment === id} onChange={() => setPayment(id)} />
                  <Icon className="size-5 text-primary" /><span className="text-sm font-semibold">{label}</span>
                </label>
              ))}
            </div>
            {payment === "card" ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-4">
                <Field className="sm:col-span-4" label="Name on card" name="cardName" value={form.cardName} error={errors.cardName} onChange={set} autoComplete="cc-name" />
                <Field className="sm:col-span-2" label="Card number" name="cardNumber" inputMode="numeric" placeholder="4242 4242 4242 4242" value={form.cardNumber} error={errors.cardNumber} onChange={set} />
                <Field label="Expiry" name="expiry" placeholder="MM/YY" value={form.expiry} error={errors.expiry} onChange={set} />
                <Field label="CVC" name="cvc" inputMode="numeric" placeholder="123" value={form.cvc} error={errors.cvc} onChange={set} />
              </div>
            ) : (
              <p className="mt-5 rounded-xl bg-muted p-4 text-sm text-muted-foreground">
                You'll confirm the payment with {payment === "paypal" ? "PayPal" : "your Mobile Money provider"} after placing the order (simulated).
              </p>
            )}
          </section>
        </div>
        <div className="space-y-4 lg:sticky lg:top-40 lg:self-start">
          <div className="rounded-2xl border bg-card p-4 shadow-card">
            <ul className="max-h-64 space-y-3 overflow-auto">
              {cartItems.map(({ product: p, qty }) => (
                <li key={p.id} className="flex items-center gap-3">
                  <img src={p.image} alt="" className="size-14 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{p.name}</p><p className="text-xs text-muted-foreground">Qty {qty}</p></div>
                  <span className="text-sm font-semibold">{formatPrice(p.price * qty)}</span>
                </li>
              ))}
            </ul>
          </div>
          <OrderSummary {...totals}>
            <Button type="submit" size="lg" variant="brand" className="w-full" disabled={processing}>
              {processing ? <><Loader2 className="animate-spin" /> Processing…</> : <>Place order · {formatPrice(totals.total)}</>}
            </Button>
          </OrderSummary>
        </div>
      </form>
    </>
  );
}
