import React, { useEffect, useState, useContext } from 'react'
import { BiPackage } from 'react-icons/bi'
import { ordersCount } from '../../../repositories/apiEndPoints'
import { readEntry } from '../../../repositories/crud'
import CountUp from "react-countup";
import { adminContext } from "../../../contexts/adminContext";
import { userContext } from "../../../contexts/userContext";

export default function Comments() {
  const [amount, setAmount] = useState(0)
  const [showNumbers, setShowNumbers] = useState(false);
  const {adminRefresh} = useContext(adminContext)
  const { user, isLoggedIn } = useContext(userContext);

  useEffect(() => {
    readEntry(ordersCount)
      .then(res => res.json())
      .then(data => {
        if (Object.values(data.resdata) == 0) setAmount(0)
        else setAmount(Object.values(data.resdata))
      })
    setShowNumbers(true);
  }, [adminRefresh, user, isLoggedIn])

  return (
    <>
      <div className='flex flex-row items-center justify-between'>
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
        <BiPackage className='text-[85px] pr-6' />
      </div>
      <p className="text-l mb-2 ml-8 font-bold">Submitted Orders</p>
    </>
  )
}