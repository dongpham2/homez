interface ICardTitleProps {
  title: string
  subTitle: string
}

const CardTitle = ({ title, subTitle }: ICardTitleProps) => {
  return (
    <div className="mb-8 flex items-center gap-x-5">
      <div className="text-xl font-bold not-italic leading-9 tracking-wide text-black">{title}</div>
      <div className="text-base font-bold not-italic leading-normal text-orange-primary underline">{subTitle}</div>
    </div>
  )
}

export default CardTitle
