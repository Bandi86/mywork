import React, { useState, useContext, useEffect } from 'react'
import { HiOutlineUsers } from 'react-icons/hi'
import { usersEndpoint } from '../../../repositories/apiEndPoints'
import { readEntry } from '../../../repositories/crud'
import { adminContext } from "../../../contexts/adminContext";
import { userContext } from '../../../contexts/userContext';
import CountUp from "react-countup";

export default function View() {

  const [total, setTotal] = useState(0)
  const {adminRefresh} = useContext(adminContext)

  const [showNumbers, setShowNumbers] = useState(false);
  const { user, isLoggedIn } = useContext(userContext);

  useEffect(() => {
    readEntry(`${usersEndpoint}/count`).then((res) => {
      res.json().then((data) => {
        setTotal(Object.values(data.resdata)[0])
      })
    })
    setShowNumbers(true);
    console.log("hellobello")
  }, [adminRefresh, user, isLoggedIn])

  return (
    <>
      <div className='flex flex-row items-center justify-between'>
      {showNumbers && isLoggedIn && user ? (
          <CountUp
            end={total}
            duration={3}
            separator=","
            className="text-3xl px-6"
          />
        ) : (
          <span>0</span>
        )}
        <HiOutlineUsers className='text-[85px] pr-6' />
      </div>
      <p className='text-l mb-2 ml-8 font-bold'>Registered Accounts</p>
    </>
  )
}
