import { Link } from 'react-router-dom'
import { nav } from '../../data'
import { useEffect, useState } from 'react'
import Auth from './Auth/Auth'
import { useBlogContext } from '../../context/Context'

const DemoHeader = () => {
  const [isActive, setIsActive] = useState(false)
  const [modal, setModal] = useState(false)
  const { currentUser } = useBlogContext()

  useEffect(() => {
    const scrollMe = () => {
      window.scrollY > 50 ? setIsActive(true) : setIsActive(false)
    }
    window.addEventListener('scroll', scrollMe)
  }, [])

  return (
    <header
      className={`border-b border-black sticky top-0 z-50 ${
        isActive ? 'bg-white' : 'bg-banner'
      } transition-all duration-500`}
    >
      <div className="size h-[70px] flex items-center justify-between">
        <Link to="/">
          <img
            src="https://miro.medium.com/v2/resize:fit:8978/1*s986xIGqhfsN8U--09_AdA.png"
            alt="logo"
            className="h-[2.5rem]"
          />
        </Link>
        <div className="flex items-center gap-5">
          <div className="hidden text-sm sm:flex items-center gap-5">
            {nav.map((item, i) => (
              <Link key={i} to={item.path}>
                {item.title}
              </Link>
            ))}
          </div>
          <div className="relative">
            <button
              className="hidden text-sm sm:flex items-center gap-5"
              onClick={() => setModal(true)}
            >
              Sign in
            </button>
            <Auth modal={modal} setModal={setModal} />
          </div>
          <button
            className={`text-white px-3 py-1 rounded-full text-sm font-medium ${
              isActive ? 'bg-green-700' : 'bg-black'
            }`}
            onClick={() => setModal(true)}
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}

export default DemoHeader
