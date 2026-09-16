import { GenericDashboardPage } from "@/components/marketplace/page-clients";

export default function Page() {
  return <GenericDashboardPage role="admin" title="Pages" endpoint="/admin/pages" createFields={["title","slug","content"]} />;
}
