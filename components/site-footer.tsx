import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded bg-white text-sm font-black text-[#1B6B3A]">
              A
            </span>
            <span className="font-bold">AnimKart</span>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/70">
            India&apos;s animal health marketplace for farmers, pet owners, suppliers and veterinary support.
          </p>
        </div>
        {[
          ["Company", ["About", "Careers", "Sell with us", "Supplier portal"]],
          ["Support", ["Help", "Track order", "Returns", "Contact"]],
          ["Legal", ["Privacy", "Terms", "GST", "Refund policy"]]
        ].map(([heading, links]) => (
          <div key={heading as string}>
            <h3 className="mb-4 font-semibold text-white">{heading as string}</h3>
            <div className="grid gap-2 text-sm text-white/70">
              {(links as string[]).map((link) => (
                <Link href="/help" key={link} className="hover:text-white">
                  {link}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 border-t border-white/10 px-4 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>Copyright 2026 AnimKart. Anim Pet Ecomm Pvt. Ltd.</span>
        <span>Razorpay - UPI - Visa - Mastercard</span>
      </div>
    </footer>
  );
}
