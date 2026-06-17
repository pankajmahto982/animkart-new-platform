import { Badge } from "@/components/ui/badge";
import { TableColumn, TableRow } from "@/lib/role-dashboard-data";

export function RoleTable({ columns, rows }: { columns: TableColumn[]; rows: TableRow[] }) {
  return (
    <>
      <div className="grid gap-3 md:hidden">
        {rows.map((row, rowIndex) => (
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm" key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <div className="grid grid-cols-[112px_minmax(0,1fr)] gap-3 border-b border-slate-100 py-2 last:border-0" key={column.key}>
                <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{column.label}</span>
                {column.key === "action" || column.key === "status" || column.key === "issue" ? (
                  <span>
                    <Badge>{row[column.key]}</Badge>
                  </span>
                ) : (
                  <span className={columnIndex === 0 ? "min-w-0 break-words font-semibold text-slate-950" : "min-w-0 break-words text-slate-700"}>
                    {row[column.key]}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="hidden max-w-full overflow-x-auto md:block">
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
    </>
  );
}
