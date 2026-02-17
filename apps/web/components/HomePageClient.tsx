"use client";

import { ProductCard } from "@acme/ui";
import Link from "next/link";
import type { Product } from "@acme/types";
import { useQuery } from "@tanstack/react-query";
import { HeroCarousel } from "./HeroCarousel";

const featuredCategories = [
  { title: "Apparel", description: "Comfort-first essentials", accent: "from-violet-500 to-fuchsia-500" },
  { title: "Electronics", description: "Smart devices & accessories", accent: "from-cyan-500 to-blue-600" },
  { title: "Home & Living", description: "Curated modern spaces", accent: "from-amber-500 to-orange-600" },
  { title: "Beauty", description: "Self-care and wellness picks", accent: "from-pink-500 to-rose-600" }
];

const fallbackProducts: Product[] = [
  { id: "fallback-1", name: "Starter Hoodie", description: "Soft cotton blend for everyday wear.", priceCents: 5900 },
  { id: "fallback-2", name: "Wireless Earbuds", description: "Crisp sound with all-day battery.", priceCents: 12900 },
  { id: "fallback-3", name: "Ceramic Mug", description: "Minimal mug for coffee rituals.", priceCents: 1800 }
];

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="h-6 w-40 rounded bg-slate-200" />
      <div className="mt-3 h-4 w-full rounded bg-slate-100" />
      <div className="mt-2 h-4 w-4/5 rounded bg-slate-100" />
      <div className="mt-6 h-5 w-24 rounded bg-slate-200" />
    </div>
  );
}

export function HomePageClient() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const trendingProducts = data?.length ? data.slice(0, 6) : fallbackProducts;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-8 sm:px-6 lg:px-8">
      <HeroCarousel />

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Featured Categories</h2>
          <Link href="/categories" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            Browse all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((category) => (
            <article
              key={category.title}
              className={`rounded-xl bg-gradient-to-br p-5 text-white shadow-md ${category.accent}`}
            >
              <h3 className="text-lg font-semibold">{category.title}</h3>
              <p className="mt-2 text-sm text-white/90">{category.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Trending Products</h2>
          <Link href="/shop" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            View all
          </Link>
        </div>

        {isError && (
          <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Could not load live products. Showing sample products.
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => <ProductSkeleton key={index} />)
            : trendingProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
}
