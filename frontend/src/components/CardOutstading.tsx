import { Card, CardDescription, CardTitle } from "./Card";
interface CardOutstandingProps {
  img: string,
  isOpen: boolean,
  title: string,
  price:string,
  area: number,
  address: string,
}

const CardOutstanding = ({img, title, price, area, address,  isOpen, }:CardOutstandingProps) =>{

  return (
    <div className="m-0 p-0 box-border">
      {/* h-96 max-h-[410px] min-w-64 xl:min-w-0 cursor-pointer border-none box-border  */}
      <Card className="h-full overflow-hidden border-none"  >
         <img src={img} alt="img" className="rounded-t-lg h-60 w-full object-cover object-center" />
         <div>
         <div className={`flex justify-center items-center ${isOpen? 'bg-[--green-second] text-[--green-primary]': 'bg-[--red-second] text-[--red-primary]'}  max-w-max px-2 h-7 rounded-sm ml-3 mt-2`}>{
            isOpen? 'Đã mở bán': 'Sắp mở bán'
         }</div>
         </div>
          <div className="p-3 space-y-2">
            <CardTitle className="leading-tight w-64 text-ellipsis whitespace-nowrap overflow-hidden">{title} </CardTitle>
            <CardDescription className="text-red-500 font-medium">{price} - {area} m²</CardDescription>
            <CardDescription>{address}</CardDescription>

          </div>
      </Card>
    </div>
  )
}
export default CardOutstanding