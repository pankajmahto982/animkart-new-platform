import Image from "next/image";
import {
  Bell,
  BookOpen,
  Bird,
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
  Search,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Star,
  Store,
  Truck
} from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { discountPercent, formatINR, getFeaturedProducts, products as importedProducts } from "@/lib/products";

const navItems = ["Cow Medicines", "Buffalo", "Poultry", "Goat & Sheep", "Feed", "Dog Care", "Cat Care"];

const trustItems = [
  { label: "Verified Suppliers", icon: ShieldCheck },
  { label: "Authentic Products", icon: PackageCheck },
  { label: "Secure Payments", icon: LockKeyhole },
  { label: "Fast Delivery", icon: Truck },
  { label: "GST Billing", icon: BookOpen },
  { label: "Expert Support", icon: HeartPulse }
];

const categories = [
  { name: "Cows", icon: Milk },
  { name: "Buffalo", icon: Milk },
  { name: "Poultry", icon: Egg },
  { name: "Goat & Sheep", icon: Sprout },
  { name: "Horses", icon: ShieldCheck },
  { name: "Feed", icon: PackageCheck },
  { name: "Dog", icon: PawPrint },
  { name: "Cat", icon: PawPrint },
  { name: "Bird", icon: Bird }
];

const healthConcerns = [
  "Digestion",
  "Fertility",
  "Mastitis",
  "Muscle Growth",
  "Milk Yield",
  "Immunity",
  "Weight Gain",
  "Skin Care"
];

