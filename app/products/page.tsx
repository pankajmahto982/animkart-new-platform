import Link from "next/link";
import { ChevronLeft, PackageCheck, Search, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { discountPercent, formatINR, getTopCategories, products } from "@/lib/products";

const visibleProducts = products.slice(0, 72);
const categories = getTopCategories(10);

export const metadata = {
  title: "Products | AnimKart",
  description: "Imported AnimKart product catalog from WooCommerce."
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
      <header className="border-b border-[#d3e4fe] bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-[#006b32]" href="/">
              <ChevronLeft size={17} />
              Back to home
            </Link>
            <h1 className="text-3xl font-extrabold">AnimKart Product Catalog</h1>
            <p className="mt-2 text-sm font-semibold text-[#3e4a3f]">
              Showing {visibleProducts.length} featured products from {products.length} imported WooCommerce products.
            </p>
          </div>
          <div className="flex min-w-0 items-center overflow-hidden rounded-lg border border-[#bdcabc]/70 bg-[#e5eeff] lg:w-[430px]">
            <Search className="ml-4 text-[#3e4a3f]" size={19} />
            <input
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm font-medium outline-none"
              placeholder="Search products..."
            />
            <button className="bg-[#006b32] px-4 py-3 text-xs font-extrabold text-white">SEARCH</button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Imported products", value: products.length.toLocaleString("en-IN"), icon: PackageCheck },
            { label: "Ready for listing", value: visibleProducts.length.toLocaleString("en-IN"), icon: ShieldCheck },
            { label: "Image-backed SKUs", value: products.length.toLocaleString("en-IN"), icon: Truck }
          ].map((item) => (
            <div className="rounded-2xl border border-[#d3e4fe] bg-white p-5 shadow-sm" key={item.label}>
              <item.icon className="text-[#006b32]" size={24} />
              <p className="mt-3 text-3xl font-extrabold">{item.value}</p>
              <p className="mt-1 text-sm font-semibold text-[#3e4a3f]">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              className="shrink-0 rounded-full border border-[#bdcabc] bg-white px-4 py-2 text-sm font-bold text-[#006b32]"
              key={category.name}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product, index) => {
            const discount = discountPercent(product);

            return (
              <article
                className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[#d3e4fe] transition hover:-translate-y-1 hover:shadow-xl"
                key={product.id}
              >
                <div className="relative aspect-square bg-[#d3e4fe]">
                  <ProductImage
                    alt={product.name}
                    category={product.category}
                    className="object-contain p-3"
                    src={product.image}
                  />
                  {discount ? (
                    <span className="absolute left-3 top-3 rounded bg-[#ba1a1a] px-2 py-1 text-[10px] font-bold text-white">
                      {discount}% OFF
                    </span>
                  ) : null}
                  {!product.inStock ? (
                    <span className="absolute right-3 top-3 rounded bg-[#213145] px-2 py-1 text-[10px] font-bold text-white">
                      OUT OF STOCK
                    </span>
                  ) : null}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-[10px] font-bold uppercase text-[#6e7a6e]">{product.brand}</p>
                    <span className="rounded bg-[#eff4ff] px-2 py-1 text-[10px] font-bold text-[#006b32]">
                      {product.category}
                    </span>
                  </div>
                  <h2 className="mt-2 line-clamp-2 min-h-10 text-sm font-semibold leading-5">{product.name}</h2>
                  <div className="mt-2 flex items-center gap-2 text-xs text-[#6e7a6e]">
                    <span className="flex items-center gap-1 text-[#006b32]">
                      <Star size={13} fill="currentColor" />
                      {(4.5 + (index % 5) / 10).toFixed(1)}
                    </span>
                    <span>AnimKart verified</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold">{formatINR(product.price)}</p>
                      {product.regularPrice && product.regularPrice > product.price ? (
                        <p className="text-xs font-semibold text-[#6e7a6e] line-through">
                          {formatINR(product.regularPrice)}
                        </p>
                      ) : null}
                    </div>
                    <button className="grid size-9 place-items-center rounded-lg bg-[#006b32] text-white">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
