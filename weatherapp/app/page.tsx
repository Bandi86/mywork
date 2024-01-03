'use client'

import Container from '@/components/Container'
import Navbar from '@/components/Navbar'
import { WeatherData } from '@/types'
import axios from 'axios'
import { format } from 'date-fns'
import { parseISO } from 'date-fns/parseISO'
import { useQuery } from 'react-query'
import { convertKelvinToCelsius } from '@/utils/convert-celsius'
import ForcastWeather from '@/components/ForcastWeather'
import WeatherIcon from '@/components/WeatherIcon'
import { getDayOrNightIcon } from '@/utils/getDayOrNightIcon'

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    'repoData',
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=budapest&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
      )
      return data
    }
  )

  const firstData = data?.list[0]

  if (isLoading)
    return (
      <div className='flex items-center min-h-screen justify-center'>
        <p className='animate-bounce'>Loading...</p>
      </div>
    )

  return (
    <div className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
      <Navbar />
      <main className='px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4'>
        {/* today data */}
        <section className='space-y-4'>
          <div className='space-y-2'>
            <h2 className='flex gap-1 text-2xl items-end'>
              <p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
              <p>
                {format(parseISO(firstData?.dt_txt ?? ''), '(yyyy MMMM dd)')}
              </p>
            </h2>
            <Container className='gap-10 px-6 items-center'>
              <div className='flex flex-col px-8 items-center gap-2'>
                <span className='text-5xl'>
                  {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°C
                </span>
                <p className='text-xs space-x-1 whitespace-nowrap'>
                  <span>Feels like</span>
                  <span className='text-gray-500'>
                    {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°C
                  </span>
                </p>
                <p className='text-xs space-x-2 whitespace-nowrap'>
                  <span>
                    min:{' '}
                    <span className='text-gray-500'>
                      {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}
                      °C{' '}
                    </span>
                  </span>
                  <span>
                    max:{' '}
                    <span className='text-gray-500'>
                      {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
                      °C
                    </span>
                  </span>
                </p>
              </div>
              {/* time and weather icon */}
              <div className='flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3'>
                {data?.list.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='flex flex-col items-center gap-2 pb-4'
                    >
                      <p className='text-xs'>
                        {format(parseISO(item.dt_txt), 'HH:mm')}
                      </p>
                      <WeatherIcon
                        iconName={getDayOrNightIcon(
                          item.weather[0].icon,
                          item.dt_txt
                        )}
                      />
                      <p className='text-xs'>{item.weather[0].main}</p>
                    </div>
                  )
                })}
              </div>
            </Container>
          </div>
          <div className='flex gap-4'>
            {/* left */}
            <Container className='w-fit justify-center flex-col px-4 items-center'>
              <p>{firstData?.weather[0].description}</p>
              <WeatherIcon
                iconName={getDayOrNightIcon(
                  firstData?.weather[0].icon ?? '',
                  firstData?.dt_txt ?? ''
                )}
              />
            </Container>
            {/* right */}
          </div>
        </section>
        {/* 7 days forecast data */}
        <section className='flex w-full flex-col gap-4'>
          <p className='text-2xl'>Forcast 7 days</p>
          <ForcastWeather />
        </section>
      </main>
    </div>
  )
}
