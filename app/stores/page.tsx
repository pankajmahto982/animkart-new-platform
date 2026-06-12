import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageCheck, Search, ShieldCheck, Store, Truck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatINR, getSupplierStores } from "@/lib/products";

const stores = getSupplierStores(36);

export const metadata = {
  title: "Supplier Stores | AnimKart",
  description: "Browse public AnimKart supplier and brand stores."
};

export default function StoresPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <SiteHeader />
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">AnimKart supplier network</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight">Public brand and supplier stores</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#3D3D3D]">
              Like Amazon brand stores, each supplier gets a public storefront with catalog, categories, trust signals and bulk inquiry actions.
            </p>
          </div>
          <div className="rounded-xl bg-[#EDF7F1] p-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                [stores.length.toLocaleString("en-IN"), "Stores"],
                [stores.reduce((sum, store) => sum + store.productCount, 0).toLocaleString("en-IN"), "Products"],
                ["GST", "Ready"]
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
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-[#D1D1D1] bg-white p-4 shadow-sm sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center rounded-lg border border-[#D1D1D1] bg-[#F5F5F5]">
            <Search className="ml-3 text-[#6B6B6B]" size={18} />
            <input className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none" placeholder="Search suppliers, brands, feed, medicines..." />
          </div>
          <Link className="rounded-lg bg-[#1B6B3A] px-5 py-3 text-center text-sm font-semibold text-white" href="/supplier/register">
            Register your store
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {stores.map((store) => (
            <Link className="overflow-hidden rounded-xl border border-[#D1D1D1] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" href={`/store/${store.slug}`} key={store.slug}>
              <div className="relative h-44 bg-[#0B8F47]">
                {store.heroImage ? (
                  <Image alt={store.name} className="h-full w-full object-contain bg-[#EDF7F1] p-5" height={260} src={store.heroImage} width={420} />
                ) : (
                  <div className="grid h-full place-items-center text-white">
                    <Store size={44} />
                  </div>
                )}
                <div className="absolute left-4 top-4 grid size-14 place-items-center rounded-xl bg-white text-xl font-black text-[#1B6B3A] shadow">
                  {store.name.slice(0, 1).toUpperCase()}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="line-clamp-1 text-xl font-bold">{store.name}</h2>
                    <p className="mt-1 text-sm text-[#6B6B6B]">{store.tagline}</p>
                  </div>
                  <ArrowRight className="shrink-0 text-[#1B6B3A]" size={20} />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  {[
                    { value: store.productCount.toLocaleString("en-IN"), label: "Products", Icon: PackageCheck },
                    { value: store.liveProductCount.toLocaleString("en-IN"), label: "Live", Icon: ShieldCheck },
                    { value: formatINR(store.catalogValue), label: "Catalog", Icon: Truck }
                  ].map(({ value, label, Icon }) => (
                    <div className="rounded-lg bg-[#F5F5F5] p-3" key={label}>
                      <Icon className="mx-auto text-[#1B6B3A]" size={17} />
                      <p className="mt-1 text-sm font-bold">{value}</p>
                      <p className="text-[10px] font-semibold uppercase text-[#6B6B6B]">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2 overflow-hidden">
                  {store.categories.slice(0, 3).map((category) => (
                    <span className="shrink-0 rounded-full bg-[#EDF7F1] px-3 py-1 text-xs font-semibold text-[#1B6B3A]" key={category}>
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
