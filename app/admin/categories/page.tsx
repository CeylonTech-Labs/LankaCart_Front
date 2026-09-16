"use client";

import { useEffect, useState } from "react";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoleGuard } from "@/components/auth/role-guard";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminCatalogApi, catalogApi } from "@/services/catalog";
import { useToastStore } from "@/store/toast-store";
import { Category } from "@/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const toast = useToastStore((state) => state.show);
  const load = () => catalogApi.categories().then(setCategories);

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    if (!name.trim()) return;
    await adminCatalogApi.createCategory({ name });
    setName("");
    toast("Category created.", "success");
    load();
  };

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["ADMIN"]}>
        <main className="min-h-screen bg-muted">
          <Navbar />
          <section className="mx-auto max-w-6xl px-4 py-8 md:px-6">
            <h1 className="text-2xl font-semibold">Categories</h1>
            <div className="my-5 flex max-w-xl gap-2">
              <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Category name" />
              <Button onClick={create}>Create</Button>
            </div>
            <AdminDataTable
              rows={categories}
              columns={[
                { header: "Name", cell: (row) => row.name },
                { header: "Slug", cell: (row) => row.slug },
                { header: "Products", cell: (row) => row._count?.products ?? 0 },
                {
                  header: "Actions",
                  cell: (row) => (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={async () => {
                        await adminCatalogApi.deleteCategory(row.id);
                        toast("Category deleted.", "success");
                        load();
                      }}
                    >
                      Delete
                    </Button>
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
