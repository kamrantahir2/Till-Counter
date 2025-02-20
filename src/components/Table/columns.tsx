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
    sortDescFirst: true,
    sortingFn: "dateSort",
  },
  {
    accessorKey: "tillNumber",
    header: "Till Number",
  },
  {
    accessorKey: "totalTakings",
    header: "Total Takings",
  },
  {
    accessorKey: "expectedTotal",
    header: "Expected Total",
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
