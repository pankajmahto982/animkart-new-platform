import Image from "next/image";
import {
  Bell,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Egg,
  HeartPulse,
  LockKeyhole,
  MapPin,
  Menu,
  Milk,
  PackageCheck,
  PawPrint,
  Pill,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Star,
  Store,
  Truck,
  Wheat
} from "lucide-react";
import { discountPercent, formatINR, getFeaturedProducts, products as importedProducts } from "@/lib/products";

const navItems = ["Medicines", "Feed", "Poultry", "Dairy", "Pet Care", "Equipment"];

const trustItems = [
  { label: "Verified Suppliers", icon: ShieldCheck },
  { label: "Authentic Products", icon: PackageCheck },
  { label: "Secure Payments", icon: LockKeyhole },
  { label: "Fast Delivery", icon: Truck },
  { label: "GST Billing", icon: BookOpen },
  { label: "Expert Support", icon: HeartPulse }
];

const categories = [
  { name: "Medicines", icon: Pill },
  { name: "Feed", icon: Wheat },
  { name: "Poultry", icon: Egg },
  { name: "Dairy", icon: Milk },
  { name: "Pet Care", icon: PawPrint },
  { name: "Equipment", icon: Sprout }
];

const homepageProducts = getFeaturedProducts(8);

const categoryTabs = [
  "All Products",
  "Animal Healthcare",
  "Animal Feed",
  "Animal feed supplement",
  "Veterinary",
  "Poultry Feed",
  "Dog Food",
  "Cat"
];

const tabPreviewProducts = categoryTabs.slice(1, 7).flatMap((category) =>
  importedProducts.filter((product) => product.category === category).slice(0, 2)
);

const farmerAssurance = [
  {
    title: "Verified supply for farms",
    text: "Every listed product is mapped from the current AnimKart catalog with price, brand and image checks.",
    icon: ShieldCheck
  },
  {
    title: "Bulk quote ready",
    text: "Large orders can move to quote confirmation so farmers know freight and MOQ before payment.",
    icon: Truck
  },
  {
    title: "Vet-first buying",
    text: "Health products are supported by consultation flows for poultry, dairy, pets and aquaculture.",
    icon: HeartPulse
  }
];

const brands = ["Virbac", "Intas", "MSD", "Bayer", "Vetoquinol", "Zydus", "Godrej", "Amul"];

