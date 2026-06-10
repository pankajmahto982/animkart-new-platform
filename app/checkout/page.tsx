import Link from "next/link";
import { CheckCircle2, CreditCard, MapPin, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatINR, getFeaturedProducts } from "@/lib/products";

const checkoutItems = getFeaturedProducts(2);
const total = checkoutItems.reduce((sum, product) => sum + product.price, 0);

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <SiteHeader />
      <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <div className="mt-4 grid gap-2 sm:grid-cols-4">
          {["Cart", "Address", "Payment", "Confirm"].map((step, index) => (
            <div className={index < 3 ? "rounded bg-[#1B6B3A] p-3 text-center text-sm font-semibold text-white" : "rounded bg-white p-3 text-center text-sm font-semibold"} key={step}>
              {step}
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-6">
            <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#D1D1D1]">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <MapPin className="text-[#1B6B3A]" />
                Delivery address
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {["Full name", "Phone", "Pincode", "City / State"].map((field) => (
                  <label className="grid gap-1 text-sm font-semibold" key={field}>
                    {field}
                    <input className="h-11 rounded-lg border border-[#D1D1D1] px-3 font-normal" placeholder={field} />
                  </label>
                ))}
              </div>
              <label className="mt-4 grid gap-1 text-sm font-semibold">
                Address
                <textarea className="min-h-24 rounded-lg border border-[#D1D1D1] px-3 py-2 font-normal" placeholder="House, village, district, landmark" />
              </label>
            </section>
            <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#D1D1D1]">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <CreditCard className="text-[#1B6B3A]" />
                Payment
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {["UPI", "Cards", "Net Banking"].map((item) => (
                  <button className="rounded-lg border border-[#D1D1D1] p-4 text-left font-semibold hover:border-[#1B6B3A]" key={item}>
                    {item}
                    <p className="mt-1 text-xs font-normal text-[#6B6B6B]">Razorpay ready</p>
                  </button>
                ))}
              </div>
            </section>
          </div>
          <aside className="h-fit rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#D1D1D1]">
            <h2 className="text-xl font-semibold">Review order</h2>
            <div className="mt-4 grid gap-3">
              {checkoutItems.map((product) => (
                <div className="flex justify-between gap-3 text-sm" key={product.id}>
                  <span className="line-clamp-1">{product.name}</span>
                  <span className="font-semibold">{formatINR(product.price)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-[#D1D1D1] pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>
              <p className="mt-2 text-xs text-[#6B6B6B]">GST and shipping shown before payment capture.</p>
            </div>
            <Link className="mt-5 flex h-11 items-center justify-center gap-2 rounded-lg bg-[#1B6B3A] font-semibold text-white" href="/order-success">
              <CheckCircle2 size={18} />
              Place order
            </Link>
            <p className="mt-4 flex items-center gap-2 text-sm text-[#3D3D3D]">
              <ShieldCheck className="text-[#1B6B3A]" size={17} />
              Payment webhook verification planned in backend phase.
            </p>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
