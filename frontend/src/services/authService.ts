import { ISignInUser, IUser } from '../types/user.type'
import http from '~/axiosClient'
import config from '~/config'

export const signInApi = async (dataUser: ISignInUser) => {
  return await http.post(config.authApiUrl.signin, dataUser)
}
export const signUpApi = async (dataUser: IUser) => {
  return await http.post<IUser>(config.authApiUrl.signup, dataUser)
}
export const signInWithGoogle = async (dataUser: IUser) => {
  return await http.post<IUser>(config.authApiUrl.google, dataUser)
}
export const signout = async () => {
  return await http.post(config.authApiUrl.signout)
}
