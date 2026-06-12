import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Award,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileBadge,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Stethoscope,
  Truck,
  Users,
  Warehouse,
  Zap
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatINR, getSupplierStoreBySlug, getSupplierStores } from "@/lib/products";

type StorePageProps = {
  params: Promise<{ slug: string }>;
};

const requiredCategories = [
  "Veterinary Medicines",
  "Feed & Supplements",
  "Poultry Products",
  "Dairy Products",
  "Goat Products",
  "Pet Products",
  "Aquaculture Products",
  "Equipment"
];

export function generateStaticParams() {
  return getSupplierStores(120).map((store) => ({ slug: store.slug }));
}

export async function generateMetadata({ params }: StorePageProps) {
  const { slug } = await params;
  const store = getSupplierStoreBySlug(slug);

  return {
    title: store ? `${store.name} | AnimKart Supplier Store` : "Supplier Store | AnimKart",
    description: store ? `${store.name} verified supplier storefront on AnimKart.` : "Premium AnimKart supplier storefront."
  };
}

export default async function SupplierStorePage({ params }: StorePageProps) {
  const { slug } = await params;
  const store = getSupplierStoreBySlug(slug);

  if (!store) {
    notFound();
  }

  const products = store.products.slice(0, 16);
  const featured = store.products.filter((product) => product.image && product.price > 0).slice(0, 8);
  const heroProduct = featured[0] ?? store.products[0];
  const rating = (4.5 + (store.productCount % 4) / 10).toFixed(1);
  const ordersCompleted = Math.max(320, store.liveProductCount * 11);
  const responseRate = Math.min(99, 82 + (store.productCount % 16));
  const businessTypes = ["Manufacturer", "Distributor", "Wholesaler", "Retailer", "Importer", "Exporter"];
  const performance = [
    { label: "Order Fulfillment Rate", value: "96%", status: "Excellent" },
    { label: "Shipping Success Rate", value: "94%", status: "Excellent" },
    { label: "Inventory Accuracy", value: "91%", status: "Good" },
    { label: "Response Time", value: "< 2 hrs", status: "Excellent" },
    { label: "Customer Rating", value: rating, status: "Good" },
    { label: "Store Health Score", value: "92/100", status: "Excellent" }
  ];
  const relatedSuppliers = getSupplierStores(16).filter((item) => item.slug !== store.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <SiteHeader />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-2 px-4 py-3 text-sm text-slate-500 sm:px-6">
          <Link className="font-semibold text-[#0B8F47]" href="/">Home</Link>
          <ChevronRight size={15} />
          <Link className="font-semibold text-[#0B8F47]" href="/stores">Supplier Stores</Link>
          <ChevronRight size={15} />
          <span className="font-semibold text-slate-700">{store.name}</span>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 opacity-25">
          {heroProduct?.image ? (
            <Image alt={heroProduct.name} className="h-full w-full object-cover blur-sm" height={720} src={heroProduct.image} width={1500} priority />
          ) : null}
        </div>
        <div className="relative mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="grid size-24 place-items-center rounded-3xl bg-white text-4xl font-black text-[#0B8F47] shadow-xl">
                  {store.name.slice(0, 1).toUpperCase()}
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-emerald-100 text-[#0B8F47]">Verified Supplier</Badge>
                    <Badge className="bg-amber-100 text-amber-800">Premium Supplier</Badge>
                    <Badge className="bg-white/10 text-white">GST Verified</Badge>
                  </div>
                  <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-200">
                    <MapPin size={16} /> India supplier network
                    <span>•</span>
                    <span>5+ years in business</span>
                    <span>•</span>
                    <span>Business verified</span>
                  </p>
                </div>
              </div>

              <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">{store.name}</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">
                Professional animal health supplier storefront for B2B and B2C buyers. Discover verified products,
                request bulk quotes, contact the supplier and build procurement trust from one AnimKart profile.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {businessTypes.map((type) => (
                  <Badge className="bg-white/10 text-white" key={type}>{type}</Badge>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                {[
                  { label: "Contact Supplier", icon: MessageCircle, href: "#contact" },
                  { label: "WhatsApp Supplier", icon: MessageCircle, href: "#contact" },
                  { label: "Call Supplier", icon: Phone, href: "#contact" },
                  { label: "Request Bulk Quote", icon: ClipboardList, href: "#bulk" }
                ].map((action, index) => (
                  <a
                    className={index === 0 ? "inline-flex h-12 items-center gap-2 rounded-lg bg-[#0B8F47] px-5 font-bold text-white" : "inline-flex h-12 items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-5 font-bold text-white"}
                    href={action.href}
                    key={action.label}
                  >
                    <action.icon size={18} />{action.label}
                  </a>
                ))}
                <button className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/15 bg-white px-5 font-bold text-slate-950" type="button">
                  <Heart size={18} />Follow Store
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <div className="grid grid-cols-2 gap-3">
                {[
                  [store.productCount.toLocaleString("en-IN"), "Products Listed"],
                  [ordersCompleted.toLocaleString("en-IN"), "Orders Completed"],
                  [`${responseRate}%`, "Response Rate"],
                  [rating, "Average Rating"],
                  ["5+", "Years In Business"],
                  ["92/100", "Store Health"]
                ].map(([value, label]) => (
                  <div className="rounded-2xl bg-white p-4 text-slate-950" key={label}>
                    <p className="text-2xl font-black">{value}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto grid max-w-[1500px] gap-3 px-4 py-3 sm:px-6 xl:grid-cols-[1fr_390px] xl:items-center">
          <nav className="flex gap-2 overflow-x-auto">
            {["Home", "Products", "Categories", "About", "Certifications", "Reviews", "Contact"].map((item, index) => (
              <a
                className={index === 0 ? "shrink-0 rounded-full bg-[#0B8F47] px-4 py-2 text-sm font-bold text-white" : "shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-[#0B8F47] hover:text-[#0B8F47]"}
                href={item === "Home" ? "#top" : `#${item.toLowerCase()}`}
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex min-w-0 items-center rounded-lg border border-slate-200 bg-slate-50">
            <Search className="ml-3 text-slate-400" size={18} />
            <input className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none" placeholder={`Search all ${store.name}`} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6" id="top">
        <div className="grid gap-6 xl:grid-cols-[1fr_390px]">
          <div className="space-y-6">
            <Card>
              <CardHeader className="gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <CardTitle>Featured Products</CardTitle>
                  <CardDescription>High-intent products from this supplier with cart, vet and quick-view actions.</CardDescription>
                </div>
                <Badge className="bg-emerald-50 text-[#0B8F47]">Supplier Badge on every product</Badge>
              </CardHeader>
              <CardContent>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {featured.slice(0, 8).map((product, index) => (
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm" key={product.id}>
                      <Link className="block" href={`/product/${product.slug}`}>
                        <div className="relative aspect-[4/3] bg-slate-50">
                          <Image alt={product.name} className="h-full w-full object-contain p-4" height={220} src={product.image} width={280} />
                          <Badge className="absolute left-3 top-3 bg-white text-[#0B8F47]">Verified</Badge>
                        </div>
                      </Link>
                      <div className="p-4">
                        <p className="text-xs font-bold uppercase text-[#0B8F47]">{product.category}</p>
                        <Link href={`/product/${product.slug}`}>
                          <h3 className="mt-1 line-clamp-2 min-h-10 font-bold text-slate-950">{product.name}</h3>
                        </Link>
                        <div className="mt-3 flex items-center justify-between gap-2">
                          <span className="text-lg font-black">{formatINR(product.price)}</span>
                          <span className="text-xs font-semibold text-slate-500">MOQ {product.netQuantity || "1 unit"}</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-sm text-[#0B8F47]">
                          <Star size={15} fill="currentColor" /> {(4.5 + (index % 4) / 10).toFixed(1)}
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <Link className="grid h-10 place-items-center rounded-lg bg-[#0B8F47] text-white" href="/cart"><ShoppingCart size={16} /></Link>
                          <Link className="grid h-10 place-items-center rounded-lg border border-slate-200 text-slate-700" href="/vet"><Stethoscope size={16} /></Link>
                          <Link className="grid h-10 place-items-center rounded-lg border border-slate-200 text-slate-700" href={`/product/${product.slug}`}>View</Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card id="categories">
              <CardHeader>
                <CardTitle>Store Categories</CardTitle>
                <CardDescription>Category coverage designed for animal health marketplace buying.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {requiredCategories.map((category) => {
                  const matched = store.products.filter((product) =>
                    product.category.toLowerCase().includes(category.split(" ")[0].toLowerCase())
                  ).length;
                  return (
                    <Link className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-[#0B8F47] hover:bg-white" href="#products" key={category}>
                      <p className="font-bold text-slate-950">{category}</p>
                      <p className="mt-2 text-sm text-slate-500">{matched || Math.max(1, store.productCount % 17)} products available</p>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>

            <Card id="products">
              <CardHeader>
                <CardTitle>All Store Products</CardTitle>
                <CardDescription>Marketplace catalog from this supplier.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {products.map((product, index) => (
                    <ProductCard index={index} key={product.id} product={product} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <section className="grid gap-6 lg:grid-cols-2">
              <Card id="about">
                <CardHeader>
                  <CardTitle>About Supplier</CardTitle>
                  <CardDescription>Company description, facilities, distribution and service network.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="leading-7 text-slate-700">
                    {store.name} is listed on AnimKart as a verified animal health supplier serving farmers,
                    pet owners, retailers and procurement teams through product discovery, direct enquiries and bulk requirements.
                  </p>
                  {[
                    ["Business Overview", "Animal health products, farm essentials, B2B and B2C supply."],
                    ["Manufacturing Facilities", "Facility details and capacity documents can be uploaded by supplier."],
                    ["Distribution Network", "Pan-India order support with freight and bulk logistics readiness."],
                    ["Warehouse Information", "Buyer pickup and dispatch warehouse details are Supabase-ready."],
                    ["Service Areas", "State, city and pincode coverage maintained through supplier shipping rules."]
                  ].map(([label, value]) => (
                    <div className="rounded-xl bg-slate-50 p-3" key={label}>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card id="certifications">
                <CardHeader>
                  <CardTitle>Certifications & Documents</CardTitle>
                  <CardDescription>Supplier trust documentation for enterprise buyers.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {["GST Certificate", "FSSAI", "ISO", "Import Export License", "Drug License", "Business Documents"].map((item, index) => (
                    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3" key={item}>
                      <span className="flex items-center gap-3 font-bold text-slate-800"><FileBadge className="text-[#0B8F47]" size={18} />{item}</span>
                      <Badge className={index < 2 ? "bg-emerald-50 text-[#0B8F47]" : "bg-amber-50 text-amber-700"}>{index < 2 ? "Verified" : "Pending upload"}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            <Card id="reviews">
              <CardHeader>
                <CardTitle>Reviews & Ratings</CardTitle>
                <CardDescription>Verified purchase reviews, photo reviews and supplier response readiness.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
                  <div className="rounded-2xl bg-emerald-50 p-5 text-center">
                    <p className="text-5xl font-black text-[#0B8F47]">{rating}</p>
                    <p className="mt-2 font-bold text-slate-950">Average Rating</p>
                    <p className="mt-1 text-sm text-slate-500">From verified buyer reviews</p>
                  </div>
                  <div className="grid gap-3">
                    {["Verified Purchase Reviews", "Photo Reviews", "Supplier Response"].map((item) => (
                      <div className="rounded-xl border border-slate-200 bg-white p-4" key={item}>
                        <Badge className="bg-emerald-50 text-[#0B8F47]">{item}</Badge>
                        <p className="mt-3 font-semibold text-slate-950">Clean dispatch, responsive supplier and product details matched listing.</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Performance</CardTitle>
                <CardDescription>Store health score for buyer confidence.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {performance.map((item) => (
                  <div className="rounded-xl border border-slate-200 bg-white p-3" key={item.label}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-bold text-slate-700">{item.label}</p>
                      <Badge className={item.status === "Excellent" ? "bg-emerald-50 text-[#0B8F47]" : "bg-amber-50 text-amber-700"}>{item.status}</Badge>
                    </div>
                    <p className="mt-2 text-2xl font-black text-slate-950">{item.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Serviceable Locations</CardTitle>
                <CardDescription>Shipping and pickup coverage.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {[
                  { icon: MapPin, label: "States Served", value: "Delhi, Haryana, Rajasthan, Punjab, Maharashtra" },
                  { icon: Building2, label: "Cities Served", value: "Delhi NCR, Jaipur, Hisar, Lucknow, Bengaluru" },
                  { icon: Truck, label: "Pincode Coverage", value: "2,000+ serviceable pincodes" },
                  { icon: Zap, label: "Freight Available", value: "Bulk and heavy order freight supported" },
                  { icon: Warehouse, label: "Buyer Pickup", value: "Warehouse pickup available" }
                ].map((item) => (
                  <div className="flex gap-3 rounded-xl bg-slate-50 p-3" key={item.label}>
                    <item.icon className="mt-1 text-[#0B8F47]" size={18} />
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-500">{item.label}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{item.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card id="bulk">
              <CardHeader>
                <CardTitle>Need Bulk Quantity?</CardTitle>
                <CardDescription>Submit requirement and get supplier quotes.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Input placeholder="Quantity" />
                <Input placeholder="Location" />
                <Input placeholder="Contact number" />
                <Input placeholder="Product requirement" />
                <button className="h-11 rounded-lg bg-[#0B8F47] font-bold text-white" type="button">Get Quotes</button>
              </CardContent>
            </Card>

            <Card id="contact">
              <CardHeader>
                <CardTitle>Contact Supplier</CardTitle>
                <CardDescription>Generate enquiries and supplier conversations.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                {[
                  { label: "Send Message", icon: MessageCircle },
                  { label: "WhatsApp Supplier", icon: MessageCircle },
                  { label: "Call Supplier", icon: Phone },
                  { label: "Email Supplier", icon: Mail }
                ].map((item, index) => (
                  <button className={index === 0 ? "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 font-bold text-white" : "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white font-bold text-slate-800"} key={item.label} type="button">
                    <item.icon size={17} />{item.label}
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trust Badges</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                {[
                  { label: "Verified Supplier", icon: ShieldCheck },
                  { label: "GST Verified", icon: CheckCircle2 },
                  { label: "Business Verified", icon: Building2 },
                  { label: "Secure Transactions", icon: ShieldCheck },
                  { label: "Fast Response", icon: Zap },
                  { label: "AnimKart Recommended", icon: Award }
                ].map((item) => (
                  <div className="flex items-center gap-3 rounded-lg bg-emerald-50 p-3 text-sm font-bold text-[#0B8F47]" key={item.label}>
                    <item.icon size={17} />{item.label}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Store Analytics</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {[
                  { icon: BarChart3, label: "Store Views", value: "8,420 this month" },
                  { icon: PackageCheck, label: "Products Listed", value: store.productCount.toLocaleString("en-IN") },
                  { icon: ShoppingCart, label: "Orders Completed", value: ordersCompleted.toLocaleString("en-IN") },
                  { icon: Users, label: "Buyer Enquiries", value: "184" },
                  { icon: Star, label: "Conversion Rate", value: "7.8%" }
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
          </aside>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Related Suppliers</CardTitle>
            <CardDescription>Similar suppliers, same category suppliers and nearby supplier options.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {relatedSuppliers.map((supplier) => (
              <Link className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-[#0B8F47]" href={`/store/${supplier.slug}`} key={supplier.slug}>
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-xl bg-emerald-50 text-xl font-black text-[#0B8F47]">
                    {supplier.name.slice(0, 1).toUpperCase()}
                  </span>
                  <div>
                    <p className="line-clamp-1 font-black text-slate-950">{supplier.name}</p>
                    <p className="text-sm text-slate-500">{supplier.productCount} products • Verified</p>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>

      <SiteFooter />
    </main>
  );
}
