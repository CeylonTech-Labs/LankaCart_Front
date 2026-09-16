import { GenericDashboardPage } from "@/components/marketplace/page-clients";

export default function Page() {
  return <GenericDashboardPage role="customer" title="Vouchers" endpoint="/coupons/available" />;
}
