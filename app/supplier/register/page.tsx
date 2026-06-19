import Link from "next/link";
import { CheckCircle2, FileCheck, ShieldCheck, Store } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Register Supplier | AnimKart",
  description: "Apply to sell animal healthcare, feed and farm products on AnimKart."
};

export default function SupplierRegisterPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <SiteHeader />
      <section className="mx-auto grid max-w-[1280px] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_430px]">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">Sell on AnimKart</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight">Register your brand, distributor or farm supply business.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#3D3D3D]">
            AnimKart supplier onboarding checks catalog quality, GST details, dispatch capability and product compliance.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Business KYC", icon: FileCheck },
              { title: "Catalog review", icon: Store },
              { title: "Approval", icon: ShieldCheck }
            ].map((item) => (
              <div className="rounded-lg border border-[#D1D1D1] bg-white p-5" key={item.title}>
                <item.icon className="text-[#1B6B3A]" size={24} />
                <p className="mt-3 font-semibold">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        <form action="/supplier/dashboard" className="rounded-xl border border-[#D1D1D1] bg-white p-6 shadow-sm" method="get">
          <h2 className="text-2xl font-semibold">Supplier application</h2>
          <div className="mt-5 grid gap-3">
            <input className="rounded-lg border border-[#D1D1D1] px-4 py-3 text-sm" placeholder="Business name" />
            <input className="rounded-lg border border-[#D1D1D1] px-4 py-3 text-sm" placeholder="GSTIN / PAN" />
            <input className="rounded-lg border border-[#D1D1D1] px-4 py-3 text-sm" placeholder="Contact person" />
            <input className="rounded-lg border border-[#D1D1D1] px-4 py-3 text-sm" placeholder="Mobile number" />
            <select className="rounded-lg border border-[#D1D1D1] px-4 py-3 text-sm">
              <option>Animal healthcare</option>
              <option>Animal feed</option>
              <option>Pet care</option>
              <option>Equipment</option>
            </select>
            <button className="rounded-lg bg-[#1B6B3A] px-5 py-3 text-sm font-semibold text-white">Register & open dashboard</button>
          </div>
        </form>
      </section>
      <section className="bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-2xl font-semibold">Onboarding checklist</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["GST certificate", "Bank details", "Product price list", "Dispatch PIN codes"].map((item) => (
              <p className="flex items-center gap-2 rounded-lg border border-[#D1D1D1] p-4 text-sm font-semibold" key={item}>
                <CheckCircle2 className="text-[#1B6B3A]" size={18} /> {item}
              </p>
            ))}
          </div>
          <Link className="mt-6 inline-flex font-semibold text-[#1B6B3A]" href="/supplier">Back to supplier portal</Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
