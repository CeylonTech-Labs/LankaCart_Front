"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { sellerRegisterSchema, SellerRegisterValues } from "@/lib/auth-schemas";
import { useAuthStore } from "@/store/auth-store";
import { TextAreaField, TextField } from "./form-field";

export function SellerRegisterForm() {
  const router = useRouter();
  const { registerSeller, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<SellerRegisterValues>({
    resolver: zodResolver(sellerRegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      businessName: "",
      businessType: "",
      storeName: "",
      storeDescription: "",
      pickupAddress: "",
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      branchName: ""
    }
  });

  const onSubmit = async (values: SellerRegisterValues) => {
    setError(null);

    try {
      await registerSeller(values);
      router.push("/seller/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Seller registration failed");
    }
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <section className="grid gap-4 sm:grid-cols-2">
        <TextField label="First name" registration={form.register("firstName")} error={form.formState.errors.firstName} />
        <TextField label="Last name" registration={form.register("lastName")} error={form.formState.errors.lastName} />
        <TextField label="Email" type="email" registration={form.register("email")} error={form.formState.errors.email} />
        <TextField label="Phone" registration={form.register("phone")} error={form.formState.errors.phone} />
        <TextField
          label="Password"
          type="password"
          registration={form.register("password")}
          error={form.formState.errors.password}
        />
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Business name"
          registration={form.register("businessName")}
          error={form.formState.errors.businessName}
        />
        <TextField
          label="Business type"
          placeholder="Sole proprietorship, private company"
          registration={form.register("businessType")}
          error={form.formState.errors.businessType}
        />
        <TextField label="Store name" registration={form.register("storeName")} error={form.formState.errors.storeName} />
        <TextField
          label="Bank name"
          registration={form.register("bankName")}
          error={form.formState.errors.bankName}
        />
        <TextField
          label="Account holder name"
          registration={form.register("accountHolderName")}
          error={form.formState.errors.accountHolderName}
        />
        <TextField
          label="Account number"
          registration={form.register("accountNumber")}
          error={form.formState.errors.accountNumber}
        />
        <TextField
          label="Branch name"
          registration={form.register("branchName")}
          error={form.formState.errors.branchName}
        />
      </section>

      <TextAreaField
        label="Store description"
        registration={form.register("storeDescription")}
        error={form.formState.errors.storeDescription}
      />
      <TextAreaField
        label="Pickup address"
        registration={form.register("pickupAddress")}
        error={form.formState.errors.pickupAddress}
      />

      {error ? <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}

      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit seller registration"}
      </Button>
    </form>
  );
}
