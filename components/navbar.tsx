"use client";

import Link from "next/link";
import { ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/user-dropdown";

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
            LC
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">LankaCart</p>
            <p className="text-xs text-muted-foreground">Multi-vendor marketplace</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="/">Categories</Link>
          <Link href="/">Deals</Link>
          <Link href="/seller/register">Seller Center</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" aria-label="Seller center">
            <Link href="/seller/register">
              <Store className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Cart">
            <ShoppingCart className="h-4 w-4" />
          </Button>
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
