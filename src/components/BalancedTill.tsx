import { gbp } from "@/utils/utils";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { TillObject } from "@/types";

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
  const [tillNumber, setTillNumber] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const overUnder = (): string => {
    const diff: number = Number((totalTakings - expectedTotal).toFixed(2));

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

  const handleExpectedTotalSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setExpectedVsTotal(overUnder());
    setOverUnderCalculated(true);
  };

  const handleSave = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const tillObject: TillObject = {
      tillNumber: tillNumber,
      tillTotal: totalTakings,
      expectedTotal: expectedTotal,
      expectedVsTotal: expectedVsTotal,
      additionalInfo: additionalInfo,
    };
    console.log(tillObject);
  };

  // if (tillTotal === 0) {
  //   return (
  //     <div className="mx-auto md:mt-0 mt-4">
  //       <h1 className="text-center mb-10 text-2xl font-semibold underline underline-offset-8">
  //         Till Total
  //       </h1>
  //       <h1 className="text-2xl text-center italic">
  //         *Till totals will be shown after submitting Till Counter form*
  //       </h1>
  //       <div className="h-12"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="md:mx-auto md:mt-0 mt-4 font-poppins">
      <h1 className="text-center mb-10 text-2xl font-semibold underline underline-offset-8">
        Till Total
      </h1>

      <h3 className="text-xl my-6">
        £5 Notes & Coins: <span className="font-semibold">£{fiveAndCoins}</span>
      </h3>

      <h3 className="text-xl">
        Till Total:{" "}
        <span className="font-semibold">{gbp.format(tillTotal)}</span>
        <br />- Float:{" "}
        <span className="font-semibold">{gbp.format(float)}</span>
        <br /> = Total Takings:{" "}
        <span className="font-semibold">{gbp.format(totalTakings)}</span>
      </h3>

      <form onSubmit={handleExpectedTotalSubmit}>
        <div className="mt-4 flex">
          <h3 className="text-xl leading-10">Expected Total: £</h3>
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
      {overUnderCalculated && (
        <div>
          <h3 className="text-xl mt-4">
            Till Over/Under:{" "}
            <span className={`font-semibold ${overUnderStyle()}`}>
              {" "}
              {expectedVsTotal}
            </span>
          </h3>
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="mt-4 flex">
          <h3 className="text-xl leading-10">Till Number: </h3>
          <Input
            type="number"
            onChange={(e) => setTillNumber(Number(e.target.value))}
            required
            placeholder="Till Number"
            className="w-6/12 ml-4"
          />
        </div>
        <div className="mt-4 flex">
          <h3 className="text-xl leading-10">Additional Info: </h3>
          <Textarea
            placeholder="Additional Info"
            onChange={(e) => e.target.value}
            className="w-8/12 ml-4 border-black"
          />
        </div>
        <Button className="w-full mt-4" type="submit">
          Save Till
        </Button>
      </form>

      <div className="h-12"></div>
    </div>
  );
};

export default BalancedTill;
