import { ProductCard } from "@acme/ui";
import type { Product } from "@acme/types";

const demoProduct: Product = {
  id: "demo-1",
  name: "Starter Hoodie",
  priceCents: 5900,
  description: "A comfy hoodie for your first launch."
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold">ACME eCommerce</h1>
      <ProductCard product={demoProduct} />
    </main>
  );
}
