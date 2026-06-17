import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Download,
  Headphones,
  MessageCircle,
  PackageCheck,
  Phone,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Truck,
  WalletCards,
  XCircle
} from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrderTrackingData, seededOrderIds, TimelineStep } from "@/lib/order-tracking-data";

const stepClass = {
  complete: "border-[#0B8F47] bg-emerald-50 text-[#0B8F47]",
  current: "border-amber-300 bg-amber-50 text-amber-700",
  pending: "border-slate-200 bg-slate-50 text-slate-500",
  issue: "border-rose-200 bg-rose-50 text-rose-700"
};

const alertClass = {
  success: "border-emerald-200 bg-emerald-50 text-[#0B8F47]",
  info: "border-sky-200 bg-sky-50 text-sky-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  critical: "border-rose-200 bg-rose-50 text-rose-700"
};

export function generateStaticParams() {
  return seededOrderIds.map((orderId) => ({ "order-id": orderId }));
}

export async function generateMetadata({ params }: { params: Promise<{ "order-id": string }> }) {
  const { "order-id": orderId } = await params;

  return {
    title: `${orderId.toUpperCase()} Tracking | AnimKart`,
    description: "Buyer order tracking page for AnimKart marketplace orders."
  };
}

export default async function BuyerOrderTrackingPage({ params }: { params: Promise<{ "order-id": string }> }) {
  const { "order-id": orderId } = await params;
  const order = getOrderTrackingData(orderId);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <SiteHeader />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-2 px-4 py-3 text-sm text-slate-500 sm:px-6">
          <Link className="inline-flex items-center gap-2 font-semibold text-[#0B8F47]" href="/buyer/dashboard">
            <ArrowLeft size={16} />
            Buyer Dashboard
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-700">Order Tracking</span>
          <span>/</span>
          <span>{order.orderId}</span>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6">
        <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-6">
            <section className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl shadow-slate-300/50">
              <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[1fr_auto] xl:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>Order Tracking</Badge>
                    <Badge className="bg-white/10 text-white">{order.paymentStatus}</Badge>
                    <Badge className="bg-amber-50 text-amber-700">{order.deliveryStatus}</Badge>
                  </div>
                  <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">{order.orderId}</h1>
                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300 sm:text-base">
                    Track supplier confirmation, freight charges, packing, courier dispatch, delivery and support from one trusted AnimKart order screen.
                  </p>
                </div>
                <Button className="h-12 gap-2 bg-[#0B8F47] px-5 text-white hover:bg-[#08783c]">
                  <Download size={18} />
                  Invoice Download
                </Button>
              </div>
              <div className="grid gap-px bg-white/10 sm:grid-cols-2 xl:grid-cols-6">
                {[
                  ["Order Date", order.orderDate],
                  ["Supplier Name", order.supplierName],
                  ["Payment Status", order.paymentStatus],
                  ["Order Status", order.orderStatus],
                  ["Delivery Status", order.deliveryStatus],
                  ["Invoice", order.invoiceStatus]
                ].map(([label, value]) => (
                  <div className="bg-slate-950/80 p-4" key={label}>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-300">{label}</p>
                    <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Order Timeline</CardTitle>
                  <CardDescription>Supplier confirmation, packing, shipping, delivery and completion status.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Timeline steps={order.timeline} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alternative Status</CardTitle>
                  <CardDescription>Cancellation, rejection and refund paths if the order cannot proceed.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Timeline compact steps={order.alternativeTimeline} />
                </CardContent>
              </Card>
            </section>

            <Card>
              <CardHeader>
                <CardTitle>Product Card</CardTitle>
                <CardDescription>Product, quantity, shipping charge, GST and final payable amount.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-4 lg:grid-cols-[180px_1fr]">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200">
                    <ProductImage alt={order.product.name} category={order.product.category} src={order.product.image} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <Badge className="bg-emerald-50 text-[#0B8F47]">{order.product.category}</Badge>
                        <h2 className="mt-3 max-w-4xl text-2xl font-black leading-tight text-slate-950">{order.product.name}</h2>
                        <p className="mt-2 text-sm font-semibold text-slate-500">Brand: {order.product.brand}</p>
                      </div>
                      <Badge className="bg-slate-100 text-slate-700">{order.orderStatus}</Badge>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                      {[
                        ["Quantity", order.product.quantity],
                        ["Price", order.product.price],
                        ["Shipping Charge", order.product.shippingCharge],
                        ["GST", order.product.gst],
                        ["Total Amount", order.product.totalAmount]
                      ].map(([label, value]) => (
                        <div className="rounded-xl bg-slate-50 p-3" key={label}>
                          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
                          <p className="mt-2 text-lg font-black text-slate-950">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <section className="grid gap-6 xl:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Details</CardTitle>
                  <CardDescription>Address, supplier location, courier, tracking, delivery estimate and pickup status.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {order.shippingDetails.map((detail) => (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={detail.label}>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{detail.label}</p>
                      <p className="mt-2 text-sm font-black text-slate-950">{detail.value}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{detail.detail}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Freight On Actual Flow</CardTitle>
                  <CardDescription>Clear status for bulk or heavy orders where shipping is confirmed after order placement.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Timeline compact steps={order.freightFlow} />
                </CardContent>
              </Card>
            </section>

            <Card>
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
                <CardDescription>Important order, supplier, shipping, delivery and refund messages.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-3">
                {order.alerts.map((alert) => (
                  <div className={`rounded-xl border p-4 ${alertClass[alert.severity]}`} key={alert.title}>
                    <p className="font-black">{alert.title}</p>
                    <p className="mt-2 text-sm leading-6">{alert.detail}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6 2xl:sticky 2xl:top-6 2xl:self-start">
            <Card>
              <CardHeader>
                <CardTitle>Support Panel</CardTitle>
                <CardDescription>Get help without calling multiple teams.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                {order.supportActions.map((action) => (
                  <Button className="justify-start gap-2" key={action} variant={action === "Raise Ticket" ? "default" : "outline"}>
                    {supportIcon(action)}
                    {action}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invoice Section</CardTitle>
                <CardDescription>GST, payment and shipping receipts.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                {order.invoiceActions.map((action) => (
                  <Button className="justify-start gap-2" key={action} variant="outline">
                    <Download size={16} />
                    {action}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trust Summary</CardTitle>
                <CardDescription>Buyer confidence signals for this order.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {[
                  ["Verified Supplier", order.supplierName, ShieldCheck],
                  ["Secure Payment", order.paymentStatus, WalletCards],
                  ["Support SLA", "Response under 20 minutes", Headphones],
                  ["Tracking", order.deliveryStatus, Truck]
                ].map(([label, value, Icon]) => (
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3" key={label as string}>
                    <span className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-[#0B8F47]">
                      <Icon size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-black text-slate-950">{label as string}</p>
                      <p className="text-xs text-slate-500">{value as string}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function Timeline({ steps, compact = false }: { steps: TimelineStep[]; compact?: boolean }) {
  return (
    <div className="grid gap-3">
      {steps.map((step, index) => {
        const Icon = step.status === "complete" ? CheckCircle2 : step.status === "issue" ? XCircle : step.status === "current" ? Clock3 : PackageCheck;

        return (
          <div className="flex gap-3" key={`${step.label}-${index}`}>
            <div className="flex flex-col items-center">
              <span className={`grid size-10 place-items-center rounded-full border ${stepClass[step.status]}`}>
                <Icon size={17} />
              </span>
              {index < steps.length - 1 ? <span className="my-1 h-full min-h-6 w-px bg-slate-200" /> : null}
            </div>
            <div className={`min-w-0 flex-1 rounded-xl border border-slate-200 bg-white ${compact ? "p-3" : "p-4"}`}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="font-black text-slate-950">{step.label}</p>
                <Badge className={step.status === "current" ? "bg-amber-50 text-amber-700" : step.status === "complete" ? "bg-emerald-50 text-[#0B8F47]" : "bg-slate-100 text-slate-700"}>
                  {step.time}
                </Badge>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">{step.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function supportIcon(action: string) {
  if (action.includes("Supplier")) return <Phone size={16} />;
  if (action.includes("WhatsApp")) return <MessageCircle size={16} />;
  if (action.includes("Ticket")) return <Headphones size={16} />;
  if (action.includes("Refund")) return <RotateCcw size={16} />;
  if (action.includes("Cancel")) return <XCircle size={16} />;
  return <ShoppingCart size={16} />;
}
