import { ICardLocation } from '~/types/card.type'
import { cva } from 'class-variance-authority'
import { cn } from '~/__generated__/utils'
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
export const CardLocation: React.FC<ICardLocation & { isSmall: boolean }> = ({
  imageUrls,
  name,
  subTitle,
  isSmall,
}) => {
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
