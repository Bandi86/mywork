import Posts from '../common/posts/Posts'
import Banner from './Banner'
import Discover from './Discover'
import Trending from './Trending'

const Demo = () => {
  return (
    <>
      <Banner />
      <Trending />
      <div className='size p-7 flex flex-col reverse md:flex-row gap-[7rem]'>
        <div className='flex-[1.5]'>
          <Posts />
        </div>
        <div className='flex-[1] relative'>
          <Discover />
        </div>
      </div>
    </>
  )
}

export default Demo
