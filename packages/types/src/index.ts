export type Product = {
  id: string;
  name: string;
  description?: string;
  priceCents: number;
  category?: string;
  rating?: number;
};

export type ProductListResponse = {
  items: Product[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};
