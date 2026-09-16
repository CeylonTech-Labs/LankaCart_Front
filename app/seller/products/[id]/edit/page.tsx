"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoleGuard } from "@/components/auth/role-guard";
import { Navbar } from "@/components/navbar";
import { ImageUploader } from "@/components/seller/image-uploader";
import { ProductForm } from "@/components/seller/product-form";
import { ProductFormValues } from "@/lib/product-schema";
import { sellerProductApi } from "@/services/catalog";
import { useToastStore } from "@/store/toast-store";
import { Product } from "@/types";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const toast = useToastStore((state) => state.show);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    sellerProductApi.product(params.id).then(setProduct);
  }, [params.id]);

  const submit = async (values: ProductFormValues) => {
    await sellerProductApi.update(params.id, values);
    toast("Product updated.", "success");
    router.push("/seller/products");
  };

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["SELLER"]}>
        <main className="min-h-screen bg-muted">
          <Navbar />
          <section className="mx-auto max-w-5xl px-4 py-8 md:px-6">
            <div className="rounded-md border bg-card p-6 shadow-sm">
              <h1 className="mb-5 text-2xl font-semibold">Edit product</h1>
              {product ? <ProductForm product={product} submitLabel="Save changes" onSubmit={submit} /> : <p>Loading...</p>}
              <div className="mt-6">
                <ImageUploader
                  onFiles={async (files) => {
                    await sellerProductApi.uploadImages(params.id, files);
                    toast("Images uploaded.", "success");
                  }}
                />
              </div>
            </div>
          </section>
        </main>
      </RoleGuard>
    </ProtectedRoute>
  );
}
