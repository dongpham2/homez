import { Card, CardDescription, CardFooter, CardTitle } from '../Card'
import { Button } from '../Button'
import heartOutline from '~/assets/icons/heartOutline.icon.svg'
import heartOutlineFill from '~/assets/icons/heartOutlineFill.icon.svg'
import { useState } from 'react'
import { IForYouHome } from '~/types/card.type'

const CardReport = ({ imageUrls, name, regularPrice, area, address, date, save }: IForYouHome) => {
  const [userVote, setUserVote] = useState(save)
  const handleVote = () => {
    setUserVote(!userVote)
  }
  return (
    <div className="m-0 box-border p-0">
      {/* h-96 max-h-[410px] min-w-64 xl:min-w-0 cursor-pointer border-none box-border  */}
      <Card className="hover:scale-102 h-full overflow-hidden border-none transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
        <img src={imageUrls} alt="img" className="h-60 w-full rounded-t-lg object-cover object-center" />
        <div className="space-y-2 p-3">
          <CardTitle className="w-64 overflow-hidden text-ellipsis whitespace-nowrap leading-tight">{name} </CardTitle>
          <CardDescription className="text--orange-primary font-medium">
            {regularPrice} - {area} m²
          </CardDescription>
          <CardDescription>{address}</CardDescription>
          <CardFooter>
            <p className="text-base">{date}</p>
            <Button onClick={handleVote}>
              {userVote ? <img src={heartOutlineFill} alt="icon" /> : <img src={heartOutline} alt="icon" />}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  )
}
export default CardReport
