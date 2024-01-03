import { MdOutlineLocationOn } from 'react-icons/md'
import { MdMyLocation } from 'react-icons/md'

import { BiSun } from 'react-icons/bi'
import React from 'react'
import SearchInput from './SearchInput'

const Navbar = () => {
  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <div className='flex items-center justify-center gap-2'>
          <h2 className='text-gray-500 text-3xl'>Weather</h2>
          <BiSun className='text-3xl mt-1 text-yellow-300' />
        </div>
        <section className='flex gap-4 items-center'>
          <MdMyLocation className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer' />

          <MdOutlineLocationOn className='text-3xl' />
          <p className='text-slate-900/80 text-sm'>India</p>

          <SearchInput />
        </section>
      </div>
    </nav>
  )
}

export default Navbar
