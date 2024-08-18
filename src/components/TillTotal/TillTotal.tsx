import { useState } from "react";
import { Button } from "../ui/button";
import CurrencyInput from "./CurrencyInput";

const TillTotal = ({
  setFiveAndCoins,
  setTotalTakings,
  setFloat,
  float,
  setTillTotal,
}: {
  setFiveAndCoins: React.Dispatch<React.SetStateAction<number>>;
  setTotalTakings: React.Dispatch<React.SetStateAction<number>>;
  setFloat: React.Dispatch<React.SetStateAction<number>>;
  setTillTotal: React.Dispatch<React.SetStateAction<number>>;
  float: number;
}) => {
  // Value of coins/notes
  const [totalOneP, setTotalOneP] = useState(0);
  const [totalTwoP, setTotalTwoP] = useState(0);
  const [totalFiveP, setTotalFiveP] = useState(0);
  const [totalTenP, setTotalTenP] = useState(0);
  const [totalTwentyP, setTotalTwentyP] = useState(0);
  const [totalFiftyP, setTotalFiftyP] = useState(0);
  const [totalOnePound, setTotalOnePound] = useState(0);
  const [totalTwoPound, setTotalTwoPound] = useState(0);
  const [totalFivePound, setTotalFivePound] = useState(0);
  const [totalTenPound, setTotalTenPound] = useState(0);
  const [totalTwentyPound, setTotalTwentyPound] = useState(0);
  const [totalFiftyPound, setTotalFiftyPound] = useState(0);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const fiveAndCoins: number = Number(
      (
        totalOneP +
        totalTwoP +
        totalFiveP +
        totalTenP +
        totalTwentyP +
        totalFiftyP +
        totalOnePound +
        totalTwoPound +
        totalFivePound
      ).toFixed(2)
    );

    setFiveAndCoins(fiveAndCoins);

    const tillTotal: number = Number(
      (
        fiveAndCoins +
        totalTenPound +
        totalTwentyPound +
        totalFiftyPound
      ).toFixed(2)
    );

    setTillTotal(tillTotal);

    const totalTakings: number = Number((tillTotal - float).toFixed(2));

    setTotalTakings(totalTakings);
  };

  return (
    <div>
      <div className="md:border-r-2 md:pr-3 md:border-black">
        <h1 className="text-center mb-10 text-2xl font-semibold underline underline-offset-8">
          Till Counter
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="">
            <CurrencyInput
              label="Float"
              currency="float"
              setTotal={setFloat}
              total={float}
              value={1}
            />
            <CurrencyInput
              label="1p Coins"
              currency="1p"
              setTotal={setTotalOneP}
              value={0.01}
              total={totalOneP}
            />
            <CurrencyInput
              setTotal={setTotalTwoP}
              value={0.02}
              label="2p Coins"
              currency="2p"
              total={totalTwoP}
            />
            <CurrencyInput
              setTotal={setTotalFiveP}
              value={0.05}
              label="5p Coins"
              currency="5p"
              total={totalFiveP}
            />
            <CurrencyInput
              setTotal={setTotalTenP}
              value={0.1}
              label="10p Coins"
              currency="10p"
              total={totalTenP}
            />
            <CurrencyInput
              setTotal={setTotalTwentyP}
              value={0.2}
              label="20p Coins"
              currency="20p"
              total={totalTwentyP}
            />
            <CurrencyInput
              setTotal={setTotalFiftyP}
              value={0.5}
              label="50p Coins"
              currency="50p"
              total={totalFiftyP}
            />
            <CurrencyInput
              setTotal={setTotalOnePound}
              value={1}
              label="£1 Coins"
              currency="£1"
              total={totalOnePound}
            />
            <CurrencyInput
              setTotal={setTotalTwoPound}
              value={2}
              label="£2 Coins"
              currency="£2"
              total={totalTwoPound}
            />
            <CurrencyInput
              setTotal={setTotalFivePound}
              value={5}
              label="£5 Notes"
              currency="£5"
              total={totalFivePound}
            />
            <CurrencyInput
              setTotal={setTotalTenPound}
              value={10}
              label="£10 Notes"
              currency="£10"
              total={totalTenPound}
            />
            <CurrencyInput
              setTotal={setTotalTwentyPound}
              value={20}
              label="£20 Notes"
              currency="£20"
              total={totalTwentyPound}
            />
            <CurrencyInput
              setTotal={setTotalFiftyPound}
              value={50}
              label="£50 Notes"
              currency="£50"
              total={totalFiftyPound}
            />
          </div>
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TillTotal;
