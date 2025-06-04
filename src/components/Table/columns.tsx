import { ColumnDef } from "@tanstack/react-table";
import { PopulatedTill } from "@/types";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

export const columns: ColumnDef<PopulatedTill>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    sortingFn: (rowA, rowB) => {
      let date1Arr = rowA.original.date.split("-");
      let date2Arr = rowB.original.date.split("-");

      for (let i = 0; i < date1Arr.length; i++) {
        if (date1Arr[i].length === 1) {
          date1Arr[i] = "0" + date1Arr[i];
        }
        if (date2Arr[i].length === 1) {
          date2Arr[i] = "0" + date2Arr[i];
        }
      }

      const date1Num = date1Arr.reverse().join("");
      const date2Num = date2Arr.reverse().join("");

      if (date1Num > date2Num) {
        return 1;
      } else {
        return -1;
      }
    },
  },
  {
    accessorKey: "tillNumber",
    header: "Till Number",
  },
  {
    accessorKey: "tillTotal",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Till Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "expectedTotal",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expected Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "expectedVsTotal",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          +/-
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (rowA, rowB) => {
      const rowACleaned = Number(
        rowA.original.expectedVsTotal.split(/[+£]/).join("")
      );
      const rowBCleaned = Number(
        rowB.original.expectedVsTotal.split(/[+£]/).join("")
      );

      return rowACleaned < rowBCleaned ? 1 : rowACleaned > rowBCleaned ? -1 : 0;
    },
  },
  {
    accessorKey: "additionalInfo",
    header: "Additional Info",
  },
];
