import Link from "next/link";
import { Product } from "@/types";
import { PriceDisplay } from "./price-display";
import { RatingStars } from "./rating-stars";
import { WishlistButton } from "./wishlist-button";

const fallbackImage = "https://res.cloudinary.com/demo/image/upload/sample.jpg";

export function productRating(product: Product) {
  const reviews = product.reviews ?? [];
  if (!reviews.length) return 0;
  return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
}

export function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0]?.url ?? fallbackImage;

  return (
    <article className="group overflow-hidden rounded-md border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/products/${product.slug}`}>
        <img src={image} alt={product.name} className="aspect-square w-full object-cover" />
      </Link>
      <div className="space-y-3 p-3">
        <div>
          <Link href={`/products/${product.slug}`} className="line-clamp-2 text-sm font-medium hover:text-primary">
            {product.name}
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">{product.seller?.shopName ?? "LankaCart seller"}</p>
        </div>
        <RatingStars rating={productRating(product)} count={product.reviews?.length ?? 0} />
        <div className="flex items-center justify-between gap-2">
          <PriceDisplay price={product.price} discountPrice={product.discountPrice} compact />
          <WishlistButton productId={product.id} />
        </div>
      </div>
    </article>
  );
}
