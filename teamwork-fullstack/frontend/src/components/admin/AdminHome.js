import React, { useEffect, useState } from "react";
import Comments from "./Home/Comments";
import DashboardLeft from "./Home/DashboardLeft";
import DashboardRight from "./Home/DashboardRight";
import CurrencyConverter from "./Home/CurrencyConverter";
import Sales from "./Home/Sales";
import View from "./Home/View";

export default function AdminHome() {
  const [contentChanger, setContentChanger] = useState("0");

  const [orderID, setOrderID] = useState({});
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const bool = showOrderDetails || contentChanger > 0;

  return (
    <div className="h-min-h w-full flex flex-col px-6">
      <div className="h-32 flex flex-row mb-6 mt-6 justify-around">
        <div className="dashboardComp">
          <View />
        </div>
        <div className="dashboardComp">
          <Sales />
        </div>
        <div className="dashboardComp">
          <Comments />
        </div>
        <div className="dashboardComp">
          <CurrencyConverter />
        </div>
      </div>
      <div className="flex flex-row h-full px-6 mt-20 gap-4">
        {bool ? (
          <div className="h-min w-[70%] border-2 border-slate-300">
            <DashboardLeft
              setContentChanger={setContentChanger}
              orderID={orderID}
              setOrderID={setOrderID}
              showOrderDetails={showOrderDetails}
              setShowOrderDetails={setShowOrderDetails}
            />
          </div>
        ) : (
          <div className="min-h-full w-[100%] border-2 border-slate-300">
            <DashboardLeft
              setContentChanger={setContentChanger}
              orderID={orderID}
              setOrderID={setOrderID}
              showOrderDetails={showOrderDetails}
              setShowOrderDetails={setShowOrderDetails}
            />
          </div>
        )}

        {bool ? (
          <div className="min-h-full w-[30%] border-2 border-slate-300">
            <DashboardRight
              contentChanger={contentChanger}
              orderID={orderID}
              setOrderID={setOrderID}
              showOrderDetails={showOrderDetails}
              setShowOrderDetails={setShowOrderDetails}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
