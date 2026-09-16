"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cartApi } from "@/services/catalog";
import { useAuthStore } from "@/store/auth-store";
import { useToastStore } from "@/store/toast-store";

export function AddToCartButton({ productId, quantity = 1 }: { productId: string; quantity?: number }) {
  const { token } = useAuthStore();
  const toast = useToastStore((state) => state.show);

  const add = async () => {
    if (!token) {
      toast("Please sign in to add products to cart.", "error");
      return;
    }

    try {
      await cartApi.add(productId, quantity);
      toast("Added to cart.", "success");
    } catch (error) {
      toast(error instanceof Error ? error.message : "Could not add to cart.", "error");
    }
  };

  return (
    <Button onClick={add}>
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to cart
    </Button>
  );
}
