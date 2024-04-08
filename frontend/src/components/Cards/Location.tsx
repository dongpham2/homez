import { CardLocation } from './CardLocation'
import { cardLocation } from '~/data/fakeData'
import Sliders from '../Slider'

const LocationRealEstate = () => {
  return (
    <div>
      <div className="overflow-visible">
        <div className="flex-row sm:hidden ">
          <Sliders>
            {cardLocation.map((_, index) => (
              <div className="p-2">
                <CardLocation
                  key={index}
                  isSmall={false}
                  imageUrls={cardLocation[0].img}
                  name={cardLocation[0].title}
                  subTitle={cardLocation[0].subTitle}
                />
              </div>
            ))}
          </Sliders>
        </div>
        <div className="hidden max-h-[600px] min-w-[550px] gap-4 sm:grid sm:grid-cols-4 sm:grid-rows-2">
          <CardLocation
            isSmall={false}
            imageUrls={cardLocation[0].img}
            name={cardLocation[0].title}
            subTitle={cardLocation[0].subTitle}
          />
          <CardLocation
            isSmall
            imageUrls={cardLocation[0].img}
            name={cardLocation[0].title}
            subTitle={cardLocation[0].subTitle}
          />
          <CardLocation
            isSmall
            imageUrls={cardLocation[0].img}
            name={cardLocation[0].title}
            subTitle={cardLocation[0].subTitle}
          />
          <CardLocation
            isSmall
            imageUrls={cardLocation[0].img}
            name={cardLocation[0].title}
            subTitle={cardLocation[0].subTitle}
          />
          <CardLocation
            isSmall
            imageUrls={cardLocation[0].img}
            name={cardLocation[0].title}
            subTitle={cardLocation[0].subTitle}
          />
          <CardLocation
            isSmall={false}
            imageUrls={cardLocation[0].img}
            name={cardLocation[0].title}
            subTitle={cardLocation[0].subTitle}
          />
        </div>
      </div>
    </div>
  )
}
export default LocationRealEstate
