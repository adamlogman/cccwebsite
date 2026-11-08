import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Kivora" },
      { name: "description", content: "Get in touch with the Kivora support team by email, phone or our contact form." },
      { property: "og:title", content: "Contact Us — Kivora" },
      { property: "og:description", content: "We're here to help 24/7." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const [err, setErr] = useState<Partial<Record<keyof typeof f, string>>>({});
  const input = (k: keyof typeof f) => cn("w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20", err[k] && "border-destructive");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const x: Partial<Record<keyof typeof f, string>> = {};
    if (f.name.trim().length < 2) x.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = "Enter a valid email";
    if (!f.subject.trim()) x.subject = "Required";
    if (f.message.trim().length < 10) x.message = "Message should be at least 10 characters";
    setErr(x);
    if (Object.keys(x).length) return;
    toast.success("Message sent!", { description: "We'll get back to you within 24 hours." });
    setF({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <PageHeader title="Contact us" subtitle="Questions about an order or a product? We'd love to help." />
      <div className="container-page mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit} noValidate className="space-y-4 rounded-2xl border bg-card p-6 shadow-card">
          <div className="grid gap-4 sm:grid-cols-2">
            {(["name", "email"] as const).map((k) => (
              <label key={k} className="block text-sm">
                <span className="mb-1.5 block font-medium capitalize">{k}</span>
                <input type={k === "email" ? "email" : "text"} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} className={input(k)} />
                {err[k] && <span className="mt-1 block text-xs text-destructive">{err[k]}</span>}
              </label>
            ))}
          </div>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Subject</span>
            <input value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} className={input("subject")} />
            {err.subject && <span className="mt-1 block text-xs text-destructive">{err.subject}</span>}
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">Message</span>
            <textarea rows={6} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} className={input("message")} />
            {err.message && <span className="mt-1 block text-xs text-destructive">{err.message}</span>}
          </label>
          <Button type="submit" size="lg">Send message</Button>
        </form>
        <aside className="space-y-4">
          {[
            { icon: MapPin, t: "Visit us", d: "KG 7 Ave, Kigali, Rwanda" },
            { icon: Phone, t: "Call us", d: "+250 788 000 000" },
            { icon: Mail, t: "Email", d: "hello@kivora.shop" },
            { icon: Clock, t: "Support hours", d: "24/7, every day of the year" },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex gap-4 rounded-2xl border bg-card p-5 shadow-card">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-primary"><Icon className="size-5" /></div>
              <div><p className="font-semibold">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div>
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}
