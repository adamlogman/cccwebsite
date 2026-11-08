import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({ value, count, className }: { value: number; count?: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5 text-sm", className)} aria-label={`Rated ${value} out of 5`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className={cn("size-4", i <= Math.round(value) ? "fill-brand text-brand" : "text-border")} />
        ))}
      </div>
      <span className="font-semibold">{value.toFixed(1)}</span>
      {count != null && <span className="text-muted-foreground">({count.toLocaleString()})</span>}
    </div>
  );
}
