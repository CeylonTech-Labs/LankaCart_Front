"use client";

import { useEffect, useState } from "react";
import { CategoryCard } from "@/components/storefront/category-card";
import { CategoryMenu } from "@/components/storefront/category-menu";
import { HeroBanner } from "@/components/storefront/hero-banner";
import { LoadingSkeleton } from "@/components/storefront/loading-skeleton";
import { ProductGrid } from "@/components/storefront/product-grid";
import { Navbar } from "@/components/navbar";
import { catalogApi } from "@/services/catalog";
import { Category, Product } from "@/types";

export function HomeClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [topSelling, setTopSelling] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      catalogApi.categories(),
      catalogApi.featured(),
      catalogApi.newArrivals(),
      catalogApi.topSelling()
    ])
      .then(([categoryData, featuredData, arrivalData, topData]) => {
        setCategories(categoryData);
        setFeatured(featuredData);
        setNewArrivals(arrivalData);
        setTopSelling(topData);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[240px_1fr] md:px-6">
        <CategoryMenu categories={categories} />
        <HeroBanner />
      </div>
      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="rounded-md border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Flash sale</h2>
            <span className="text-sm text-muted-foreground">Coming soon</span>
          </div>
        </div>
      </section>
      <HomeSection title="Featured products" products={featured} loading={loading} />
      <HomeSection title="New arrivals" products={newArrivals} loading={loading} />
      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <h2 className="mb-4 text-lg font-semibold">Top categories</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
      <HomeSection title="Just for you" products={[...topSelling, ...newArrivals].slice(0, 12)} loading={loading} />
      <footer className="mt-8 border-t bg-muted py-8 text-center text-sm text-muted-foreground">
        LankaCart marketplace platform
      </footer>
    </main>
  );
}

function HomeSection({ title, products, loading }: { title: string; products: Product[]; loading: boolean }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {loading ? <LoadingSkeleton count={5} /> : <ProductGrid products={products} />}
    </section>
  );
}
