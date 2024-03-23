import { ICardLocation } from '~/types/card.type'

export const CardLocation = ({ imageUrls, name, subTitle, isSmall }: ICardLocation) => {
  return (
    <div className={`relative flex ${isSmall ? 'sm:col-span-1' : 'sm:col-span-2 sm:row-span-1'}`}>
      <img className="h-full w-full rounded-lg" src={imageUrls} alt="banner" />
      <div className={`absolute p-6 text-white ${imageUrls ? '' : 'hidden'}`}>
        <p className="font-medium">{name}</p>
        <span>{subTitle}</span>
      </div>
    </div>
  )
}
