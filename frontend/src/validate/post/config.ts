import * as yup from 'yup'

import messages from './messages'

export interface IPost {
  name: string
  description: string
  address?: string
  regularPrice?: number
  discountPrice?: number
  bathrooms?: number
  furnished?: boolean
  parking?: boolean
  type?: string
  offer?: boolean
  userRef?: string
}

const postValidate = yup
  .object({
    name: yup.string().required(messages.required.name),
    description: yup.string().required(messages.required.description),
    address: yup.string(),
    regularPrice: yup.number(),
    discountPrice: yup.number(),
    bathrooms: yup.number().integer().positive(),
    furnished: yup.boolean(),
    parking: yup.boolean(),
    type: yup.string(),
    offer: yup.boolean(),
    userRef: yup.string(),
  })
  .required()

export const postInitValues: IPost = {
  name: '',
  description: '',
  address: '',
  regularPrice: 100,
  discountPrice: 10,
  bathrooms: 0,
  furnished: false,
  parking: false,
  type: '',
  offer: false,
  userRef: '',
}

export default postValidate
