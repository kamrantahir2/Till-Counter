import { useState } from "react";
import { useContext } from "react";
import { FilteredContext } from "./page";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { TillContext } from "@/App";
import { PopulatedTill } from "@/types";

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
  originalData: PopulatedTill[] | undefined;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  originalData,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const filteredContext = useContext(FilteredContext);

  const [till1Filter, setTill1Filter] = useState(false);

  const [till2Filter, setTill2Filter] = useState(false);

  const tillFilter = (tillNumber: number) => {
    if (tillNumber === 1) {
      filteredContext?.setFiltered(
        originalData!.filter((till) => till.tillNumber === tillNumber)
      );
    } else {
      filteredContext?.setFiltered(
        originalData!.filter((till) => till.tillNumber === tillNumber).reverse()
      );
    }
  };

  return (
    <div>
      <div>
        <form action="">
          <div>
            <div>
              <label htmlFor="till1" className="flex">
                <input
                  name="tillRadio"
                  id="till1"
                  type="radio"
                  value="1"
                  onChange={() => {
                    setTill1Filter(true);
                    setTill2Filter(false);
                    tillFilter(1);
                  }}
                  checked={till1Filter}
                />
                <h3 className="ml-2">Till 1</h3>
              </label>
            </div>

            <div>
              <label htmlFor="till2" className="flex">
                <input
                  name="tillRadio"
                  id="till2"
                  type="radio"
                  value="2"
                  onChange={() => {
                    setTill1Filter(false);
                    setTill2Filter(true);
                    tillFilter(2);
                  }}
                  checked={till2Filter}
                />
                <h3 className="ml-2">Till 2</h3>
              </label>
            </div>

            <Button
              onClick={() => {
                setTill1Filter(false);
                setTill2Filter(false);
                filteredContext?.setFiltered(originalData!);
              }}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
      <div className="rounded-md border ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-black font-semibold"
                    >
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
                  className="table-row"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
