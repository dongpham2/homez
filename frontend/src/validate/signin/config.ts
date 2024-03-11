import * as yup from 'yup'
import messages from './messages'

export interface UserReq {
  email?: string
  password?: string
}

const signinValidate = yup
  .object({
    email: yup.string().required(messages.required.email),
    password: yup.string().required(messages.required.password),
  })
  .required()

export const signinInitValues: UserReq = {
  email: '',
  password: '',
}

export default signinValidate
