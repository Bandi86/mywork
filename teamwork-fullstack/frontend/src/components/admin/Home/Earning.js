import { PiMoney } from "react-icons/pi";
import CurrencyConverter from "./CurrencyConverter";

export default function Earning() {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl px-6">
          <CurrencyConverter />
        </h1>
        <PiMoney className="text-[85px] pr-6" />
      </div>
      <p className="px-6">Earning</p>
    </>
  );
}
