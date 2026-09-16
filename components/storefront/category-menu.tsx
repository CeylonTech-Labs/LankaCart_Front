import Link from "next/link";
import { Category } from "@/types";

export function CategoryMenu({ categories }: { categories: Category[] }) {
  return (
    <nav className="grid gap-2 rounded-md border bg-card p-3 text-sm shadow-sm">
      {categories.slice(0, 10).map((category) => (
        <Link key={category.id} href={`/categories/${category.slug}`} className="rounded px-3 py-2 hover:bg-muted">
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
