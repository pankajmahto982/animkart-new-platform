import Link from "next/link";
import { HeartPulse, MapPin, PackageCheck, UserRound } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "My Account | AnimKart",
  description: "AnimKart customer dashboard for orders, addresses and vet requests."
};

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <SiteHeader />
      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-[#D1D1D1]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid size-16 place-items-center rounded-xl bg-[#EDF7F1] text-[#1B6B3A]">
                <UserRound size={30} />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#1B6B3A]">Buyer account</p>
                <h1 className="text-3xl font-bold">Welcome to AnimKart</h1>
                <p className="mt-1 text-sm text-[#6B6B6B]">Manage farm orders, saved addresses and vet requests.</p>
              </div>
            </div>
            <Link className="rounded-lg bg-[#1B6B3A] px-5 py-3 text-center text-sm font-semibold text-white" href="/orders">
              Track orders
            </Link>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { title: "Recent orders", value: "3 active", icon: PackageCheck, href: "/orders" },
            { title: "Saved address", value: "Bengaluru 560001", icon: MapPin, href: "/checkout" },
            { title: "Vet requests", value: "1 waitlisted", icon: HeartPulse, href: "/vet" }
          ].map((item) => (
            <Link className="rounded-lg border border-[#D1D1D1] bg-white p-5 shadow-sm hover:border-[#1B6B3A]" href={item.href} key={item.title}>
              <item.icon className="text-[#1B6B3A]" size={24} />
              <h2 className="mt-4 font-semibold">{item.title}</h2>
              <p className="mt-1 text-sm text-[#6B6B6B]">{item.value}</p>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
