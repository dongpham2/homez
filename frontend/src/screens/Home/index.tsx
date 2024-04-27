import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import banner from '~/assets/banner.png'
import expandTopRight from '~/assets/icons/expandTopRight.icon.svg'
import CardLocation from '~/components/Cards/CardLocation'
import CardNews from '~/components/Cards/CardNews'
import CardReport from '~/components/Cards/CardReport'
import { Input } from '~/components/Input'
import { dataLocation, dataNews } from '~/data/fakeData'
import useDebounce from '~/hook/useDebounceState'
import Sliders from '~/Others/Slider'
import { RootState } from '~/redux/store'
import { fetchPostLists, useAppDispatch } from '~/screens/Home/homeSlice'

const Home = () => {
  const dispatch = useAppDispatch()
  const postListData = useSelector((state: RootState) => state.homeReducer)
  const [searchData, setSearchData] = useState('')
  const debouncedSearchTerm = useDebounce({ value: searchData, delay: 3000 })
  useEffect(() => {
    dispatch(fetchPostLists())
  }, [])
  return (
    <div className="m-0 flex h-[880px] flex-col overflow-y-auto p-0">
      <div>
        <div className="relative">
          <img src={banner} alt="banner" className="w-full overflow-hidden" />
          <form className="absolute left-1/2 top-1/2 flex h-12 w-[60%] -translate-x-1/2 -translate-y-1/2 transform items-center rounded-lg border-2 border-gray-primary bg-white">
            <Input
              type="text"
              placeholder="Tìm nhanh. VD: Vinhomes Cenntral Park"
              className="w-full border-none"
              onChange={(e) => {
                setSearchData(e.target.value)
              }}
            />
          </form>
        </div>

        <div className="flex flex-col overflow-hidden bg-[--gray-secondary] p-5 pb-10 sm:w-auto xl:px-[15%]">
          <div className="mb-10 flex justify-between py-5 sm:items-center">
            <h3 className="text-xl font-medium sm:text-3xl">Dành cho bạn</h3>
            <Link to="/list-post" className="flex h-full">
              <p className="mr-2 text-base">Xem tất cả</p>
              <img src={expandTopRight} alt="expand top right" />
            </Link>
          </div>
          <div className="m-5 overflow-visible">
            <Sliders>
              {postListData.postLists.map((item, index) => (
                <Link to="" className="p-2" key={index}>
                  <CardReport
                    imageUrls={item.imageUrls}
                    name={item.name}
                    price={item.price}
                    area={item.area}
                    street={item.street}
                    updatedAt={item.updatedAt}
                    unit={item.unit}
                    save={item.save}
                    isOpen
                    isOutStanding={false}
                    vote={false}
                  />
                </Link>
              ))}
            </Sliders>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden bg-white p-5 pb-10 sm:w-auto xl:px-[15%]">
          <div className="mb-10 flex items-center justify-center">
            <h3 className="py-5 text-base font-medium sm:text-3xl">Bất động sản theo địa điểm</h3>
          </div>
          <div className="overflow-visible">
            <div className="flex-row sm:hidden">
              <Sliders>
                {dataLocation.map((item, index) => (
                  <Link to="" className="p-2">
                    <CardLocation key={index} isSmall imageUrls={item.img} name={item.title} subTitle={item.subTitle} />
                  </Link>
                ))}
              </Sliders>
            </div>
            <div className="hidden max-h-[600px] min-w-[550px] gap-4 sm:grid sm:grid-cols-4 sm:grid-rows-2">
              {dataLocation.map((item, index) => (
                <CardLocation
                  key={index}
                  isSmall={!(index === 0 || index === dataLocation.length - 1)}
                  imageUrls={item.img}
                  name={item.title}
                  subTitle={item.subTitle}
                />
              ))}
            </div>
          </div>
        </div>

        <div className=" relative h-full max-h-[500px] overflow-hidden bg-white p-5 pb-10 sm:w-auto xl:px-[15%]">
          <h3 className="mb-10 text-base font-medium sm:text-3xl">Tin tức bất động sản</h3>
          <div className=" m-5 overflow-visible">
            <Sliders>
              {dataNews.map((item, index) => (
                <Link to="" className="p-2">
                  <CardNews key={index} title={item.title} imageUrls={item.img} />
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
