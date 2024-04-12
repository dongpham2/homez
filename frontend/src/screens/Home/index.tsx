import banner from '../../assets/banner.png'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import expandTopRight from '~/assets/icons/expandTopRight.icon.svg'
import expandWhite from '~/assets/icons/expandWhite.icon.svg'
import { Link } from 'react-router-dom'
import CardReport from '~/components/Cards/CardReport'
import CardNews from '~/components/Cards/CardNews'
import { CardLocation } from '~/components/Cards/CardLocation'
import { dataForYou, dataOutstanding, dataLocation, dataNews } from '~/data/fakeData'
import Sliders from '~/Others/Slider'
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
          <div className="mb-10 flex justify-between py-5 sm:items-center">
            <h1 className="text-xl font-medium sm:text-3xl">Dành cho bạn</h1>
            <Link to={''} className="flex h-full">
              <p className="mr-2 text-base">Xem tất cả</p>
              <img src={expandTopRight} alt="expand top right" />
            </Link>
          </div>
          <div className="m-5 overflow-visible">
            <Sliders>
              {dataForYou.map((item, index) => (
                <div className="p-2">
                  <Link to="">
                    <CardReport
                      key={index}
                      imageUrls={item.img}
                      name={item.title}
                      regularPrice={item.price}
                      area={item.area}
                      address={item.address}
                      date={item.date}
                      save={item.vote}
                      isOpen
                      isOutStanding={false}
                    />
                  </Link>
                </div>
              ))}
            </Sliders>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden bg-white p-5 pb-10 sm:w-auto xl:px-[15%]">
          <div className="mb-10 flex items-center justify-center">
            <h1 className="py-5 text-base font-medium sm:text-3xl">Bất động sản theo địa điểm</h1>
          </div>
          <div className="overflow-visible">
            <div className="flex-row sm:hidden ">
              <Sliders>
                {dataLocation.map((item, index) => (
                  <div className="p-2">
                    <CardLocation
                      key={index}
                      isSmall={false}
                      imageUrls={item.img}
                      name={item.title}
                      subTitle={item.subTitle}
                    />
                  </div>
                ))}
              </Sliders>
            </div>
            <div className="hidden max-h-[600px] min-w-[550px] gap-4 sm:grid sm:grid-cols-4 sm:grid-rows-2">
              {dataLocation.map((item, index) => (
                <CardLocation
                  key={index}
                  isSmall={index == 0 || index == dataLocation.length - 1 ? false : true}
                  imageUrls={item.img}
                  name={item.title}
                  subTitle={item.subTitle}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col  overflow-hidden bg-[--orange-primary] p-5 sm:w-auto xl:px-[15%]">
          <div className="mb-10 flex items-center justify-between py-5">
            <h1 className="text-base font-medium text-white sm:text-3xl">Dự án nổi bật</h1>
            <Link to={''} className="flex h-full">
              <p className="mr-2 text-base text-white">Xem tất cả</p>
              <img src={expandWhite} alt="expand top right " />
            </Link>
          </div>
          <div className="m-5 overflow-visible">
            <Sliders>
              {dataOutstanding.map((item, index) => (
                <div className="p-2">
                  <Link to="">
                    <CardReport
                      key={index}
                      imageUrls={item.img}
                      name={item.title}
                      regularPrice={item.price}
                      area={item.area}
                      address={item.address}
                      date=""
                      save
                      isOpen={item.isOpen}
                      isOutStanding
                    />
                  </Link>
                </div>
              ))}
            </Sliders>
          </div>
        </div>

        <div className=" relative h-full max-h-[500px] overflow-hidden bg-white p-5 pb-10 sm:w-auto xl:px-[15%]">
          <h1 className="mb-10 text-base font-medium sm:text-3xl">Tin tức bất động sản</h1>
          <div className=" m-5 overflow-visible">
            <Sliders>
              {dataNews.map((item, index) => (
                <Link to="">
                  <div key={index} className="p-2">
                    <CardNews title={item.title} imageUrls={item.img} />
                  </div>
                </Link>
              ))}
            </Sliders>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
