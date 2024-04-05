import banner from '../../assets/banner.png'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import News from '~/components/Cards/News'
import Location from '~/components/Cards/Location'
import ForYouHome from '~/components/Cards/ForYouHome'
import Outstanding from '~/components/Cards/Outstanding'
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
          <ForYouHome />
        </div>

        <div className="flex flex-col overflow-hidden bg-white p-5 pb-10 sm:w-auto xl:px-[15%]">
          <Location />
        </div>

        <div className="flex flex-col  overflow-hidden bg-[--orange-primary] p-5 sm:w-auto xl:px-[15%]">
          <Outstanding />
        </div>

        <div className=" relative h-full max-h-[500px] overflow-hidden bg-white p-5 pb-10 sm:w-auto xl:px-[15%]">
          <News />
        </div>
      </div>
    </div>
  )
}

export default Home
