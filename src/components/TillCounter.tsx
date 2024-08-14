import TillTotal from "./TillTotal/TillTotal";
import BalancedTill from "./BalancedTill";
import { useState } from "react";

const TillCounter = () => {
  // totalTakings =  Till total minus float
  const [totalTakings, setTotalTakings] = useState(0);
  const [fiveAndCoins, setFiveAndCoins] = useState(0);

  return (
    <div>
      <TillTotal />
      <BalancedTill />
    </div>
  );
};

export default TillCounter;
