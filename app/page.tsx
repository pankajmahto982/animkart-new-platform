import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  ChevronRight,
  Clock3,
  HeartPulse,
  IndianRupee,
  LayoutDashboard,
  MapPin,
  Menu,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  Truck,
  UserRound,
  WalletCards
} from "lucide-react";
import {
  adminMetrics,
  animalCategories,
  concernCategories,
  featuredProducts,
  operations,
  supplierTasks
} from "@/lib/marketplace-data";

const trustStats = [
  { label: "Verified suppliers", value: "500+" },
  { label: "Animal health SKUs", value: "12k+" },
  { label: "States served", value: "22+" }
];

const quickLinks = ["Cattle Feed", "Poultry Care", "Pet Medicine", "Mineral Mixture", "Bulk Orders"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8faf7] text-[#16211b]">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a className="focus-ring flex items-center gap-3" href="#">
            <span className="grid size-11 place-items-center rounded-lg bg-[#24523c] text-xl font-black text-white">
              A
            </span>
            <span>
              <span className="block text-xl font-black leading-tight text-[#24523c]">AnimKart</span>
              <span className="block text-[11px] font-black uppercase text-[#c54622]">
                Animal Health Marketplace
              </span>
            </span>
          </a>

          <div className="hidden min-w-0 flex-1 items-center rounded-lg border border-black/10 bg-[#f5f7f2] p-1.5 lg:flex">
            <button className="focus-ring inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-black text-[#24523c]">
              <Menu size={17} />
              All
            </button>
            <Search className="mx-2 text-[#24523c]" size={20} />
            <input
              aria-label="Search AnimKart products"
              className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm font-semibold outline-none"
              placeholder="Search cattle feed, poultry supplement, pet medicine, farm advisory..."
            />
            <button className="focus-ring rounded-md bg-[#f3b22f] px-5 py-2.5 text-sm font-black text-[#1d2117]">
              Search
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="focus-ring hidden rounded-lg border border-black/10 bg-white p-3 text-[#24523c] md:inline-flex">
              <UserRound size={20} />
            </button>
            <a
              className="focus-ring hidden items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-3 text-sm font-black text-[#24523c] sm:inline-flex"
              href="#supplier-os"
            >
              <Store size={18} />
              Supplier
            </a>
            <a
              className="focus-ring inline-flex items-center gap-2 rounded-lg bg-[#24523c] px-4 py-3 text-sm font-black text-white shadow-soft"
              href="#marketplace"
            >
              <ShoppingCart size={18} />
              Cart
            </a>
          </div>
        </div>
        <div className="hidden border-t border-black/5 bg-white md:block">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-2 text-sm font-bold text-[#4f5b53] lg:px-8">
            <div className="flex items-center gap-6">
              {quickLinks.map((item) => (
                <a className="focus-ring hover:text-[#24523c]" href="#marketplace" key={item}>
                  {item}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 text-[#24523c]">
              <MapPin size={16} />
              Delivering across India
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1440px] gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[250px_1fr_320px] lg:px-8">
        <aside className="hidden rounded-xl border border-black/8 bg-white p-3 shadow-sm lg:block">
          <p className="px-2 pb-3 text-xs font-black uppercase text-[#c54622]">Shop by animal</p>
          <div className="grid gap-1">
            {animalCategories.map((category) => (
              <a
                className="focus-ring flex items-center justify-between rounded-lg px-3 py-3 text-sm font-black text-[#27352d] hover:bg-[#eef6e9]"
                href="#marketplace"
                key={category.name}
              >
                <span className="flex items-center gap-3">
                  <category.icon size={19} className="text-[#2d744d]" />
                  {category.name}
                </span>
                <ChevronRight size={16} />
              </a>
            ))}
          </div>
        </aside>

        <div className="relative min-h-[560px] overflow-hidden rounded-xl bg-[#163323] shadow-soft">
          <Image
            alt="Livestock farmer and cattle at sunrise"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1600&q=90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#102119] via-[#183725]/75 to-transparent" />
          <div className="relative flex min-h-[560px] max-w-2xl flex-col justify-center px-5 py-10 sm:px-9 lg:px-12">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-black text-[#24523c]">
              <BadgeCheck size={17} />
              Vet guided animal health commerce
            </div>
            <h1 className="text-4xl font-black leading-[1.03] text-white sm:text-5xl lg:text-6xl">
              Everything farmers need to keep animals healthy and productive.
            </h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-white/82">
              Medicines, feed, supplements, bulk procurement and expert vet support from verified
              suppliers on one marketplace.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-[#f3b22f] px-5 py-3 text-sm font-black text-[#1d2117]"
                href="#marketplace"
              >
                Start shopping
                <ArrowRight size={18} />
              </a>
              <a
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/12 px-5 py-3 text-sm font-black text-white backdrop-blur"
                href="#vet-consult"
              >
                Ask a vet
                <HeartPulse size={18} />
              </a>
            </div>
            <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
              {trustStats.map((stat) => (
                <div className="rounded-lg bg-white/94 p-4" key={stat.label}>
                  <p className="text-2xl font-black text-[#24523c]">{stat.value}</p>
                  <p className="mt-1 text-xs font-bold text-[#5f6d63]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-xl border border-black/8 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black text-[#c54622]">Today&apos;s focus</p>
              <Sparkles className="text-[#f3b22f]" size={20} />
            </div>
            <h2 className="mt-3 text-2xl font-black text-[#16211b]">Dairy productivity kit</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#647066]">
              Mineral mixture, digestion support and milk yield supplements for repeat purchase.
            </p>
            <button className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#24523c] px-4 py-3 text-sm font-black text-white">
              View bundle
              <ChevronRight size={17} />
            </button>
          </div>

          <div className="rounded-xl border border-black/8 bg-[#fff4da] p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Truck className="text-[#c54622]" size={25} />
              <div>
                <p className="text-sm font-black text-[#16211b]">Bulk order freight</p>
                <p className="text-sm font-semibold text-[#6b5a35]">Quote before checkout</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {["MOQ validation", "Supplier zones", "Freight on actual"].map((item) => (
                <div className="flex items-center gap-2 text-sm font-black text-[#3b3528]" key={item}>
                  <ShieldCheck size={16} className="text-[#24523c]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="border-y border-black/5 bg-white py-4">
        <div className="mx-auto grid max-w-[1440px] gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { icon: Truck, title: "Pan-India logistics", text: "Supplier zone checks" },
            { icon: ShieldCheck, title: "Verified sellers", text: "GST, PAN and bank review" },
            { icon: HeartPulse, title: "Vet consultation", text: "Paid WhatsApp and phone support" },
            { icon: WalletCards, title: "Secure payments", text: "Ready for Razorpay flow" }
          ].map((item) => (
            <div className="flex items-center gap-3 rounded-lg bg-[#f7faf2] px-4 py-3" key={item.title}>
              <item.icon className="text-[#24523c]" size={23} />
              <div>
                <p className="font-black text-[#16211b]">{item.title}</p>
                <p className="text-sm font-semibold text-[#667268]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8" id="marketplace">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase text-[#c54622]">Marketplace</p>
            <h2 className="mt-2 text-3xl font-black text-[#16211b]">Popular animal health categories</h2>
          </div>
          <a className="focus-ring inline-flex w-fit items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-3 text-sm font-black text-[#24523c]" href="#">
            Explore all
            <ChevronRight size={17} />
          </a>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {animalCategories.map((category) => (
            <button
              className="focus-ring group rounded-xl border border-black/8 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              key={category.name}
            >
              <span className="grid size-11 place-items-center rounded-lg bg-[#eaf4e7] text-[#24523c]">
                <category.icon size={23} />
              </span>
              <span className="mt-5 block font-black text-[#16211b]">{category.name}</span>
              <span className="mt-1 block text-sm font-semibold text-[#6b756d]">{category.count}</span>
            </button>
          ))}
        </div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {concernCategories.map((concern) => (
            <button
              className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-black text-[#24523c]"
              key={concern.name}
            >
              <concern.icon size={16} />
              {concern.name}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-[#16211b] p-4 sm:p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-black uppercase text-[#f3b22f]">Best sellers</p>
              <h2 className="mt-1 text-3xl font-black text-white">High demand products this week</h2>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-black text-white">
              <Clock3 size={17} />
              Updated live from supplier catalog
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <article className="overflow-hidden rounded-xl bg-white shadow-sm" key={product.name}>
                <div className="relative aspect-[4/3] bg-[#eef3ec]">
                  <Image
                    alt={product.name}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    src={product.image}
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-[#f3b22f] px-3 py-1 text-xs font-black uppercase text-[#1d2117]">
                    {product.badge}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-[#c54622]">{product.category}</p>
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#eaf4e7] px-2 py-1 text-sm font-black text-[#24523c]">
                      <Star size={14} fill="currentColor" />
                      {product.rating}
                    </span>
                  </div>
                  <h3 className="mt-2 min-h-14 text-xl font-black text-[#16211b]">{product.name}</h3>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase text-[#6f7a72]">Starting at</p>
                      <p className="mt-1 flex items-center text-2xl font-black text-[#24523c]">
                        <IndianRupee size={19} />
                        {product.price.replace("₹", "")}
                      </p>
                    </div>
                    {product.mrp ? (
                      <span className="text-sm font-bold text-[#8a928b] line-through">{product.mrp}</span>
                    ) : null}
                  </div>
                  <div className="mt-4 grid gap-2 text-sm font-bold text-[#5e6a62]">
                    <span className="flex items-center gap-2">
                      <BadgeCheck size={16} className="text-[#24523c]" />
                      {product.supplier}
                    </span>
                    <span className="flex items-center gap-2">
                      <Truck size={16} className="text-[#24523c]" />
                      {product.shipping}
                    </span>
                  </div>
                  <button className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#24523c] px-4 py-3 text-sm font-black text-white">
                    Add to cart
                    <ShoppingCart size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12" id="supplier-os">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase text-[#c54622]">Supplier control</p>
            <h2 className="mt-2 text-4xl font-black leading-tight text-[#16211b]">
              A marketplace backend that protects buyers before checkout.
            </h2>
            <p className="mt-4 max-w-xl text-lg font-semibold leading-8 text-[#68736b]">
              Products should only go live after shipping, stock freshness, supplier verification and
              admin approval are complete.
            </p>
            <div className="mt-7 grid gap-3">
              {supplierTasks.slice(0, 4).map((task) => (
                <div className="flex items-center gap-3 rounded-lg border border-black/8 bg-[#f7faf2] p-4 text-sm font-black text-[#25322a]" key={task}>
                  <PackageCheck className="shrink-0 text-[#24523c]" size={20} />
                  {task}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-black/8 bg-[#f8faf7] p-4 shadow-soft">
            <div className="rounded-lg bg-[#16211b] p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-[#f3b22f]">Admin OS</p>
                  <h3 className="mt-1 text-2xl font-black">Operations dashboard</h3>
                </div>
                <LayoutDashboard size={28} />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {adminMetrics.map((metric) => (
                  <div className="rounded-lg bg-white/10 p-4" key={metric.label}>
                    <p className="text-xs font-bold uppercase text-white/55">{metric.label}</p>
                    <p className="mt-1 text-2xl font-black text-white">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {operations.map((item) => (
                <div className="rounded-lg bg-white p-4" key={item.title}>
                  <item.icon className="text-[#24523c]" size={24} />
                  <h4 className="mt-3 font-black text-[#16211b]">{item.title}</h4>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#68736b]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-4 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8" id="vet-consult">
        <div className="rounded-xl bg-[#24523c] p-7 text-white shadow-soft">
          <BellRing className="text-[#f3b22f]" size={30} />
          <h2 className="mt-5 text-3xl font-black">Book a veterinary consultation</h2>
          <p className="mt-3 max-w-xl text-lg font-semibold leading-8 text-white/78">
            Collect symptoms, images, animal category and payment before assigning a case to a vet.
          </p>
          <a className="focus-ring mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-black text-[#24523c]" href="#">
            Start consultation
            <ArrowRight size={17} />
          </a>
        </div>
        <div className="rounded-xl border border-black/8 bg-white p-7 shadow-sm">
          <p className="text-sm font-black uppercase text-[#c54622]">Next build phase</p>
          <h2 className="mt-2 text-3xl font-black text-[#16211b]">From landing page to real commerce engine</h2>
          <div className="mt-6 grid gap-3">
            {["Product detail pages", "Cart and checkout", "Supplier login", "Admin approval workflow"].map((item) => (
              <div className="flex items-center gap-3 rounded-lg bg-[#f7faf2] p-4 text-sm font-black text-[#25322a]" key={item}>
                <ShieldCheck className="text-[#24523c]" size={19} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-7 text-sm font-bold text-[#667268] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>Copyright 2026 Animpet Ecomm Private Limited</span>
          <span>AnimKart marketplace development preview</span>
        </div>
      </footer>
    </main>
  );
}
