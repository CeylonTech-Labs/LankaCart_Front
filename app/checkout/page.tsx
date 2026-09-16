import { CheckoutForm } from "@/components/marketplace/checkout-form";
import { DashboardShell } from "@/components/marketplace/dashboard-shell";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoleGuard } from "@/components/auth/role-guard";

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["CUSTOMER"]}>
        <DashboardShell role="customer" title="Checkout">
          <CheckoutForm />
        </DashboardShell>
      </RoleGuard>
    </ProtectedRoute>
  );
}
