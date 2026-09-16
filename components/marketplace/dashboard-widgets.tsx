"use client";

import { BarChart3, Package, ShoppingBag, Users } from "lucide-react";
import { OrderStatusBadge } from "@/components/marketplace/status-badges";
import { Button } from "@/components/ui/button";
import { Order } from "@/types";

export function DashboardStatsCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border bg-card p-5 shadow-sm">
      <BarChart3 className="h-5 w-5 text-secondary" />
      <p className="mt-4 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{String(value)}</p>
    </div>
  );
}

export function SalesChart({ values = [] }: { values?: number[] }) {
  const bars = values.length ? values : [40, 70, 52, 88, 61, 94, 73, 80];
  return (
    <div className="rounded-md border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Sales trend</h2>
        <ShoppingBag className="h-5 w-5 text-secondary" />
      </div>
      <div className="mt-6 flex h-40 items-end gap-2">
        {bars.map((value, index) => (
          <div key={index} className="flex-1 rounded-t bg-secondary/80" style={{ height: `${Math.max(12, value)}%` }} />
        ))}
      </div>
    </div>
  );
}

export function RecentOrdersTable({ orders = [] }: { orders?: Order[] }) {
  return (
    <div className="overflow-hidden rounded-md border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-semibold">Recent orders</h2>
        <Package className="h-5 w-5 text-secondary" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody>
            {orders.length ? orders.map((order) => (
              <tr key={order.id} className="border-b last:border-0">
                <td className="p-4 font-medium">{order.orderNumber}</td>
                <td className="p-4">LKR {Number(order.totalAmount).toLocaleString()}</td>
                <td className="p-4"><OrderStatusBadge status={order.status} /></td>
              </tr>
            )) : (
              <tr><td className="p-8 text-center text-muted-foreground">No records yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function EmptyState({ title = "Nothing here yet" }: { title?: string }) {
  return <div className="rounded-md border bg-card p-10 text-center text-sm text-muted-foreground">{title}</div>;
}

export function SkeletonBlock() {
  return <div className="h-32 animate-pulse rounded-md bg-border" />;
}

export function ConfirmButton({ onConfirm, children, variant = "outline" }: { onConfirm: () => void; children: React.ReactNode; variant?: "outline" | "ghost" }) {
  return (
    <Button variant={variant} onClick={() => window.confirm("Are you sure?") && onConfirm()}>
      {children}
    </Button>
  );
}

export function MetricStrip({ count }: { count: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <DashboardStatsCard label="Active records" value={count} />
      <DashboardStatsCard label="Needs attention" value={0} />
      <DashboardStatsCard label="Updated today" value={count ? 1 : 0} />
    </div>
  );
}

export function UserCountCard({ value }: { value: number }) {
  return (
    <div className="rounded-md border bg-card p-5 shadow-sm">
      <Users className="h-5 w-5 text-secondary" />
      <p className="mt-4 text-sm text-muted-foreground">People</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
