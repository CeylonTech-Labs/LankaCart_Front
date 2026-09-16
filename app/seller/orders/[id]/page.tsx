import { OrderDetailPage } from "@/components/marketplace/page-clients";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderDetailPage role="seller" id={id} />;
}
