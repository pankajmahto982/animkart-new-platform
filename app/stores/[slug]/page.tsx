import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, PackageCheck, Search, Share2, ShieldCheck, Star, Truck } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatINR, getSupplierStoreBySlug, getSupplierStores } from "@/lib/products";

type StorePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getSupplierStores(120).map((store) => ({ slug: store.slug }));
}

export async function generateMetadata({ params }: StorePageProps) {
  const { slug } = await params;
  const store = getSupplierStoreBySlug(slug);

  if (!store) {
    return { title: "Supplier Store | AnimKart" };
  }

  return {
    title: `${store.name} Store | AnimKart`,
    description: `Shop ${store.name} products on AnimKart.`
  };
}

export default async function StorePage({ params }: StorePageProps) {
  const { slug } = await params;
  const store = getSupplierStoreBySlug(slug);

  if (!store) {
    notFound();
  }

  const featured = store.products.filter((product) => product.image).slice(0, 8);
  const liveProducts = store.products.filter((product) => product.inStock);
  const heroProduct = featured[0] ?? store.products[0];

  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <SiteHeader />

      <section className="bg-[#071228] text-white">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <div className="grid size-20 place-items-center rounded-2xl bg-white text-3xl font-black text-[#1B6B3A] shadow">
              {store.name.slice(0, 1).toUpperCase()}
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">AnimKart verified supplier store</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">{store.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Public supplier storefront for verified animal health products, farm essentials, bulk buying and repeat procurement.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link className="rounded-lg bg-[#0B8F47] px-6 py-3 text-center font-bold text-white" href="#products">
                Shop products
              </Link>
              <Link className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-center font-bold text-white" href="/bulk-inquiry">
                Request bulk quote
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {heroProduct?.image ? (
              <Image alt={heroProduct.name} className="h-80 w-full object-contain bg-[#EDF7F1] p-8" height={420} src={heroProduct.image} width={520} priority />
            ) : (
              <div className="grid h-80 place-items-center text-slate-400">
                <PackageCheck size={54} />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="sticky top-[132px] z-30 border-b border-[#D1D1D1] bg-white shadow-sm">
        <div className="mx-auto grid max-w-[1280px] gap-3 px-4 py-3 sm:px-6 xl:grid-cols-[1fr_360px] xl:items-center">
          <div>
            <p className="text-sm font-bold">{store.name}</p>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {["Home", "Products", "Categories", "Bulk Quote", "About"].map((item) => (
                <Link
                  className="shrink-0 border-b-2 border-transparent px-3 py-2 text-sm font-bold uppercase tracking-wide text-[#3D3D3D] hover:border-[#1B6B3A] hover:text-[#1B6B3A]"
                  href={item === "Home" ? `/stores/${store.slug}` : `#${item.toLowerCase().replace(" ", "-")}`}
                  key={item}
                >
                  {item}
                </Link>
              ))}
              <button className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#D1D1D1] px-4 py-2 text-sm font-bold" type="button">
                <Heart size={17} />
                Follow
              </button>
              <button className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#D1D1D1] px-4 py-2 text-sm font-bold" type="button">
                <Share2 size={17} />
                Share
              </button>
            </div>
          </div>
          <div className="flex min-w-0 items-center rounded-lg border border-[#D1D1D1] bg-[#F5F5F5]">
            <Search className="ml-3 text-[#6B6B6B]" size={19} />
            <input className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none" placeholder={`Search all ${store.name}`} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { value: store.productCount.toLocaleString("en-IN"), label: "Total products", Icon: PackageCheck },
            { value: liveProducts.length.toLocaleString("en-IN"), label: "Live products", Icon: ShieldCheck },
            { value: formatINR(store.catalogValue), label: "Catalog value", Icon: Star },
            { value: "FOA ready", label: "Freight/Bulk", Icon: Truck }
          ].map(({ value, label, Icon }) => (
            <div className="rounded-xl border border-[#D1D1D1] bg-white p-5 shadow-sm" key={label}>
              <Icon className="text-[#1B6B3A]" size={22} />
              <p className="mt-3 text-2xl font-black">{value}</p>
              <p className="mt-1 text-sm font-semibold text-[#6B6B6B]">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="grid min-h-[360px] bg-[#0B8F47] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-8 text-white sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-100">Supplier spotlight</p>
              <h2 className="mt-4 max-w-xl text-4xl font-black leading-tight">Verified products for serious animal health procurement.</h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-white/80">
                Browse medicines, feed, supplements and care essentials from this supplier. Request wholesale quantities directly from AnimKart.
              </p>
              <Link className="mt-7 inline-flex rounded-lg bg-white px-5 py-3 font-bold text-[#0B8F47]" href="/bulk-inquiry">
                Submit bulk inquiry
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 bg-[#EDF7F1] p-4">
              {featured.slice(0, 4).map((product) => (
                <div className="rounded-xl bg-white p-4" key={product.id}>
                  <Image alt={product.name} className="h-32 w-full object-contain" height={150} src={product.image} width={220} />
                  <p className="mt-3 line-clamp-2 text-sm font-bold">{product.name}</p>
                  <p className="mt-1 text-sm font-black text-[#1B6B3A]">{formatINR(product.price)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-10" id="categories">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">Shop by category</p>
              <h2 className="mt-2 text-2xl font-bold">Collections from {store.name}</h2>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {store.categories.slice(0, 8).map((category) => (
              <Link className="rounded-xl border border-[#D1D1D1] bg-white p-5 shadow-sm hover:border-[#1B6B3A]" href={`/categories?type=${encodeURIComponent(category)}`} key={category}>
                <p className="font-bold">{category}</p>
                <p className="mt-2 text-sm text-[#6B6B6B]">
                  {store.products.filter((product) => product.category === category).length} products
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10" id="products">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">Store catalog</p>
              <h2 className="mt-2 text-2xl font-bold">Products from {store.name}</h2>
            </div>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {store.products.slice(0, 16).map((product, index) => (
              <ProductCard index={index} key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[#D1D1D1] bg-white p-6 shadow-sm" id="about">
          <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">About this supplier</p>
          <h2 className="mt-2 text-2xl font-bold">{store.name} on AnimKart</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#3D3D3D]">
            This public store is the buyer-facing profile for a verified AnimKart supplier. It helps farmers, pet parents, retailers and procurement teams discover products, compare categories and request bulk supply from one trusted place.
          </p>
        </section>
      </section>

      <SiteFooter />
    </main>
  );
}
