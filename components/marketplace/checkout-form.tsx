"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Landmark, Truck } from "lucide-react";
import { AddressSelector } from "@/components/marketplace/checkout-parts";
import { OrderSummary } from "@/components/marketplace/order-components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkoutApi, customerApi, CheckoutSummary } from "@/services/marketplace";
import { useToastStore } from "@/store/toast-store";
import { Address } from "@/types";

export function CheckoutForm() {
  const router = useRouter();
  const toast = useToastStore((state) => state.show);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressId, setAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH_ON_DELIVERY");
  const [couponCode, setCouponCode] = useState("");
  const [summary, setSummary] = useState<CheckoutSummary | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([customerApi.addresses(), checkoutApi.summary()]).then(([addressData, summaryData]) => {
      setAddresses(addressData);
      setAddressId(addressData.find((address) => address.isDefault)?.id ?? addressData[0]?.id ?? "");
      setSummary(summaryData);
    });
  }, []);

  const apply = async () => {
    setSummary(await checkoutApi.applyCoupon(couponCode));
    toast("Coupon applied.", "success");
  };

  const place = async () => {
    setLoading(true);
    try {
      const order = await checkoutApi.placeOrder({ addressId, paymentMethod, couponCode });
      toast("Order placed successfully.", "success");
      router.push(`/customer/orders/${order.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <AddressSelector addresses={addresses} value={addressId} onChange={setAddressId} />
        <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
        <div className="rounded-md border bg-card p-5 shadow-sm">
          <h2 className="font-semibold">Voucher</h2>
          <div className="mt-3 flex gap-2">
            <Input value={couponCode} onChange={(event) => setCouponCode(event.target.value)} placeholder="Coupon code" />
            <Button variant="outline" onClick={apply} type="button">Apply</Button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <OrderSummary order={summary ? { subtotal: summary.subtotal, shippingFee: summary.shippingFee, discountAmount: summary.discountAmount, totalAmount: summary.totalAmount } : null} />
        <Button className="w-full" disabled={!addressId || loading} onClick={place}>{loading ? "Placing..." : "Place order"}</Button>
      </div>
    </div>
  );
}

export function PaymentMethodSelector({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const methods = [
    { id: "CASH_ON_DELIVERY", label: "Cash on Delivery", icon: Truck },
    { id: "BANK_TRANSFER", label: "Bank Transfer", icon: Landmark },
    { id: "PAYHERE", label: "PayHere", icon: CreditCard }
  ];
  return (
    <div className="rounded-md border bg-card p-5 shadow-sm">
      <h2 className="font-semibold">Payment method</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {methods.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" onClick={() => onChange(id)} className={`rounded-md border p-4 text-left text-sm ${value === id ? "border-secondary bg-secondary/10" : "bg-background"}`}>
            <Icon className="mb-3 h-5 w-5 text-secondary" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
