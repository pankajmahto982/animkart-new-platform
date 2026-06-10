import Link from "next/link";
import {
  Bell,
  BookOpen,
  HeartPulse,
  LayoutDashboard,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  Store,
  Truck,
  UserRound
} from "lucide-react";

const navItems = [
  { label: "Categories", href: "/categories" },
  { label: "Products", href: "/products" },
  { label: "Vet Consult", href: "/vet" },
  { label: "Bulk Inquiry", href: "/bulk-inquiry" },
  { label: "Supplier", href: "/supplier" },
  { label: "Admin", href: "/admin" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#D1D1D1]/70 bg-white/95 backdrop-blur">
      <div className="hidden bg-[#1B6B3A] text-white md:block">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-2 text-xs font-semibold">
          <div className="flex items-center gap-6">
            <Link className="flex items-center gap-1 text-white/85 hover:text-white" href="/help">
              <BookOpen size={15} />
              Help
            </Link>
            <Link className="flex items-center gap-1 text-white/85 hover:text-white" href="/bulk-inquiry">
              <Truck size={15} />
              Bulk Inquiry
            </Link>
            <Link className="flex items-center gap-1 text-white/85 hover:text-white" href="/supplier/register">
              <Store size={15} />
              Sell
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link className="flex items-center gap-1 text-white/85 hover:text-white" href="/vet">
              <HeartPulse size={15} />
              Vet Consultation
            </Link>
            <Link className="flex items-center gap-1 text-white/85 hover:text-white" href="/orders">
              <Truck size={15} />
              Track Order
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-4 py-3 sm:px-6">
        <Link className="flex shrink-0 items-center gap-2" href="/">
          <span className="grid size-11 place-items-center rounded-lg bg-[#1B6B3A] text-xl font-black text-white shadow-sm">
            A
          </span>
          <span>
            <span className="block text-xl font-bold leading-6">AnimKart</span>
            <span className="hidden text-[11px] font-semibold uppercase tracking-wide text-[#1B6B3A] sm:block">
              Farmer trusted animal health
            </span>
          </span>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center overflow-hidden rounded-lg border border-[#D1D1D1] bg-white shadow-sm focus-within:border-[#1B6B3A] lg:flex">
          <Search className="ml-4 text-[#6B6B6B]" size={19} />
          <input
            className="min-w-0 flex-1 border-0 bg-transparent px-3 py-3 text-sm font-medium outline-none"
            placeholder="Search medicines, feed, supplements, brands..."
          />
          <Link className="bg-[#1B6B3A] px-6 py-3 text-xs font-bold text-white" href="/products">
            SEARCH
          </Link>
        </div>

        <div className="ml-auto hidden items-center gap-2 text-[#3D3D3D] lg:flex">
          <MapPin size={20} />
          <div className="leading-tight">
            <p className="text-[10px] font-black uppercase">Deliver to</p>
            <p className="text-xs font-semibold text-[#1A1A1A]">Bengaluru 560001</p>
          </div>
        </div>

        <Link className="hidden text-[#3D3D3D] hover:text-[#1B6B3A] sm:block" href="/account" aria-label="Account">
          <UserRound size={23} />
        </Link>
        <button className="hidden text-[#3D3D3D] hover:text-[#1B6B3A] sm:block" aria-label="Notifications">
          <Bell size={23} />
        </button>
        <Link className="relative text-[#3D3D3D] hover:text-[#1B6B3A]" href="/cart" aria-label="Cart">
          <ShoppingCart size={25} />
          <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-[#DC2626] text-[10px] font-bold text-white">
            3
          </span>
        </Link>
        <Link className="hidden rounded-lg bg-[#1B6B3A] px-4 py-2 text-xs font-bold text-white shadow-sm md:block" href="/login">
          Login
        </Link>
        <button className="md:hidden" aria-label="Open menu">
          <Menu />
        </button>
      </div>

      <nav className="border-t border-[#D1D1D1]/60 bg-white">
        <div className="mx-auto flex max-w-[1280px] gap-2 overflow-x-auto px-4 py-3 text-sm font-semibold text-[#3D3D3D] sm:px-6">
          {navItems.map((item) => (
            <Link
              className="shrink-0 rounded-full border border-[#D1D1D1] bg-white px-4 py-2 hover:text-[#1B6B3A]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link className="shrink-0 rounded-full bg-[#FEF3DC] px-4 py-2 text-[#1A1A1A]" href="/products">
            Offers
          </Link>
          <Link className="shrink-0 rounded-full border border-[#D1D1D1] bg-white px-4 py-2 hover:text-[#1B6B3A]" href="/admin">
            <LayoutDashboard className="mr-1 inline" size={15} />
            Ops
          </Link>
        </div>
      </nav>
    </header>
  );
}
