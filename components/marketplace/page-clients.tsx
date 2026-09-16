"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoleGuard } from "@/components/auth/role-guard";
import { DashboardShell } from "@/components/marketplace/dashboard-shell";
import { DashboardStatsCard, EmptyState, MetricStrip, RecentOrdersTable, SalesChart, SkeletonBlock } from "@/components/marketplace/dashboard-widgets";
import { AdminOrderTable, CustomerOrderCard, OrderSummary, OrderTimeline, ReturnRequestForm, SellerOrderTable, TrackingTimeline } from "@/components/marketplace/order-components";
import { OrderStatusBadge } from "@/components/marketplace/status-badges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { adminApi, customerApi, publicMarketplaceApi, sellerApi } from "@/services/marketplace";
import { useToastStore } from "@/store/toast-store";
import { Order, UserRole } from "@/types";

type Role = "customer" | "seller" | "admin";

export function StatsDashboardPage({ role, title }: { role: Role; title: string }) {
  const [stats, setStats] = useState<Record<string, unknown> | null>(null);
  useEffect(() => {
    const load = role === "admin" ? adminApi.analytics : role === "seller" ? sellerApi.stats : customerApi.stats;
    load().then(setStats);
  }, [role]);
  return (
    <ProtectedPage role={role}>
      <DashboardShell role={role} title={title}>
        {stats ? (
          <>
            <div className="grid gap-4 md:grid-cols-4">
              {Object.entries(stats).filter(([, value]) => typeof value !== "object").slice(0, 8).map(([key, value]) => (
                <DashboardStatsCard key={key} label={labelize(key)} value={String(value)} />
              ))}
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
              <SalesChart />
              <RecentOrdersTable orders={(stats.recentOrders as Order[]) ?? []} />
            </div>
          </>
        ) : <SkeletonBlock />}
      </DashboardShell>
    </ProtectedPage>
  );
}

export function OrdersPage({ role }: { role: Role }) {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    const load = role === "admin" ? adminApi.orders : role === "seller" ? sellerApi.orders : customerApi.orders;
    load().then(setOrders);
  }, [role]);
  return (
    <ProtectedPage role={role}>
      <DashboardShell role={role} title="Orders">
        {orders.length ? (
          role === "customer" ? <div className="grid gap-4">{orders.map((order) => <CustomerOrderCard key={order.id} order={order} />)}</div>
          : role === "seller" ? <SellerOrderTable orders={orders} hrefPrefix="/seller/orders" />
          : <AdminOrderTable orders={orders} />
        ) : <EmptyState title="No orders yet." />}
      </DashboardShell>
    </ProtectedPage>
  );
}

