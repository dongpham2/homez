import * as yup from 'yup'

import { type ISignInUser } from '~/types/user.type'

import messages from './messages'

const signinValidate = yup
  .object({
    email: yup.string().required(messages.required.email),
    password: yup.string().required(messages.required.password),
  })
  .required()

export const signinInitValues: ISignInUser = {
  email: '',
  password: '',
}

export default signinValidate
