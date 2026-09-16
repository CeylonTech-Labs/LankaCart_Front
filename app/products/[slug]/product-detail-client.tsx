"use client";

import { Heart, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { AddToCartButton } from "@/components/storefront/add-to-cart-button";
import { PriceDisplay } from "@/components/storefront/price-display";
import { ProductGrid } from "@/components/storefront/product-grid";
import { productRating } from "@/components/storefront/product-card";
import { RatingStars } from "@/components/storefront/rating-stars";
import { WishlistButton } from "@/components/storefront/wishlist-button";
import { Button } from "@/components/ui/button";
import { catalogApi } from "@/services/catalog";
import { Product } from "@/types";

export function ProductDetailClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    catalogApi.product(slug).then((data) => {
      setProduct(data);
      setActiveImage(data.images?.[0]?.url ?? null);
      if (data.category?.slug) {
        catalogApi.productsByCategory(data.category.slug, { limit: 5 }).then((result) => {
          setRelated(result.products.filter((item) => item.id !== data.id));
        });
      }
    });
  }, [slug]);

  if (!product) {
    return (
      <main className="min-h-screen bg-muted">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground">Loading product...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted">
      <Navbar />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[0.9fr_1.1fr] md:px-6">
        <div className="rounded-md border bg-card p-4">
          <img
            src={activeImage ?? product.images?.[0]?.url ?? "https://res.cloudinary.com/demo/image/upload/sample.jpg"}
            alt={product.name}
            className="aspect-square w-full rounded-md object-cover"
          />
          <div className="mt-3 grid grid-cols-5 gap-2">
            {(product.images ?? []).slice(0, 5).map((image) => (
              <button key={image.id} onClick={() => setActiveImage(image.url)}>
                <img src={image.url} alt={product.name} className="aspect-square rounded border object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-md border bg-card p-6">
          <p className="text-sm text-muted-foreground">{product.brand?.name}</p>
          <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
          <div className="mt-3">
            <RatingStars rating={productRating(product)} count={product.reviews?.length ?? 0} />
          </div>
          <div className="mt-5">
            <PriceDisplay price={product.price} discountPrice={product.discountPrice} />
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{product.shortDescription}</p>
          <div className="mt-5 flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <AddToCartButton productId={product.id} quantity={quantity} />
            <WishlistButton productId={product.id} />
            <Button variant="secondary">
              <Heart className="mr-2 h-4 w-4" />
              Buy now
            </Button>
          </div>
          <div className="mt-6 grid gap-3 text-sm md:grid-cols-2">
            <Info icon={<Truck className="h-4 w-4" />} label="Delivery" value={product.deliveryInfo ?? "Island-wide delivery"} />
            <Info icon={<ShieldCheck className="h-4 w-4" />} label="Warranty" value={product.warranty ?? "Seller warranty"} />
          </div>
          <div className="mt-6 rounded-md bg-muted p-4 text-sm">
            <p className="font-medium">Sold by {product.seller?.shopName ?? "LankaCart seller"}</p>
            <p className="mt-1 text-muted-foreground">{product.seller?.description}</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-8 md:px-6">
        <div className="rounded-md border bg-card p-6">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">{product.description}</p>
          <h2 className="mt-6 text-lg font-semibold">Specifications</h2>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            {(product as any).attributes?.map((attribute: { id: string; name: string; value: string }) => (
              <div key={attribute.id} className="grid grid-cols-[160px_1fr] rounded bg-muted p-2">
                <span>{attribute.name}</span>
                <span>{attribute.value}</span>
              </div>
            ))}
          </div>
          <h2 className="mt-6 text-lg font-semibold">Reviews</h2>
          <p className="mt-2 text-sm text-muted-foreground">Customer reviews will appear here.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6">
        <h2 className="mb-4 text-lg font-semibold">Related products</h2>
        <ProductGrid products={related} />
      </section>
    </main>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-md border p-3">
      <span className="mt-0.5 text-secondary">{icon}</span>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
