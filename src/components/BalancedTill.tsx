import { gbp } from "@/utils/utils";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const BalancedTill = ({
  totalTakings,
  tillTotal,
  fiveAndCoins,
  float,
}: {
  totalTakings: number;
  tillTotal: number;
  fiveAndCoins: number;
  float: number;
}) => {
  const [expectedTotal, setExpectedTotal] = useState(0);
  const [expectedVsTotal, setExpectedVsTotal] = useState("");
  const [overUnderCalculated, setOverUnderCalculated] = useState(false);

  const overUnder = (): string => {
    const diff: number = Number((expectedTotal - totalTakings).toFixed(2));

    if (diff <= 0) {
      return `${gbp.format(diff)}`;
    } else {
      return `+${gbp.format(diff)}`;
    }
  };

  const overUnderStyle = (): string => {
    if (expectedVsTotal.includes("-")) {
      return "text-red-600";
    } else if (expectedVsTotal.includes("+")) {
      return "text-green-500";
    } else {
      return "";
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setExpectedVsTotal(overUnder());
  };

  if (tillTotal === 0) {
    return (
      <div className="mx-auto md:mt-0 mt-4">
        <h1 className="text-center mb-10 text-2xl font-semibold underline underline-offset-8">
          Till Total
        </h1>
        <h1 className="text-xl italic">
          *Till totals will be shown after submitting Till Counter form*
        </h1>
        <div className="h-12"></div>
      </div>
    );
  }

  return (
    <div className="md:mx-auto md:mt-0 mt-4 font-poppins">
      <h1 className="text-center mb-10 text-2xl font-semibold underline underline-offset-8">
        Till Total
      </h1>
      <h1 className="text-xl">
        Till Total:{" "}
        <span className="font-semibold">{gbp.format(tillTotal)}</span>
        <br />- Float:{" "}
        <span className="font-semibold">{gbp.format(float)}</span>
        <br /> = Total Takings:{" "}
        <span className="font-semibold">{gbp.format(totalTakings)}</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mt-4 flex">
          <h1 className="text-xl leading-10">Expected Total: £</h1>
          <Input
            placeholder="Expected Total"
            className="w-6/12 ml-4 text-md"
            type="number"
            onChange={(e) => setExpectedTotal(Number(e.target.value))}
            required
            step={0.01}
          />
        </div>
        <Button className="w-full mt-4" type="submit">
          Submit
        </Button>
      </form>
      <div>
        <h3 className="text-xl mt-4">
          Till Over/Under:{" "}
          <span className={`font-semibold ${overUnderStyle()}`}>
            {" "}
            {expectedVsTotal}
          </span>
        </h3>
      </div>
      <div className="h-12"></div>
    </div>
  );
};

export default BalancedTill;
