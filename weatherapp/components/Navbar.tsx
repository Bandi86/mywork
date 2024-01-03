'use client'

import { MdOutlineLocationOn } from 'react-icons/md'
import { MdMyLocation } from 'react-icons/md'
import { BiSun } from 'react-icons/bi'
import { useState } from 'react'
import SearchInput from './SearchInput'
import axios from 'axios'
import { url } from '@/utils/url'
import { useAtom } from 'jotai'
import { loadingCityAtom, placeAtom } from '@/app/atom'

interface NavbarProps {
  location: string | undefined
}

const Navbar = ({ location }: NavbarProps) => {
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const [place, setPlace] = useAtom(placeAtom)
  const [_, setLoadingCity] = useAtom(loadingCityAtom)

  async function handleInputChange(value: string) {
    setCity(value)
    if (value.length >= 3) {
      try {
        const res = await axios.get(
          `${url}find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        )
        const suggestions = res.data.list.map((item: any) => item.name)
        setSuggestions(suggestions)
        setError('')
        setShowSuggestions(true)
      } catch (error) {
        setSuggestions([])
        setShowSuggestions(false)
      }
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value)
    setShowSuggestions(false)
  }

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true)
    e.preventDefault()
    if (suggestions.length == 0) {
      setError('Location not found')
      setLoadingCity(false)
    } else {
      setError('')
      setLoadingCity(false)
      setPlace(city)
      setShowSuggestions(false)
    }
  }

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (postiion) => {
        const { latitude, longitude } = postiion.coords
        try {
          setLoadingCity(true)
          const response = await axios.get(
            `${url}weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
          )
          setTimeout(() => {
            setLoadingCity(false)
            setPlace(response.data.name)
          }, 500)
        } catch (error) {
          setLoadingCity(false)
        }
      })
    }
  }

  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <div className='flex items-center justify-center gap-2'>
          <h2 className='text-gray-500 text-3xl'>Weather</h2>
          <BiSun className='text-3xl mt-1 text-yellow-300' />
        </div>
        <section className='flex gap-4 items-center'>
          <MdMyLocation
            className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer'
            title='Your Current Location'
            onClick={handleCurrentLocation}
          />

          <MdOutlineLocationOn className='text-3xl' />
          <p className='text-slate-900/80 text-sm'>{location}</p>
          <div className='relative hidden md:flex'>
            <SearchInput
              value={city}
              onSubmit={handleSubmitSearch}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <SuggestionBox
              {...{
                showSuggestions,
                suggestions,
                handleSuggestionClick,
                error,
              }}
            />
          </div>
        </section>
      </div>
    </nav>
  )
}

function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean
  suggestions: string[]
  handleSuggestionClick: (item: string) => void
  error: string
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className='mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2'>
          {error && suggestions.length < 1 && (
            <li className='text-red-500 p-1 '> {error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className='cursor-pointer p-1 rounded   hover:bg-gray-200'
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Navbar
