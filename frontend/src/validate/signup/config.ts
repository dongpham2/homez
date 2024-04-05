import * as yup from 'yup'

import messages from './messages'

export interface IUserReq {
  username?: string
  email?: string
  password?: string
}

const signupValidate = yup
  .object({
    username: yup.string().required(messages.required.username),
    email: yup.string().required(messages.required.email),
    password: yup.string().required(messages.required.password),
  })
  .required()

export const signupInitValues: IUserReq = {
  username: '',
  email: '',
  password: '',
}

export default signupValidate
