import { PublicContentPage } from "@/components/marketplace/page-clients";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PublicContentPage slug={slug} blog />;
}
