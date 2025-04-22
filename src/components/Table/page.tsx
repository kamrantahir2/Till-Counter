import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useContext, createContext, useEffect } from "react";
import { TillContext } from "@/App";
import { TillContextType } from "@/types";
import { useState } from "react";
import { PopulatedTill } from "@/types";

export const FilteredContext = createContext<TillContextType | null>(null);

export default function Table() {
  const tillContext = useContext(TillContext);

  const data = tillContext?.tills.reverse();

  const [filtered, setFiltered] = useState<PopulatedTill[]>(
    tillContext!.tills!
  );

  useEffect(() => {
    setFiltered(data!);
  }, [tillContext?.tills]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={filtered!} />
    </div>
  );
}
