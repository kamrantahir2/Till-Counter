import { useState } from "react";
import { Button } from "../ui/button";
import CurrencyInput from "./CurrencyInput";

// const TillTotal = ({
//   setFiveAndCoins,
//   setTotalTakings,
// }: {
//   setFiveAndCoins: React.Dispatch<React.SetStateAction<number>>;
//   setTotalTakings: React.Dispatch<React.SetStateAction<number>>;
// }) => {

const TillTotal = () => {
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
  const [float, setFloat] = useState(0);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(float);
  };

  return (
    <div className="sm:w-5/12 md:w-4/12">
      <form onSubmit={handleSubmit}>
        <CurrencyInput
          label="Float"
          currency="float"
          setTotal={setFloat}
          value={1}
        />
        <CurrencyInput
          label="1p Coins"
          currency="1p"
          setTotal={setTotalOneP}
          value={0.01}
        />
        <CurrencyInput
          setTotal={setTotalTwoP}
          value={0.02}
          label="2p Coins"
          currency="2p"
        />
        <CurrencyInput
          setTotal={setTotalFiveP}
          value={0.05}
          label="5p Coins"
          currency="5p"
        />
        <CurrencyInput
          setTotal={setTotalTenP}
          value={0.1}
          label="10p Coins"
          currency="10p"
        />
        <CurrencyInput
          setTotal={setTotalTwentyP}
          value={0.2}
          label="20p Coins"
          currency="20p"
        />
        <CurrencyInput
          setTotal={setTotalFiftyP}
          value={0.5}
          label="50p Coins"
          currency="50p"
        />
        <CurrencyInput
          setTotal={setTotalOnePound}
          value={1}
          label="£1 Coins"
          currency="£1"
        />
        <CurrencyInput
          setTotal={setTotalTwoPound}
          value={2}
          label="£2 Coins"
          currency="£2"
        />
        <CurrencyInput
          setTotal={setTotalFivePound}
          value={5}
          label="£5 Notes"
          currency="£5"
        />
        <CurrencyInput
          setTotal={setTotalTenPound}
          value={10}
          label="£10 Notes"
          currency="£10"
        />
        <CurrencyInput
          setTotal={setTotalTwentyPound}
          value={20}
          label="£20 Notes"
          currency="£20"
        />
        <CurrencyInput
          setTotal={setTotalFiftyPound}
          value={50}
          label="£50 Notes"
          currency="£50"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default TillTotal;
