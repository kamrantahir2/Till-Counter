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
  const [tillFilter, setTillFilter] = useState<Number | null>(null);
  const [expectedFilterFrom, setExpectedFilterFrom] = useState(
    Number.MIN_SAFE_INTEGER
  );
  const [expectedFilterTo, setExpectedFilterTo] = useState(
    Number.MAX_SAFE_INTEGER
  );
  const [tillTotalFrom, setTillTotalFrom] = useState(Number.MIN_SAFE_INTEGER);
  const [tillTotalTo, setTillTotalTo] = useState(Number.MAX_SAFE_INTEGER);
  const [plusMinusFrom, setPlusMinusFrom] = useState<Number>(
    Number.MIN_SAFE_INTEGER
  );
  const [plusMinusTo, setPlusMinusTo] = useState<Number>(
    Number.MAX_SAFE_INTEGER
  );

  const [dateFrom, setDateFrom] = useState<String>("-273721-3-19");
  const [dateTo, setDateTo] = useState<String>("273860-8-13");

  const numberOfTills = originalData!.reduce((acc, value) => {
    return (acc = acc > value.tillNumber ? acc : value.tillNumber);
  }, 1);

  const plusMinusRange = (tillOverUnder: String) => {
    const converted: Number = Number(tillOverUnder.split(/[+£]/).join(""));

    if (converted >= plusMinusFrom && converted <= plusMinusTo) {
      return true;
    } else {
      return false;
    }
  };

  const dateFilter = (date: String) => {
    let dateArr = date.split("-");
    for (let i = 0; i < dateArr.length; i++) {
      if (dateArr[i].length === 1) {
        dateArr[i] = "0" + dateArr[i];
      }
    }
    const joined = dateArr.reverse().join("-");

    if (
      joined.valueOf() >= dateFrom.valueOf() &&
      joined.valueOf() <= dateTo.valueOf()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const submitFilter = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      tillFilter !== null &&
      Number(tillFilter) >= 1 &&
      Number(tillFilter) <= numberOfTills
    ) {
      filteredContext?.setFiltered(
        originalData!
          .filter(
            (till) =>
              till.tillNumber === tillFilter &&
              till.expectedTotal! > expectedFilterFrom &&
              till.expectedTotal < expectedFilterTo &&
              till.tillTotal! > tillTotalFrom &&
              till.tillTotal < tillTotalTo &&
              plusMinusRange(till.expectedVsTotal) &&
              dateFilter(till.date)
          )
          .reverse()
      );
    } else {
      filteredContext?.setFiltered(
        originalData!
          .filter(
            (till) =>
              till.expectedTotal! > expectedFilterFrom &&
              till.expectedTotal < expectedFilterTo &&
              till.tillTotal! > tillTotalFrom &&
              till.tillTotal < tillTotalTo &&
              plusMinusRange(till.expectedVsTotal) &&
              dateFilter(till.date)
          )
          .reverse()
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

          {/* Till total filter starts here */}

          <div className="mt-4 ">
            <h4 className="underline font-bold mb-2">Till Total</h4>
            <div className="flex">
              <Label className="flex">
                <h3>From: </h3>
                <input
                  type="number"
                  name="TillTotalFrom"
                  id="TillTotalFrom"
                  className="border-2 border-black mx-2"
                  onChange={(e) => setTillTotalFrom(Number(e.target.value))}
                  onWheel={(_e) =>
                    (document.activeElement as HTMLElement).blur()
                  }
                />
              </Label>

              <Label className="flex">
                <h3>To: </h3>
                <input
                  type="number"
                  name="TillTotalTo"
                  id="TillTotalTo"
                  className="border-2 border-black mx-2"
                  onChange={(e) => setTillTotalTo(Number(e.target.value))}
                  onWheel={(_e) =>
                    (document.activeElement as HTMLElement).blur()
                  }
                />
              </Label>
            </div>
          </div>

          {/* Till total filter ends here */}

          {/* Over Under filter starts here */}

          <div className="mt-4 ">
            <h4 className="underline font-bold mb-2">Over/Under</h4>
            <div className="flex">
              <Label className="flex">
                <h3>From: </h3>
                <input
                  type="number"
                  name="OverUnderFrom"
                  id="OverUnderFrom"
                  className="border-2 border-black mx-2"
                  onChange={(e) => setPlusMinusFrom(Number(e.target.value))}
                  onWheel={(_e) =>
                    (document.activeElement as HTMLElement).blur()
                  }
                  step={0.01}
                />
              </Label>

              <Label className="flex">
                <h3>To: </h3>
                <input
                  type="number"
                  name="OverUnderTo"
                  id="OverUnderTo"
                  className="border-2 border-black mx-2"
                  onChange={(e) => setPlusMinusTo(Number(e.target.value))}
                  onWheel={(_e) =>
                    (document.activeElement as HTMLElement).blur()
                  }
                  step={0.01}
                />
              </Label>
            </div>
          </div>

          {/* Over Under filter ends here */}

          {/* Date filter starts here */}

          <div className="mt-4 ">
            <h4 className="underline font-bold mb-2">Date</h4>
            <div className="flex">
              <Label className="flex">
                <h3>From: </h3>
                <input
                  type="date"
                  name="dateFrom"
                  id="dateFrom"
                  className="border-2 border-black mx-2"
                  onChange={(e) => setDateFrom(e.target.value)}
                  onWheel={(_e) =>
                    (document.activeElement as HTMLElement).blur()
                  }
                />
              </Label>

              <Label className="flex">
                <h3>To: </h3>
                <input
                  type="date"
                  name="dateTo"
                  id="dateTo"
                  className="border-2 border-black mx-2"
                  onChange={(e) => setDateTo(e.target.value)}
                  onWheel={(_e) =>
                    (document.activeElement as HTMLElement).blur()
                  }
                />
              </Label>
            </div>
          </div>

          {/* Date filter ends here */}

          <div className="flex mt-4">
            <Button type="submit">Submit</Button>

            {/* RESET BUTTON START */}
            <Button
              onClick={() => {
                setTillFilter(null);
                setExpectedFilterFrom(Number.MIN_SAFE_INTEGER);
                setExpectedFilterTo(Number.MAX_SAFE_INTEGER);
                setTillTotalFrom(Number.MIN_SAFE_INTEGER);
                setTillTotalTo(Number.MAX_SAFE_INTEGER);
                setPlusMinusFrom(Number.MIN_SAFE_INTEGER);
                setPlusMinusTo(Number.MAX_SAFE_INTEGER);
                filteredContext?.setFiltered(originalData!);
                setDateFrom("-273721-3-19");
                setDateTo("273860-8-13");
              }}
              className="mx-4"
            >
              Reset
            </Button>
            {/* RESET BUTTON START */}
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
                    <th
                      key={header.id}
                      className="text-black font-semibold text-left"
                    >
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
