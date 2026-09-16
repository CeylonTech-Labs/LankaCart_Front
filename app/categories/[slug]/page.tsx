import { ProductsClient } from "../../products/products-client";

export default async function CategoryProductsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductsClient categorySlug={slug} />;
}
