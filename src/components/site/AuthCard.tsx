import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function AuthCard({ mode }: { mode: "login" | "register" }) {
  const { setUser } = useStore();
  const navigate = useNavigate();
  const [f, setF] = useState({ name: "", email: "", password: "", confirm: "" });
  const [err, setErr] = useState<Partial<Record<keyof typeof f, string>>>({});
  const isReg = mode === "register";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const x: Partial<Record<keyof typeof f, string>> = {};
    if (isReg && f.name.trim().length < 2) x.name = "Please enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = "Enter a valid email";
    if (f.password.length < 6) x.password = "Password must be at least 6 characters";
    if (isReg && f.confirm !== f.password) x.confirm = "Passwords don't match";
    setErr(x);
    if (Object.keys(x).length) return;
    const name = isReg ? f.name.trim() : (f.email.split("@")[0] ?? f.email);
    setUser({ name, email: f.email });
    toast.success(isReg ? "Account created!" : "Welcome back!", { description: "Demo account — stored only in this browser." });
    navigate({ to: "/account" });
  };

  const fields = [
    ...(isReg ? [{ k: "name", label: "Full name", type: "text" }] : []),
    { k: "email", label: "Email", type: "email" },
    { k: "password", label: "Password", type: "password" },
    ...(isReg ? [{ k: "confirm", label: "Confirm password", type: "password" }] : []),
  ] as { k: keyof typeof f; label: string; type: string }[];

  return (
    <div className="container-page grid min-h-[70vh] place-items-center py-12">
      <form onSubmit={submit} noValidate className="w-full max-w-md animate-rise rounded-3xl border bg-card p-8 shadow-lift">
        <Logo className="mb-6" />
        <h1 className="text-2xl font-bold">{isReg ? "Create your account" : "Welcome back"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{isReg ? "Join Kivora for faster checkout and exclusive deals." : "Sign in to track orders and save your favourites."}</p>
        <div className="mt-6 space-y-4">
          {fields.map(({ k, label, type }) => (
            <label key={k} className="block text-sm">
              <span className="mb-1.5 block font-medium">{label}</span>
              <input type={type} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!err[k]}
                className={cn("h-11 w-full rounded-lg border bg-background px-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20", err[k] && "border-destructive")} />
              {err[k] && <span className="mt-1 block text-xs text-destructive">{err[k]}</span>}
            </label>
          ))}
        </div>
        <Button type="submit" size="lg" className="mt-6 w-full">{isReg ? "Create account" : "Sign in"}</Button>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          {isReg ? "Already have an account? " : "New to Kivora? "}
          <Link to={isReg ? "/login" : "/register"} className="font-semibold text-primary hover:underline">{isReg ? "Sign in" : "Create an account"}</Link>
        </p>
      </form>
    </div>
  );
}
