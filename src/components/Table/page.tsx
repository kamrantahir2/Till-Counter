import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useContext } from "react";
import { TillContext } from "@/App";

export default function Table() {
  const tillContext = useContext(TillContext);

  const data = tillContext?.tills.reverse();

  console.log(data);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data!} />
    </div>
  );
}
