import { GenericDashboardPage } from "@/components/marketplace/page-clients";

export default function Page() {
  return <GenericDashboardPage role="admin" title="Delivery" endpoint="/admin/shipments" />;
}
