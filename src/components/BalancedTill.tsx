import { gbp } from "@/utils/utils";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { TillObject } from "@/types";
import tillService from "../service/tills";
import { useContext } from "react";
import { UserContext } from "@/App";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { toast } from "sonner";
import { TillContext } from "@/App";
import { IoMdAlert } from "react-icons/io";

const BalancedTill = ({
  totalTakings,
  tillTotal,
  fiveAndCoins,
  float,
  expectedVsTotal,
  setExpectedVsTotal,
  overUnderCalculated,
  setOverUnderCalculated,
}: {
  totalTakings: number;
  tillTotal: number;
  fiveAndCoins: number;
  float: number;
  overUnderCalculated: boolean;
  setOverUnderCalculated: React.Dispatch<React.SetStateAction<boolean>>;
  expectedVsTotal: string;
  setExpectedVsTotal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [tillNumber, setTillNumber] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [expectedTotal, setExpectedTotal] = useState(0);

  const userContext = useContext(UserContext);
  const tillContext = useContext(TillContext);

  if (!userContext) {
    throw new Error("UserContext cannot be null");
  }

  const overUnder = (): string => {
    const diff: number = Number((totalTakings - expectedTotal).toFixed(2));

    if (diff <= 0) {
      return `${gbp.format(diff)}`;
    } else {
      return `+${gbp.format(diff)}`;
    }
  };

  const overUnderStyle = (): string => {
    if (expectedVsTotal.includes("-")) {
      return "text-red-600";
    } else if (expectedVsTotal.includes("+")) {
      return "text-green-500";
    } else {
      return "";
    }
  };

  const handleExpectedTotalSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setExpectedVsTotal(overUnder());
    setOverUnderCalculated(true);
  };

  const handleSave = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const tillObject: TillObject = {
        tillNumber: tillNumber,
        tillTotal: totalTakings,
        expectedTotal: expectedTotal,
        expectedVsTotal: expectedVsTotal,
        additionalInfo: additionalInfo,
      };

      const savedTill = await tillService.create(tillObject);

      tillContext?.setTills(tillContext.tills.concat(savedTill));

      toast.success("Till Saved Successfully", {
        classNames: {
          toast: " border-2 border-green-500 bg-green-100",
          title: "text-base",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (tillTotal === 0) {
    return (
      <div className="mx-auto md:mt-0 mt-4">
        <h1 className="text-center mb-10 text-2xl font-medium underline underline-offset-8 font-poppins">
          Till Total
        </h1>
        <div className="md:ml-4">
          <div className="h-auto bg-yellow-100 border-2 rounded-xl border-yellow-400 content-center ">
            <div className="p-4">
              <h3 className="capitalize font-poppins text-lg font-semibold mb-4 flex ">
                <IoMdAlert className="text-4xl" />{" "}
                <span className="leading-10 ml-2">
                  Till totals will be shown after submitting Till Counter form
                </span>
              </h3>
              <p className="ml-2 font-semibold capitalize"></p>
            </div>
          </div>
        </div>
        <div className="h-12"></div>
      </div>
    );
  }

  return (
    <div className="md:mx-auto md:mt-0 mt-4 font-poppins">
      <h1 className="text-center mb-10 text-2xl font-semibold underline underline-offset-8">
        Till Total
      </h1>

      <h3 className="text-xl my-6">
        £5 Notes & Coins: <span className="font-semibold">£{fiveAndCoins}</span>
      </h3>

      <h3 className="text-xl">
        Till Total:{" "}
        <span className="font-semibold">{gbp.format(tillTotal)}</span>
        <br />- Float:{" "}
        <span className="font-semibold">{gbp.format(float)}</span>
        <br /> = Total Takings:{" "}
        <span className="font-semibold">{gbp.format(totalTakings)}</span>
      </h3>

      <form onSubmit={handleExpectedTotalSubmit}>
        <div className="mt-4 flex">
          <h3 className="text-xl leading-10">Expected Total: £</h3>
          <Input
            placeholder="Expected Total"
            className="w-6/12 ml-4 text-md"
            type="number"
            onChange={(e) => setExpectedTotal(Number(e.target.value))}
            required
            step={0.01}
            onWheel={(_e) => (document.activeElement as HTMLElement).blur()}
          />
        </div>
        <Button className="w-full mt-4 text-md" type="submit">
          Submit
        </Button>
      </form>
      {overUnderCalculated && (
        <div>
          <h3 className="text-xl mt-4">
            Till Over/Under:{" "}
            <span className={`font-semibold ${overUnderStyle()}`}>
              {" "}
              {expectedVsTotal}
            </span>
          </h3>
        </div>
      )}

      {overUnderCalculated && (
        <div className="mt-4">
          <div className="sm:w-7/12 md:w-11/12 h-px my-9 mx-auto bg-black"></div>
          <h2 className="text-center mb-10 text-2xl font-semibold underline underline-offset-8">
            Save Till
          </h2>
          <form onSubmit={handleSave}>
            <div className="mt-4 flex">
              <h3 className="text-xl leading-10">Till Number: </h3>
              <Input
                type="number"
                onChange={(e) => setTillNumber(Number(e.target.value))}
                required
                placeholder="Till Number"
                className="w-6/12 ml-4"
                onWheel={(_e) => (document.activeElement as HTMLElement).blur()}
              />
            </div>
            <div className="mt-4 flex">
              <h3 className="text-xl leading-10">Additional Info: </h3>
              <Textarea
                placeholder="Additional Info"
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="sm:w-7/12  ml-4 border-black"
              />
            </div>
            {userContext.user && (
              <Button
                disabled={!userContext.user}
                className="w-full mt-4 text-md"
                type="submit"
              >
                Save Till
              </Button>
            )}
          </form>
          {!userContext.user && (
            <div className="">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild className="!pointer-events-auto">
                    <Button disabled className="w-full mt-4">
                      Save Till
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="font-semibold text-md">Log in to save till</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      )}
      <div className="h-12"></div>
    </div>
  );
};

export default BalancedTill;
