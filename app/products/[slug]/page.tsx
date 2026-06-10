import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ChevronLeft, Minus, Plus, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ProductImage } from "@/components/product-image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { discountPercent, formatINR, getProductBySlug, getRelatedProducts, products } from "@/lib/products";

export function generateStaticParams() {
  return products.slice(0, 120).map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const discount = discountPercent(product);
  const related = getRelatedProducts(product, 4);
  const galleryImages = Array.isArray(product.images)
    ? product.images
    : product.image
      ? [product.image]
      : [];

  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <SiteHeader />
      <section className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6">
        <Link className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1B6B3A]" href="/products">
          <ChevronLeft size={17} />
          Back to products
        </Link>
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-[#D1D1D1]">
            <div className="relative aspect-square rounded-lg bg-white">
              <ProductImage alt={product.name} category={product.category} src={product.image} />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {galleryImages.slice(0, 4).map((image) => (
                <div className="relative aspect-square rounded-lg border border-[#D1D1D1] bg-white" key={image}>
                  <ProductImage alt={product.name} category={product.category} src={image} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#D1D1D1] sm:p-6">
            <p className="text-xs font-bold uppercase text-[#1B6B3A]">{product.category}</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight">{product.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="flex items-center gap-1 rounded bg-[#EDF7F1] px-2 py-1 font-semibold text-[#1B6B3A]">
                <Star size={14} fill="currentColor" />
                4.8
              </span>
              <a className="text-[#1B6B3A]" href="#reviews">
                126 farmer reviews
              </a>
              <span className="text-[#6B6B6B]">Vendor: AnimKart verified supplier</span>
            </div>

            <div className="mt-6 border-y border-[#D1D1D1]/70 py-5">
              <div className="flex flex-wrap items-end gap-3">
                <p className="text-4xl font-bold">{formatINR(product.price)}</p>
                {product.regularPrice && product.regularPrice > product.price ? (
                  <p className="text-lg font-semibold text-[#6B6B6B] line-through">{formatINR(product.regularPrice)}</p>
                ) : null}
                {discount ? <span className="rounded bg-[#FEF3DC] px-2 py-1 text-sm font-bold">{discount}% saved</span> : null}
              </div>
              <p className="mt-2 text-sm text-[#6B6B6B]">Incl. GST. Tax invoice available at checkout.</p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { label: "In stock", icon: CheckCircle2 },
                { label: "MOQ checked", icon: ShieldCheck },
                { label: "Delivery estimate", icon: Truck }
              ].map((item) => (
                <div className="rounded-lg bg-[#F5F5F5] p-4" key={item.label}>
                  <item.icon className="text-[#1B6B3A]" size={22} />
                  <p className="mt-2 text-sm font-semibold">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex h-11 items-center rounded-lg border border-[#D1D1D1]">
                <button className="grid size-11 place-items-center" aria-label="Decrease quantity">
                  <Minus size={16} />
                </button>
                <span className="px-4 font-semibold">1</span>
                <button className="grid size-11 place-items-center" aria-label="Increase quantity">
                  <Plus size={16} />
                </button>
              </div>
              <Link className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#1B6B3A] px-5 font-semibold text-white" href="/cart">
                <ShoppingCart size={18} />
                Add to cart
              </Link>
              <Link className="inline-flex h-11 items-center rounded-lg border border-[#1B6B3A] px-5 font-semibold text-[#1B6B3A]" href="/checkout">
                Buy now
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.75fr]">
          <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#D1D1D1]">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="mt-3 leading-7 text-[#3D3D3D]">
              {product.description || product.shortDescription || "Verified AnimKart product imported from the WooCommerce catalog."}
            </p>
            <h3 className="mt-6 font-semibold">Specifications</h3>
            <div className="mt-3 grid gap-2 text-sm">
              {[
                ["Brand", product.brand],
                ["Generic name", product.genericName || "Animal healthcare product"],
                ["Net quantity", product.netQuantity || "As per product pack"],
                ["SKU", product.sku || product.id]
              ].map(([label, value]) => (
                <div className="grid grid-cols-[140px_1fr] rounded bg-[#F5F5F5] px-3 py-2" key={label}>
                  <span className="font-semibold text-[#6B6B6B]">{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#D1D1D1]" id="reviews">
            <h2 className="text-xl font-semibold">Shipping & reviews</h2>
            <div className="mt-4 grid gap-3 text-sm">
              <p className="rounded bg-[#EDF7F1] p-3 text-[#1B6B3A]">Delivery estimate shown after pincode check.</p>
              <p className="rounded bg-[#FEF3DC] p-3">Return/refund policy applies as per AnimKart supplier terms.</p>
              <p className="rounded bg-[#F5F5F5] p-3">4.8 rating from verified marketplace buyers.</p>
            </div>
          </section>
        </div>

        <section className="mt-8">
          <h2 className="mb-5 text-2xl font-semibold">Related products</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item, index) => (
              <ProductCard product={item} index={index} key={item.id} />
            ))}
          </div>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
