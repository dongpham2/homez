import { Link } from 'react-router-dom'
import CardReport from '~/components/Cards/CardReport'
import { cardForYou } from '~/data/fakeData'
import Sliders from '../Slider'
const ForYouHome = () => {
  return (
    <div>
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
                  isOpen
                  isOutStanding={false}
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
