import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center bg-foreground px-4 py-12">
      <AuthCard title="Admin login" subtitle="Access the LankaCart operations dashboard.">
        <LoginForm expectedRole="ADMIN" />
      </AuthCard>
    </main>
  );
}
