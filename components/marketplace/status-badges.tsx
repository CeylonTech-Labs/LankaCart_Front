import { CheckCircle2, Clock, PackageCheck, Truck, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED: "bg-sky-50 text-sky-700 border-sky-200",
  PROCESSING: "bg-indigo-50 text-indigo-700 border-indigo-200",
  PACKED: "bg-violet-50 text-violet-700 border-violet-200",
  SHIPPED: "bg-blue-50 text-blue-700 border-blue-200",
  OUT_FOR_DELIVERY: "bg-cyan-50 text-cyan-700 border-cyan-200",
  DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
  FAILED: "bg-rose-50 text-rose-700 border-rose-200",
  RETURN_REQUESTED: "bg-orange-50 text-orange-700 border-orange-200",
  RETURNED: "bg-stone-50 text-stone-700 border-stone-200",
  REFUNDED: "bg-teal-50 text-teal-700 border-teal-200"
};

const icons: Record<string, typeof Clock> = {
  PENDING: Clock,
  DELIVERED: CheckCircle2,
  PAID: CheckCircle2,
  CANCELLED: XCircle,
  FAILED: XCircle,
  SHIPPED: Truck,
  OUT_FOR_DELIVERY: Truck,
  PACKED: PackageCheck
};

export function OrderStatusBadge({ status }: { status?: string }) {
  const label = status ?? "PENDING";
  const Icon = icons[label] ?? Clock;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded border px-2 py-1 text-xs font-medium", statusStyles[label] ?? "bg-muted text-muted-foreground")}>
      <Icon className="h-3.5 w-3.5" />
      {label.replace(/_/g, " ")}
    </span>
  );
}

export function RefundStatusBadge({ status }: { status?: string }) {
  return <OrderStatusBadge status={status} />;
}
