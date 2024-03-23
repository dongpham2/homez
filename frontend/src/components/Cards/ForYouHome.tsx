import expandTopRight from '~/assets/icons/expandTopRight.icon.svg'
import { Link } from 'react-router-dom'
import CardReport from '~/components/Cards/CardReport'
import { cardForYou } from '~/data/fakeData'
import Sliders from '../Slider'
const ForYouHome = () => {
  return (
    <div>
      <div className="flex justify-between py-5 sm:items-center">
        <h1 className="mb-10 text-xl font-medium sm:text-3xl">Dành cho bạn</h1>
        <Link to={''} className="flex h-full">
          <p className="mr-2 text-base">Xem tất cả</p>
          <img src={expandTopRight} alt="expand top right" />
        </Link>
      </div>
      <div className="m-5 overflow-visible">
        <Sliders>
          {cardForYou.map((item, index) => (
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
                />
              </Link>
            </div>
          ))}
        </Sliders>
      </div>
    </div>
  )
}

export default ForYouHome
