"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

export function UserDropdown() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  if (!user) {
    return (
      <Button asChild variant="outline">
        <Link href="/login">Sign in</Link>
      </Button>
    );
  }

  const accountHref =
    user.role === "ADMIN" ? "/admin/dashboard" : user.role === "SELLER" ? "/seller/dashboard" : "/customer/account";

  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="ghost">
        <Link href={accountHref}>
          <User className="mr-2 h-4 w-4" />
          {user.firstName}
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Logout"
        onClick={() => {
          logout();
          router.push("/");
        }}
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
