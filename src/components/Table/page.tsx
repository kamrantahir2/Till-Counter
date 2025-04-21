import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useContext, createContext } from "react";
import { TillContext } from "@/App";
import { TillContextType } from "@/types";
import { useState } from "react";
import { PopulatedTill } from "@/types";

export const FilteredContext = createContext<TillContextType | null>(null);

export default function Table() {
  const [filtered, setFiltered] = useState<PopulatedTill[]>([]);

  const tillContext = useContext(TillContext);

  const data = tillContext?.tills.reverse();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data!} />
    </div>
  );
}
