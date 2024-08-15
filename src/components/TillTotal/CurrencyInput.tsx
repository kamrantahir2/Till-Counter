import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(parseFloat((Number(e.target.value) * value).toFixed(2)));
  };

  const gbp = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  });

  useEffect(() => {
    setStringTotal(gbp.format(total));
  }, [total]);

  return (
    <div className="flex h-11 mb-4 ">
      <Label className="w-40 leading-10 font-poppins" htmlFor={currency}>
        {label}:
      </Label>

      <Input
        onChange={(e) => handleChange(e)}
        type="number"
        id={currency}
        placeholder={currency !== "float" ? `No. of ${label}` : `${label}`}
        className="w-6/12"
      />

      <Label className="leading-10 font-poppins ml-12">{stringTotal}</Label>
    </div>
  );
};

export default CurrencyInput;
