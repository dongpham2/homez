import { Link } from 'react-router-dom'
import Sliders from '../Slider'
import { news } from '~/data/fakeData'
const News = () => {
  return (
    <div>
      <h1 className="mb-10 text-base font-medium sm:text-3xl">Tin tức bất động sản</h1>
      <div className=" m-5 overflow-visible">
        <Sliders>
          {news.map((item, index) => (
            <div className="p-2">
              <div key={index} className="cursor-pointer overflow-hidden rounded-lg border-none hover:shadow-lg">
                <Link to="">
                  <img className="h-40 w-full" src={item.img} alt="news" />
                  <p className="p-3 pt-5">{item.title}</p>
                </Link>
              </div>
            </div>
          ))}
        </Sliders>
      </div>
    </div>
  )
}

export default News
