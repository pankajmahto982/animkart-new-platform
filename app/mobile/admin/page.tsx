import { MobileDashboard } from "@/components/mobile/mobile-dashboard";
import { mobileDashboards } from "@/lib/mobile-dashboard-data";

export const metadata = {
  title: "Admin Mobile App | AnimKart OS",
  description: "Mobile-first admin command dashboard for AnimKart."
};

export default function MobileAdminPage() {
  return <MobileDashboard data={mobileDashboards.admin} />;
}
