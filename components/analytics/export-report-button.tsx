import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExportReportButton() {
  return (
    <div className="flex flex-wrap gap-2">
      {["Export PDF", "Export CSV", "Export Excel"].map((label) => (
        <Button className="h-10" key={label} variant={label === "Export PDF" ? "default" : "outline"}>
          <Download size={16} />
          {label}
        </Button>
      ))}
    </div>
  );
}
