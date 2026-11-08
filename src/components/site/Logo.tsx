import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2 font-display text-xl font-bold tracking-tight", className)} aria-label="Kivora home">
      <span className="grid size-9 place-items-center rounded-xl bg-brand-gradient text-brand-foreground shadow-card">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M6 4v16M18 4l-8 8 8 8" />
        </svg>
      </span>
      Kivora<span className="text-brand">.</span>
    </Link>
  );
}
