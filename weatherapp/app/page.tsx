'use client'

import Container from '@/components/Container'
import ForcastWeather from '@/components/ForcastWeather'
import Navbar from '@/components/Navbar'
import WeatherDetails from '@/components/WeatherDetails'
import WeatherIcon from '@/components/WeatherIcon'
import { WeatherData } from '@/types'
import { convertKelvinToCelsius } from '@/utils/convert-celsius'
import { convertWindSpeed } from '@/utils/convert-wind-speed'
import { getDayOrNightIcon } from '@/utils/getDayOrNightIcon'
import { metersToKilometers } from '@/utils/mToKm'
import { url } from '@/utils/url'
import axios from 'axios'
import { format, fromUnixTime } from 'date-fns'
import { parseISO } from 'date-fns/parseISO'
import { useQuery } from 'react-query'
import { placeAtom } from './atom'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

export default function Home() {
  const [place] = useAtom(placeAtom)

  const { isLoading, error, data, refetch } = useQuery<WeatherData>(
    'repoData',
    async () => {
      const { data } = await axios.get(
        `${url}forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      )
      return data
    }
  )

  useEffect(() => {
    refetch()
  }, [place, refetch])

  const firstData = data?.list[0]

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split('T')[0]
      )
    ),
  ]

  // filtering data to get the first entry after 6am for each unique date
  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split('T')[0]
      const entryTime = new Date(entry.dt * 1000).getHours()
      return entryDate === date && entryTime >= 6
    })
  })

  if (isLoading)
    return (
      <div className='flex items-center min-h-screen justify-center'>
        <p className='animate-bounce'>Loading...</p>
      </div>
    )

  return (
    <div className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
      <Navbar location={data?.city.name} />
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
              <p className='capitalize text-center'>
                {firstData?.weather[0].description}
              </p>
              <WeatherIcon
                iconName={getDayOrNightIcon(
                  firstData?.weather[0].icon ?? '',
                  firstData?.dt_txt ?? ''
                )}
              />
            </Container>
            {/* right */}
            <Container className='bg-yellow-200 px-6 gap-4 justify-between overflow-x-auto'>
              <WeatherDetails
                visibility={metersToKilometers(firstData?.visibility ?? 10000)}
                airPressure={`${firstData?.main.pressure} hPa`}
                humidity={`${firstData?.main.humidity}%`}
                sunrise={format(
                  fromUnixTime(data?.city.sunrise ?? 1702949452),
                  'H:mm'
                )}
                sunset={format(
                  fromUnixTime(data?.city.sunset ?? 1702517657),
                  'H:mm'
                )}
                windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
              />
            </Container>
          </div>
        </section>
        {/* 7 days forecast data */}

        <section className='flex w-full flex-col gap-4'>
          <p className='text-2xl'>Forecast 7 days</p>
          {firstDataForEachDate?.map((item, index) => (
            <ForcastWeather
              key={index}
              description={item?.weather[0].description ?? ''}
              weatherIcon={item?.weather[0].icon ?? ''}
              date={format(parseISO(item?.dt_txt ?? ''), 'MM.dd')}
              day={format(parseISO(item?.dt_txt ?? ''), 'EEEE')}
              feels_like={item?.main.feels_like ?? 0}
              temp={item?.main.temp ?? 0}
              temp_min={item?.main.temp_min ?? 0}
              temp_max={item?.main.temp_max ?? 0}
              airPressure={`${item?.main.pressure} hPa`}
              humidity={`${item?.main.humidity}%`}
              sunrise={format(
                fromUnixTime(data?.city.sunrise ?? 1702949452),
                'H:mm'
              )}
              sunset={format(
                fromUnixTime(data?.city.sunset ?? 1702517657),
                'H:mm'
              )}
              visibility={metersToKilometers(item?.visibility ?? 10000)}
              windSpeed={convertWindSpeed(item?.wind.speed ?? 1.64)}
            />
          ))}
        </section>
      </main>
    </div>
  )
}
