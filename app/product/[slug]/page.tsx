import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BarChart3,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Download,
  FileText,
  Heart,
  MessageCircle,
  Package,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Star,
  Stethoscope,
  Truck,
  Video,
  WalletCards,
  Zap
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ProductImage } from "@/components/product-image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { discountPercent, formatINR, getProductBySlug, getRelatedProducts, products, slugify } from "@/lib/products";

export function generateStaticParams() {
  return products.slice(0, 120).map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return {
    title: product ? `${product.name} | AnimKart` : "Product | AnimKart",
    description: product?.shortDescription || "AnimKart premium product detail page."
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const discount = discountPercent(product);
  const galleryImages = [...new Set([product.image, ...product.images].filter(Boolean))].slice(0, 5);
  const related = getRelatedProducts(product, 4);
  const similar = products
    .filter((item) => item.id !== product.id && item.category !== product.category && item.price > 0)
    .slice(0, 4);
  const supplierName = product.brand || "AnimKart Verified Supplier";
  const supplierSlug = slugify(supplierName);
  const moq = product.netQuantity || (product.category.toLowerCase().includes("feed") ? "10 bags" : "1 unit");
  const expiry = product.category.toLowerCase().includes("feed") ? "9-12 months shelf life" : "As per batch label";
  const stockStatus = product.inStock ? "In Stock" : "Confirm Availability";
  const shippingCharge = product.weightKg || product.category.toLowerCase().includes("feed") ? "Freight on Actual" : "₹80 - ₹180";

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <SiteHeader />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-2 px-4 py-3 text-sm text-slate-500 sm:px-6">
          <Link className="font-semibold text-[#0B8F47]" href="/">Home</Link>
          <ChevronRight size={15} />
          <Link className="font-semibold text-[#0B8F47]" href="/products">Products</Link>
          <ChevronRight size={15} />
          <span className="font-semibold text-slate-700">{product.category}</span>
          <ChevronRight size={15} />
          <span className="line-clamp-1 max-w-[520px]">{product.name}</span>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6">
        <div className="grid gap-6 xl:grid-cols-[420px_1fr_360px]">
          <aside className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="group relative aspect-square overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
                  <ProductImage alt={product.name} category={product.category} className="transition duration-300 group-hover:scale-110" src={product.image} />
                  <Badge className="absolute left-3 top-3 bg-white text-[#0B8F47] shadow-sm">Hover zoom</Badge>
                </div>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {galleryImages.map((image, index) => (
                    <div className="relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-white" key={`${image}-${index}`}>
                      <ProductImage alt={product.name} category={product.category} src={image} />
                    </div>
                  ))}
                  <div className="grid aspect-square place-items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-500">
                    <Video size={20} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Documents</CardTitle>
                <CardDescription>Download specs, COA, label and safety documents.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                {["Product brochure", "Technical specification", "Batch / expiry document"].map((item) => (
                  <button className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-left text-sm font-semibold text-slate-700" key={item} type="button">
                    <span className="flex items-center gap-2"><FileText size={16} />{item}</span>
                    <Download size={16} />
                  </button>
                ))}
              </CardContent>
            </Card>
          </aside>

          <section className="space-y-5">
            <Card>
              <CardContent className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{product.category}</Badge>
                  <Badge className="bg-slate-100 text-slate-700">SKU: {product.sku || product.id}</Badge>
                  <Badge className="bg-emerald-50 text-[#0B8F47]">{stockStatus}</Badge>
                </div>

                <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl">{product.name}</h1>
                <p className="mt-3 text-base font-semibold text-slate-600">Brand: <span className="text-[#0B8F47]">{supplierName}</span></p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-[#0B8F47] px-2.5 py-1 text-sm font-bold text-white">
                    <Star size={15} fill="currentColor" />4.8
                  </span>
                  <a className="text-sm font-semibold text-[#0B8F47]" href="#reviews">216 verified reviews</a>
                  <span className="text-sm text-slate-500">1,240 product views this week</span>
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#0B8F47]">Price</p>
                  <div className="mt-2 flex flex-wrap items-end gap-3">
                    <p className="text-4xl font-black text-slate-950">{formatINR(product.price)}</p>
                    {product.regularPrice && product.regularPrice > product.price ? (
                      <p className="pb-1 text-lg font-semibold text-slate-500 line-through">{formatINR(product.regularPrice)}</p>
                    ) : null}
                    {discount ? <Badge className="bg-amber-50 text-amber-700">{discount}% off</Badge> : null}
                  </div>
                  <p className="mt-2 text-sm text-slate-600">Inclusive of GST where applicable. GST invoice available for business buyers.</p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ["MOQ", moq],
                    ["Expiry Date", expiry],
                    ["Country Of Origin", "India"]
                  ].map(([label, value]) => (
                    <div className="rounded-xl bg-slate-50 p-3" key={label}>
                      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
                      <p className="mt-1 text-sm font-bold text-slate-950">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: Truck, label: "Shipping Charge", value: shippingCharge },
                    { icon: Package, label: "Delivery Estimate", value: "2-6 days after supplier confirmation" },
                    { icon: ShieldCheck, label: "Supplier Location", value: "Pan-India verified supplier network" },
                    { icon: CheckCircle2, label: "Buyer Pickup", value: "Available for selected warehouses" }
                  ].map((item) => (
                    <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3" key={item.label}>
                      <item.icon className="mt-1 text-[#0B8F47]" size={18} />
                      <div>
                        <p className="text-xs font-bold uppercase text-slate-500">{item.label}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <Link className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0B8F47] px-4 font-bold text-white shadow-sm hover:bg-[#08783c]" href="/cart">
                    <ShoppingCart size={18} />Add To Cart
                  </Link>
                  <Link className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 font-bold text-white hover:bg-slate-800" href="/checkout">
                    <Zap size={18} />Buy Now
                  </Link>
                  <a className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#0B8F47] bg-white px-4 font-bold text-[#0B8F47]" href="#bulk-quote">
                    <ClipboardList size={18} />Bulk Quote
                  </a>
                  <Link className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 font-bold text-slate-800" href="/vet">
                    <Stethoscope size={18} />Ask Vet
                  </Link>
                  <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 font-bold text-slate-800" type="button">
                    <Heart size={18} />Wishlist
                  </button>
                  <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 font-bold text-slate-800" type="button">
                    <Scale size={18} />Compare
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>Description, benefits, ingredients, dosage, usage, specifications and shipping terms.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 overflow-x-auto pb-3">
                  {["Description", "Benefits", "Ingredients", "Dosage", "Usage Instructions", "Technical Specifications", "Shipping Information", "Reviews & Ratings", "Related Documents"].map((tab, index) => (
                    <Badge className={index === 0 ? "shrink-0 bg-[#0B8F47] text-white" : "shrink-0 bg-slate-100 text-slate-700"} key={tab}>{tab}</Badge>
                  ))}
                </div>
                <div className="mt-2 rounded-xl bg-slate-50 p-4 leading-7 text-slate-700">
                  {product.description || product.shortDescription || "Verified AnimKart product imported from the WooCommerce catalog."}
                </div>
                <div className="mt-4 grid gap-2 text-sm">
                  {[
                    ["Generic Name", product.genericName || "Animal healthcare product"],
                    ["Net Quantity", product.netQuantity || "As per product pack"],
                    ["Weight", product.weightKg || "As per supplier listing"],
                    ["Source", product.source || "AnimKart supplier catalog"]
                  ].map(([label, value]) => (
                    <div className="grid gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-slate-200 sm:grid-cols-[180px_1fr]" key={label}>
                      <span className="font-bold text-slate-500">{label}</span>
                      <span className="font-semibold text-slate-900">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-5">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Information</CardTitle>
                <CardDescription>Alibaba-style trust card for supplier verification.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <span className="grid size-14 place-items-center rounded-2xl bg-emerald-50 text-2xl font-black text-[#0B8F47]">
                    {supplierName.slice(0, 1).toUpperCase()}
                  </span>
                  <div>
                    <p className="font-black text-slate-950">{supplierName}</p>
                    <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-[#0B8F47]"><ShieldCheck size={15} />Verified Supplier</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    ["Rating", "4.7/5"],
                    ["Location", "India"],
                    ["Years", "5+ years"],
                    ["Products", "120+"]
                  ].map(([label, value]) => (
                    <div className="rounded-lg bg-slate-50 p-3" key={label}>
                      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
                      <p className="mt-1 font-black text-slate-950">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-2">
                  <Link className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0B8F47] font-bold text-white" href={`/stores/${supplierSlug}`}>Visit Store</Link>
                  <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white font-bold text-slate-800" type="button"><MessageCircle size={17} />Contact Supplier</button>
                  <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 font-bold text-[#0B8F47]" type="button">WhatsApp Supplier</button>
                </div>
              </CardContent>
            </Card>

            <Card id="bulk-quote">
              <CardHeader>
                <CardTitle>Bulk Inquiry</CardTitle>
                <CardDescription>Get supplier quotes for farms, distributors and institutions.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Input placeholder="Quantity required" />
                <Input placeholder="Delivery location" />
                <Input placeholder="Phone number" />
                <button className="h-11 rounded-lg bg-slate-950 font-bold text-white" type="button">Get Supplier Quotes</button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Expert Advice?</CardTitle>
                <CardDescription>AnimKart vet assistance for correct product usage.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {["Book Vet Consultation", "Upload Symptoms", "Ask Vet About Product"].map((item) => (
                  <Link className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white font-bold text-slate-800" href="/vet" key={item}>
                    <Stethoscope size={17} />{item}
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trust Badges</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                {[
                  ["Verified Supplier", ShieldCheck],
                  ["Authentic Product", CheckCircle2],
                  ["GST Invoice", FileText],
                  ["Secure Payment", WalletCards],
                  ["Buyer Protection", ShieldCheck]
                ].map(([label, Icon]) => (
                  <div className="flex items-center gap-3 rounded-lg bg-emerald-50 p-3 text-sm font-bold text-[#0B8F47]" key={label as string}>
                    <Icon size={17} />{label as string}
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
          <Card id="reviews">
            <CardHeader>
              <CardTitle>Reviews & Ratings</CardTitle>
              <CardDescription>Customer reviews, verified purchases and photo review readiness.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
                <div className="rounded-2xl bg-emerald-50 p-5 text-center">
                  <p className="text-5xl font-black text-[#0B8F47]">4.8</p>
                  <p className="mt-2 font-bold text-slate-950">216 reviews</p>
                  <p className="mt-1 text-sm text-slate-500">Verified marketplace buyers</p>
                </div>
                <div className="grid gap-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div className="grid grid-cols-[52px_1fr_42px] items-center gap-3" key={rating}>
                      <span className="text-sm font-bold">{rating} star</span>
                      <span className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <span className="block h-full rounded-full bg-[#0B8F47]" style={{ width: `${rating === 5 ? 72 : rating === 4 ? 18 : 4}%` }} />
                      </span>
                      <span className="text-right text-sm text-slate-500">{rating === 5 ? "72%" : rating === 4 ? "18%" : "4%"}</span>
                    </div>
                  ))}
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <Badge className="bg-emerald-50 text-[#0B8F47]">Verified Purchase</Badge>
                    <p className="mt-3 font-semibold text-slate-950">Good packaging and supplier confirmation was quick.</p>
                    <p className="mt-1 text-sm text-slate-500">Photo reviews and farm usage notes can plug into Supabase storage later.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Analytics</CardTitle>
              <CardDescription>Conversion signals for buyer confidence.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {[
                { icon: BarChart3, label: "Product Views", value: "1,240 this week" },
                { icon: ShoppingCart, label: "Orders Count", value: "318 marketplace orders" },
                { icon: Star, label: "Popularity Score", value: "92 / 100" },
                { icon: Package, label: "Recommended Products", value: `${related.length + similar.length} alternatives` }
              ].map((item) => (
                <div className="flex gap-3 rounded-xl bg-slate-50 p-3" key={item.label}>
                  <item.icon className="mt-1 text-[#0B8F47]" size={18} />
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500">{item.label}</p>
                    <p className="mt-1 font-black text-slate-950">{item.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Frequently Bought Together</h2>
              <p className="mt-1 text-sm text-slate-500">Related products from the same category for one-click add to cart.</p>
            </div>
            <Link className="inline-flex h-10 items-center rounded-lg bg-[#0B8F47] px-4 font-bold text-white" href="/cart">Add Bundle To Cart</Link>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((item, index) => <ProductCard product={item} index={index} key={item.id} />)}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-2xl font-black text-slate-950">Similar Products</h2>
          <p className="mt-1 text-sm text-slate-500">Alternative brands, cheaper alternatives and premium alternatives.</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {similar.map((item, index) => <ProductCard product={item} index={index} key={item.id} />)}
          </div>
        </section>
      </section>

      <SiteFooter />
    </main>
  );
}
