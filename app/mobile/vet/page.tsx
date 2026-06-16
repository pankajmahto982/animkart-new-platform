import { MobileDashboard } from "@/components/mobile/mobile-dashboard";
import { mobileDashboards } from "@/lib/mobile-dashboard-data";

export const metadata = {
  title: "Vet Mobile App | AnimKart OS",
  description: "Mobile-first vet dashboard for AnimKart."
};

export default function MobileVetPage() {
  return <MobileDashboard data={mobileDashboards.vet} />;
}
