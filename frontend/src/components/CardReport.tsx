import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";
import { Button } from "./Button";
import heartOutline from "../assets/icons/heartOutline.icon.svg"
import heartOutlineFill from "../assets/icons/heartOutlineFill.icon.svg"
import { ReactNode, useState } from "react";
import "./cardTitle.css"
interface CardReportProps {
  img: string,
  title: string,
  price:string,
  area: number,
  address: string,
  date: string,
  vote: boolean,
  children:ReactNode,
}

const CardReport = ({img, title, price, area, address, date, vote, children}:CardReportProps) =>{
  const [userVote, setUserVote] = useState(vote)
  const handleVote = () =>{
    setUserVote(!userVote) 
  }
  return (
    <div className="m-0 p-0 box-border">
      {/* h-96 max-h-[410px] min-w-64 xl:min-w-0 cursor-pointer border-none box-border  */}
      <Card className="h-full overflow-hidden border-none"  >
         <img src={img} alt="img" className="rounded-t-lg h-60 w-full object-cover object-center" />
         <div>{children}</div>
          <div className="p-3 space-y-2">
            <CardTitle className="leading-tight w-64 text-ellipsis whitespace-nowrap overflow-hidden">{title} </CardTitle>
            <CardDescription className="text-red-500 font-medium">{price} - {area} m²</CardDescription>
            <CardDescription>{address}</CardDescription>
            <CardFooter>
              <p className="text-base">{date}</p>
              <Button onClick={handleVote}>
                {userVote ? <img src={heartOutlineFill} alt=""  />: <img src={heartOutline} alt=""  />}
              </Button>
            </CardFooter>
          </div>
      </Card>
    </div>
  )
}
export default CardReport