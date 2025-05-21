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

  const tillContext = useContext(TillContext);
  const filteredContext = useContext(FilteredContext);
  const [tillFilter, setTillFilter] = useState<Number | null>(null);
  const [expectedFilterFrom, setExpectedFilterFrom] = useState(
    Number.MIN_SAFE_INTEGER
  );
  const [expectedFilterTo, setExpectedFilterTo] = useState(
    Number.MAX_SAFE_INTEGER
  );

  const numberOfTills = originalData!.reduce((acc, value) => {
    return (acc = acc > value.tillNumber ? acc : value.tillNumber);
  }, 1);

  const submitFilter = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (tillFilter !== null) {
      filteredContext?.setFiltered(
        originalData!
          .filter(
            (till) =>
              till.tillNumber === tillFilter &&
              till.expectedTotal! > expectedFilterFrom &&
              till.expectedTotal < expectedFilterTo
          )
          .reverse()
      );
    } else {
      filteredContext?.setFiltered(
        originalData!.filter(
          (till) =>
            till.expectedTotal! > expectedFilterFrom &&
            till.expectedTotal < expectedFilterTo
        )
      );
    }
  };

  return (
    <div>
      <div>
        <form action="" onSubmit={submitFilter} className="mb-12">
          {/* Till number filter starts */}
          <div>
            <Label className="flex">
              <h3 className="mr-2">Till Number:</h3>
              <input
                type="number"
                name="tillNumber"
                id="tillNumber"
                onChange={(e) => setTillFilter(Number(e.target.value))}
                className="border-2 border-black"
                onWheel={(_e) => (document.activeElement as HTMLElement).blur()}
              />
            </Label>
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
                  onWheel={(_e) =>
                    (document.activeElement as HTMLElement).blur()
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
                  onWheel={(_e) =>
                    (document.activeElement as HTMLElement).blur()
                  }
                />
              </Label>
            </div>
          </div>

          {/* Expected total filter ends here */}

          <div className="flex mt-4">
            <Button type="submit">Submit</Button>

            <Button
              onClick={() => {
                setTillFilter(null);
                setExpectedFilterFrom(Number.MIN_SAFE_INTEGER);
                setExpectedFilterTo(Number.MAX_SAFE_INTEGER);
                filteredContext?.setFiltered(originalData!);
              }}
              className="mx-4"
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
