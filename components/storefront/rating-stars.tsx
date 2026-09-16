import { Star } from "lucide-react";

export function RatingStars({ rating = 0, count }: { rating?: number; count?: number }) {
  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={index < Math.round(rating) ? "h-4 w-4 fill-accent text-accent" : "h-4 w-4 text-border"}
        />
      ))}
      {typeof count === "number" ? <span className="ml-1">({count})</span> : null}
    </div>
  );
}
