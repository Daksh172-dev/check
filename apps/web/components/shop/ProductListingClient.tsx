"use client";

import type { ProductListResponse } from "@acme/types";
import { ProductCard } from "@acme/ui";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

type SortOption = "newest" | "price_asc" | "price_desc" | "rating_desc";

const categoryOptions = [
  { value: "", label: "All categories" },
  { value: "apparel", label: "Apparel" },
  { value: "electronics", label: "Electronics" },
  { value: "home-living", label: "Home & Living" }
];

const ratingOptions = [
  { value: "", label: "Any rating" },
  { value: "4", label: "4★ & up" },
  { value: "4.5", label: "4.5★ & up" }
];

async function fetchProducts(params: URLSearchParams): Promise<ProductListResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/products?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

function ListingSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="h-6 w-32 rounded bg-slate-200" />
      <div className="mt-3 h-4 w-full rounded bg-slate-100" />
      <div className="mt-2 h-4 w-2/3 rounded bg-slate-100" />
      <div className="mt-6 h-5 w-20 rounded bg-slate-200" />
    </div>
  );
}

export function ProductListingClient() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("pageSize", "9");
    params.set("sort", sort);
    if (category) params.set("category", category);
    if (rating) params.set("rating", rating);
    if (minPrice) params.set("minPrice", String(Number(minPrice) * 100));
    if (maxPrice) params.set("maxPrice", String(Number(maxPrice) * 100));
    return params;
  }, [category, maxPrice, minPrice, page, rating, sort]);

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["shop-products", queryParams.toString()],
    queryFn: () => fetchProducts(queryParams)
  });

  const products = data?.items ?? [];
  const meta = data?.meta;

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <aside className="h-fit rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Filters</h2>

        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
              }}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Rating</label>
            <select
              value={rating}
              onChange={(event) => {
                setRating(event.target.value);
                setPage(1);
              }}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              {ratingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-slate-700">Price ($)</p>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                min={0}
                value={minPrice}
                onChange={(event) => {
                  setMinPrice(event.target.value);
                  setPage(1);
                }}
                placeholder="Min"
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                type="number"
                min={0}
                value={maxPrice}
                onChange={(event) => {
                  setMaxPrice(event.target.value);
                  setPage(1);
                }}
                placeholder="Max"
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setCategory("");
              setRating("");
              setMinPrice("");
              setMaxPrice("");
              setSort("newest");
              setPage(1);
            }}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Reset filters
          </button>
        </div>
      </aside>

      <section>
        <div className="mb-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Shop Products</h1>
            <p className="text-sm text-slate-600">
              {meta ? `${meta.total} results` : "Browse products"} {isFetching && !isLoading ? "• Updating..." : ""}
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            Sort by
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as SortOption);
                setPage(1);
              }}
              className="rounded-md border border-slate-200 bg-white px-3 py-2"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating_desc">Top Rated</option>
            </select>
          </label>
        </div>

        {isError && (
          <p className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            Unable to load products. Please try again.
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {isLoading
            ? Array.from({ length: 9 }).map((_, index) => <ListingSkeleton key={index} />)
            : products.map((product) => (
                <article key={product.id}>
                  <ProductCard product={product} />
                  <div className="mt-2 flex items-center justify-between px-1 text-xs text-slate-500">
                    <span className="rounded-full bg-slate-100 px-2 py-1 uppercase tracking-wide">
                      {product.category ?? "general"}
                    </span>
                    <span>{product.rating?.toFixed(1) ?? "-"}★</span>
                  </div>
                </article>
              ))}
        </div>

        <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={(meta?.page ?? 1) <= 1}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <p className="text-sm text-slate-600">
            Page {meta?.page ?? page} of {meta?.totalPages ?? 1}
          </p>

          <button
            type="button"
            onClick={() => setPage((current) => current + 1)}
            disabled={Boolean(meta && meta.page >= meta.totalPages)}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
