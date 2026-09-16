"use client";

import { PackagePlus, ShieldCheck, Store } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoleGuard } from "@/components/auth/role-guard";
import { Navbar } from "@/components/navbar";

export default function SellerDashboardPage() {
  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["SELLER"]}>
        <main className="min-h-screen bg-muted">
          <Navbar />
          <section className="mx-auto max-w-5xl px-4 py-10 md:px-6">
            <div className="rounded-md border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <Store className="mt-1 h-6 w-6 text-secondary" />
                <div>
                  <h1 className="text-2xl font-semibold">Seller dashboard</h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    Your store workspace is ready for product, order, and payout modules.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border p-4">
                  <ShieldCheck className="h-5 w-5 text-secondary" />
                  <p className="mt-3 text-sm font-medium">Approval status</p>
                  <p className="mt-1 text-sm text-muted-foreground">New sellers remain pending until admin approval.</p>
                </div>
                <div className="rounded-md border p-4">
                  <PackagePlus className="h-5 w-5 text-secondary" />
                  <p className="mt-3 text-sm font-medium">Product setup</p>
                  <p className="mt-1 text-sm text-muted-foreground">Inventory and catalog screens can build on this auth layer.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </RoleGuard>
    </ProtectedRoute>
  );
}
