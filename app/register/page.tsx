import { AuthCard } from "@/components/auth/auth-card";
import { CustomerRegisterForm } from "@/components/auth/customer-register-form";
import { Navbar } from "@/components/navbar";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-muted">
      <Navbar />
      <section className="mx-auto flex max-w-7xl px-4 py-12 md:px-6">
        <AuthCard
          title="Create customer account"
          subtitle="Join LankaCart to save addresses, track orders, and build your wishlist."
          footerText="Already have an account?"
          footerHref="/login"
          footerLinkText="Sign in"
        >
          <CustomerRegisterForm />
        </AuthCard>
      </section>
    </main>
  );
}
