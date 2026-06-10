import wcProducts from "./wc-products.json";

export type StoreProduct = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  regularPrice: number | null;
  salePrice: number | null;
  inStock: boolean;
  stock: string;
  image: string;
  images: string[];
  shortDescription: string;
  description: string;
  weightKg: string;
  genericName: string;
  netQuantity: string;
  source: string;
};

export const products = wcProducts as StoreProduct[];

export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR"
  }).format(value);
}

export function discountPercent(product: StoreProduct) {
  if (!product.regularPrice || product.regularPrice <= product.price) {
    return null;
  }

  return Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100);
}

export function getTopCategories(limit = 8) {
  const counts = new Map<string, number>();

  for (const product of products) {
    counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

export function getFeaturedProducts(limit = 4) {
  const preferredCategories = [
    "Animal Healthcare",
    "Animal Feed",
    "Animal feed supplement",
    "Veterinary",
    "Dog Food",
    "Cat"
  ];

  const selected: StoreProduct[] = [];

  for (const category of preferredCategories) {
    const match = products.find(
      (product) =>
        product.category === category &&
        product.image &&
        product.price > 0 &&
        !selected.some((item) => item.id === product.id)
    );

    if (match) {
      selected.push(match);
    }

    if (selected.length >= limit) {
      return selected;
    }
  }

  return [...selected, ...products.filter((product) => !selected.some((item) => item.id === product.id))].slice(
    0,
    limit
  );
}
