import Link from "next/link";
import { LucideIcon } from "lucide-react";

type SidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type DashboardSidebarProps = {
  active: string;
  eyebrow: string;
  items: SidebarItem[];
};

export function DashboardSidebar({ active, eyebrow, items }: DashboardSidebarProps) {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 text-white xl:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="border-b border-white/10 p-6">
          <Link className="flex items-center gap-3" href="/">
            <span className="grid size-11 place-items-center rounded-xl bg-[#0B8F47] text-xl font-black">A</span>
            <span>
              <span className="block text-lg font-bold">AnimKart OS</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-300">{eyebrow}</span>
            </span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {items.map((item) => {
            const isActive = item.label === active;
            const className = isActive
              ? "flex items-center gap-3 rounded-lg bg-[#0B8F47] px-3 py-2.5 text-sm font-semibold text-white"
              : "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/8 hover:text-white";

            return item.href.startsWith("#") ? (
              <a className={className} href={item.href} key={item.label}>
                <item.icon size={18} />
                {item.label}
              </a>
            ) : (
              <Link className={className} href={item.href} key={item.label}>
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="m-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Supabase-ready</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Real product catalog data now. Orders, payments, vet and support events can plug into Supabase tables next.
          </p>
        </div>
      </div>
    </aside>
  );
}
