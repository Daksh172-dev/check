import "dotenv/config";
import cors from "cors";
import express from "express";
import { PrismaClient } from "@prisma/client";
import type { Product } from "@acme/types";

const app = express();
const prisma = new PrismaClient();
const port = Number(process.env.API_PORT ?? 4000);

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "api" });
});

app.get("/products", async (_req, res) => {
  const products = await prisma.product.findMany({ take: 20 });
  const payload: Product[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description ?? undefined,
    priceCents: product.priceCents
  }));

  res.json(payload);
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
