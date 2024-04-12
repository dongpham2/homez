import { INews } from '~/types/card.type'

const CardNews = ({ title, imageUrls }: INews) => {
  return (
    <div>
      <div className="cursor-pointer overflow-hidden rounded-lg border-none hover:shadow-lg">
        <img className="h-40 w-full" src={imageUrls} alt="news" />
        <p className="p-3 pt-5">{title}</p>
      </div>
    </div>
  )
}

export default CardNews
