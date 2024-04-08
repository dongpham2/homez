import { cardOutstanding } from '~/data/fakeData'
import { Link } from 'react-router-dom'
import CardReport from '~/components/Cards/CardReport'
import Sliders from '../Slider'
const Outstanding = () => {
  return (
    <div>
      <div className="m-5 overflow-visible">
        <Sliders>
          {cardOutstanding.map((item, index) => (
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
  )
}

export default Outstanding
