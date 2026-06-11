import { StatusPanel } from "@/components/control-room/status-panel";
import { StatusMetric } from "@/lib/control-room-data";

export function OrderCommandCenter({ metrics }: { metrics: StatusMetric[] }) {
  return <StatusPanel metrics={metrics} />;
}