const quickServices = [
  { title: "Order Products", text: "Medicines, feed and supplements", icon: ShoppingCart, href: "/products" },
  { title: "Bulk Quote", text: "25-100 kg farm orders", icon: Truck, href: "#supplier" },
  { title: "Vet Guidance", text: "Poultry, cattle, pet and aqua", icon: HeartPulse, href: "#vet" },
  { title: "Sell on AnimKart", text: "Supplier onboarding", icon: Store, href: "#supplier" }
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

const categoryTabLinks = categoryTabs.map((name) => ({
  name,
  href: name === "All Products" ? "#bestsellers" : `#${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-products`
}));

const tabPreviewProducts = categoryTabs.slice(1, 7).flatMap((category) =>
  importedProducts.filter((product) => product.category === category).slice(0, 2)
);

const categoryShowcases = categoryTabs.slice(1, 6).map((category) => ({
  category,
  id: `${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-products`,
  products: importedProducts.filter((product) => product.category === category).slice(0, 4)
}));

const seasonalCare = [
  {
    title: "Dairy nutrition",
    text: "Mineral mixture, calcium, bypass fat and feed supplements for milk yield support.",
    icon: Milk
  },
  {
    title: "Poultry protection",
    text: "Feed, immunity products and consultation pathways for flock health planning.",
    icon: Egg
  },
  {
    title: "Pet essentials",
    text: "Trusted cat and dog food, supplements and preventive care products.",
    icon: PawPrint
  },
  {
    title: "Farm operations",
    text: "Bulk quote, GST billing and freight confirmation before large orders move ahead.",
    icon: Truck
  }
];

const problemSolvers = [
  {
    title: "Cow not giving milk?",
    subtitle: "Milk yield support",
    text: "Explore calcium, bypass fat, mineral mixture and feed products trusted by dairy farmers.",
    href: "#animal-feed-products"
  },
  {
    title: "Weight gain for goat & sheep",
    subtitle: "Growth and digestion",
    text: "Find supplements and tonics for better body condition and farm productivity.",
    href: "#animal-healthcare-products"
  },
  {
    title: "Complete poultry health",
    subtitle: "Immunity and flock care",
    text: "Browse poultry medicines, feed support and vet-guided care categories.",
    href: "#poultry-feed-products"
  }
];

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

const topVendors = [
  { name: "AnimKart Verified", category: "Animal Healthcare", products: 221, rating: "4.8" },
  { name: "Whiskas", category: "Pet Nutrition", products: 54, rating: "4.7" },
  { name: "Godrej Agrovet", category: "Feed & Supplements", products: 38, rating: "4.8" },
  { name: "Virbac India", category: "Veterinary Care", products: 26, rating: "4.9" }
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
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <header className="sticky top-0 z-50 border-b border-[#D1D1D1]/70 bg-white/95 backdrop-blur">
        <div className="hidden bg-[#1B6B3A] text-white md:block">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-2 text-xs font-semibold">
            <div className="flex items-center gap-6">
              <a className="flex items-center gap-1 text-white/85 hover:text-white" href="#">
                <BookOpen size={15} />
                Help
              </a>
              <a className="flex items-center gap-1 text-white/85 hover:text-white" href="#supplier">
                <Truck size={15} />
                Bulk Inquiry
              </a>
              <a className="flex items-center gap-1 text-white/85 hover:text-white" href="#supplier">
                <Store size={15} />
                Sell
              </a>
            </div>
            <div className="flex items-center gap-6">
              <a className="flex items-center gap-1 text-white/85 hover:text-white" href="#vet">
                <HeartPulse size={15} />
                Vet Consultation
              </a>
              <a className="flex items-center gap-1 text-white/85 hover:text-white" href="#">
                <Truck size={15} />
                Track Order
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-4 py-3 sm:px-6">
          <a className="flex shrink-0 items-center gap-2" href="#">
            <span className="grid size-11 place-items-center rounded-lg bg-[#1B6B3A] text-xl font-black text-white shadow-sm">
              A
            </span>
            <span>
              <span className="block text-xl font-bold leading-6">AnimKart</span>
              <span className="hidden text-[11px] font-semibold uppercase tracking-wide text-[#1B6B3A] sm:block">
                Farmer trusted animal health
              </span>
            </span>
          </a>

          <div className="hidden min-w-0 flex-1 items-center overflow-hidden rounded-lg border border-[#D1D1D1] bg-white shadow-sm focus-within:border-[#1B6B3A] lg:flex">
            <Search className="ml-4 text-[#6B6B6B]" size={19} />
            <input
              className="min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-sm font-medium outline-none"
              placeholder="Search Products, Suppliers, Brands, or Articles..."
            />
            <button className="bg-[#1B6B3A] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#14522c]">
              SEARCH
            </button>
          </div>

          <div className="ml-auto hidden items-center gap-2 text-[#3D3D3D] lg:flex">
            <MapPin size={20} />
            <div className="leading-tight">
              <p className="text-[10px] font-black uppercase">Deliver to</p>
              <p className="text-xs font-semibold text-[#1A1A1A]">Bengaluru 560001</p>
            </div>
          </div>

          <button className="hidden text-[#3D3D3D] hover:text-[#1B6B3A] sm:block" aria-label="Notifications">
            <Bell size={23} />
          </button>
          <button className="relative text-[#3D3D3D] hover:text-[#1B6B3A]" aria-label="Cart">
            <ShoppingCart size={25} />
            <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-[#ba1a1a] text-[10px] font-bold text-white">
              3
            </span>
          </button>
          <div className="hidden items-center gap-2 border-l border-[#bdcabc] pl-4 md:flex">
            <button className="text-xs font-bold text-[#1B6B3A]">Login</button>
            <button className="rounded-lg bg-[#1B6B3A] px-4 py-2 text-xs font-bold text-white shadow-sm">
              Register
            </button>
          </div>
          <button className="md:hidden" aria-label="Open menu">
            <Menu />
          </button>
        </div>

        <nav className="border-t border-[#D1D1D1]/60 bg-white">
          <div className="mx-auto flex max-w-[1280px] gap-2 overflow-x-auto px-4 py-3 text-sm font-semibold text-[#3D3D3D] sm:px-6">
            {navItems.map((item, index) => (
              <a
                className={
                  index === 0
                    ? "rounded-full bg-[#1B6B3A] px-4 py-2 text-white"
                    : "rounded-full border border-[#D1D1D1] bg-white px-4 py-2 hover:text-[#1B6B3A]"
                }
                href="/products"
                key={item}
              >
                {item}
              </a>
            ))}
            <a className="flex items-center gap-1 rounded-full border border-[#D1D1D1] bg-white px-4 py-2 hover:text-[#1B6B3A]" href="/products">
              Offers <span className="rounded bg-[#ffdad6] px-1.5 py-0.5 text-[10px] text-[#93000a]">HOT</span>
            </a>
          </div>
        </nav>
      </header>

      <section className="bg-[#EDF7F1] px-4 py-6 sm:px-6 lg:py-8">
        <div className="mx-auto grid max-w-[1280px] gap-5 lg:grid-cols-[1fr_0.92fr] lg:items-stretch">
          <div className="flex min-h-[440px] flex-col justify-center rounded-xl bg-white p-6 shadow-sm ring-1 ring-[#D1D1D1]/70 sm:p-8 lg:p-10">
            <div className="mb-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#EDF7F1] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">
                Trusted by farmers across India
              </span>
              <span className="rounded-full bg-[#FEF3DC] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#1A1A1A]">
                GST billing + bulk quote
              </span>
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] text-[#1A1A1A] sm:text-5xl">
              Trusted veterinary medicines & supplements for your farm.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#3D3D3D]">
              Shop livestock medicines, poultry care, cattle feed, pet products and farm essentials
              from AnimKart&apos;s real catalog, with vet guidance and bulk quote support.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ["10k+", "farmers served"],
                ["849", "catalog products"],
                ["Fast", "pan-India support"]
              ].map(([value, label]) => (
                <div className="rounded-lg bg-[#F5F5F5] p-4 ring-1 ring-[#D1D1D1]/70" key={label}>
                  <p className="text-2xl font-bold text-[#1B6B3A]">{value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase text-[#6B6B6B]">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a className="rounded-lg bg-[#1B6B3A] px-6 py-3 text-center text-base font-semibold text-white shadow-sm transition hover:bg-[#14522c]" href="/products">
                Shop products
              </a>
              <a className="rounded-lg border border-[#1B6B3A] bg-white px-6 py-3 text-center text-base font-semibold text-[#1B6B3A] transition hover:bg-[#EDF7F1]" href="#vet">
                Book a vet
              </a>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-rows-[1fr_auto]">
            <div className="relative min-h-[340px] overflow-hidden rounded-xl bg-[#1A1A1A] shadow-sm lg:min-h-[440px]">
              <Image
                alt="Healthy dairy cattle on Indian farm"
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1400&q=90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/76 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Authentic catalog", icon: PackageCheck },
                  { label: "GST billing", icon: BookOpen },
                  { label: "Freight quote", icon: Truck }
                ].map((item) => (
                  <div className="rounded-lg border border-white/20 bg-white/90 p-4 backdrop-blur" key={item.label}>
                    <item.icon className="text-[#1B6B3A]" size={22} />
                    <p className="mt-2 text-sm font-bold">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#D1D1D1] bg-white p-5 shadow-sm" id="vet">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-extrabold text-[#0b1c30]">Book Expert Vet</h2>
                <span className="rounded-full bg-[#16A34A] px-3 py-1 text-xs font-bold text-white">Waitlist open</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Poultry", icon: Egg },
                  { label: "Aquaculture", icon: Droplets },
                  { label: "Pet Care", icon: PawPrint }
                ].map((item) => (
                  <button
                    className="flex items-center justify-between rounded-lg border border-[#D1D1D1] p-3 text-left transition hover:bg-[#EDF7F1]"
                    key={item.label}
                  >
                    <span className="flex items-center gap-2 font-semibold text-[#1A1A1A]">
                      <item.icon className="text-[#1B6B3A]" size={19} />
                      {item.label}
                    </span>
                    <ChevronRight size={17} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-6 sm:px-6">
        <div className="mx-auto grid max-w-[1280px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickServices.map((service) => (
            <a
              className="flex items-center gap-4 rounded-lg border border-[#D1D1D1] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-[#1B6B3A]"
              href={service.href}
              key={service.title}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-[#EDF7F1] text-[#1B6B3A]">
                <service.icon size={23} />
              </span>
              <span>
                <span className="block font-semibold">{service.title}</span>
                <span className="mt-1 block text-sm text-[#6B6B6B]">{service.text}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-[#bdcabc]/40 bg-white">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:grid-cols-6">
          {trustItems.map((item) => (
            <div className="flex flex-col items-center gap-2 text-center" key={item.label}>
              <item.icon className="text-[#006b32]" size={26} />
              <p className="text-xs font-semibold text-[#0b1c30]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">Shop by animal</p>
              <h2 className="mt-1 text-2xl font-semibold">Find products faster</h2>
            </div>
            <a className="text-sm font-semibold text-[#1B6B3A]" href="/products">
              View all
            </a>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
            {categories.map((category) => (
              <a
                className="grid min-h-24 place-items-center rounded-lg border border-[#D1D1D1] bg-white p-3 text-center shadow-sm hover:border-[#1B6B3A]"
                href="/products"
                key={category.name}
              >
                <span className="grid size-12 place-items-center rounded-full bg-[#EDF7F1] text-[#1B6B3A]">
                  <category.icon size={24} />
                </span>
                <span className="mt-3 text-sm font-semibold">{category.name}</span>
              </a>
            ))}
          </div>
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Shop by health concern</h3>
              <a className="text-sm font-semibold text-[#1B6B3A]" href="/products">
                See all
              </a>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {healthConcerns.map((concern) => (
                <a
                  className="shrink-0 rounded-full border border-[#D1D1D1] bg-[#F5F5F5] px-4 py-2 text-sm font-semibold text-[#3D3D3D] hover:border-[#1B6B3A] hover:text-[#1B6B3A]"
                  href="/products"
                  key={concern}
                >
                  {concern}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6" id="catalog">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#006b32]">
              Browse by animal
            </p>
            <h2 className="text-3xl font-semibold text-[#1A1A1A]">Comprehensive Healthcare</h2>
          </div>
          <a className="hidden text-sm font-semibold text-[#006b32] sm:block" href="/products">
            View Full Catalog ({importedProducts.length})
          </a>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <button className="rounded-lg border border-[#D1D1D1] bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#1B6B3A]" key={category.name}>
              <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#EDF7F1] text-[#1B6B3A]">
                <category.icon size={22} />
              </span>
              <span className="mt-4 block font-semibold">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-14 sm:px-6" id="bestsellers">
        <div className="mb-7 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">Featured products</p>
            <h2 className="mt-1 text-2xl font-semibold text-[#1A1A1A]">Bestselling Healthcare Essentials</h2>
          </div>
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
            <article className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-[#D1D1D1] transition hover:-translate-y-1 hover:ring-[#1B6B3A]" key={product.name}>
              <div className="relative aspect-[4/3] bg-white">
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
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[10px] font-bold uppercase text-[#6B6B6B]">{product.brand}</p>
                  <span className="rounded bg-[#EDF7F1] px-2 py-1 text-[10px] font-bold text-[#1B6B3A]">
                    In stock
                  </span>
                </div>
                <h3 className="mt-2 line-clamp-2 min-h-10 text-sm font-semibold text-[#1A1A1A]">{product.name}</h3>
                <p className="mt-1 text-xs text-[#6B6B6B]">Vendor: AnimKart verified supplier</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-[#6B6B6B]">
                  <span className="flex items-center gap-1 text-[#1B6B3A]">
                    <Star size={13} fill="currentColor" />
                    {(4.6 + (index % 4) / 10).toFixed(1)}
                  </span>
                  <span>({96 + index * 37} Reviews)</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-[#1A1A1A]">{formatINR(product.price)}</p>
                    {product.regularPrice && product.regularPrice > product.price ? (
                      <p className="text-xs font-semibold text-[#6B6B6B] line-through">
                        {formatINR(product.regularPrice)}
                      </p>
                    ) : null}
                    <p className="mt-1 text-[11px] text-[#6B6B6B]">Incl. GST</p>
                  </div>
                  <button className="grid size-11 place-items-center rounded-lg bg-[#1B6B3A] text-white">
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
            {categoryTabLinks.map((tab, index) => (
              <a
                className={
                  index === 0
                    ? "shrink-0 rounded-full bg-[#006b32] px-5 py-2.5 text-sm font-bold text-white"
                    : "shrink-0 rounded-full border border-[#bdcabc] bg-[#f8f9ff] px-5 py-2.5 text-sm font-bold text-[#006b32]"
                }
                href={tab.href}
                key={tab.name}
              >
                {tab.name}
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
                    <ProductImage
                      alt={product.name}
                      category={product.category}
                      className="object-contain p-2"
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

      <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-4">
          {seasonalCare.map((item) => (
            <article className="rounded-3xl border border-[#d3e4fe] bg-white p-6 shadow-sm" key={item.title}>
              <span className="grid size-12 place-items-center rounded-2xl bg-[#e5eeff] text-[#006b32]">
                <item.icon size={24} />
              </span>
              <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#3e4a3f]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-14 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">Top vendors</p>
            <h2 className="mt-1 text-2xl font-semibold">Trusted supply partners</h2>
          </div>
          <a className="text-sm font-semibold text-[#1B6B3A]" href="/products">
            View stores
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topVendors.map((vendor) => (
            <article className="rounded-lg border border-[#D1D1D1] bg-white p-5 shadow-sm" key={vendor.name}>
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-lg bg-[#EDF7F1] text-lg font-bold text-[#1B6B3A]">
                  {vendor.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold">{vendor.name}</h3>
                  <p className="text-xs text-[#6B6B6B]">{vendor.category}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="font-semibold text-[#1B6B3A]">{vendor.products} products</span>
                <span className="flex items-center gap-1 text-[#3D3D3D]">
                  <Star size={14} fill="#F0A500" className="text-[#F0A500]" />
                  {vendor.rating}
                </span>
              </div>
              <a className="mt-4 block rounded-lg border border-[#1B6B3A] px-4 py-2 text-center text-sm font-semibold text-[#1B6B3A]" href="/products">
                View store
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-14 sm:px-6">
        <div className="rounded-xl bg-[#EDF7F1] p-6 ring-1 ring-[#D1D1D1] sm:p-8 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">Vet consultation</p>
            <h2 className="mt-2 text-2xl font-semibold">Need help choosing the right medicine or feed?</h2>
            <p className="mt-3 text-sm leading-6 text-[#3D3D3D]">
              Vet consultation is opening soon. Join the waitlist for poultry, cattle, pet, aqua and
              goat/sheep advisory support.
            </p>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <a className="rounded-lg bg-[#1B6B3A] px-5 py-3 text-center text-sm font-semibold text-white" href="#vet">
              Join waitlist
            </a>
            <a className="rounded-lg border border-[#1B6B3A] bg-white px-5 py-3 text-center text-sm font-semibold text-[#1B6B3A]" href="/products">
              Browse products
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-14 sm:px-6">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">Problem solver</p>
          <h2 className="mt-1 text-2xl font-semibold">Shop by common farm problems</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {problemSolvers.map((item, index) => (
            <article
              className={
                index === 0
                  ? "rounded-xl bg-[#1B6B3A] p-6 text-white"
                  : "rounded-xl border border-[#D1D1D1] bg-white p-6 shadow-sm"
              }
              key={item.title}
            >
              <span
                className={
                  index === 0
                    ? "rounded-full bg-white/15 px-3 py-1 text-xs font-bold"
                    : "rounded-full bg-[#EDF7F1] px-3 py-1 text-xs font-bold text-[#1B6B3A]"
                }
              >
                {item.subtitle}
              </span>
              <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
              <p className={index === 0 ? "mt-3 text-sm leading-6 text-white/80" : "mt-3 text-sm leading-6 text-[#3D3D3D]"}>
                {item.text}
              </p>
              <a
                className={
                  index === 0
                    ? "mt-6 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#1B6B3A]"
                    : "mt-6 inline-flex rounded-lg bg-[#1B6B3A] px-4 py-2 text-sm font-semibold text-white"
                }
                href={item.href}
              >
                Shop solutions
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#006b32]">
              Real catalog sections
            </p>
            <h2 className="text-3xl font-semibold">Shop products by category</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#3e4a3f]">
              These products come from the WooCommerce export, so the homepage already reflects actual
              AnimKart inventory instead of sample placeholders.
            </p>
          </div>
          <a className="text-sm font-bold text-[#006b32]" href="/products">
            Browse full catalog
          </a>
        </div>

        <div className="grid gap-10">
          {categoryShowcases.map((section) => (
            <div className="scroll-mt-36" id={section.id} key={section.category}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-2xl font-bold">{section.category}</h3>
                <a className="text-sm font-bold text-[#006b32]" href="/products">
                  View more
                </a>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {section.products.map((product, index) => {
                  const discount = discountPercent(product);

                  return (
                    <article
                      className="overflow-hidden rounded-2xl border border-[#d3e4fe] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                      key={`${section.id}-${product.id}`}
                    >
                      <div className="relative aspect-[4/3] bg-[#e5eeff]">
                        <ProductImage
                          alt={product.name}
                          category={product.category}
                          className="object-contain p-4"
                          src={product.image}
                        />
                        {discount ? (
                          <span className="absolute left-3 top-3 rounded bg-[#ba1a1a] px-2 py-1 text-[10px] font-bold text-white">
                            {discount}% OFF
                          </span>
                        ) : null}
                      </div>
                      <div className="p-4">
                        <p className="truncate text-[10px] font-bold uppercase text-[#006b32]">
                          {product.brand}
                        </p>
                        <h4 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold leading-5">
                          {product.name}
                        </h4>
                        <div className="mt-2 flex items-center gap-2 text-xs text-[#6e7a6e]">
                          <span className="flex items-center gap-1 text-[#006b32]">
                            <Star size={13} fill="currentColor" />
                            {(4.5 + (index % 4) / 10).toFixed(1)}
                          </span>
                          <span>Verified catalog</span>
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
            </div>
          ))}
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
