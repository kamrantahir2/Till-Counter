import { gbp } from "@/utils/utils";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";

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

  // if (tillTotal === 0) {
  //   return (
  //     <div className="mx-auto md:mt-0 mt-4">
  //       <h1 className="text-center mb-10 text-2xl font-semibold underline underline-offset-8">
  //         Till Total
  //       </h1>
  //       <h1 className="text-xl italic">
  //         *Till totals will show after submitting Till Counter form*
  //       </h1>
  //     </div>
  //   );
  // }

  return (
    <div className="md:mx-auto md:mt-0 mt-4 font-poppins">
      <h1 className="text-center mb-10 text-2xl font-semibold underline underline-offset-8">
        Till Total
      </h1>
      <h1 className="text-lg">
        Till Total:{" "}
        <span className="font-semibold">{gbp.format(tillTotal)}</span>
        <br />- Float:{" "}
        <span className="font-semibold">{gbp.format(float)}</span>
        <br /> = Total Takings:{" "}
        <span className="font-semibold">{gbp.format(totalTakings)}</span>
      </h1>

      <form>
        <div className="mt-4 flex">
          <h1 className="text-xl leading-10">Expected Total:</h1>
          <Input
            placeholder="Expected Total"
            className="w-6/12 ml-4"
            type="number"
            onChange={(e) => setExpectedTotal(e.target.value)}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default BalancedTill;
