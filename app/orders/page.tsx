import Link from "next/link";
import { CheckCircle2, Clock, PackageCheck, Truck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Orders | AnimKart",
  description: "Track AnimKart orders and delivery progress."
};

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <SiteHeader />
      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">Order tracking</p>
            <h1 className="mt-2 text-4xl font-bold">Track farm orders and invoices</h1>
            <p className="mt-3 text-sm text-[#6B6B6B]">Demo order timeline ready for the connected marketplace flow.</p>
          </div>
          <Link className="rounded-lg bg-[#1B6B3A] px-5 py-3 text-center text-sm font-semibold text-white" href="/products">
            Continue shopping
          </Link>
        </div>
        <div className="mt-8 grid gap-5">
          {[
            ["AK-2026-1042", "Cattle feed and mineral mixture", "Packed", "Arriving tomorrow"],
            ["AK-2026-1038", "Pet food and supplement", "In transit", "Out for delivery"],
            ["AK-2026-1021", "Bulk poultry feed inquiry", "Quote pending", "Supplier review"]
          ].map(([id, title, status, eta], index) => (
            <article className="rounded-xl border border-[#D1D1D1] bg-white p-5 shadow-sm" key={id}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">{id}</p>
                  <h2 className="mt-1 text-xl font-semibold">{title}</h2>
                  <p className="mt-1 text-sm text-[#6B6B6B]">{eta}</p>
                </div>
                <span className="w-fit rounded-full bg-[#EDF7F1] px-4 py-2 text-sm font-semibold text-[#1B6B3A]">{status}</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-4">
                {[PackageCheck, CheckCircle2, Truck, Clock].map((Icon, step) => (
                  <div className={step <= index + 1 ? "rounded-lg bg-[#EDF7F1] p-3 text-[#1B6B3A]" : "rounded-lg bg-[#F5F5F5] p-3 text-[#6B6B6B]"} key={step}>
                    <Icon size={19} />
                    <p className="mt-2 text-xs font-semibold">Step {step + 1}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
