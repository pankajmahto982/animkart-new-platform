import { StatusPanel } from "@/components/control-room/status-panel";
import { StatusMetric } from "@/lib/control-room-data";

export function InventoryControlPanel({ metrics }: { metrics: StatusMetric[] }) {
  return <StatusPanel metrics={metrics} />;
}
