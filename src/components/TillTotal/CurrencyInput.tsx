import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { gbp } from "@/utils/utils";

const CurrencyInput = ({
  setTotal,
  value,
  label,
  currency,
  total,
}: {
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  value: number;
  label: string;
  currency: string;
  total: number;
}) => {
  const [stringTotal, setStringTotal] = useState("");
  let saved = 0;

  useEffect(() => {
    if (
      currency === "float" &&
      window.localStorage.getItem("tillCounterFloat") !== ""
    ) {
      saved = Number(window.localStorage.getItem("tillCounterFloat"));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(parseFloat((Number(e.target.value) * value).toFixed(2)));
  };

  useEffect(() => {
    setStringTotal(gbp.format(total));
  }, [total]);

  return (
    <div className="flex h-10 mb-4 ">
      <Label className="w-40 leading-10 font-poppins" htmlFor={currency}>
        {label}:
      </Label>

      <Input
        onChange={(e) => handleChange(e)}
        type="number"
        id={currency}
        required={currency === "float"}
        placeholder={currency !== "float" ? `No. of ${label}` : `${label}`}
        className="w-6/12 text-md"
        onWheel={(_e) => (document.activeElement as HTMLElement).blur()}
      />

      <Label className="leading-10 font-poppins ml-12">{stringTotal}</Label>
    </div>
  );
};

export default CurrencyInput;
