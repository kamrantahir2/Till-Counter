import TillTotal from "./TillTotal/TillTotal";
import BalancedTill from "./BalancedTill";
import { useState } from "react";
import { User } from "@/types";

const TillCounter = ({
  user,
  setUser,
}: {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  // totalTakings =  Till total minus float
  const [totalTakings, setTotalTakings] = useState(0);
  const [tillTotal, setTillTotal] = useState(0);
  const [fiveAndCoins, setFiveAndCoins] = useState(0);

  const [float, setFloat] = useState(0);

  return (
    <div>
      <div className="grid md:grid-cols-2 ">
        <TillTotal
          setFiveAndCoins={setFiveAndCoins}
          setTotalTakings={setTotalTakings}
          float={float}
          setFloat={setFloat}
          setTillTotal={setTillTotal}
        />
        <BalancedTill
          totalTakings={totalTakings}
          tillTotal={tillTotal}
          fiveAndCoins={fiveAndCoins}
          float={float}
          user={user}
        />
      </div>
    </div>
  );
};

export default TillCounter;
