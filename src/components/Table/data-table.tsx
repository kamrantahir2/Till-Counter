import { useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    sortingFns: {
      dateSort: (rowA, rowB) => {
        const rowAReversed = rowA.original.date.split("-").reverse();

        const rowBReversed = rowB.original.date.split("-").reverse();

        if (rowAReversed[0] < rowBReversed[0]) {
          return 1;
        } else if (rowAReversed[0] > rowBReversed[0]) {
          return -1;
        } else {
          if (rowAReversed[1] < rowBReversed[1]) {
            return -1;
          } else if (rowAReversed[1] > rowBReversed[1]) {
            return 1;
          } else {
            if (rowAReversed[2] < rowBReversed[2]) {
              return 1;
            } else if (rowAReversed[2] > rowBReversed[2]) {
              return -1;
            } else {
              return 0;
            }
          }
        }
      },
    },
    state: {
      sorting,
    },
    sortDescFirst: true,
  });

  return (
    <div className="rounded-md border ">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
