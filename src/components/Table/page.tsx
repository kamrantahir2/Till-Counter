import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useContext, createContext, useEffect } from "react";
import { TillContext } from "@/App";
import { FilteredContextType } from "@/types";
import { useState } from "react";
import { PopulatedTill } from "@/types";

export const FilteredContext = createContext<FilteredContextType | null>(null);

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
    <FilteredContext.Provider value={{ filtered, setFiltered }}>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={filtered!} originalData={data} />
      </div>
    </FilteredContext.Provider>
  );
}
