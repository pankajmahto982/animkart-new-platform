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

function isUsableImageUrl(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const url = value.trim();

  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/");
}

function cleanImageUrl(value: unknown) {
  return isUsableImageUrl(value) ? value.trim() : "";
}

export const products = (wcProducts as StoreProduct[]).map((product) => ({
  ...product,
  image: cleanImageUrl(product.image),
  images: Array.isArray(product.images) ? product.images.map(cleanImageUrl).filter(Boolean) : []
}));

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

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: StoreProduct, limit = 4) {
  return products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, limit);
}

export function getProductsByCategory(category: string, limit = 12) {
  return products.filter((product) => product.category === category).slice(0, limit);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getSupplierStores(limit = 24) {
  const stores = new Map<string, typeof products>();

  for (const product of products.filter((item) => item.price > 0)) {
    const supplier = product.brand?.trim() || "AnimKart Verified";
    stores.set(supplier, [...(stores.get(supplier) ?? []), product]);
  }

  return [...stores.entries()]
    .map(([name, items]) => {
      const liveProducts = items.filter((item) => item.inStock);
      const categories = [...new Set(items.map((item) => item.category).filter(Boolean))];
      const catalogValue = items.reduce((sum, item) => sum + item.price, 0);
      const heroProduct = items.find((item) => item.image) ?? items[0];

      return {
        name,
        slug: slugify(name),
        tagline: "Verified animal health supplier on AnimKart",
        productCount: items.length,
        liveProductCount: liveProducts.length,
        categories,
        catalogValue,
        heroImage: heroProduct?.image ?? "",
        products: items
      };
    })
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, limit);
}

export function getSupplierStoreBySlug(slug: string) {
  return getSupplierStores(200).find((store) => store.slug === slug);
}
