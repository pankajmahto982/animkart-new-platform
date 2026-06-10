import Link from "next/link";
import { CheckCircle2, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Bulk Inquiry | AnimKart",
  description: "Request wholesale pricing, freight and GST-ready quotes for animal health products."
};

export default function BulkInquiryPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <SiteHeader />
      <section className="mx-auto grid max-w-[1280px] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_430px]">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">Farm and distributor supply</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight">
            Get custom quote for feed bags, medicines, supplements and recurring farm orders.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#3D3D3D]">
            Submit quantity and delivery details. AnimKart can confirm MOQ, wholesale price, freight and GST billing before payment.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { title: "MOQ check", icon: PackageCheck },
              { title: "GST invoice", icon: ShieldCheck },
              { title: "Freight quote", icon: Truck }
            ].map((item) => (
              <div className="rounded-lg border border-[#D1D1D1] bg-white p-5 shadow-sm" key={item.title}>
                <item.icon className="text-[#1B6B3A]" size={24} />
                <p className="mt-3 font-semibold">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        <form className="rounded-xl border border-[#D1D1D1] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Submit bulk inquiry</h2>
          <div className="mt-5 grid gap-3">
            <input className="rounded-lg border border-[#D1D1D1] px-4 py-3 text-sm" placeholder="Product or category" />
            <div className="grid grid-cols-2 gap-3">
              <input className="rounded-lg border border-[#D1D1D1] px-4 py-3 text-sm" placeholder="Quantity" />
              <select className="rounded-lg border border-[#D1D1D1] px-4 py-3 text-sm">
                <option>Bags</option>
                <option>Kg</option>
                <option>Boxes</option>
                <option>Pieces</option>
              </select>
            </div>
            <input className="rounded-lg border border-[#D1D1D1] px-4 py-3 text-sm" placeholder="Delivery city / PIN code" />
            <input className="rounded-lg border border-[#D1D1D1] px-4 py-3 text-sm" placeholder="Mobile number" />
            <textarea className="min-h-24 rounded-lg border border-[#D1D1D1] px-4 py-3 text-sm" placeholder="Any brand preference, delivery timeline or billing details" />
            <button className="rounded-lg bg-[#1B6B3A] px-5 py-3 text-sm font-semibold text-white">Get custom quote</button>
          </div>
        </form>
      </section>
      <section className="bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-[1280px] gap-4 lg:grid-cols-3">
          {["Farm owners", "Retail counters", "Clinics and vets"].map((item) => (
            <article className="rounded-lg border border-[#D1D1D1] p-5" key={item}>
              <CheckCircle2 className="text-[#1B6B3A]" size={22} />
              <h3 className="mt-4 font-semibold">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">Bulk quote flow supports recurring orders, transparent pricing and dispatch coordination.</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-[1280px]">
          <Link className="font-semibold text-[#1B6B3A]" href="/products">Browse products before inquiry</Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
