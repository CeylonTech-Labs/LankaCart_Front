"use client";

import { ReactNode } from "react";

type Column<T> = {
  header: string;
  cell: (row: T) => ReactNode;
};

export function AdminDataTable<T extends { id: string }>({
  rows,
  columns,
  emptyText = "No records found."
}: {
  rows: T[];
  columns: Column<T>[];
  emptyText?: string;
}) {
  if (!rows.length) {
    return <div className="rounded-md border bg-card p-10 text-center text-sm text-muted-foreground">{emptyText}</div>;
  }

  return (
    <div className="overflow-hidden rounded-md border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              {columns.map((column) => (
                <th key={column.header} className="px-4 py-3 font-medium">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t">
                {columns.map((column) => (
                  <td key={column.header} className="px-4 py-3 align-middle">
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
