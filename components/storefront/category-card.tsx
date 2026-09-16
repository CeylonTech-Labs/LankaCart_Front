import Link from "next/link";
import { Category } from "@/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/categories/${category.slug}`} className="rounded-md border bg-card p-4 shadow-sm transition hover:shadow-md">
      <img
        src={category.imageUrl ?? "https://res.cloudinary.com/demo/image/upload/sample.jpg"}
        alt={category.name}
        className="aspect-[4/3] w-full rounded object-cover"
      />
      <p className="mt-3 text-sm font-semibold">{category.name}</p>
      <p className="mt-1 text-xs text-muted-foreground">{category._count?.products ?? 0} products</p>
    </Link>
  );
}
