"use client";

import { useEffect, useState } from "react";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoleGuard } from "@/components/auth/role-guard";
import { Navbar } from "@/components/navbar";
import { PriceDisplay } from "@/components/storefront/price-display";
import { Button } from "@/components/ui/button";
import { adminCatalogApi } from "@/services/catalog";
import { useToastStore } from "@/store/toast-store";
import { Product } from "@/types";

export function AdminProductsClient({ pendingOnly = false }: { pendingOnly?: boolean }) {
  const [products, setProducts] = useState<Product[]>([]);
  const toast = useToastStore((state) => state.show);
  const load = () => (pendingOnly ? adminCatalogApi.pendingProducts() : adminCatalogApi.products()).then(setProducts);

  useEffect(() => {
    load();
  }, [pendingOnly]);

  const action = async (work: Promise<unknown>, message: string) => {
    await work;
    toast(message, "success");
    load();
  };

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["ADMIN"]}>
        <main className="min-h-screen bg-muted">
          <Navbar />
          <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
            <h1 className="mb-5 text-2xl font-semibold">{pendingOnly ? "Pending products" : "Products"}</h1>
            <AdminDataTable
              rows={products}
              emptyText="No products found."
              columns={[
                { header: "Product", cell: (row) => row.name },
                { header: "Seller", cell: (row) => row.seller?.shopName ?? "-" },
                { header: "Price", cell: (row) => <PriceDisplay price={row.price} discountPrice={row.discountPrice} compact /> },
                { header: "Status", cell: (row) => row.status },
                {
                  header: "Actions",
                  cell: (row) => (
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" onClick={() => action(adminCatalogApi.approveProduct(row.id), "Product approved.")}>
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => action(adminCatalogApi.rejectProduct(row.id), "Product rejected.")}>
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => action(adminCatalogApi.featureProduct(row.id, !row.isFeatured), "Feature status updated.")}
                      >
                        {row.isFeatured ? "Unfeature" : "Feature"}
                      </Button>
                    </div>
                  )
                }
              ]}
            />
          </section>
        </main>
      </RoleGuard>
    </ProtectedRoute>
  );
}
