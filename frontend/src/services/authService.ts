import config from '~/config'
import http from '~/axiosClient'
import type { ISignInUser, IUser } from '~/types/user.type'

export const signInApi = async (dataUser: ISignInUser) => {
  return http.post(config.authApiUrl.signin, dataUser)
}

export const signUpApi = async (dataUser: IUser) => {
  return http.post<IUser>(config.authApiUrl.signup, dataUser)
}

export const signInWithGoogle = async (dataUser: IUser) => {
  return http.post<IUser>(config.authApiUrl.google, dataUser)
}

export const signout = async () => {
  return http.post(config.authApiUrl.signout)
}
