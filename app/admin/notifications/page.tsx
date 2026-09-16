import { GenericDashboardPage } from "@/components/marketplace/page-clients";

export default function Page() {
  return <GenericDashboardPage role="admin" title="Notifications" endpoint="/admin/notifications/send" createFields={["title","message"]} />;
}
