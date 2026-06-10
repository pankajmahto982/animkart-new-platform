import Link from "next/link";
import { PackageCheck, Search, ShieldCheck, SlidersHorizontal, Truck } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getTopCategories, products } from "@/lib/products";

const visibleProducts = products.slice(0, 96);
const categories = getTopCategories(12);

export const metadata = {
  title: "Products | AnimKart",
  description: "Browse AnimKart medicines, feed, supplements and animal healthcare products."
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <SiteHeader />

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">AnimKart catalog</p>
            <h1 className="mt-2 text-4xl font-bold leading-tight">Shop verified animal health products</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#3D3D3D]">
              Medicines, feed, supplements, pet care and veterinary essentials imported from the current AnimKart catalog.
            </p>
          </div>
          <div className="rounded-xl bg-[#EDF7F1] p-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                [products.length.toLocaleString("en-IN"), "Products"],
                [categories.length, "Categories"],
                ["GST", "Billing"]
              ].map(([value, label]) => (
                <div className="rounded-lg bg-white p-3" key={label}>
                  <p className="text-xl font-bold text-[#1B6B3A]">{value}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase text-[#6B6B6B]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Authentic products", value: "Verified listings", icon: PackageCheck },
            { label: "Farmer support", value: "Vet and bulk help", icon: ShieldCheck },
            { label: "Delivery ready", value: "PIN-based dispatch", icon: Truck }
          ].map((item) => (
            <div className="rounded-lg border border-[#D1D1D1] bg-white p-5 shadow-sm" key={item.label}>
              <item.icon className="text-[#1B6B3A]" size={24} />
              <p className="mt-3 font-semibold">{item.label}</p>
              <p className="mt-1 text-sm text-[#6B6B6B]">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-xl border border-[#D1D1D1] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="text-[#1B6B3A]" size={20} />
              <h2 className="font-semibold">Filter catalog</h2>
            </div>
            <div className="mt-5 grid gap-2">
              <Link className="rounded-lg bg-[#1B6B3A] px-3 py-2 text-sm font-semibold text-white" href="/products">
                All products
              </Link>
              {categories.map((category) => (
                <Link
                  className="rounded-lg border border-[#D1D1D1] px-3 py-2 text-sm font-semibold text-[#3D3D3D] hover:border-[#1B6B3A] hover:text-[#1B6B3A]"
                  href={`/categories?type=${encodeURIComponent(category.name)}`}
                  key={category.name}
                >
                  {category.name} ({category.count})
                </Link>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-[#FEF3DC] p-4 text-sm">
              <p className="font-semibold">Need wholesale quantity?</p>
              <p className="mt-1 text-[#6B6B6B]">Submit a bulk inquiry for feed bags, boxes and recurring farm supply.</p>
              <Link className="mt-3 inline-flex font-semibold text-[#1B6B3A]" href="/bulk-inquiry">
                Request quote
              </Link>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-col gap-3 rounded-xl border border-[#D1D1D1] bg-white p-4 shadow-sm sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center rounded-lg border border-[#D1D1D1] bg-[#F5F5F5]">
                <Search className="ml-3 text-[#6B6B6B]" size={18} />
                <input
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"
                  placeholder="Search cattle feed, dog food, veterinary..."
                />
              </div>
              <Link className="rounded-lg bg-[#1B6B3A] px-5 py-3 text-center text-sm font-semibold text-white" href="/categories">
                Browse categories
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibleProducts.map((product, index) => (
                <ProductCard index={index} key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
