"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoleGuard } from "@/components/auth/role-guard";
import { Navbar } from "@/components/navbar";
import { PriceDisplay } from "@/components/storefront/price-display";
import { Button } from "@/components/ui/button";
import { cartApi } from "@/services/catalog";
import { useToastStore } from "@/store/toast-store";
import { Cart } from "@/types";

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const toast = useToastStore((state) => state.show);

  const load = () => cartApi.get().then(setCart);

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    setCart(await cartApi.remove(id));
    toast("Item removed.", "success");
  };

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["CUSTOMER"]}>
        <main className="min-h-screen bg-muted">
          <Navbar />
          <section className="mx-auto max-w-5xl px-4 py-8 md:px-6">
            <h1 className="text-2xl font-semibold">Cart</h1>
            <div className="mt-5 grid gap-4">
              {cart?.items.length ? (
                cart.items.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-md border bg-card p-4 shadow-sm">
                    <img
                      src={item.product.images?.[0]?.url ?? "https://res.cloudinary.com/demo/image/upload/sample.jpg"}
                      alt={item.product.name}
                      className="h-24 w-24 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      <PriceDisplay price={item.unitPrice} compact />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => remove(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="rounded-md border bg-card p-10 text-center text-sm text-muted-foreground">Your cart is empty.</div>
              )}
            </div>
            <div className="mt-5 rounded-md border bg-card p-5">
              <p className="text-sm text-muted-foreground">Subtotal</p>
              <p className="mt-1 text-2xl font-semibold">LKR {Number(cart?.subtotal ?? 0).toLocaleString()}</p>
              <Button className="mt-4" asChild>
                <Link href="/checkout">Proceed to checkout</Link>
              </Button>
            </div>
          </section>
        </main>
      </RoleGuard>
    </ProtectedRoute>
  );
}
