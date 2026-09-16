import { GenericDashboardPage } from "@/components/marketplace/page-clients";

export default function Page() {
  return <GenericDashboardPage role="admin" title="Banners" endpoint="/admin/banners" createFields={["title","imageUrl","linkUrl","position"]} />;
}
