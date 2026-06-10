import Link from "next/link";
import { BookOpen, HeartPulse, MessageCircle, PackageCheck, Phone, Truck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Help Center | AnimKart",
  description: "AnimKart help center for orders, products, vet consultation and supplier support."
};

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <SiteHeader />
      <section className="bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-[980px] text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-[#1B6B3A]">Help center</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight">Support for farmers, pet parents, suppliers and clinics.</h1>
          <p className="mt-4 text-base leading-7 text-[#6B6B6B]">
            Find help for product selection, orders, bulk quotes, vet consultation and supplier onboarding.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Order support", text: "Tracking, invoice and delivery help.", icon: Truck, href: "/orders" },
            { title: "Product guidance", text: "Choose medicine, feed and supplements.", icon: PackageCheck, href: "/products" },
            { title: "Vet consultation", text: "Join waitlist for expert support.", icon: HeartPulse, href: "/vet" },
            { title: "Bulk inquiry", text: "Wholesale quote and freight help.", icon: BookOpen, href: "/bulk-inquiry" },
            { title: "Supplier support", text: "Registration and catalog help.", icon: MessageCircle, href: "/supplier" },
            { title: "Call back", text: "Request phone support from team.", icon: Phone, href: "/account" }
          ].map((item) => (
            <Link className="rounded-lg border border-[#D1D1D1] bg-white p-5 shadow-sm hover:border-[#1B6B3A]" href={item.href} key={item.title}>
              <item.icon className="text-[#1B6B3A]" size={24} />
              <h2 className="mt-4 font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">{item.text}</p>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
