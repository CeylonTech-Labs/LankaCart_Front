import { GenericDashboardPage } from "@/components/marketplace/page-clients";

export default function Page() {
  return <GenericDashboardPage role="seller" title="Promotions" endpoint="/coupons/available" />;
}
