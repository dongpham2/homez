import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import home from '~/assets/home-banner.png'
import renter from '~/assets/renter.svg'
import properties from '~/assets/properties.svg'

// import expandTopRight from '~/assets/icons/expandTopRight.icon.svg'
// import CardReport from '~/components/Cards/CardEstate'
// import Loading from '~/components/Loading'
// import Search from '~/components/Search'
// import { dataLocation, dataNews } from '~/data/fakeData'
// import Sliders from '~/components/Slider'
import { type RootState } from '~/redux/store'
import { fetchPostLists, useAppDispatch } from '~/screens/Home/homeSlice'
import CardEstate from '~/components/Cards/CardEstate'

const Home = () => {
  const dispatch = useAppDispatch()
  const postListData = useSelector((state: RootState) => state.homeReducer)

  useEffect(() => {
    dispatch(fetchPostLists())
  }, [dispatch])

  return (
    <div className="m-0 flex max-h-[880px] flex-col p-0 bg-linear">
      <div className='px-6 py-10 md:px-0 md:py-0 flex flex-col md:flex-row'>
        <div className='sm:pl-16 sm:pr-4 sm:py-20 flex flex-col gap-5'>
          <h1 className='text-2xl lg:text-3xl xl:text-4xl text-black-primary font-bold'>Mua, bán, cho thuê bất động sản dễ dàng</h1>
          <p className='text-sm sm:text-base md:text-lg text-black-primary font-normal'>Nền tảng bất động sản uy tín top 1, mang đến cho khách hàng những thông tin thú vị</p>
          <div className='flex gap-8 justify-center sm:justify-start'>
            <div className='flex flex-col gap-3'>
              <img src={renter} alt="renter" className='size-14'/>
              <p className='text-violet-primary font-bold text-lg'>10K+ người bán</p>
              <p className='hidden sm:block'>Tin tưởng dịch vụ chúng tôi</p>
            </div>
            <div className='flex flex-col gap-3'>
              <img src={properties} alt="properties" className='size-14'/>
              <p className='text-violet-primary font-bold text-lg'>100k+ tin đăng</p>
              <p className='hidden sm:block'>Bất động sản sẵn sàng giao dịch</p>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <img src={home} alt="home" className='max-w-full bg-cover bg-no-repeat'/>
        </div>
      </div>
      <section className='px-10 mt-15'>
        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold mb-5'>Đang HOT</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {postListData?.postLists.map((item, _index) => (
          <CardEstate
            _id={item._id}
            imageUrls={item.imageUrls}
            name={item.name}
            price={item.price}
            area={item.area}
            street={item.street}
            updatedAt={item.updatedAt}
            unit={item.unit}
            save={item.save}
            isOpen
            vote={false}
            bathRooms={item.bathRooms}
            bedRooms={item.bedRooms}
            city={item.city}
          />
      ))}
      </div>
      </section>
    </div>
  )
}

export default Home
