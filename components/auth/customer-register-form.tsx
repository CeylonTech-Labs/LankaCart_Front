"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { customerRegisterSchema, CustomerRegisterValues } from "@/lib/auth-schemas";
import { useAuthStore } from "@/store/auth-store";
import { TextField } from "./form-field";

export function CustomerRegisterForm() {
  const router = useRouter();
  const { registerCustomer, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<CustomerRegisterValues>({
    resolver: zodResolver(customerRegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: ""
    }
  });

  const onSubmit = async (values: CustomerRegisterValues) => {
    setError(null);

    try {
      await registerCustomer(values);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="First name" registration={form.register("firstName")} error={form.formState.errors.firstName} />
        <TextField label="Last name" registration={form.register("lastName")} error={form.formState.errors.lastName} />
      </div>
      <TextField label="Email" type="email" registration={form.register("email")} error={form.formState.errors.email} />
      <TextField label="Phone" registration={form.register("phone")} error={form.formState.errors.phone} />
      <TextField
        label="Password"
        type="password"
        registration={form.register("password")}
        error={form.formState.errors.password}
      />

      {error ? <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}

      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create customer account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Want to sell?{" "}
        <Link href="/seller/register" className="font-medium text-primary hover:underline">
          Register as a seller
        </Link>
      </p>
    </form>
  );
}
