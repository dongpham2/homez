import expandWhite from '~/assets/icons/expandWhite.icon.svg'
import { Link } from 'react-router-dom'
import CardOutstanding from '~/components/Cards/CardOutstading'
import { cardOutstanding } from '~/data/fakeData'
import Sliders from '../Slider'
const Outstanding = () => {
  return (
    <div>
      <div className="flex items-center justify-between py-5">
        <h1 className="mb-10 text-base font-medium text-white sm:text-3xl">Dự án nổi bật</h1>
        <Link to={''} className="flex h-full">
          <p className="mr-2 text-base text-white">Xem tất cả</p>
          <img src={expandWhite} alt="expand top right " />
        </Link>
      </div>
      <div className="m-5 overflow-visible">
        <Sliders>
          {cardOutstanding.map((item, index) => (
            <div className="p-2">
              <CardOutstanding
                key={index}
                imageUrls={item.img}
                name={item.title}
                regularPrice={item.price}
                area={item.area}
                address={item.address}
                isOpen={item.vote}
              />
            </div>
          ))}
        </Sliders>
      </div>
    </div>
  )
}

export default Outstanding
