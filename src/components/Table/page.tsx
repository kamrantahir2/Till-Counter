import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useContext } from "react";
import { TillContext } from "@/App";

const tillContext = useContext(TillContext);

const data = tillContext?.tills;

export default function Table() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data!} />
    </div>
  );
}
