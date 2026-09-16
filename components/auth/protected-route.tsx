"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token, fetchMe, logout } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        await fetchMe();
        setIsReady(true);
      } catch {
        logout();
        router.replace("/login");
      }
    };

    verifySession();
  }, [fetchMe, logout, router, token]);

  if (!isReady) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Loading...</div>;
  }

  return <>{children}</>;
}
