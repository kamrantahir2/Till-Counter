import TillTotal from "./TillTotal";
import BalancedTill from "./BalancedTill";
import { useState } from "react";

const TillCounter = () => {
  const [tillTotal, setTillTotal] = useState<number>(0);

  return (
    <div>
      <TillTotal />
      <BalancedTill />
    </div>
  );
};

export default TillCounter;
