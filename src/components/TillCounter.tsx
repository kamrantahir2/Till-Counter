import TillTotal from "./TillTotal/TillTotal";
import BalancedTill from "./BalancedTill";
import { useState } from "react";

const TillCounter = () => {
  // totalTakings =  Till total minus float
  const [totalTakings, setTotalTakings] = useState(0);
  const [fiveAndCoins, setFiveAndCoins] = useState(0);
  const [float, setFloat] = useState(0);

  return (
    <div>
      <h1 className="text-center mb-10 text-2xl font-semibold underline underline-offset-8">
        Till Counter
      </h1>
      <div className="grid md:grid-cols-2 ">
        <TillTotal
          setFiveAndCoins={setFiveAndCoins}
          setTotalTakings={setTotalTakings}
          float={float}
          setFloat={setFloat}
        />
        <BalancedTill />
      </div>
      s
    </div>
  );
};

export default TillCounter;
