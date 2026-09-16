"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoleGuard } from "@/components/auth/role-guard";
import { Navbar } from "@/components/navbar";
import { SellerProductTable } from "@/components/seller/seller-product-table";
import { Button } from "@/components/ui/button";
import { sellerProductApi } from "@/services/catalog";
import { useToastStore } from "@/store/toast-store";
import { Product } from "@/types";

export default function SellerProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const toast = useToastStore((state) => state.show);
  const load = () => sellerProductApi.products().then(setProducts);

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    await sellerProductApi.delete(id);
    toast("Product deleted.", "success");
    load();
  };

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["SELLER"]}>
        <main className="min-h-screen bg-muted">
          <Navbar />
          <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
            <div className="mb-5 flex items-center justify-between">
              <h1 className="text-2xl font-semibold">My products</h1>
              <Button asChild>
                <Link href="/seller/products/create">Create product</Link>
              </Button>
            </div>
            <SellerProductTable products={products} onDelete={remove} />
          </section>
        </main>
      </RoleGuard>
    </ProtectedRoute>
  );
}
