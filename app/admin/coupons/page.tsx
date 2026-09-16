import { GenericDashboardPage } from "@/components/marketplace/page-clients";

export default function Page() {
  return <GenericDashboardPage role="admin" title="Coupons" endpoint="/admin/coupons" createFields={["code","discountValue","startDate","endDate"]} />;
}
