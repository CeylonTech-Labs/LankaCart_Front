"use client";

import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoleGuard } from "@/components/auth/role-guard";
import { Navbar } from "@/components/navbar";
import { ProductForm } from "@/components/seller/product-form";
import { ProductFormValues } from "@/lib/product-schema";
import { sellerProductApi } from "@/services/catalog";
import { useToastStore } from "@/store/toast-store";

export default function CreateProductPage() {
  const router = useRouter();
  const toast = useToastStore((state) => state.show);

  const submit = async (values: ProductFormValues) => {
    await sellerProductApi.create(values);
    toast("Product submitted for approval.", "success");
    router.push("/seller/products");
  };

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["SELLER"]}>
        <main className="min-h-screen bg-muted">
          <Navbar />
          <section className="mx-auto max-w-5xl px-4 py-8 md:px-6">
            <div className="rounded-md border bg-card p-6 shadow-sm">
              <h1 className="mb-5 text-2xl font-semibold">Create product</h1>
              <ProductForm submitLabel="Submit for approval" onSubmit={submit} />
            </div>
          </section>
        </main>
      </RoleGuard>
    </ProtectedRoute>
  );
}
