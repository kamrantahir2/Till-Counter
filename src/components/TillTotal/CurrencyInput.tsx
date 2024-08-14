import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CurrencyInput = ({
  setValue,
  label,
  currency,
}: {
  setValue: React.Dispatch<React.SetStateAction<number>>;
  label: string;
  currency: string;
}) => {
  return (
    <div className="flex h-12 mb-4">
      <Label className="w-44 leading-9 font-poppins" htmlFor={currency}>
        {label}:
      </Label>

      <Input
        onChange={(e) => setValue(Number(e.target.value))}
        type="number"
        id={currency}
        placeholder={`No. of ${label}`}
      />
    </div>
  );
};

export default CurrencyInput;
