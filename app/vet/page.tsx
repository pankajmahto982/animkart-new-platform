import Link from "next/link";
import { CalendarCheck, CheckCircle2, HeartPulse, Phone, ShieldCheck, Video } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getFeaturedProducts } from "@/lib/products";

const consultTypes = ["Dairy cattle", "Poultry flock", "Pet care", "Aquaculture", "Goat & sheep", "Farm nutrition"];
const products = getFeaturedProducts(4);

export const metadata = {
  title: "Vet Consultation | AnimKart",
  description: "Book AnimKart veterinary guidance for livestock, poultry, pet and aquaculture care."
};

export default function VetPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <SiteHeader />
      <section className="bg-[#EDF7F1] px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">AnimKart vet desk</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
              Talk to experts before choosing medicine, feed or supplements.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#3D3D3D]">
              Build farmer confidence with guided support for dairy, poultry, pets, aquaculture and farm nutrition decisions.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="rounded-lg bg-[#1B6B3A] px-6 py-3 text-center font-semibold text-white" href="/bulk-inquiry">
                Request call back
              </Link>
              <Link className="rounded-lg border border-[#1B6B3A] bg-white px-6 py-3 text-center font-semibold text-[#1B6B3A]" href="/products">
                Browse products
              </Link>
            </div>
          </div>
          <form className="rounded-xl border border-[#D1D1D1] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Book expert vet</h2>
            <p className="mt-2 text-sm text-[#6B6B6B]">Share the issue and AnimKart team can route it to the right specialist.</p>
            <div className="mt-5 grid gap-3">
              <input className="rounded-lg border border-[#D1D1D1] px-4 py-3 text-sm" placeholder="Farmer name" />
              <input className="rounded-lg border border-[#D1D1D1] px-4 py-3 text-sm" placeholder="Mobile number" />
              <select className="rounded-lg border border-[#D1D1D1] px-4 py-3 text-sm">
                {consultTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
              <textarea className="min-h-24 rounded-lg border border-[#D1D1D1] px-4 py-3 text-sm" placeholder="Describe symptoms, animal age, quantity and location" />
              <button className="rounded-lg bg-[#1B6B3A] px-5 py-3 text-sm font-semibold text-white">Join vet waitlist</button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Phone support", text: "Route urgent buying questions quickly.", icon: Phone },
            { title: "Video consult", text: "Useful for visible symptoms and flock checks.", icon: Video },
            { title: "Care plans", text: "Suggested feed, medicine and follow-up plan.", icon: CalendarCheck },
            { title: "Verified products", text: "Recommendations linked to AnimKart catalog.", icon: ShieldCheck }
          ].map((item) => (
            <article className="rounded-lg border border-[#D1D1D1] bg-white p-5 shadow-sm" key={item.title}>
              <item.icon className="text-[#1B6B3A]" size={25} />
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="rounded-xl bg-[#1B6B3A] p-6 text-white">
            <HeartPulse size={30} />
            <h2 className="mt-4 text-2xl font-semibold">Common farmer questions</h2>
            <div className="mt-5 grid gap-3 text-sm text-white/85">
              {["Low milk yield", "Poultry immunity", "Pet digestion", "Feed selection", "Skin or wound care"].map((item) => (
                <p className="flex items-center gap-2" key={item}>
                  <CheckCircle2 size={16} /> {item}
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">Vet recommended</p>
                <h2 className="text-2xl font-semibold">Products farmers often compare</h2>
              </div>
              <Link className="text-sm font-semibold text-[#1B6B3A]" href="/products">View catalog</Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {products.map((product, index) => (
                <ProductCard index={index} key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
