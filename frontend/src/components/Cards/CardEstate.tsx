import { useState } from 'react'
import { Link } from 'react-router-dom'

import { type ICard } from '~/types/card.type'
import { Button } from '../Button'
import heartOutline from '~/assets/icons/heartOutline.icon.svg'
import heartOutlineFill from '~/assets/icons/heartOutlineFill.icon.svg'
import areas from '~/assets/icons/area.svg'
import bathRoom from '~/assets/icons/bathroom.svg'
import bed from '~/assets/icons/bed.svg'
import useCaculateRelativeTime from '~/hook/useCaculateRelativeTime'

const CardEstate = ({ _id, imageUrls, name, price, area, street, updatedAt, save , bedRooms, bathRooms, city}: ICard) => {
  const formattedUpdatedAt = useCaculateRelativeTime(updatedAt);

  const [userVote, setUserVote] = useState(save)
  
  const handleVote = () => {
    setUserVote(!userVote)
  }
  
  return (
    <div className="rounded-lg shadow-md hover:shadow-xl">
      <Link to={`/post-detail/${_id}`}>
        <img src={imageUrls} alt={name} className='rounded-t-lg'/>
      </Link>
      <div className='px-6 py-6 hover:cursor-pointer'>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-1'>
            <p className='flex'><span className='text-violet-primary font-semibold sm:text-xl'>${price}</span><span>/month</span></p>
            <h3 className='sm:text-xl font-bold'>{name}</h3>
          </div>
          <Button onClick={handleVote}>
            {userVote ? <img src={heartOutlineFill} alt="icon" /> : <img src={heartOutline} alt="icon" />}
          </Button>
        </div>
        <p className='flex gap-1 text-black font-light mt-4 text-center'>{area} {street} - {city}</p>
        <div className='flex gap-3 border-t-gray-primary border-t py-2 mt-2 flex-col'>
          <div className='flex gap-1 items-center'>
            <img  src={bed} alt="icon"></img>
            <p className='text-sm font-light'>{formattedUpdatedAt}</p>
          </div>
          <div className='flex gap-1'>
            <img  src={bathRoom} alt="icon"></img>
            <p className='text-sm font-light'>{bedRooms}</p>
          </div>
          <div className='flex gap-1'>
            <img  src={areas} alt="icon"></img>
            <p className='text-sm font-light'>{bathRooms}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CardEstate
