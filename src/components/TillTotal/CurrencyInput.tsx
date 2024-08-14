import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CurrencyInput = ({
  setTotal,
  value,
  label,
  currency,
}: {
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  value: number;
  label: string;
  currency: string;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(parseFloat((Number(e.target.value) * value).toFixed(2)));
  };

  return (
    <div className="flex h-11 mb-4">
      <Label className="w-44 leading-10 font-poppins" htmlFor={currency}>
        {label}:
      </Label>

      <Input
        onChange={(e) => handleChange(e)}
        type="number"
        id={currency}
        placeholder={currency !== "float" ? `No. of ${label}` : `${label}`}
      />
    </div>
  );
};

export default CurrencyInput;
