import { useState } from "react";
import { Button } from "../ui/button";
import CurrencyInput from "./CurrencyInput";

const TillTotal = () => {
  const [oneP, setOneP] = useState(0);
  const [twoP, setTwoP] = useState(0);
  const [fiveP, setFiveP] = useState(0);
  const [tenP, setTenP] = useState(0);
  const [twentyP, setTwentyP] = useState(0);
  const [fiftyP, setFiftyP] = useState(0);
  const [onePound, setOnePound] = useState(0);
  const [twoPound, setTwoPound] = useState(0);
  const [fivePound, setFivePound] = useState(0);
  const [tenPound, setTenPound] = useState(0);
  const [twentyPound, setTwentyPound] = useState(0);
  const [fiftyPound, setFiftyPound] = useState(0);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(fiftyPound);
  };

  return (
    <div className="sm:w-5/12 md:w-4/12">
      <form onSubmit={handleSubmit}>
        <CurrencyInput setValue={setOneP} label="1p Coins" currency="1p" />
        <CurrencyInput setValue={setTwoP} label="2p Coins" currency="2p" />
        <CurrencyInput setValue={setFiveP} label="5p Coins" currency="5p" />
        <CurrencyInput setValue={setTenP} label="10p Coins" currency="10p" />
        <CurrencyInput setValue={setTwentyP} label="20p Coins" currency="20p" />
        <CurrencyInput setValue={setFiftyP} label="50p Coins" currency="50p" />
        <CurrencyInput setValue={setOnePound} label="£1 Coins" currency="£1" />
        <CurrencyInput setValue={setTwoPound} label="£2 Coins" currency="£2" />
        <CurrencyInput setValue={setFivePound} label="£5 Notes" currency="£5" />
        <CurrencyInput
          setValue={setTenPound}
          label="£10 Notes"
          currency="£10"
        />
        <CurrencyInput
          setValue={setTwentyPound}
          label="£20 Notes"
          currency="£20"
        />
        <CurrencyInput
          setValue={setFiftyPound}
          label="£50 Notes"
          currency="£50"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default TillTotal;
