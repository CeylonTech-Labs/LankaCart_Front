"use client";

import { Brand, Category } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type FilterState = {
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
};

export function ProductFilters({
  categories,
  brands,
  filters,
  onChange,
  onApply
}: {
  categories: Category[];
  brands: Brand[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onApply: () => void;
}) {
  return (
    <aside className="rounded-md border bg-card p-4">
      <h2 className="text-sm font-semibold">Filters</h2>
      <div className="mt-4 grid gap-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <select
            value={filters.category ?? ""}
            onChange={(event) => onChange({ ...filters, category: event.target.value || undefined })}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Brand</Label>
          <select
            value={filters.brand ?? ""}
            onChange={(event) => onChange({ ...filters, brand: event.target.value || undefined })}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="">All brands</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.slug}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Min"
            value={filters.minPrice ?? ""}
            onChange={(event) => onChange({ ...filters, minPrice: event.target.value })}
          />
          <Input
            placeholder="Max"
            value={filters.maxPrice ?? ""}
            onChange={(event) => onChange({ ...filters, maxPrice: event.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Sort</Label>
          <select
            value={filters.sort ?? "latest"}
            onChange={(event) => onChange({ ...filters, sort: event.target.value })}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="latest">Latest</option>
            <option value="price_asc">Price low to high</option>
            <option value="price_desc">Price high to low</option>
            <option value="popular">Popular</option>
          </select>
        </div>
        <Button onClick={onApply}>Apply filters</Button>
      </div>
    </aside>
  );
}
