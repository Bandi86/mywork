import { IoSearch } from 'react-icons/io5'
import React from 'react'
import clsx from 'clsx'
import { cn } from '@/utils/cn'

type Props = {
  className?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
}

const SearchInput = (props: Props) => {
  return (
    <form
      className={cn(
        'flex relative items-center justify-center h-10',
        props.className
      )}
      onSubmit={props.onSubmit}
    >
      <input
        className='w-full h-full rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        type='text'
        placeholder='Search'
        onChange={props.onChange}
        value={props.value}
      />
      <button className='px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full'>
        <IoSearch className='text-2xl' />
      </button>
    </form>
  )
}

export default SearchInput
