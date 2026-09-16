import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <section className="overflow-hidden rounded-md bg-foreground text-background">
      <div className="grid gap-6 p-6 md:grid-cols-[1fr_0.9fr] md:p-10">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-accent">COD-first Sri Lankan marketplace</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-6xl">LankaCart</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-background/75 md:text-base">
            Discover electronics, fashion, home essentials, and local sellers with a clean marketplace experience.
          </p>
          <Button asChild className="mt-6 w-fit bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/products">Shop products</Link>
          </Button>
        </div>
        <img
          src="https://res.cloudinary.com/demo/image/upload/sample.jpg"
          alt="LankaCart marketplace"
          className="aspect-[4/3] w-full rounded-md object-cover"
        />
      </div>
    </section>
  );
}
