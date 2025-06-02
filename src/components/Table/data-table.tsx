import { useState } from "react";
import { useContext } from "react";
import { FilteredContext } from "./page";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { PopulatedTill } from "@/types";
import { FilterX } from "lucide-react";

import { Filter } from "lucide-react";

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

  // STATES START

  const filteredContext = useContext(FilteredContext);
  const [tillFilter, setTillFilter] = useState<Number | null>(null);

  const [tillFilterText, setTillFilterText] = useState("");

  const [expectedFilterFrom, setExpectedFilterFrom] = useState(
    Number.MIN_SAFE_INTEGER
  );
  const [expectedFilterTo, setExpectedFilterTo] = useState(
    Number.MAX_SAFE_INTEGER
  );

  const [expectedFilterFromText, setExpectedFilterFromText] = useState("");
  const [expectedFilterToText, setExpectedFilterToText] = useState("");

  const [tillTotalFrom, setTillTotalFrom] = useState(Number.MIN_SAFE_INTEGER);
  const [tillTotalTo, setTillTotalTo] = useState(Number.MAX_SAFE_INTEGER);

  const [tillTotalFromText, setTillTotalFromText] = useState("");
  const [tillTotalToText, setTillTotalToText] = useState("");

  const [plusMinusFrom, setPlusMinusFrom] = useState<Number>(
    Number.MIN_SAFE_INTEGER
  );
  const [plusMinusTo, setPlusMinusTo] = useState<Number>(
    Number.MAX_SAFE_INTEGER
  );

  const [plusMinusFromText, setPlusMinusFromText] = useState("");
  const [plusMinusToText, setPlusMinusToText] = useState("");

  const [dateFrom, setDateFrom] = useState<String>("-273721-3-19");
  const [dateTo, setDateTo] = useState<String>("273860-8-13");

  const [dateFromText, setDateFromText] = useState("");

  const [dateToText, setDateToText] = useState("");

  const [showFilter, setShowFilter] = useState(true);

  // STATES END

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
              till.expectedTotal! >= expectedFilterFrom &&
              till.expectedTotal <= expectedFilterTo &&
              till.tillTotal! >= tillTotalFrom &&
              till.tillTotal <= tillTotalTo &&
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
              till.expectedTotal! >= expectedFilterFrom &&
              till.expectedTotal <= expectedFilterTo &&
              till.tillTotal! >= tillTotalFrom &&
              till.tillTotal <= tillTotalTo &&
              plusMinusRange(till.expectedVsTotal) &&
              dateFilter(till.date)
          )
          .reverse()
      );
    }
  };

  return (
    <div className="">
      <div className="md:container md:p-0 px-2">
        <div className="w-full text-center mb-12">
          <Button
            className="text-md w-1/5 font-normal"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filter{" "}
            {showFilter ? (
              <FilterX className="ml-2" />
            ) : (
              <Filter className="ml-2" />
            )}
          </Button>
        </div>
        <form
          action=""
          onSubmit={submitFilter}
          className={
            `mb-16 ` +
            (showFilter
              ? "static opacity-100 transition-opacity duration-400 ease-in-out"
              : "opacity-0 absolute")
          }
        >
          <div className="grid lg:grid-cols-3 gap-2 md:gap-3 md:h-80 md:justify-items-center text-center place-content-center">
            {/* Till number filter starts */}

            <div className="mx-auto w-4/5">
              <h3 className="underline font-bold mb-2">Till Number:</h3>

              <div className="flex">
                <Label className="flex">
                  <h3 className="leading-10">No. : </h3>
                  <input
                    type="number"
                    name="tillNumber"
                    id="tillNumber"
                    value={tillFilterText}
                    onChange={(e) => {
                      setTillFilter(Number(e.target.value));
                      setTillFilterText(e.target.value);
                    }}
                    className="border-2 border-black mx-2 rounded-lg h-10 "
                    onWheel={(_e) =>
                      (document.activeElement as HTMLElement).blur()
                    }
                  />
                </Label>
              </div>
              <Button
                className=" mt-3 mx-auto bg-red-700 w-full"
                onClick={() => {
                  setTillFilter(null);
                  setTillFilterText("");
                }}
              >
                Reset
              </Button>
            </div>

            {/* Till number filter ends */}

            {/* Expected total filter starts here */}
            <div className="">
              <h4 className="underline font-bold mb-2">Expected Total</h4>
              <div className="grid grid-cols-2 justify-items-center">
                <Label className="flex">
                  <h3 className="leading-10">From: </h3>
                  <input
                    type="number"
                    name="ExpectedTotalFrom"
                    id="ExpectedTotalFrom"
                    className="border-2 border-black mx-2 rounded-lg md:w-full w-4/6"
                    value={expectedFilterFromText}
                    onChange={(e) => {
                      setExpectedFilterFrom(Number(e.target.value));
                      setExpectedFilterFromText(e.target.value);
                    }}
                    onWheel={(_e) =>
                      (document.activeElement as HTMLElement).blur()
                    }
                  />
                </Label>

                <Label className="flex mx-2">
                  <h3 className="leading-10">To: </h3>
                  <input
                    type="number"
                    name="ExpectedTotalTo"
                    id="ExpectedTotalTo"
                    className="border-2 border-black mx-2 rounded-lg md:w-full w-4/6"
                    value={expectedFilterToText}
                    onChange={(e) => {
                      setExpectedFilterTo(Number(e.target.value));
                      setExpectedFilterToText(e.target.value);
                    }}
                    onWheel={(_e) =>
                      (document.activeElement as HTMLElement).blur()
                    }
                  />
                </Label>
              </div>
              <Button
                className="mx-auto w-4/5 mt-3 bg-red-700"
                onClick={() => {
                  setExpectedFilterFrom(Number.MIN_SAFE_INTEGER);
                  setExpectedFilterTo(Number.MAX_SAFE_INTEGER);
                  setExpectedFilterFromText("");
                  setExpectedFilterToText("");
                }}
              >
                Reset
              </Button>
            </div>

            {/* Expected total filter ends here */}

            {/* Till total filter starts here */}

            <div className="">
              <h4 className="underline font-bold mb-2">Till Total</h4>
              <div className="grid grid-cols-2 gap-4">
                <Label className="flex">
                  <h3 className="leading-10">From: </h3>
                  <input
                    type="number"
                    name="TillTotalFrom"
                    id="TillTotalFrom"
                    className="border-2 border-black mx-2 rounded-lg md:w-full w-4/6"
                    value={tillTotalFromText}
                    onChange={(e) => {
                      setTillTotalFrom(Number(e.target.value));
                      setTillTotalFromText(e.target.value);
                    }}
                    onWheel={(_e) =>
                      (document.activeElement as HTMLElement).blur()
                    }
                    step={0.01}
                  />
                </Label>

                <Label className="flex">
                  <h3 className="leading-10">To: </h3>
                  <input
                    type="number"
                    name="TillTotalTo"
                    id="TillTotalTo"
                    className="border-2 border-black mx-2 rounded-lg md:w-full w-4/6"
                    step={0.01}
                    value={tillTotalToText}
                    onChange={(e) => {
                      setTillTotalTo(Number(e.target.value));
                      setTillTotalToText(e.target.value);
                    }}
                    onWheel={(_e) =>
                      (document.activeElement as HTMLElement).blur()
                    }
                  />
                </Label>
              </div>
              <Button
                className="m-auto w-4/5 mt-3 bg-red-700"
                onClick={() => {
                  setTillTotalFrom(Number.MIN_SAFE_INTEGER);
                  setTillTotalTo(Number.MAX_SAFE_INTEGER);
                  setTillTotalFromText("");
                  setTillTotalToText("");
                }}
              >
                Reset
              </Button>
            </div>

            {/* Till total filter ends here */}

            {/* Over Under filter starts here */}

            <div className="mt-4 ">
              <h4 className="underline font-bold mb-2">Over/Under</h4>
              <div className="grid grid-cols-2 gap-4">
                <Label className="flex">
                  <h3 className="leading-10">From: </h3>
                  <input
                    type="number"
                    name="OverUnderFrom"
                    id="OverUnderFrom"
                    className="border-2 border-black mx-2 rounded-lg md:w-full w-4/6"
                    value={plusMinusFromText}
                    onChange={(e) => {
                      setPlusMinusFrom(Number(e.target.value));
                      setPlusMinusFromText(e.target.value);
                    }}
                    onWheel={(_e) =>
                      (document.activeElement as HTMLElement).blur()
                    }
                    step={0.01}
                  />
                </Label>

                <Label className="flex  ">
                  <h3 className="leading-10">To: </h3>
                  <input
                    type="number"
                    name="OverUnderTo"
                    id="OverUnderTo"
                    className="border-2 border-black mx-2 rounded-lg md:w-full w-4/6"
                    value={plusMinusToText}
                    onChange={(e) => {
                      setPlusMinusTo(Number(e.target.value));
                      setPlusMinusToText(e.target.value);
                    }}
                    onWheel={(_e) =>
                      (document.activeElement as HTMLElement).blur()
                    }
                    step={0.01}
                  />
                </Label>
              </div>
              <Button
                className="w-4/5 mt-3 mx-auto bg-red-700"
                onClick={() => {
                  setPlusMinusFrom(Number.MIN_SAFE_INTEGER);
                  setPlusMinusTo(Number.MAX_SAFE_INTEGER);
                  setPlusMinusFromText("");
                }}
              >
                Reset
              </Button>
            </div>

            {/* Over Under filter ends here */}

            {/* Date filter starts here */}

            <div className="mt-4 ">
              <h4 className="underline font-bold mb-2 w-full ">Date</h4>
              <div className="grid grid-cols-2 gap-4">
                <Label className="flex">
                  <h3 className="leading-10">From: </h3>
                  <input
                    type="date"
                    name="dateFrom"
                    id="dateFrom"
                    className="border-2 border-black mx-2 rounded-lg px-2"
                    value={dateFromText}
                    onChange={(e) => {
                      setDateFrom(e.target.value);
                      setDateFromText(e.target.value);
                    }}
                    onWheel={(_e) =>
                      (document.activeElement as HTMLElement).blur()
                    }
                  />
                </Label>

                <Label className="flex md:ml-0 ">
                  <h3 className="leading-10">To: </h3>
                  <input
                    type="date"
                    name="dateTo"
                    id="dateTo"
                    className="border-2 border-black mx-2 rounded-lg px-2"
                    value={dateToText}
                    onChange={(e) => {
                      setDateTo(e.target.value);
                      setDateToText(e.target.value);
                    }}
                    onWheel={(_e) =>
                      (document.activeElement as HTMLElement).blur()
                    }
                  />
                </Label>
              </div>
              <Button
                className="mx-auto w-4/5 mt-3 bg-red-700"
                onClick={() => {
                  setDateFrom("-273721-3-19");
                  setDateTo("273860-8-13");
                  setDateFromText("");
                  setDateToText("");
                }}
              >
                Reset
              </Button>
            </div>

            {/* Date filter ends here */}
          </div>

          <div className="flex justify-center mt-12 md:mt-36 lg:mt-40">
            <Button type="submit" className="mx-4 w-1/6">
              Submit
            </Button>

            {/* CLEAR BUTTON START */}
            <Button
              onClick={() => {
                setTillFilter(null);
                setExpectedFilterFrom(Number.MIN_SAFE_INTEGER);
                setExpectedFilterTo(Number.MAX_SAFE_INTEGER);
                setTillTotalFrom(Number.MIN_SAFE_INTEGER);
                setTillTotalTo(Number.MAX_SAFE_INTEGER);
                setPlusMinusFrom(Number.MIN_SAFE_INTEGER);
                setPlusMinusTo(Number.MAX_SAFE_INTEGER);
                setDateFrom("-273721-3-19");
                setDateTo("273860-8-13");
                filteredContext?.setFiltered(originalData!);
              }}
              className="mx-4 w-1/6 bg-red-700"
            >
              Clear
            </Button>
            {/* CLEAR BUTTON START */}
          </div>
          <div className="h-1 w-3/5 bg-blue-800 mt-12 rounded-xl mx-auto"></div>
        </form>
      </div>
      <div className="rounded-md border md:mx-24 mx-12">
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
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id === "date" ? "font-semibold italic" : ""
                      }
                    >
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
