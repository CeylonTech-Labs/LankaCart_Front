import { GenericDashboardPage } from "@/components/marketplace/page-clients";

export default function Page() {
  return <GenericDashboardPage role="admin" title="Support Tickets" endpoint="/admin/support-tickets" />;
}
