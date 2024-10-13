export interface ICard {
  _id?: string
  name: string
  description?: string
  street: string
  price: number
  unit: string
  discountPrice?: number
  bathRooms?: number
  bedRooms?: number
  furnished?: boolean
  parking?: boolean
  type?: string
  offer?: boolean
  imageUrls: string
  area: number
  userRef?: string
  updatedAt: string
  save: boolean
  isOpen?: boolean
  vote: boolean
  city?: string
}
export interface ICardLocation {
  name: string
  subTitle: string
  imageUrls: string
  isSmall: boolean
}
export interface INews {
  title: string
  imageUrls: string
  content?: string
  date?: Date | string
}
