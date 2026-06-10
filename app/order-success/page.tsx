import Link from "next/link";
import { CheckCircle2, PackageCheck, Truck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <SiteHeader />
      <section className="mx-auto max-w-[860px] px-4 py-16 text-center sm:px-6">
        <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-[#D1D1D1]">
          <CheckCircle2 className="mx-auto text-[#16A34A]" size={64} />
          <h1 className="mt-5 text-3xl font-bold">Order request received</h1>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-[#3D3D3D]">
            Your AnimKart order has been captured for the MVP flow. Supplier acceptance, shipping estimate and
            Razorpay capture will be connected in the backend phase.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-[#EDF7F1] p-5 text-left">
              <PackageCheck className="text-[#1B6B3A]" />
              <p className="mt-3 font-semibold">Order ID</p>
              <p className="text-sm text-[#3D3D3D]">AK-MVP-2026-001</p>
            </div>
            <div className="rounded-lg bg-[#FEF3DC] p-5 text-left">
              <Truck />
              <p className="mt-3 font-semibold">Delivery estimate</p>
              <p className="text-sm text-[#3D3D3D]">Shown after supplier confirmation</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link className="rounded-lg bg-[#1B6B3A] px-5 py-3 font-semibold text-white" href="/products">
              Continue shopping
            </Link>
            <Link className="rounded-lg border border-[#1B6B3A] px-5 py-3 font-semibold text-[#1B6B3A]" href="/orders">
              View order
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
