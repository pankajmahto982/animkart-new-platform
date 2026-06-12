import Link from "next/link";
import { BarChart3, CheckCircle2, PackageCheck, Store, Truck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Supplier Portal | AnimKart",
  description: "AnimKart supplier operations dashboard for catalog, orders, dispatch and payouts."
};

export default function SupplierPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <SiteHeader />
      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">AnimKart supplier OS</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight">Manage products, orders and dispatch from one supplier workspace.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#3D3D3D]">
              A modern supplier flow for veterinary brands, feed manufacturers, distributors and farm supply partners.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="rounded-lg bg-[#1B6B3A] px-6 py-3 text-center font-semibold text-white" href="/supplier/register">Register supplier</Link>
              <Link className="rounded-lg border border-[#1B6B3A] bg-white px-6 py-3 text-center font-semibold text-[#1B6B3A]" href="/stores">View public stores</Link>
            </div>
          </div>
          <div className="rounded-xl bg-[#1B6B3A] p-6 text-white">
            <Store size={30} />
            <h2 className="mt-4 text-2xl font-semibold">Supplier health</h2>
            <div className="mt-5 grid gap-3">
              {[
                ["86", "Active SKUs"],
                ["24", "Orders today"],
                ["98%", "Dispatch SLA"]
              ].map(([value, label]) => (
                <div className="rounded-lg bg-white/12 p-4" key={label}>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-sm text-white/75">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Catalog upload", text: "Add medicines, feed, price and stock.", icon: PackageCheck },
            { title: "Order queue", text: "Accept, pack and update dispatch.", icon: Truck },
            { title: "Performance", text: "Track conversion, SLA and returns.", icon: BarChart3 },
            { title: "Compliance", text: "GST, invoices and approvals.", icon: CheckCircle2 }
          ].map((item) => (
            <article className="rounded-lg border border-[#D1D1D1] bg-white p-5 shadow-sm" key={item.title}>
              <item.icon className="text-[#1B6B3A]" size={24} />
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
