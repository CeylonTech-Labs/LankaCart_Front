"use client";

import Link from "next/link";
import { useState } from "react";
import { PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { OrderStatusBadge } from "@/components/marketplace/status-badges";
import { Order } from "@/types";

export function OrderSummary({ order }: { order?: Partial<Order> | null }) {
  return (
    <div className="rounded-md border bg-card p-5 shadow-sm">
      <h2 className="font-semibold">Order summary</h2>
      <div className="mt-4 space-y-2 text-sm">
        <Row label="Subtotal" value={order?.subtotal} />
        <Row label="Shipping" value={order?.shippingFee} />
        <Row label="Discount" value={order?.discountAmount} />
        <div className="flex justify-between border-t pt-3 font-semibold">
          <span>Total</span>
          <span>LKR {Number(order?.totalAmount ?? 0).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string | number }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span>LKR {Number(value ?? 0).toLocaleString()}</span></div>;
}

export function OrderTimeline({ history = [] }: { history?: Order["statusHistory"] }) {
  return (
    <div className="rounded-md border bg-card p-5 shadow-sm">
      <h2 className="font-semibold">Timeline</h2>
      <div className="mt-4 space-y-4">
        {history?.length ? history.map((item) => (
          <div key={item.id} className="flex gap-3">
            <PackageCheck className="mt-0.5 h-4 w-4 text-secondary" />
            <div>
              <OrderStatusBadge status={item.status} />
              <p className="mt-1 text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</p>
              {item.note ? <p className="mt-1 text-sm">{item.note}</p> : null}
            </div>
          </div>
        )) : <p className="text-sm text-muted-foreground">No status updates yet.</p>}
      </div>
    </div>
  );
}

export function TrackingTimeline({ order }: { order?: Order | null }) {
  return (
    <div className="rounded-md border bg-card p-5 shadow-sm">
      <h2 className="font-semibold">Tracking</h2>
      <p className="mt-2 text-sm text-muted-foreground">{order?.shipping?.trackingNumber ?? "Tracking will appear after shipment."}</p>
      <div className="mt-3"><OrderStatusBadge status={order?.shipping?.status ?? order?.status} /></div>
    </div>
  );
}

export function CustomerOrderCard({ order }: { order: Order }) {
  return (
    <Link href={`/customer/orders/${order.id}`} className="block rounded-md border bg-card p-4 shadow-sm transition hover:border-secondary">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-medium">{order.orderNumber}</p>
          <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      <p className="mt-3 text-lg font-semibold">LKR {Number(order.totalAmount).toLocaleString()}</p>
    </Link>
  );
}

export function SellerOrderTable({ orders, hrefPrefix }: { orders: Order[]; hrefPrefix: string }) {
  return <OrderTable orders={orders} hrefPrefix={hrefPrefix} />;
}

export function AdminOrderTable({ orders, hrefPrefix = "/admin/orders" }: { orders: Order[]; hrefPrefix?: string }) {
  return <OrderTable orders={orders} hrefPrefix={hrefPrefix} />;
}

function OrderTable({ orders, hrefPrefix }: { orders: Order[]; hrefPrefix: string }) {
  return (
    <div className="overflow-hidden rounded-md border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left">
            <tr><th className="p-3">Order</th><th className="p-3">Items</th><th className="p-3">Total</th><th className="p-3">Status</th><th className="p-3" /></tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3 font-medium">{order.orderNumber}</td>
                <td className="p-3">{order.items?.length ?? 0}</td>
                <td className="p-3">LKR {Number(order.totalAmount).toLocaleString()}</td>
                <td className="p-3"><OrderStatusBadge status={order.status} /></td>
                <td className="p-3 text-right"><Button asChild size="sm" variant="outline"><Link href={`${hrefPrefix}/${order.id}`}>View</Link></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ReturnRequestForm({ onSubmit }: { onSubmit: (reason: string) => Promise<void> }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <form className="rounded-md border bg-card p-5 shadow-sm" onSubmit={async (event) => { event.preventDefault(); setLoading(true); await onSubmit(reason); setLoading(false); }}>
      <h2 className="font-semibold">Return request</h2>
      <Textarea className="mt-3" value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Reason" />
      <Button className="mt-3" disabled={loading || !reason}>{loading ? "Submitting..." : "Request return"}</Button>
    </form>
  );
}
