export interface ICard {
  name: string
  description?: string
  address: string
  regularPrice: number
  discountPrice?: number
  bathrooms?: number
  bedrooms?: number
  furnished?: boolean
  parking?: boolean
  type?: string
  offer?: boolean
  imageUrls: string
  area: number
  userRef?: string
  date?: string
  save: boolean
  isOpen?: boolean
  isOutStanding: boolean
}
export interface ICardLocation {
  name: string
  subTitle: string
  imageUrls: string
  isSmall: boolean
}
