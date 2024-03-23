import { Card, CardDescription, CardTitle } from '../Card'
import { IOutStanding } from '~/types/card.type'

const CardOutstanding = ({ imageUrls, name, regularPrice, area, address, isOpen }: IOutStanding) => {
  return (
    <div className="m-0 box-border p-0">
      <Card className="hover:scale-102 h-full overflow-hidden border-none transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
        <img src={imageUrls} alt="img" className="h-60 w-full rounded-t-lg object-cover object-center" />
        <div>
          <div
            className={`flex items-center justify-center ${
              isOpen ? 'bg-[--green-secondary] text-[--green-primary]' : 'bg-[--red-secondary] text-[--red-primary]'
            }  ml-3 mt-2 h-7 max-w-max rounded-sm px-2`}
          >
            {isOpen ? 'Đã mở bán' : 'Sắp mở bán'}
          </div>
        </div>
        <div className="space-y-2 p-3">
          <CardTitle className="w-64 overflow-hidden text-ellipsis whitespace-nowrap leading-tight">{name} </CardTitle>
          <CardDescription className="font-medium text-red-500">
            {regularPrice} - {area} m²
          </CardDescription>
          <CardDescription>{address}</CardDescription>
        </div>
      </Card>
    </div>
  )
}
export default CardOutstanding
