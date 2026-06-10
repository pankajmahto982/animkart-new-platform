import Link from "next/link";
import { Minus, Plus, ShieldCheck, ShoppingCart, Trash2, Truck } from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatINR, getFeaturedProducts } from "@/lib/products";

const cartItems = getFeaturedProducts(3);
const subtotal = cartItems.reduce((total, product) => total + product.price, 0);
const shipping = 180;
const gst = Math.round(subtotal * 0.18);

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
      <SiteHeader />
      <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-bold">Cart</h1>
        <p className="mt-2 text-sm text-[#6B6B6B]">Items are grouped by supplier for future marketplace split payments.</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-[#D1D1D1]">
            <div className="border-b border-[#D1D1D1] p-4">
              <p className="font-semibold text-[#1B6B3A]">Vendor: AnimKart verified supplier</p>
              <p className="mt-1 text-sm text-[#6B6B6B]">GST invoice available - Shipping calculated by zone</p>
            </div>
            {cartItems.map((product) => (
              <div className="grid gap-4 border-b border-[#D1D1D1]/70 p-4 sm:grid-cols-[112px_1fr_auto]" key={product.id}>
                <div className="relative aspect-square rounded-lg border border-[#D1D1D1]">
                  <ProductImage alt={product.name} category={product.category} src={product.image} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-[#1B6B3A]">{product.category}</p>
                  <h2 className="mt-1 font-semibold">{product.name}</h2>
                  <p className="mt-2 text-sm text-[#6B6B6B]">In stock - Incl. GST</p>
                  <button className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#DC2626]">
                    <Trash2 size={15} />
                    Remove
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                  <p className="text-lg font-bold">{formatINR(product.price)}</p>
                  <div className="mt-3 flex h-10 items-center rounded-lg border border-[#D1D1D1]">
                    <button className="grid size-10 place-items-center">
                      <Minus size={15} />
                    </button>
                    <span className="px-3 font-semibold">1</span>
                    <button className="grid size-10 place-items-center">
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="h-fit rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#D1D1D1]">
            <h2 className="text-xl font-semibold">Order summary</h2>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated GST</span>
                <span>{formatINR(gst)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatINR(shipping)}</span>
              </div>
              <div className="border-t border-[#D1D1D1] pt-3 text-base font-bold">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>{formatINR(subtotal + gst + shipping)}</span>
                </div>
              </div>
            </div>
            <Link className="mt-5 flex h-11 items-center justify-center gap-2 rounded-lg bg-[#1B6B3A] font-semibold text-white" href="/checkout">
              <ShoppingCart size={18} />
              Proceed to checkout
            </Link>
            <div className="mt-4 grid gap-2 text-sm text-[#3D3D3D]">
              <p className="flex items-center gap-2">
                <ShieldCheck className="text-[#1B6B3A]" size={17} />
                Secure payment with Razorpay
              </p>
              <p className="flex items-center gap-2">
                <Truck className="text-[#1B6B3A]" size={17} />
                Freight quote for bulk products
              </p>
            </div>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
