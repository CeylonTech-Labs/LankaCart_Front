"use client";

import { create } from "zustand";

type CartLine = {
  productId: string;
  variantId?: string;
  quantity: number;
};

type CartStore = {
  items: CartLine[];
  addItem: (item: CartLine) => void;
  removeItem: (productId: string, variantId?: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (line) => line.productId === item.productId && line.variantId === item.variantId
      );

      if (!existing) {
        return { items: [...state.items, item] };
      }

      return {
        items: state.items.map((line) =>
          line.productId === item.productId && line.variantId === item.variantId
            ? { ...line, quantity: line.quantity + item.quantity }
            : line
        )
      };
    }),
  removeItem: (productId, variantId) =>
    set((state) => ({
      items: state.items.filter((line) => line.productId !== productId || line.variantId !== variantId)
    })),
  clear: () => set({ items: [] })
}));
