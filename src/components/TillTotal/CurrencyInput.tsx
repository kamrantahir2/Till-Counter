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
  enterTotal,
}: {
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  value: number;
  label: string;
  currency: string;
  total: number;
  enterTotal: boolean;
}) => {
  const [stringTotal, setStringTotal] = useState("");
  let saved = Number(window.localStorage.getItem("tillCounterFloat"));

  useEffect(() => {
    if (
      currency === "float" &&
      window.localStorage.getItem("tillCounterFloat") !== null
    ) {
      saved = Number(window.localStorage.getItem("tillCounterFloat"));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    !enterTotal
      ? setTotal(parseFloat((Number(e.target.value) * value).toFixed(2)))
      : setTotal(Number(e.target.value));
  };

  useEffect(() => {
    setStringTotal(gbp.format(total));
  }, [total]);

  if (currency === "float" && saved !== 0) {
    return (
      <div className="h-10 font-poppins">
        <Label className="text-xl">Saved Float:</Label>
        <Label className="text-xl ml-4">£{saved}</Label>
      </div>
    );
  }

  return (
    <div className="flex h-10 mb-4 ">
      <Label className="w-40 leading-10 font-poppins" htmlFor={currency}>
        {!enterTotal ? `${label}:` : `${currency}:`}
      </Label>

      <Input
        onChange={(e) => handleChange(e)}
        type="number"
        id={currency}
        required={currency === "float"}
        placeholder={
          !enterTotal
            ? currency !== "float"
              ? `No. of ${label}`
              : `${label}`
            : `${currency} Total`
        }
        className="w-6/12 text-md"
        onWheel={(_e) => (document.activeElement as HTMLElement).blur()}
        value={
          total === 0 ? "" : !enterTotal ? Math.round(total / value) : total
        }
      />

      <Label className="leading-10 lg:w-40 font-poppins ml-12">
        {stringTotal}
      </Label>
    </div>
  );
};

export default CurrencyInput;
