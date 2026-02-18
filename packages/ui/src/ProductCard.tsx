import type { Product } from "@acme/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="mt-2 text-slate-600">{product.description ?? "No description yet."}</p>
      <p className="mt-4 text-lg font-bold">${(product.priceCents / 100).toFixed(2)}</p>
    </article>
  );
}
