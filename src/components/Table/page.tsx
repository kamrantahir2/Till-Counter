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

  const data = tillContext?.tills;

  const [filtered, setFiltered] = useState<PopulatedTill[]>(data!);

  useEffect(() => {
    setFiltered(data!);
  }, [tillContext?.tills]);

  return (
    <FilteredContext.Provider value={{ filtered, setFiltered }}>
      <div className=" mx-auto py-10">
        <DataTable
          columns={columns}
          data={filtered!.reverse()}
          originalData={data}
        />
      </div>
    </FilteredContext.Provider>
  );
}
