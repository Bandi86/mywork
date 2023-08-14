import React, { useEffect, useState, useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { readEntry } from "../../../repositories/crud";
import { totalSalesEndpoint } from "../../../repositories/apiEndPoints";
import CountUp from "react-countup";
import { adminContext } from "../../../contexts/adminContext";
import { userContext } from "../../../contexts/userContext";

export default function Sales() {
  const [amount, setAmount] = useState(0);
  const [showNumbers, setShowNumbers] = useState(false);
  const { adminRefresh, setAdminRefresh } = useContext(adminContext)
  const { user, isLoggedIn } = useContext(userContext);

  useEffect(() => {
    readEntry(totalSalesEndpoint)
      .then((res) => res.json())
      .then((data) => {
        if (Object.values(data.resdata) == 0) setAmount(0);
        else setAmount(Object.values(data.resdata));
      });
  }, [isLoggedIn, user, adminRefresh]);

  useEffect(() => {    
    setShowNumbers(true);
  }, [isLoggedIn, user, adminRefresh]);

  return (
    <>
      <div className="flex flex-row items-center justify-between ml-4 text-green-400 font-bold">
        {showNumbers && isLoggedIn && user ? (
          <CountUp
            end={amount}
            duration={3}
            separator=","
            className="text-3xl px-6"
          />
        ) : (
          <span>0</span>
        )}
        <AiOutlineShoppingCart className="text-[85px] pr-4" />
      </div>
      <p className="text-l mb-2 ml-8 font-bold">Products Sold</p>
    </>
  );
}
