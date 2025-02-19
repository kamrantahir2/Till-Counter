import { ColumnDef } from "@tanstack/react-table";
import { PopulatedTill } from "@/types";

export const columns: ColumnDef<PopulatedTill>[] = [
  {
    accessorKey: "date",
    header: "Date",
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
