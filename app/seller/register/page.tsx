import { SellerRegisterForm } from "@/components/auth/seller-register-form";
import { Navbar } from "@/components/navbar";

export default function SellerRegisterPage() {
  return (
    <main className="min-h-screen bg-muted">
      <Navbar />
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="rounded-md border bg-card p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-medium text-secondary">Seller onboarding</p>
            <h1 className="mt-2 text-2xl font-semibold">Open your LankaCart store</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Submit your business, pickup, and bank details for admin approval.
            </p>
          </div>
          <SellerRegisterForm />
        </div>
      </section>
    </main>
  );
}
