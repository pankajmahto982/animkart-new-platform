import Link from "next/link";
import {
  Bird,
  ChevronLeft,
  Droplets,
  Egg,
  HeartPulse,
  Milk,
  PackageCheck,
  PawPrint,
  ShieldCheck,
  Sprout
} from "lucide-react";
import { getTopCategories, products } from "@/lib/products";

const animalCategories = [
  {
    name: "Cows",
    icon: Milk,
    description: "Milk yield, digestion, fertility, mineral mixture and dairy nutrition products.",
    concern: "Milk Yield",
    count: products.filter((product) => /cow|cattle|dairy|milk|calcium/i.test(product.name + product.category)).length
  },
  {
    name: "Buffalo",
    icon: Milk,
    description: "Feed, supplements and healthcare support for buffalo farms.",
    concern: "Dairy Care",
    count: products.filter((product) => /buffalo|dairy|milk/i.test(product.name + product.category)).length
  },
  {
    name: "Poultry",
    icon: Egg,
    description: "Poultry feed, immunity, growth and flock care products.",
    concern: "Immunity",
    count: products.filter((product) => /poultry|broiler|layer|chick|hen/i.test(product.name + product.category)).length
  },
  {
    name: "Goat & Sheep",
    icon: Sprout,
    description: "Growth, digestion, weight gain and farm productivity products.",
    concern: "Weight Gain",
    count: products.filter((product) => /goat|sheep/i.test(product.name + product.category)).length
  },
  {
    name: "Horses",
    icon: ShieldCheck,
    description: "Supplements and healthcare products for horse owners and stables.",
    concern: "Muscle Growth",
    count: products.filter((product) => /horse|equine/i.test(product.name + product.category)).length
  },
  {
    name: "Dog",
    icon: PawPrint,
    description: "Dog food, supplements, grooming and pet wellness products.",
    concern: "Pet Care",
    count: products.filter((product) => /dog|puppy/i.test(product.name + product.category)).length
  },
  {
    name: "Cat",
    icon: PawPrint,
    description: "Cat food, treats and wellness essentials from imported WooCommerce products.",
    concern: "Pet Nutrition",
    count: products.filter((product) => /cat|kitten|whiskas/i.test(product.name + product.category)).length
  },
  {
    name: "Bird",
    icon: Bird,
    description: "Bird care and nutrition products for household and farm birds.",
    concern: "Nutrition",
    count: products.filter((product) => /bird/i.test(product.name + product.category)).length
  },
  {
    name: "Aqua",
    icon: Droplets,
    description: "Aquaculture health, pond and fish feed support categories.",
    concern: "Aquaculture",
    count: products.filter((product) => /fish|aqua|pond/i.test(product.name + product.category)).length
  }
];

const healthConcerns = [
  "Digestion",
  "Fertility",
  "Mastitis",
  "Muscle Growth",
  "Milk Yield",
  "Immunity",
  "Weight Gain",
  "Skin Care",
  "Pet Nutrition",
  "Aquaculture"
];

const catalogCategories = getTopCategories(14);

export const metadata = {
  title: "Categories | AnimKart",
  description: "Browse AnimKart animal healthcare categories and product concerns."
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <header className="bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6">
          <Link className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1B6B3A]" href="/">
            <ChevronLeft size={17} />
            Back to home
          </Link>
          <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">AnimKart categories</p>
              <h1 className="mt-2 text-4xl font-bold leading-tight">Shop by animal, product type and farm concern</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#3D3D3D]">
                A farmer-friendly category page built from AnimKart&apos;s animal health marketplace direction
                and the imported WooCommerce product catalog.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 rounded-xl bg-[#EDF7F1] p-4">
              {[
                [products.length.toLocaleString("en-IN"), "Products"],
                [animalCategories.length, "Animal groups"],
                [catalogCategories.length, "Catalog groups"]
              ].map(([value, label]) => (
                <div className="rounded-lg bg-white p-4 text-center" key={label}>
                  <p className="text-2xl font-bold text-[#1B6B3A]">{value}</p>
                  <p className="mt-1 text-xs font-semibold text-[#6B6B6B]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">Shop by animal</p>
            <h2 className="mt-1 text-2xl font-semibold">Animal categories</h2>
          </div>
          <Link className="text-sm font-semibold text-[#1B6B3A]" href="/products">
            View all products
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {animalCategories.map((category) => (
            <Link
              className="rounded-xl border border-[#D1D1D1] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#1B6B3A]"
              href="/products"
              key={category.name}
            >
              <div className="flex items-start gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-[#EDF7F1] text-[#1B6B3A]">
                  <category.icon size={27} />
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#3D3D3D]">{category.description}</p>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#D1D1D1]/70 pt-4 text-sm">
                <span className="rounded-full bg-[#FEF3DC] px-3 py-1 font-semibold text-[#1A1A1A]">
                  {category.concern}
                </span>
                <span className="font-semibold text-[#1B6B3A]">{category.count || "New"} products</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-10 sm:px-6">
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#D1D1D1] sm:p-6">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">Shop by concern</p>
              <h2 className="mt-1 text-2xl font-semibold">Common health needs</h2>
            </div>
            <HeartPulse className="text-[#1B6B3A]" size={28} />
          </div>
          <div className="flex flex-wrap gap-3">
            {healthConcerns.map((concern) => (
              <Link
                className="rounded-full border border-[#D1D1D1] bg-[#F5F5F5] px-4 py-2 text-sm font-semibold text-[#3D3D3D] hover:border-[#1B6B3A] hover:text-[#1B6B3A]"
                href="/products"
                key={concern}
              >
                {concern}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-12 sm:px-6">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">Imported catalog</p>
          <h2 className="mt-1 text-2xl font-semibold">Product groups from WooCommerce</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {catalogCategories.map((category) => (
            <Link
              className="rounded-lg border border-[#D1D1D1] bg-white p-5 shadow-sm transition hover:border-[#1B6B3A]"
              href="/products"
              key={category.name}
            >
              <PackageCheck className="text-[#1B6B3A]" size={24} />
              <h3 className="mt-4 font-semibold">{category.name}</h3>
              <p className="mt-2 text-sm text-[#6B6B6B]">{category.count} products available</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#1B6B3A] px-4 py-10 text-white sm:px-6">
        <div className="mx-auto grid max-w-[1280px] gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold">Need bulk feed, medicine or supplement supply?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80">
              Move from category browsing to bulk inquiry when MOQ, freight and GST billing need confirmation.
            </p>
          </div>
          <Link className="rounded-lg bg-white px-5 py-3 text-center text-sm font-semibold text-[#1B6B3A]" href="/products">
            Browse catalog
          </Link>
        </div>
      </section>
    </main>
  );
}
