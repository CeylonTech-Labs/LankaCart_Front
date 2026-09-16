"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoleGuard } from "@/components/auth/role-guard";
import { Navbar } from "@/components/navbar";
import { ProductGrid } from "@/components/storefront/product-grid";
import { wishlistApi } from "@/services/catalog";
import { WishlistItem } from "@/types";

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    wishlistApi.get().then(setItems);
  }, []);

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["CUSTOMER"]}>
        <main className="min-h-screen bg-muted">
          <Navbar />
          <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
            <h1 className="mb-5 text-2xl font-semibold">Wishlist</h1>
            <ProductGrid products={items.map((item) => item.product)} />
          </section>
        </main>
      </RoleGuard>
    </ProtectedRoute>
  );
}
