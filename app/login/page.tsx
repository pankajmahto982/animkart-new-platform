import Link from "next/link";
import { LockKeyhole, Phone, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Login | AnimKart",
  description: "Login or register with AnimKart."
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <SiteHeader />
      <section className="mx-auto grid max-w-[980px] gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_420px]">
        <div className="rounded-xl bg-[#1B6B3A] p-8 text-white">
          <ShieldCheck size={32} />
          <h1 className="mt-4 text-4xl font-bold leading-tight">Login to buy faster and track every farm order.</h1>
          <p className="mt-4 text-sm leading-6 text-white/80">
            Save delivery addresses, view invoices, request vet help and manage bulk quote conversations.
          </p>
        </div>
        <form className="rounded-xl border border-[#D1D1D1] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Mobile login</h2>
          <p className="mt-2 text-sm text-[#6B6B6B]">OTP login placeholder for the next backend step.</p>
          <label className="mt-5 block text-sm font-semibold">Mobile number</label>
          <div className="mt-2 flex items-center rounded-lg border border-[#D1D1D1]">
            <Phone className="ml-3 text-[#6B6B6B]" size={18} />
            <input className="min-w-0 flex-1 px-3 py-3 text-sm outline-none" placeholder="+91 98765 43210" />
          </div>
          <button className="mt-5 w-full rounded-lg bg-[#1B6B3A] px-5 py-3 text-sm font-semibold text-white">Send OTP</button>
          <p className="mt-4 flex items-center gap-2 text-xs text-[#6B6B6B]">
            <LockKeyhole size={15} /> Secure login for customers and suppliers.
          </p>
          <Link className="mt-6 inline-flex text-sm font-semibold text-[#1B6B3A]" href="/account">
            Continue to demo account
          </Link>
        </form>
      </section>
      <SiteFooter />
    </main>
  );
}
