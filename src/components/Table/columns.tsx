import { ColumnDef } from "@tanstack/react-table";
import { PopulatedTill } from "@/types";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

export const columns: ColumnDef<PopulatedTill>[] = [
  {
    accessorKey: "date",
    invertSorting: true,
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
      const rowAReversed = rowA.original.date.split("-").reverse();

      const rowBReversed = rowB.original.date.split("-").reverse();

      if (rowAReversed[0] < rowBReversed[0]) {
        return -1;
      } else if (rowAReversed[0] > rowBReversed[0]) {
        return 1;
      } else {
        if (rowAReversed[1] < rowBReversed[1]) {
          return 1;
        } else if (rowAReversed[1] > rowBReversed[1]) {
          return -1;
        } else {
          if (rowAReversed[2] < rowBReversed[2]) {
            return -1;
          } else if (rowAReversed[2] > rowBReversed[2]) {
            return 1;
          } else {
            return 0;
          }
        }
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
    header: "+/-",
  },
  {
    accessorKey: "additionalInfo",
    header: "Additional Info",
  },
];
