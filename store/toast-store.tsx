"use client";

import { create } from "zustand";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Toast = {
  id: string;
  title: string;
  tone: "success" | "error" | "info";
};

type ToastStore = {
  toasts: Toast[];
  show: (title: string, tone?: Toast["tone"]) => void;
  remove: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  show: (title, tone = "info") => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { id, title, tone }] }));
    window.setTimeout(() => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })), 3200);
  },
  remove: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }))
}));

export function Toaster() {
  const { toasts, remove } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 grid w-[calc(100%-2rem)] max-w-sm gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center justify-between gap-3 rounded-md border bg-card p-3 text-sm shadow-lg"
        >
          <span
            className={
              toast.tone === "error"
                ? "text-destructive"
                : toast.tone === "success"
                  ? "text-secondary"
                  : "text-foreground"
            }
          >
            {toast.title}
          </span>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => remove(toast.id)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
