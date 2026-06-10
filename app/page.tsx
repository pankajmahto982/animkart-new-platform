import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  MessageCircle,
  Search,
  ShoppingCart,
  Stethoscope,
  Store,
  UserRoundCog
} from "lucide-react";
import {
  adminMetrics,
  animalCategories,
  concernCategories,
  featuredProducts,
  navLinks,
  operations,
  supplierTasks
} from "@/lib/marketplace-data";

export default function Home() {
  return (
    <main>
      <header className="sticky top-0 z-30 border-b border-forest/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a className="flex items-center gap-3 focus-ring" href="#">
            <span className="grid size-10 place-items-center rounded bg-forest text-lg font-black text-white">
              A
            </span>
            <span>
              <span className="block text-lg font-black leading-tight text-forest">AnimKart</span>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-clay">
                Marketplace OS
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-ink/75 lg:flex">
            {navLinks.map((item) => (
              <a className="focus-ring hover:text-forest" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              className="focus-ring hidden items-center gap-2 rounded border border-forest/15 px-3 py-2 text-sm font-bold text-forest sm:flex"
              href="#supplier-os"
            >
              <Store size={17} />
              Supplier
            </a>
            <a
              className="focus-ring inline-flex items-center gap-2 rounded bg-forest px-3 py-2 text-sm font-bold text-white shadow-soft"
              href="#marketplace"
            >
              <ShoppingCart size={17} />
              Shop
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 pt-8 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:pb-16 lg:pt-12">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-leaf/25 bg-white px-3 py-2 text-sm font-bold text-forest shadow-sm">
            <CheckCircle2 size={17} />
            Trusted by farmers, suppliers and veterinary teams
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Animal health commerce with supplier, shipping and vet operations built in.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
            A modern AnimKart platform for livestock medicines, pet care, feed, bulk orders,
            inventory reminders and paid veterinary consultation.
          </p>
          <div className="mt-7 flex max-w-2xl items-center rounded border border-forest/15 bg-white p-2 shadow-soft">
            <Search className="ml-2 shrink-0 text-forest" size={22} />
            <input
              aria-label="Search products"
              className="min-w-0 flex-1 border-0 px-3 py-3 text-base outline-none"
              placeholder="Search milk yield, poultry, goat, dog care..."
            />
            <button className="focus-ring inline-flex shrink-0 items-center gap-2 rounded bg-saffron px-4 py-3 text-sm font-black text-ink">
              Search
              <ArrowRight size={17} />
            </button>
          </div>
          <div className="mt-7 grid grid-cols-3 gap-3 sm:max-w-xl">
            {["Pan-India delivery", "Vet-verified", "Bulk-ready"].map((item) => (
              <div className="rounded border border-forest/10 bg-white px-3 py-3 text-sm font-bold text-forest" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[520px] overflow-hidden rounded bg-forest shadow-soft">
          <Image
            alt="Indian dairy farmer with livestock"
            className="absolute inset-0 h-full w-full object-cover opacity-78"
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1400&q=85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-forest/35 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
            <div className="grid gap-3 sm:grid-cols-3">
              {adminMetrics.slice(0, 3).map((metric) => (
                <div className="rounded bg-white/94 p-4" key={metric.label}>
                  <p className="text-xs font-bold uppercase text-ink/55">{metric.label}</p>
                  <p className="mt-1 text-2xl font-black text-forest">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-forest/10 bg-white py-10" id="marketplace">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-clay">Buyer marketplace</p>
              <h2 className="mt-2 text-3xl font-black text-ink">Shop by animal and health concern</h2>
            </div>
            <button className="focus-ring inline-flex w-fit items-center gap-2 rounded border border-forest/20 px-4 py-3 text-sm font-black text-forest">
              View catalog
              <ChevronRight size={17} />
            </button>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {animalCategories.map((category) => (
              <button
                className="focus-ring rounded border border-forest/10 bg-field p-4 text-left transition hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
                key={category.name}
              >
                <category.icon className="text-forest" size={25} />
                <span className="mt-4 block font-black text-ink">{category.name}</span>
                <span className="mt-1 block text-sm font-semibold text-ink/55">{category.count}</span>
              </button>
            ))}
          </div>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            {concernCategories.map((concern) => (
              <button
                className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border border-forest/15 bg-white px-4 py-2 text-sm font-bold text-forest"
                key={concern.name}
              >
                <concern.icon size={16} />
                {concern.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-clay">Featured solutions</p>
            <h2 className="mt-2 text-3xl font-black text-ink">Ready for product detail and checkout flow</h2>
          </div>
        </div>
        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <article className="overflow-hidden rounded border border-forest/10 bg-white shadow-sm" key={product.name}>
              <div className="relative aspect-[4/3]">
                <Image
                  alt={product.name}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  src={product.image}
                />
                <span className="absolute left-3 top-3 rounded bg-saffron px-3 py-1 text-xs font-black uppercase text-ink">
                  {product.badge}
                </span>
              </div>
              <div className="p-5">
                <p className="text-sm font-bold text-clay">{product.category}</p>
                <h3 className="mt-1 text-xl font-black text-ink">{product.name}</h3>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-2xl font-black text-forest">{product.price}</span>
                    {product.mrp ? (
                      <span className="ml-2 text-sm font-semibold text-ink/40 line-through">{product.mrp}</span>
                    ) : null}
                  </div>
                  <span className="rounded bg-field px-2 py-1 text-sm font-black text-forest">
                    {product.rating}/5
                  </span>
                </div>
                <div className="mt-4 grid gap-2 text-sm font-semibold text-ink/65">
                  <span>{product.supplier}</span>
                  <span>{product.shipping}</span>
                </div>
                <button className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded bg-forest px-4 py-3 text-sm font-black text-white">
                  Add to cart
                  <ShoppingCart size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ink py-12 text-white" id="supplier-os">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-saffron">Supplier operating system</p>
            <h2 className="mt-2 text-3xl font-black">Make every product operational before it goes live.</h2>
            <p className="mt-4 max-w-xl leading-7 text-white/70">
              The supplier dashboard starts with verification, product upload, inventory freshness and mandatory shipping rules.
            </p>
            <ul className="mt-6 grid gap-3">
              {supplierTasks.map((task) => (
                <li className="flex items-start gap-3 text-sm font-semibold text-white/82" key={task}>
                  <ClipboardCheck className="mt-0.5 shrink-0 text-saffron" size={18} />
                  {task}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {operations.map((item) => (
              <div className="rounded border border-white/12 bg-white/8 p-5" key={item.title}>
                <item.icon className="text-saffron" size={26} />
                <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="rounded border border-forest/10 bg-white p-6 shadow-sm" id="vet-consult">
          <Stethoscope className="text-forest" size={30} />
          <h2 className="mt-4 text-3xl font-black text-ink">Vet consultation module</h2>
          <p className="mt-3 leading-7 text-ink/68">
            Start with paid booking, animal category, symptoms, image upload and WhatsApp consultation.
            Upgrade later to vet assignment, prescriptions and product recommendations.
          </p>
          <button className="focus-ring mt-6 inline-flex items-center gap-2 rounded bg-forest px-4 py-3 text-sm font-black text-white">
            <MessageCircle size={17} />
            Book consultation
          </button>
        </div>
        <div className="rounded border border-forest/10 bg-field p-6" id="admin-os">
          <UserRoundCog className="text-forest" size={30} />
          <h2 className="mt-4 text-3xl font-black text-ink">Admin control center</h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {adminMetrics.map((metric) => (
              <div className="rounded bg-white p-4" key={metric.label}>
                <p className="text-xs font-black uppercase text-ink/45">{metric.label}</p>
                <p className="mt-1 text-2xl font-black text-forest">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-forest/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-7 text-sm font-semibold text-ink/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© 2026 Animpet Ecomm Private Limited</span>
          <span>Built for AnimKart marketplace development</span>
        </div>
      </footer>
    </main>
  );
}
