import { GenericDashboardPage } from "@/components/marketplace/page-clients";

export default function Page() {
  return <GenericDashboardPage role="admin" title="Flash Sales" endpoint="/admin/flash-sales" createFields={["title","startTime","endTime"]} />;
}
