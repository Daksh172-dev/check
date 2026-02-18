import "dotenv/config";
import cors from "cors";
import express from "express";
import { PrismaClient } from "@prisma/client";
import type { Product, ProductListResponse } from "@acme/types";

const app = express();
const prisma = new PrismaClient();
const port = Number(process.env.API_PORT ?? 4000);

app.use(cors());
app.use(express.json());

type SortOption = "newest" | "price_asc" | "price_desc" | "rating_desc";

function clampNumber(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getSyntheticRating(productId: string) {
  const seed = [...productId].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const value = 3.5 + (seed % 16) / 10;
  return Number(value.toFixed(1));
}

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "api" });
});

app.get("/products", async (req, res) => {
  const page = clampNumber(Number(req.query.page ?? 1) || 1, 1, 10_000);
  const pageSize = clampNumber(Number(req.query.pageSize ?? 12) || 12, 1, 48);
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
  const category = typeof req.query.category === "string" ? req.query.category : undefined;
  const minRating = req.query.rating ? Number(req.query.rating) : undefined;
  const sort = (req.query.sort as SortOption | undefined) ?? "newest";

  const baseWhere = {
    ...(Number.isFinite(minPrice) || Number.isFinite(maxPrice)
      ? {
          priceCents: {
            ...(Number.isFinite(minPrice) ? { gte: minPrice } : {}),
            ...(Number.isFinite(maxPrice) ? { lte: maxPrice } : {})
          }
        }
      : {}),
    ...(category ? { category: { slug: category } } : {})
  };

  const orderBy =
    sort === "price_asc"
      ? { priceCents: "asc" as const }
      : sort === "price_desc"
        ? { priceCents: "desc" as const }
        : { createdAt: "desc" as const };

  const rawProducts = await prisma.product.findMany({
    where: baseWhere,
    include: {
      category: {
        select: {
          slug: true,
          name: true
        }
      }
    },
    orderBy
  });

  const mapped: Product[] = rawProducts.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description ?? undefined,
    priceCents: product.priceCents,
    category: product.category.slug,
    rating: getSyntheticRating(product.id)
  }));

  const ratingFiltered = Number.isFinite(minRating)
    ? mapped.filter((product) => (product.rating ?? 0) >= Number(minRating))
    : mapped;

  const sorted =
    sort === "rating_desc"
      ? [...ratingFiltered].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      : ratingFiltered;

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = clampNumber(page, 1, totalPages);
  const start = (currentPage - 1) * pageSize;
  const items = sorted.slice(start, start + pageSize);

  const payload: ProductListResponse = {
    items,
    meta: {
      page: currentPage,
      pageSize,
      total,
      totalPages
    }
  };

  res.json(payload);
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
