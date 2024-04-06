import * as yup from 'yup'

import messages from './messages'

export interface IPost {
  name: string
  description: string
  city?: string
  district?: string
  wards?: string
  street?: string
  price?: number
  unit?: string
  address?: string
  area?: number
  bathrooms?: number
  bedRooms?: number
  furnished?: boolean
  typeofrealestate?: string
  userRef?: string
}

const postValidate = yup
  .object({
    name: yup.string().required(messages.required.name),
    description: yup.string().required(messages.required.description),
    city: yup.string(),
    district: yup.string(),
    wards: yup.string(),
    street: yup.string(),
    price: yup.number().integer().positive(),
    unit: yup.string(),
    address: yup.string(),
    area: yup.number().integer().positive(),
    bathrooms: yup.number().integer().positive(),
    bedRooms: yup.number().integer().positive(),
    furnished: yup.boolean(),
    typeofrealestate: yup.string(),
    userRef: yup.string(),
  })
  .required()

export const postInitValues: IPost = {
  name: '',
  description: '',
  city: '',
  district: '',
  wards: '',
  street: '',
  price: 0,
  unit: '',
  address: '',
  area: 0,
  bathrooms: 0,
  bedRooms: 0,
  furnished: false,
  typeofrealestate: '',
  userRef: '',
}

export default postValidate
