"use client";

import Link from "next/link";
import { BarChart3, Bell, BookOpen, Boxes, CreditCard, Home, LifeBuoy, Package, RotateCcw, Settings, Star, Store, TicketPercent, Truck, User, WalletCards } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";

const icons: Record<string, typeof Home> = {
  Dashboard: Home,
  Orders: Package,
  Products: Boxes,
  Inventory: Boxes,
  Returns: RotateCcw,
  Reviews: Star,
  Store: Store,
  Reports: BarChart3,
  Payments: CreditCard,
  Refunds: WalletCards,
  Delivery: Truck,
  Coupons: TicketPercent,
  "Flash Sales": TicketPercent,
  Banners: BookOpen,
  Pages: BookOpen,
  Blogs: BookOpen,
  Notifications: Bell,
  "Support Tickets": LifeBuoy,
  Settings: Settings,
  Profile: User,
  Addresses: User,
  Vouchers: TicketPercent,
  "AI Tools": Bell,
  Promotions: TicketPercent,
  Support: LifeBuoy
};

export function DashboardShell({
  role,
  title,
  children
}: {
  role: "customer" | "seller" | "admin";
  title: string;
  children: React.ReactNode;
}) {
  const links = role === "admin" ? adminLinks : role === "seller" ? sellerLinks : customerLinks;
  return (
    <main className="min-h-screen bg-muted">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 md:px-6">
        <aside className="hidden w-60 shrink-0 md:block">
          <nav className="sticky top-6 rounded-md border bg-card p-2 shadow-sm">
            {links.map((link) => {
              const Icon = icons[link.label] ?? Home;
              return (
                <Link key={link.href} href={link.href} className={cn("flex items-center gap-2 rounded px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground")}>
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <section className="min-w-0 flex-1">
          <div className="mb-5">
            <p className="text-sm text-muted-foreground">{role} / {title}</p>
            <h1 className="text-2xl font-semibold">{title}</h1>
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}

const customerLinks = [
  ["Dashboard", "/customer/dashboard"],
  ["Orders", "/customer/orders"],
  ["Returns", "/customer/returns"],
  ["Addresses", "/customer/addresses"],
  ["Profile", "/customer/profile"],
  ["Reviews", "/customer/reviews"],
  ["Vouchers", "/customer/vouchers"]
].map(([label, href]) => ({ label, href }));

const sellerLinks = [
  ["Dashboard", "/seller/dashboard"],
  ["Orders", "/seller/orders"],
  ["Products", "/seller/products"],
  ["Inventory", "/seller/inventory"],
  ["Returns", "/seller/returns"],
  ["Reviews", "/seller/reviews"],
  ["Store", "/seller/store"],
  ["Reports", "/seller/reports"],
  ["AI Tools", "/seller/ai-tools"],
  ["Promotions", "/seller/promotions"],
  ["Support", "/seller/support"]
].map(([label, href]) => ({ label, href }));

const adminLinks = [
  ["Dashboard", "/admin/dashboard"],
  ["Orders", "/admin/orders"],
  ["Payments", "/admin/payments"],
  ["Returns", "/admin/returns"],
  ["Refunds", "/admin/refunds"],
  ["Delivery", "/admin/delivery"],
  ["Reports", "/admin/reports"],
  ["Coupons", "/admin/coupons"],
  ["Flash Sales", "/admin/flash-sales"],
  ["Banners", "/admin/banners"],
  ["Pages", "/admin/pages"],
  ["Blogs", "/admin/blogs"],
  ["Reviews", "/admin/reviews"],
  ["Support Tickets", "/admin/support-tickets"],
  ["Notifications", "/admin/notifications"],
  ["Settings", "/admin/settings"]
].map(([label, href]) => ({ label, href }));
