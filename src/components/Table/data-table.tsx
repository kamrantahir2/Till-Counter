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
  const [expectedFilterFrom, setExpectedFilterFrom] = useState(0);
  const [expectedFilterTo, setExpectedFilterTo] = useState(0);

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
        <form action="" className="mb-12">
          {/* Till number filter starts */}
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
              <Label htmlFor="till2" className="flex">
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
              </Label>
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
          {/* Till number filter ends */}

          {/* Expected total filter starts here */}
          <div className="mt-4 ">
            <h4 className="underline font-bold mb-2">Expected Total</h4>
            <div className="flex">
              <Label className="flex">
                <h3>From: </h3>
                <input
                  type="number"
                  name="ExpectedTotalFrom"
                  id="ExpectedTotalFrom"
                  className="border-2 border-black mx-2"
                  onChange={(e) =>
                    setExpectedFilterFrom(Number(e.target.value))
                  }
                />
              </Label>

              <Label className="flex">
                <h3>To: </h3>
                <input
                  type="number"
                  name="ExpectedTotalTo"
                  id="ExpectedTotalTo"
                  className="border-2 border-black mx-2"
                  onChange={(e) => setExpectedFilterTo(Number(e.target.value))}
                />
              </Label>
            </div>
          </div>

          {/* Expected total filter ends here */}
        </form>
      </div>
      <div className="rounded-md border ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} className="text-black font-semibold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
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
