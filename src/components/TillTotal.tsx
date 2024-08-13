import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Button } from "./ui/button";

const TillTotal = () => {
  const [oneP, setOneP] = useState(0);
  const [twoP, setTwoP] = useState(0);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(oneP);
    console.log(twoP);
  };

  return (
    <div className="w-4/12">
      <form onSubmit={handleSubmit}>
        <div className="flex h-12 mb-4">
          <Label className="w-24 leading-9" htmlFor="1p">
            1p Coins:
          </Label>

          <Input
            onChange={(e) => setOneP(Number(e.target.value))}
            type="number"
            id="1p"
            placeholder="No. of 1p coins"
          />
        </div>
        <div className="flex h-12 my-4">
          <Label className="w-24 leading-9" htmlFor="2p">
            2p Coins:
          </Label>

          <Input
            onChange={(e) => setTwoP(Number(e.target.value))}
            type="number"
            id="2p"
            placeholder="No. of 2p coins"
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default TillTotal;
