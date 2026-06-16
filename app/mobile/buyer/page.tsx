import { MobileDashboard } from "@/components/mobile/mobile-dashboard";
import { mobileDashboards } from "@/lib/mobile-dashboard-data";

export const metadata = {
  title: "Buyer Mobile App | AnimKart OS",
  description: "Mobile-first buyer dashboard for AnimKart."
};

export default function MobileBuyerPage() {
  return <MobileDashboard data={mobileDashboards.buyer} />;
}
