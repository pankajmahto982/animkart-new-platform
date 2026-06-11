import { Badge } from "@/components/ui/badge";
import { AnalyticsRow } from "@/lib/analytics-data";

type AnalyticsTableProps = {
  columns: { key: string; label: string }[];
  rows: AnalyticsRow[];
};

export function AnalyticsTable({ columns, rows }: AnalyticsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            {columns.map((column) => (
              <th className="px-4 py-3 font-semibold" key={column.key}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr className="border-b border-slate-100 last:border-0" key={index}>
              {columns.map((column) => (
                <td className="px-4 py-4 text-slate-700" key={column.key}>
                  {column.key === "action" || column.key === "status" || column.key === "stockStatus" ? (
                    <Badge>{row[column.key]}</Badge>
                  ) : (
                    <span className={index === 0 && column.key === columns[0].key ? "font-semibold text-slate-950" : ""}>
                      {row[column.key]}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
