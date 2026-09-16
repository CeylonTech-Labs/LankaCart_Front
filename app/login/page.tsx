import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import { Navbar } from "@/components/navbar";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-muted">
      <Navbar />
      <section className="mx-auto flex max-w-7xl px-4 py-12 md:px-6">
        <AuthCard
          title="Welcome back"
          subtitle="Sign in to shop, manage orders, or continue your seller workflow."
          footerText="New to LankaCart?"
          footerHref="/register"
          footerLinkText="Create an account"
        >
          <LoginForm />
        </AuthCard>
      </section>
    </main>
  );
}
