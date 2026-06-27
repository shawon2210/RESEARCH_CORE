import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  hoverable?: boolean;
}

export function Table<T>({
  columns,
  data,
  hoverable = false,
}: TableProps<T>) {
  if (!data.length) {
    return (
      <div className="font-mono text-xs text-center py-8 opacity-50">
        NO DATA
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse font-mono text-xs leading-[14px]">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className={cn(
                "font-bold text-left px-3 py-2 border-b border-current tracking-[0.1em] uppercase",
                col.className
              )}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr
            key={i}
            className={hoverable ? "hover:text-brand-gold transition-colors" : ""}
          >
            {columns.map((col) => (
              <td
                key={col.key}
                className={cn("px-3 py-2 border-b border-white/10", col.className)}
              >
                {col.render
                  ? col.render(item)
                  : String((item as Record<string, unknown>)[col.key] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}
