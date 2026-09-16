import { GenericDashboardPage } from "@/components/marketplace/page-clients";

export default function Page() {
  return <GenericDashboardPage role="admin" title="Blogs" endpoint="/admin/blogs" createFields={["title","slug","content"]} />;
}
