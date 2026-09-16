"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { loginSchema, LoginValues } from "@/lib/auth-schemas";
import { useAuthStore } from "@/store/auth-store";
import { UserRole } from "@/types";
import { TextField } from "./form-field";

type LoginFormProps = {
  expectedRole?: UserRole;
};

export function LoginForm({ expectedRole }: LoginFormProps) {
  const router = useRouter();
  const { login, logout, redirectPathForRole, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: LoginValues) => {
    setError(null);

    try {
      const payload = await login(values);

      if (expectedRole && payload.user.role !== expectedRole) {
        logout();
        setError(`This login is only for ${expectedRole.toLowerCase().replace("_", " ")} accounts.`);
        return;
      }

      router.push(redirectPathForRole(payload.user.role));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        registration={form.register("email")}
        error={form.formState.errors.email}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        registration={form.register("password")}
        error={form.formState.errors.password}
      />

      <div className="flex items-center justify-between text-sm">
        <Link href="/register" className="text-muted-foreground hover:text-foreground">
          Create account
        </Link>
        <Link href="/forgot-password" className="text-primary hover:underline">
          Forgot password?
        </Link>
      </div>

      {error ? <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}

      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
