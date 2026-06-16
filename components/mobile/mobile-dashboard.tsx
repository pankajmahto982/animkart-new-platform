import Link from "next/link";
import {
  Bell,
  CalendarDays,
  Grid2X2,
  Home,
  Package,
  Plus,
  Search,
  Stethoscope,
  UserRound,
  Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileDashboard as MobileDashboardData } from "@/lib/mobile-dashboard-data";

const navItems = [
  { label: "Home", icon: Home },
  { label: "Categories", icon: Grid2X2 },
  { label: "Orders", icon: Package },
  { label: "Vet", icon: Stethoscope },
  { label: "Profile", icon: UserRound }
];

export function MobileDashboard({ data }: { data: MobileDashboardData }) {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <section className="mx-auto min-h-screen max-w-[430px] bg-white shadow-2xl shadow-slate-300/60">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <Link className="flex items-center gap-2" href="/">
              <span className="grid size-10 place-items-center rounded-xl bg-[#0B8F47] text-lg font-black text-white">A</span>
              <span>
                <span className="block text-sm font-black leading-none">AnimKart</span>
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#0B8F47]">{data.eyebrow}</span>
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <Button aria-label="Calendar" className="size-10 p-0" variant="outline">
                <CalendarDays size={17} />
              </Button>
              <Button aria-label="Notifications" className="relative size-10 p-0" variant="outline">
                <Bell size={17} />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
              </Button>
            </div>
          </div>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input className="h-12 rounded-2xl bg-slate-50 pl-10 text-base" placeholder={data.searchPlaceholder} />
          </div>
        </header>

        <div className="space-y-5 px-4 pb-28 pt-4">
          <section className="overflow-hidden rounded-3xl bg-slate-950 text-white">
            <div className="p-5">
              <Badge>{data.eyebrow}</Badge>
              <h1 className="mt-4 text-3xl font-black leading-tight">{data.title}</h1>
              <p className="mt-3 text-sm leading-6 text-slate-300">{data.subtitle}</p>
              <Button className="mt-5 h-12 w-full bg-[#0B8F47] text-white hover:bg-[#08783c]">
                <Zap size={18} />
                {data.primaryCta}
              </Button>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-3">
            {data.metrics.map((metric) => (
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" key={metric.label}>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{metric.label}</p>
                <p className="mt-2 text-2xl font-black text-slate-950">{metric.value}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{metric.detail}</p>
              </article>
            ))}
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-black">Categories</h2>
              <span className="text-xs font-bold text-[#0B8F47]">View all</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {data.categories.map((category) => (
                <button className="h-11 shrink-0 rounded-full border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700" key={category}>
                  {category}
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-black">Quick Actions</h2>
              <span className="text-xs font-bold text-[#0B8F47]">Fast tools</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {data.actions.map((action) => (
                <button className="min-h-24 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left shadow-sm" key={action.label}>
                  <span className="grid size-9 place-items-center rounded-xl bg-emerald-50 text-[#0B8F47]">
                    <Plus size={17} />
                  </span>
                  <span className="mt-3 block text-sm font-black text-slate-950">{action.label}</span>
                  <span className="mt-1 line-clamp-2 block text-xs leading-5 text-slate-500">{action.detail}</span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-black">{data.role === "buyer" ? "Recent Orders" : data.role === "supplier" ? "Operations" : data.role === "vet" ? "Appointments" : "Command Cards"}</h2>
            <div className="grid gap-3">
              {data.cards.map((card) => (
                <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" key={card.title}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-black text-slate-950">{card.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{card.subtitle}</p>
                    </div>
                    <Badge className="bg-emerald-50 text-[#0B8F47]">{card.status}</Badge>
                  </div>
                  <p className="mt-3 text-sm font-bold text-slate-700">{card.meta}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-black">Tracking Timeline</h2>
            <div className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              {data.timeline.map((step, index) => (
                <div className="flex gap-3" key={step.title}>
                  <div className="flex flex-col items-center">
                    <span className="grid size-9 place-items-center rounded-full bg-[#0B8F47] text-sm font-black text-white">{index + 1}</span>
                    {index < data.timeline.length - 1 ? <span className="my-1 h-full min-h-5 w-px bg-slate-200" /> : null}
                  </div>
                  <div className="min-w-0 flex-1 pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-black text-slate-950">{step.title}</p>
                      <span className="shrink-0 text-xs font-bold text-[#0B8F47]">{step.status}</span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{step.subtitle}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-400">{step.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <button className="fixed bottom-20 left-1/2 z-40 flex h-14 w-[min(390px,calc(100vw-32px))] -translate-x-1/2 items-center justify-center rounded-2xl bg-[#0B8F47] text-base font-black text-white shadow-2xl shadow-emerald-900/25">
          {data.stickyCta}
        </button>

        <nav className="fixed bottom-0 left-1/2 z-40 grid w-full max-w-[430px] -translate-x-1/2 grid-cols-5 border-t border-slate-200 bg-white/95 px-2 pb-2 pt-2 backdrop-blur">
          {navItems.map((item, index) => (
            <button className={index === 0 ? "grid place-items-center gap-1 text-[#0B8F47]" : "grid place-items-center gap-1 text-slate-500"} key={item.label}>
              <item.icon size={20} />
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          ))}
        </nav>
      </section>
    </main>
  );
}
