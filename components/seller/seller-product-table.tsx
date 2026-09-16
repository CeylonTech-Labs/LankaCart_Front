"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { PriceDisplay } from "@/components/storefront/price-display";

export function SellerProductTable({
  products,
  onDelete
}: {
  products: Product[];
  onDelete: (id: string) => void;
}) {
  if (!products.length) {
    return (
      <div className="rounded-md border bg-card p-10 text-center text-sm text-muted-foreground">
        Your product catalog is empty.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{product.sku}</td>
                <td className="px-4 py-3">
                  <PriceDisplay price={product.price} discountPrice={product.discountPrice} compact />
                </td>
                <td className="px-4 py-3">{product.status}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/seller/products/${product.id}/edit`}>Edit</Link>
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => onDelete(product.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
