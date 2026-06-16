import { MobileDashboard } from "@/components/mobile/mobile-dashboard";
import { mobileDashboards } from "@/lib/mobile-dashboard-data";

export const metadata = {
  title: "Supplier Mobile App | AnimKart OS",
  description: "Mobile-first supplier dashboard for AnimKart."
};

export default function MobileSupplierPage() {
  return <MobileDashboard data={mobileDashboards.supplier} />;
}
