import Link from "next/link";
import { AlertTriangle, BarChart3, CheckCircle2, ClipboardList, PackageCheck, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getTopCategories, products } from "@/lib/products";

const categories = getTopCategories(6);

export const metadata = {
  title: "Admin OS | AnimKart",
  description: "AnimKart admin operations dashboard for marketplace, supplier, order and support control."
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <SiteHeader />
      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">Marketplace operations</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight">Admin OS for product approvals, suppliers, orders and farmer support.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#3D3D3D]">
              A control center for AnimKart team members to monitor catalog quality, quote requests, dispatch exceptions and support queues.
            </p>
          </div>
          <div className="rounded-xl bg-[#1A1A1A] p-6 text-white">
            <BarChart3 size={30} />
            <h2 className="mt-4 text-2xl font-semibold">Today overview</h2>
            <div className="mt-5 grid gap-3">
              {[
                [products.length.toLocaleString("en-IN"), "Catalog SKUs"],
                ["18", "Pending quotes"],
                ["6", "Supplier approvals"]
              ].map(([value, label]) => (
                <div className="rounded-lg bg-white/10 p-4" key={label}>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-sm text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Product approval", text: "Images, price, GST and category checks.", icon: PackageCheck },
            { title: "Quote queue", text: "Bulk order assignment and supplier follow-up.", icon: ClipboardList },
            { title: "Trust alerts", text: "Low stock, broken images and dispatch delays.", icon: AlertTriangle },
            { title: "Compliance", text: "Supplier KYC and listing approvals.", icon: ShieldCheck }
          ].map((item) => (
            <article className="rounded-lg border border-[#D1D1D1] bg-white p-5 shadow-sm" key={item.title}>
              <item.icon className="text-[#1B6B3A]" size={24} />
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_420px]">
          <section className="rounded-xl border border-[#D1D1D1] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Category health</h2>
            <div className="mt-5 grid gap-3">
              {categories.map((category) => (
                <div className="flex items-center justify-between rounded-lg bg-[#F5F5F5] p-4" key={category.name}>
                  <div>
                    <p className="font-semibold">{category.name}</p>
                    <p className="text-sm text-[#6B6B6B]">Catalog depth and farmer demand visible</p>
                  </div>
                  <span className="rounded-full bg-[#EDF7F1] px-3 py-1 text-sm font-semibold text-[#1B6B3A]">
                    {category.count}
                  </span>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-xl bg-[#EDF7F1] p-6 ring-1 ring-[#D1D1D1]">
            <h2 className="text-2xl font-semibold">Next actions</h2>
            <div className="mt-5 grid gap-3">
              {["Approve imported product images", "Map quote requests to supplier", "Call farmer for high-value bulk lead", "Review vet waitlist"].map((item) => (
                <p className="flex items-center gap-2 rounded-lg bg-white p-4 text-sm font-semibold" key={item}>
                  <CheckCircle2 className="text-[#1B6B3A]" size={18} /> {item}
                </p>
              ))}
            </div>
            <Link className="mt-5 inline-flex rounded-lg bg-[#1B6B3A] px-5 py-3 text-sm font-semibold text-white" href="/supplier">
              Open supplier portal
            </Link>
          </section>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
