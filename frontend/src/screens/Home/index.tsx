import banner from '../../assets/banner.png'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import News from '~/components/Cards/News'
import Location from '~/components/Cards/Location'
import ForYouHome from '~/components/Cards/ForYouHome'
import Outstanding from '~/components/Cards/Outstanding'
import expandTopRight from '~/assets/icons/expandTopRight.icon.svg'
import expandWhite from '~/assets/icons/expandWhite.icon.svg'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className="m-0 flex h-[880px] flex-col overflow-y-auto p-0">
      <div className="">
        <div className="relative">
          <img src={banner} alt="banner" className="w-full overflow-hidden" />
          <form className="absolute left-1/2 top-1/2 flex w-[70%] -translate-x-1/2 -translate-y-1/2 transform items-center rounded-lg border-2 border-gray-primary bg-white pl-3">
            <Input type="text" placeholder="Tìm nhanh. VD: Vinhomes Cenntral Park" className="w-full indent-1" />
            <Button size="sm" variant="primary" className="w-40 sm:w-28">
              Tìm kiếm
            </Button>
          </form>
        </div>

        <div className="flex flex-col overflow-hidden bg-[--gray-secondary] p-5 pb-10 sm:w-auto xl:px-[15%]">
          <div className="flex justify-between py-5 sm:items-center">
            <h1 className="mb-10 text-xl font-medium sm:text-3xl">Dành cho bạn</h1>
            <Link to={''} className="flex h-full">
              <p className="mr-2 text-base">Xem tất cả</p>
              <img src={expandTopRight} alt="expand top right" />
            </Link>
          </div>
          <ForYouHome />
        </div>

        <div className="flex flex-col overflow-hidden bg-white p-5 pb-10 sm:w-auto xl:px-[15%]">
          <div className="mb-10 flex items-center justify-center">
            <h1 className="py-5 text-base font-medium sm:text-3xl">Bất động sản theo địa điểm</h1>
          </div>
          <Location />
        </div>

        <div className="flex flex-col  overflow-hidden bg-[--orange-primary] p-5 sm:w-auto xl:px-[15%]">
          <div className="flex items-center justify-between py-5">
            <h1 className="mb-10 text-base font-medium text-white sm:text-3xl">Dự án nổi bật</h1>
            <Link to={''} className="flex h-full">
              <p className="mr-2 text-base text-white">Xem tất cả</p>
              <img src={expandWhite} alt="expand top right " />
            </Link>
          </div>
          <Outstanding />
        </div>

        <div className=" relative h-full max-h-[500px] overflow-hidden bg-white p-5 pb-10 sm:w-auto xl:px-[15%]">
          <h1 className="mb-10 text-base font-medium sm:text-3xl">Tin tức bất động sản</h1>
          <News />
        </div>
      </div>
    </div>
  )
}

export default Home