const articles = [
  {
    label: "Vaccination",
    title: "Optimizing Poultry Immunity: 2024 Vaccination Guide",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=700&q=85"
  },
  {
    label: "Nutrition",
    title: "Mineral Deficiencies in High-Yield Dairy Cattle",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=700&q=85"
  },
  {
    label: "Biosecurity",
    title: "Implementing Tier-1 Hygiene Standards on Local Farms",
    image:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=700&q=85"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
      <header className="sticky top-0 z-50 bg-white/88 shadow-[0_8px_30px_rgba(11,28,48,0.08)] backdrop-blur-xl">
        <div className="hidden border-b border-[#d7e2d4] bg-[#eff4ff]/70 md:block">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-2 text-xs font-semibold text-[#3e4a3f]">
            <div className="flex items-center gap-6">
              <a className="flex items-center gap-1 hover:text-[#006b32]" href="#">
                <BookOpen size={15} />
                Help
              </a>
              <a className="flex items-center gap-1 hover:text-[#006b32]" href="#supplier">
                <Truck size={15} />
                Bulk Inquiry
              </a>
              <a className="flex items-center gap-1 hover:text-[#006b32]" href="#supplier">
                <Store size={15} />
                Sell
              </a>
            </div>
            <div className="flex items-center gap-6">
              <a className="flex items-center gap-1 hover:text-[#006b32]" href="#vet">
                <HeartPulse size={15} />
                Vet Consultation
              </a>
              <a className="flex items-center gap-1 hover:text-[#006b32]" href="#">
                <Truck size={15} />
                Track Order
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-3 sm:px-6">
          <a className="flex shrink-0 items-center gap-2" href="#">
            <span className="grid size-10 place-items-center rounded bg-[#006b32] text-lg font-black text-white">
              A
            </span>
            <span>
              <span className="block text-lg font-extrabold leading-5">AnimKart</span>
              <span className="hidden text-[10px] font-bold uppercase text-[#006b32] sm:block">
                India&apos;s Largest Animal Health Marketplace
              </span>
            </span>
          </a>

          <div className="hidden min-w-0 flex-1 items-center overflow-hidden rounded-lg border border-[#bdcabc]/70 bg-[#e5eeff] focus-within:border-[#006b32] lg:flex">
            <Search className="ml-4 text-[#3e4a3f]" size={19} />
            <input
              className="min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-sm font-medium outline-none"
              placeholder="Search Products, Suppliers, Brands, or Articles..."
            />
            <button className="bg-[#006b32] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[#008741]">
              SEARCH
            </button>
          </div>

          <div className="ml-auto hidden items-center gap-2 text-[#3e4a3f] lg:flex">
            <MapPin size={20} />
            <div className="leading-tight">
              <p className="text-[10px] font-black uppercase">Deliver to</p>
              <p className="text-xs font-bold text-[#0b1c30]">Bengaluru 560001</p>
            </div>
          </div>

          <button className="hidden text-[#3e4a3f] hover:text-[#006b32] sm:block" aria-label="Notifications">
            <Bell size={23} />
          </button>
          <button className="relative text-[#3e4a3f] hover:text-[#006b32]" aria-label="Cart">
            <ShoppingCart size={25} />
            <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-[#ba1a1a] text-[10px] font-bold text-white">
              3
            </span>
          </button>
          <div className="hidden items-center gap-2 border-l border-[#bdcabc] pl-4 md:flex">
            <button className="text-xs font-bold text-[#006b32]">Login</button>
            <button className="rounded-lg bg-[#006b32] px-4 py-2 text-xs font-bold text-white shadow-sm">
              Register
            </button>
          </div>
          <button className="md:hidden" aria-label="Open menu">
            <Menu />
          </button>
        </div>

        <nav className="border-t border-[#bdcabc]/30 bg-white/65">
          <div className="mx-auto flex max-w-[1440px] gap-8 overflow-x-auto px-4 py-2 text-xs font-bold text-[#3e4a3f] sm:px-6">
            {navItems.map((item, index) => (
              <a
                className={index === 0 ? "border-b-2 border-[#006b32] py-1 text-[#006b32]" : "py-1 hover:text-[#006b32]"}
                href="/products"
                key={item}
              >
                {item}
              </a>
            ))}
            <a className="flex items-center gap-1 py-1 hover:text-[#006b32]" href="/products">
              Offers <span className="rounded bg-[#ffdad6] px-1.5 py-0.5 text-[10px] text-[#93000a]">HOT</span>
            </a>
          </div>
        </nav>
      </header>

      <section className="relative min-h-[590px] overflow-hidden">
        <Image
          alt="Animal health marketplace farm hero"
          className="absolute inset-0 h-full w-full object-cover"
          fill
          priority
          sizes="100vw"
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1800&q=90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c30]/88 via-[#0b1c30]/52 to-transparent" />
        <div className="relative mx-auto flex min-h-[590px] max-w-[1440px] items-center px-4 py-12 sm:px-6">
          <div className="max-w-2xl text-white">
            <p className="mb-4 text-sm font-semibold text-[#d3e4fe]">AnimKart</p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              India&apos;s Largest Animal Health Marketplace
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#f8f9ff]/88 sm:text-lg">
              Bridging the gap between pharmaceutical expertise and livestock management. Get verified
              medicines, feed, and expert consultations in one place.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a className="rounded-xl bg-[#006b32] px-7 py-4 text-center text-base font-bold text-white shadow-lg transition hover:bg-[#008741]" href="/products">
                Shop Products
              </a>
              <a className="rounded-xl border border-white/35 bg-white/72 px-7 py-4 text-center text-base font-bold text-[#0b1c30] backdrop-blur-xl transition hover:bg-white" href="#vet">
                Book Vet
              </a>
            </div>
          </div>

          <div className="absolute bottom-6 right-4 hidden w-[330px] rounded-2xl border border-white/45 bg-white/72 p-6 shadow-2xl backdrop-blur-2xl md:block lg:right-8 lg:top-1/2 lg:-translate-y-1/2">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold text-[#0b1c30]">Book Expert Vet</h2>
              <span className="rounded bg-[#008741] px-2 py-1 text-xs font-bold text-white">Online Now</span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Poultry Experts", icon: Egg },
                { label: "Aquaculture", icon: Droplets },
                { label: "Pet Consultants", icon: PawPrint }
              ].map((item) => (
                <button
                  className="flex w-full items-center justify-between rounded-xl border border-[#bdcabc]/60 p-3 text-left transition hover:bg-[#006b32]/10"
                  key={item.label}
                >
                  <span className="flex items-center gap-3 font-medium text-[#0b1c30]">
                    <item.icon className="text-[#006b32]" size={20} />
                    {item.label}
                  </span>
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
            <button className="mt-5 w-full rounded-lg bg-[#0b1c30] py-3 text-xs font-bold text-white">
              View All Specialists
            </button>
          </div>
        </div>
      </section>

      <section className="border-y border-[#bdcabc]/40 bg-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:grid-cols-6">
          {trustItems.map((item) => (
            <div className="flex flex-col items-center gap-2 text-center" key={item.label}>
              <item.icon className="text-[#006b32]" size={26} />
              <p className="text-xs font-semibold text-[#0b1c30]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6" id="catalog">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#006b32]">
              Browse by animal
            </p>
            <h2 className="text-3xl font-semibold text-[#0b1c30]">Comprehensive Healthcare</h2>
          </div>
          <a className="hidden text-sm font-semibold text-[#006b32] sm:block" href="/products">
            View Full Catalog ({importedProducts.length})
          </a>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <button className="rounded-2xl border border-[#d3e4fe] bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl" key={category.name}>
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#e5eeff] text-[#006b32]">
                <category.icon size={22} />
              </span>
              <span className="mt-4 block font-semibold">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-14 sm:px-6">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#0b1c30]">Bestselling Healthcare Essentials</h2>
          <div className="hidden gap-2 sm:flex">
            <button className="grid size-8 place-items-center rounded-full border border-[#bdcabc] bg-white">
              <ChevronLeft size={17} />
            </button>
            <button className="grid size-8 place-items-center rounded-full border border-[#bdcabc] bg-white">
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homepageProducts.map((product, index) => {
            const discount = discountPercent(product);

            return (
            <article className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[#d3e4fe] transition hover:-translate-y-1 hover:shadow-xl" key={product.name}>
              <div className="relative aspect-square bg-[#d3e4fe]">
                <Image alt={product.name} className="object-cover" fill sizes="(min-width: 1024px) 25vw, 50vw" src={product.image} />
                {discount ? (
                  <span className="absolute left-3 top-3 rounded bg-[#ba1a1a] px-2 py-1 text-[10px] font-bold text-white">
                    {discount}% OFF
                  </span>
                ) : null}
              </div>
              <div className="p-4">
                <p className="text-[10px] font-bold uppercase text-[#6e7a6e]">{product.brand}</p>
                <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold text-[#0b1c30]">{product.name}</h3>
                <div className="mt-2 flex items-center gap-2 text-xs text-[#6e7a6e]">
                  <span className="flex items-center gap-1 text-[#006b32]">
                    <Star size={13} fill="currentColor" />
                    {(4.6 + (index % 4) / 10).toFixed(1)}
                  </span>
                  <span>({96 + index * 37} Reviews)</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-[#0b1c30]">{formatINR(product.price)}</p>
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
        <div className="mt-8 text-center">
          <a
            className="inline-flex items-center justify-center rounded-xl bg-[#006b32] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#008741]"
            href="/products"
          >
            View all {importedProducts.length} imported products
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6">
        <div className="rounded-3xl border border-[#d3e4fe] bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#006b32]">
                Product categories
              </p>
              <h2 className="text-3xl font-semibold text-[#0b1c30]">Choose by farm need</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#3e4a3f]">
                Farmers can quickly compare medicine, feed, supplements and veterinary essentials before
                moving to checkout or bulk quote.
              </p>
            </div>
            <a className="text-sm font-bold text-[#006b32]" href="/products">
              Open full catalog
            </a>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {categoryTabs.map((tab, index) => (
              <a
                className={
                  index === 0
                    ? "shrink-0 rounded-full bg-[#006b32] px-5 py-2.5 text-sm font-bold text-white"
                    : "shrink-0 rounded-full border border-[#bdcabc] bg-[#f8f9ff] px-5 py-2.5 text-sm font-bold text-[#006b32]"
                }
                href="/products"
                key={tab}
              >
                {tab}
              </a>
            ))}
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tabPreviewProducts.slice(0, 8).map((product, index) => {
              const discount = discountPercent(product);

              return (
                <article
                  className="grid grid-cols-[94px_1fr] overflow-hidden rounded-2xl border border-[#d3e4fe] bg-[#f8f9ff] transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                  key={`${product.id}-${index}`}
                >
                  <div className="relative min-h-28 bg-[#e5eeff]">
                    <Image
                      alt={product.name}
                      className="object-cover"
                      fill
                      sizes="96px"
                      src={product.image}
                    />
                  </div>
                  <div className="p-3">
                    <p className="truncate text-[10px] font-bold uppercase text-[#006b32]">
                      {product.category}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-5">{product.name}</h3>
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-sm font-extrabold">{formatINR(product.price)}</p>
                        {discount ? (
                          <p className="text-[10px] font-bold text-[#ba1a1a]">{discount}% saved</p>
                        ) : null}
                      </div>
                      <button className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#006b32] text-white">
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6" id="supplier">
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-[#d3e4fe] lg:grid lg:grid-cols-[1.25fr_0.85fr]">
          <div className="bg-[#071a2f] p-8 text-white sm:p-12">
            <h2 className="text-3xl font-extrabold">B2B Bulk Requirements?</h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-white/78">
              Dedicated supply chain solutions for large-scale farms, clinics, and retail distributors.
              Get wholesale pricing and GST-ready invoicing.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                { title: "Doorstep", text: "Pan-India Dispatch", icon: Truck },
                { title: "Credit", text: "Facilitated Billing", icon: ShieldCheck }
              ].map((item) => (
                <div className="flex items-center gap-3" key={item.title}>
                  <span className="grid size-10 place-items-center rounded-lg bg-[#006b32]/30 text-[#6ddd8b]">
                    <item.icon size={20} />
                  </span>
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-xs text-white/62">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form className="bg-[#dce9ff] p-8 sm:p-10">
            <h3 className="mb-5 text-lg font-semibold">Submit Bulk Inquiry</h3>
            <label className="mb-1 block text-[10px] font-bold uppercase text-[#3e4a3f]">Product / Category</label>
            <input className="mb-4 w-full rounded border border-[#bdcabc] bg-white px-3 py-2 text-sm" placeholder="e.g. Broiler Feed 50kg Bags" />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-[#3e4a3f]">Quantity</label>
                <input className="w-full rounded border border-[#bdcabc] bg-white px-3 py-2 text-sm" placeholder="e.g. 500" />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase text-[#3e4a3f]">Unit</label>
                <select className="w-full rounded border border-[#bdcabc] bg-white px-3 py-2 text-sm">
                  <option>Kilograms</option>
                  <option>Bags</option>
                  <option>Boxes</option>
                </select>
              </div>
            </div>
            <label className="mb-1 mt-4 block text-[10px] font-bold uppercase text-[#3e4a3f]">Delivery Location</label>
            <input className="w-full rounded border border-[#bdcabc] bg-white px-3 py-2 text-sm" placeholder="PIN Code or City" />
            <button className="mt-5 w-full rounded-lg bg-[#006b32] py-3 text-sm font-bold text-white">
              Get Custom Quote
            </button>
          </form>
        </div>
      </section>

      <section className="bg-[#006b32] py-10 text-white">
        <div className="mx-auto grid max-w-[1100px] gap-8 px-4 text-center sm:grid-cols-3">
          {[
            ["10,000+", "Indian Farmers Empowered"],
            ["2,000+", "Verified Manufacturers"],
            ["50,000+", "Healthcare Products"]
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-4xl font-extrabold">{value}</p>
              <p className="mt-1 text-sm text-white/82">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 text-center sm:px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#6e7a6e]">
          Trusted manufacturing partners
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-x-14 gap-y-5 text-sm font-semibold text-[#3e4a3f]">
          {brands.map((brand) => (
            <span key={brand}>{brand}</span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#006b32]">
              Expertise & insights
            </p>
            <h2 className="text-2xl font-semibold">Animal Health Knowledge Center</h2>
          </div>
          <a className="hidden rounded-full bg-[#eff4ff] px-4 py-2 text-xs font-bold text-[#006b32] sm:block" href="#">
            Read All Articles
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <article key={article.title}>
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-[#e5eeff]">
                <Image alt={article.title} className="object-cover" fill sizes="(min-width: 768px) 33vw, 100vw" src={article.image} />
              </div>
              <p className="mt-4 text-[10px] font-bold uppercase text-[#006b32]">{article.label}</p>
              <h3 className="mt-1 text-lg font-semibold leading-6 text-[#0b1c30]">{article.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#3e4a3f]">
                Learn actionable animal health and farm operations guidance from verified experts.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-[#0b1c30] text-white shadow-2xl lg:grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[360px]">
            <Image
              alt="Indian farmer checking cattle health"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1000&q=90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/70 to-transparent" />
          </div>
          <div className="p-8 sm:p-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6ddd8b]">
              Built for farmer confidence
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight">
              Products, advice and bulk supply that farmers can trust before they pay.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/76">
              The new AnimKart homepage now makes the important trust signals visible: authentic product
              catalog, verified supplier workflow, logistics clarity, and vet support for real farm decisions.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {farmerAssurance.map((item) => (
                <div className="rounded-2xl border border-white/10 bg-white/8 p-5" key={item.title}>
                  <item.icon className="text-[#6ddd8b]" size={24} />
                  <h3 className="mt-4 font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/68">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-xl bg-[#6ddd8b] px-5 py-3 text-sm font-bold text-[#00210b]" href="/products">
                Browse real products
              </a>
              <a className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white" href="#supplier">
                Request bulk quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#213145] text-[#eaf1ff]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded bg-white text-sm font-black text-[#006b32]">
                A
              </span>
              <span className="font-extrabold">AnimKart</span>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#eaf1ff]/72">
              India&apos;s leading specialized marketplace for professional animal healthcare.
              Providing a trusted ecosystem for farmers, veterinarians, and pharmaceutical suppliers.
            </p>
          </div>
          {[
            ["Company", "About Us", "Careers", "Quality Assurance", "Seller Portal"],
            ["Support", "Help Center", "Returns & Refunds", "Track Orders", "Contact Support"],
            ["Legal", "Privacy Policy", "Terms of Service", "Cookie Policy", "GST Compliance"]
          ].map(([heading, ...links]) => (
            <div key={heading}>
              <h3 className="mb-4 font-bold text-white">{heading}</h3>
              <div className="grid gap-2 text-sm text-[#eaf1ff]/72">
                {links.map((link) => (
                  <a href="#" key={link} className="hover:text-white">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-white/10 px-4 py-6 text-xs text-[#eaf1ff]/55 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>Copyright 2026 AnimKart. India&apos;s Premier Animal Health Marketplace.</span>
          <span>Payments · Banking · Cards</span>
        </div>
      </footer>
    </main>
  );
}
