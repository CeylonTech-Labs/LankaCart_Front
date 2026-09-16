"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { LoadingSkeleton } from "@/components/storefront/loading-skeleton";
import { ProductFilters, FilterState } from "@/components/storefront/product-filters";
import { ProductGrid } from "@/components/storefront/product-grid";
import { ProductSearchBar } from "@/components/storefront/product-search-bar";
import { catalogApi } from "@/services/catalog";
import { Brand, Category, Product } from "@/types";

export function ProductsClient({ categorySlug }: { categorySlug?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filters, setFilters] = useState<FilterState>({ category: categorySlug, sort: "latest" });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    setLoading(true);
    const result = categorySlug
      ? await catalogApi.productsByCategory(categorySlug, { ...filters, q: search })
      : await catalogApi.products({ ...filters, q: search });
    setProducts(result.products);
    setLoading(false);
  };

  useEffect(() => {
    Promise.all([catalogApi.categories(), catalogApi.brands()]).then(([categoryData, brandData]) => {
      setCategories(categoryData);
      setBrands(brandData);
    });
  }, []);

  useEffect(() => {
    loadProducts();
  }, [categorySlug]);

  return (
    <main className="min-h-screen bg-muted">
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-5">
          <h1 className="text-2xl font-semibold">{categorySlug ? "Category products" : "All products"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Browse LankaCart catalog with filters and sorting.</p>
        </div>
        <div className="mb-5">
          <ProductSearchBar value={search} onChange={setSearch} onSubmit={loadProducts} />
        </div>
        <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
          <ProductFilters categories={categories} brands={brands} filters={filters} onChange={setFilters} onApply={loadProducts} />
          {loading ? <LoadingSkeleton /> : <ProductGrid products={products} />}
        </div>
      </section>
    </main>
  );
}
