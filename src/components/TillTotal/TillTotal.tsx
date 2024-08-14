import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Button } from "../ui/button";
import CurrencyInput from "./CurrencyInput";

const TillTotal = () => {
  const [oneP, setOneP] = useState(0);
  const [twoP, setTwoP] = useState(0);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(oneP);
    console.log(twoP);
  };

  return (
    <div className="sm:w-5/12 md:w-4/12">
      <form onSubmit={handleSubmit}>
        <CurrencyInput setValue={setOneP} label="1p Coins" currency="1p" />
        <CurrencyInput setValue={setTwoP} label="2p Coins" currency="2p" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default TillTotal;