export function OrderDetailPage({ role, id }: { role: Role; id: string }) {
  const toast = useToastStore((state) => state.show);
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState("CONFIRMED");
  const load = () => (role === "admin" ? adminApi.order(id) : role === "seller" ? sellerApi.order(id) : customerApi.order(id)).then(setOrder);
  useEffect(() => { load(); }, []);
  const updateStatus = async () => {
    const data = role === "admin" ? await adminApi.updateOrderStatus(id, status) : await sellerApi.updateOrderStatus(id, status);
    setOrder(data);
    toast("Order status updated.", "success");
  };
  return (
    <ProtectedPage role={role}>
      <DashboardShell role={role} title={order?.orderNumber ?? "Order"}>
        {order ? (
          <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
            <div className="space-y-5">
              <div className="rounded-md border bg-card p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                    <h2 className="mt-1 text-xl font-semibold">{order.orderNumber}</h2>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
                <div className="mt-5 divide-y">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between gap-4 py-3 text-sm">
                      <span>{item.productName} x {item.quantity}</span>
                      <span>LKR {Number(item.totalPrice).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <OrderTimeline history={order.statusHistory} />
              <TrackingTimeline order={order} />
              {role === "customer" && order.status === "DELIVERED" ? <ReturnRequestForm onSubmit={async (reason) => { await customerApi.createReturn({ orderId: id, reason }); toast("Return requested.", "success"); }} /> : null}
            </div>
            <div className="space-y-5">
              <OrderSummary order={order} />
              {role !== "customer" ? (
                <div className="rounded-md border bg-card p-5 shadow-sm">
                  <h2 className="font-semibold">Update status</h2>
                  <select className="mt-3 h-10 w-full rounded-md border bg-background px-3 text-sm" value={status} onChange={(event) => setStatus(event.target.value)}>
                    {["PENDING","CONFIRMED","PROCESSING","PACKED","SHIPPED","OUT_FOR_DELIVERY","DELIVERED","CANCELLED","RETURNED","REFUNDED"].map((value) => <option key={value}>{value}</option>)}
                  </select>
                  <Button className="mt-3 w-full" onClick={updateStatus}>Save status</Button>
                </div>
              ) : order.status === "PENDING" || order.status === "CONFIRMED" || order.status === "PROCESSING" ? (
                <Button variant="outline" className="w-full" onClick={async () => { setOrder(await customerApi.cancelOrder(id)); toast("Order cancelled.", "success"); }}>Cancel order</Button>
              ) : null}
            </div>
          </div>
        ) : <SkeletonBlock />}
      </DashboardShell>
    </ProtectedPage>
  );
}

export function GenericDashboardPage({ role, title, endpoint, createFields }: { role: Role; title: string; endpoint?: string; createFields?: string[] }) {
  const toast = useToastStore((state) => state.show);
  const [records, setRecords] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState<Record<string, string>>({});
  const path = endpoint ?? `/${role}/${title.toLowerCase().replace(/\s+/g, "-")}`;
  const load = () => adminApi.list<Record<string, unknown>>(path).then(setRecords).catch(() => setRecords([]));
  useEffect(() => { load(); }, []);
  const create = async () => {
    await adminApi.create(path, form);
    setForm({});
    toast(`${title} saved.`, "success");
    load();
  };
  return (
    <ProtectedPage role={role}>
      <DashboardShell role={role} title={title}>
        {role === "admin" && createFields?.length ? (
          <div className="mb-5 rounded-md border bg-card p-5 shadow-sm">
            <div className="grid gap-3 md:grid-cols-3">
              {createFields.map((field) => (
                field === "content" || field === "message" ? <Textarea key={field} placeholder={labelize(field)} value={form[field] ?? ""} onChange={(event) => setForm({ ...form, [field]: event.target.value })} />
                : <Input key={field} placeholder={labelize(field)} value={form[field] ?? ""} onChange={(event) => setForm({ ...form, [field]: event.target.value })} />
              ))}
            </div>
            <Button className="mt-3" onClick={create}>Save</Button>
          </div>
        ) : null}
        <MetricStrip count={records.length} />
        <div className="mt-5 overflow-hidden rounded-md border bg-card shadow-sm">
          <table className="w-full text-sm">
            <tbody>
              {records.length ? records.map((record) => (
                <tr key={String(record.id)} className="border-b last:border-0">
                  <td className="p-4 font-medium">{String(record.title ?? record.code ?? record.orderNumber ?? record.subject ?? record.id)}</td>
                  <td className="p-4"><OrderStatusBadge status={String(record.status ?? record.paymentStatus ?? "")} /></td>
                </tr>
              )) : <tr><td className="p-8 text-center text-muted-foreground">No records yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </DashboardShell>
    </ProtectedPage>
  );
}

export function PlaceholderDashboardPage({ role, title }: { role: Role; title: string }) {
  return (
    <ProtectedPage role={role}>
      <DashboardShell role={role} title={title}>
        <MetricStrip count={0} />
        <div className="mt-5"><EmptyState title={`${title} workspace is ready.`} /></div>
      </DashboardShell>
    </ProtectedPage>
  );
}

export function AiToolsPage() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  return (
    <ProtectedPage role="seller">
      <DashboardShell role="seller" title="AI Tools">
        <div className="rounded-md border bg-card p-5 shadow-sm">
          <Input placeholder="Product name" value={name} onChange={(event) => setName(event.target.value)} />
          <Button className="mt-3" onClick={async () => setResult(await sellerApi.generateDescription({ productName: name }))}>Generate with AI</Button>
        </div>
        {result ? <pre className="mt-5 overflow-auto rounded-md border bg-card p-5 text-sm">{JSON.stringify(result, null, 2)}</pre> : null}
      </DashboardShell>
    </ProtectedPage>
  );
}

export function PublicListPage({ type }: { type: "blogs" | "flash-sale" }) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  useEffect(() => {
    (type === "blogs" ? publicMarketplaceApi.blogs() : publicMarketplaceApi.flashSales()).then((data) => setItems(data as Record<string, unknown>[]));
  }, [type]);
  return (
    <main className="min-h-screen bg-muted">
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <h1 className="text-2xl font-semibold">{type === "blogs" ? "Blogs" : "Flash Sale"}</h1>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <Link key={String(item.id)} href={type === "blogs" ? `/blogs/${String(item.slug)}` : "/flash-sale"} className="rounded-md border bg-card p-5 shadow-sm">
              <h2 className="font-semibold">{String(item.title)}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{String(item.excerpt ?? item.endsAt ?? "Active now")}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export function PublicContentPage({ slug, blog = false }: { slug: string; blog?: boolean }) {
  const [item, setItem] = useState<Record<string, unknown> | null>(null);
  useEffect(() => {
    (blog ? publicMarketplaceApi.blog(slug) : publicMarketplaceApi.page(slug)).then(setItem);
  }, [blog, slug]);
  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-3xl px-4 py-10 md:px-6">
        <h1 className="text-3xl font-semibold">{String(item?.title ?? labelize(slug))}</h1>
        <div className="mt-5 whitespace-pre-line text-muted-foreground">{String(item?.content ?? "")}</div>
      </article>
    </main>
  );
}

function ProtectedPage({ role, children }: { role: Role; children: React.ReactNode }) {
  const allowed: Record<Role, UserRole[]> = { customer: ["CUSTOMER"], seller: ["SELLER"], admin: ["ADMIN"] };
  return <ProtectedRoute><RoleGuard allowedRoles={allowed[role]}>{children}</RoleGuard></ProtectedRoute>;
}

function labelize(value: string) {
  return value.replace(/[-_]/g, " ").replace(/([A-Z])/g, " $1").replace(/\b\w/g, (letter) => letter.toUpperCase()).trim();
}
