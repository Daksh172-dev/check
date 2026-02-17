import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Apparel",
    slug: "apparel",
    description: "Clothing and everyday wear"
  },
  {
    name: "Electronics",
    slug: "electronics",
    description: "Devices and accessories"
  },
  {
    name: "Home & Living",
    slug: "home-living",
    description: "Home essentials and decor"
  }
];

const products = [
  {
    name: "Starter Hoodie",
    slug: "starter-hoodie",
    sku: "APP-HOODIE-001",
    description: "Premium cotton hoodie for daily comfort.",
    priceCents: 5900,
    stock: 120,
    categorySlug: "apparel"
  },
  {
    name: "Wireless Earbuds",
    slug: "wireless-earbuds",
    sku: "ELE-EARBUDS-001",
    description: "Noise-isolating earbuds with charging case.",
    priceCents: 12900,
    stock: 80,
    categorySlug: "electronics"
  },
  {
    name: "Ceramic Mug",
    slug: "ceramic-mug",
    sku: "HOME-MUG-001",
    description: "Minimal ceramic mug for coffee and tea.",
    priceCents: 1800,
    stock: 200,
    categorySlug: "home-living"
  }
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        isActive: true
      },
      create: category
    });
  }

  const categoryMap = new Map(
    (await prisma.category.findMany({ select: { id: true, slug: true } })).map((c) => [c.slug, c.id])
  );

  for (const product of products) {
    const categoryId = categoryMap.get(product.categorySlug);
    if (!categoryId) {
      throw new Error(`Missing category for slug: ${product.categorySlug}`);
    }

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        sku: product.sku,
        description: product.description,
        priceCents: product.priceCents,
        stock: product.stock,
        isActive: true,
        categoryId
      },
      create: {
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        description: product.description,
        priceCents: product.priceCents,
        stock: product.stock,
        isActive: true,
        categoryId
      }
    });
  }

  console.log("Seed completed: categories and products upserted.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
