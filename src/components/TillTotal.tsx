import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

const TillTotal = () => {
  const [oneP, setOneP] = useState(0);

  return (
    <div>
      <div className="w-8/12">
        <div className="grid w-3/12 items-start gap-1.5">
          <Label className="mb-1" htmlFor="1p">
            1p Coins
          </Label>
          <Input type="number" id="1p" placeholder="No. of 1p coins" />
        </div>
      </div>
    </div>
  );
};

export default TillTotal;
