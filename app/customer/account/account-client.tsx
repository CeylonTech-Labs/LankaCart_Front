"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoleGuard } from "@/components/auth/role-guard";
import { TextField } from "@/components/auth/form-field";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { profileSchema, ProfileValues } from "@/lib/auth-schemas";
import { useAuthStore } from "@/store/auth-store";

export function AccountClient() {
  const { user, updateProfile } = useAuthStore();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: ""
    }
  });

  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone ?? ""
      });
    }
  }, [form, user]);

  const onSubmit = async (values: ProfileValues) => {
    setMessage(null);
    setError(null);

    try {
      await updateProfile(values);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Profile update failed");
    }
  };

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["CUSTOMER"]}>
        <main className="min-h-screen bg-muted">
          <Navbar />
          <section className="mx-auto max-w-3xl px-4 py-10 md:px-6">
            <div className="rounded-md border bg-card p-6 shadow-sm">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold">My account</h1>
                <p className="mt-2 text-sm text-muted-foreground">Manage your profile details.</p>
              </div>
              <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label="First name"
                    registration={form.register("firstName")}
                    error={form.formState.errors.firstName}
                  />
                  <TextField
                    label="Last name"
                    registration={form.register("lastName")}
                    error={form.formState.errors.lastName}
                  />
                </div>
                <TextField label="Phone" registration={form.register("phone")} error={form.formState.errors.phone} />
                {message ? <p className="rounded-md bg-secondary/10 p-3 text-sm text-secondary">{message}</p> : null}
                {error ? <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
                <Button className="w-full sm:w-fit" type="submit">
                  Save changes
                </Button>
              </form>
            </div>
          </section>
        </main>
      </RoleGuard>
    </ProtectedRoute>
  );
}
