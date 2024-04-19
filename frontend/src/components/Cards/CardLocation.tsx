import { cva } from 'class-variance-authority'

import { cn } from '~/__generated__/utils'
import { type ICardLocation } from '~/types/card.type'

const cardLocationVariants = cva('relative flex', {
  variants: {
    variant: {
      default: 'sm:col-span-1',
      preview: 'sm:col-span-2 sm:row-span-1',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
const CardLocation = ({ imageUrls, isSmall, name, subTitle }: ICardLocation) => {
  return (
    <div className={cn(cardLocationVariants({ variant: isSmall ? 'default' : 'preview' }))}>
      <img className="h-full w-full rounded-lg" src={imageUrls} alt="banner" />
      <div className={`absolute p-6 text-white ${imageUrls ? '' : 'hidden'}`}>
        <p className="font-medium">{name}</p>
        <span>{subTitle}</span>
      </div>
    </div>
  )
}

export default CardLocation
