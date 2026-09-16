"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useToastStore } from "@/store/toast-store";
import { wishlistApi } from "@/services/catalog";

export function WishlistButton({ productId }: { productId: string }) {
  const { token } = useAuthStore();
  const toast = useToastStore((state) => state.show);

  const add = async () => {
    if (!token) {
      toast("Please sign in to save wishlist items.", "error");
      return;
    }

    try {
      await wishlistApi.add(productId);
      toast("Saved to wishlist.", "success");
    } catch (error) {
      toast(error instanceof Error ? error.message : "Could not update wishlist.", "error");
    }
  };

  return (
    <Button variant="outline" size="icon" aria-label="Add to wishlist" onClick={add}>
      <Heart className="h-4 w-4" />
    </Button>
  );
}
