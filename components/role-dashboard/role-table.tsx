import { Badge } from "@/components/ui/badge";
import { TableColumn, TableRow } from "@/lib/role-dashboard-data";

export function RoleTable({ columns, rows }: { columns: TableColumn[]; rows: TableRow[] }) {
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
          {rows.map((row, rowIndex) => (
            <tr className="border-b border-slate-100 last:border-0" key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td className="px-4 py-4 text-slate-700" key={column.key}>
                  {column.key === "action" || column.key === "status" || column.key === "issue" ? (
                    <Badge>{row[column.key]}</Badge>
                  ) : (
                    <span className={columnIndex === 0 ? "font-semibold text-slate-950" : ""}>{row[column.key]}</span>
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
