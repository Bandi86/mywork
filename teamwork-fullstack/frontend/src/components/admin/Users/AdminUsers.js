import React from 'react';
import Customers from '../Home/Customers';
import Sales from '../Home/Sales';
import Comments from '../Home/Comments';
import View from '../Home/View';
import CurrencyConverter from '../Home/CurrencyConverter';
import AddUser from './AddUser';


export default function AdminUsers() {
  return (
    <>
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
        <div className="min-h-full w-[70%] border-2 border-slate-300">
          <Customers />
        </div>
        <div className="min-h-full w-[30%] border-2 border-slate-300">
          <AddUser />
        </div>
      </div>
      </div>
    </>
  )
}
