import { ISignInUser, IUser } from '../types/user.type'
import http from '~/axiosClient'
import { API_SIGNIN, API_SIGNUP } from '.'
import config from '~/config'

export const AuthService = {
  signin(user: IUser) {
    return http.post(API_SIGNIN, user)
  },
  signup(user: IUser) {
    return http.post(API_SIGNUP, user)
  },
}

export const signInApi = async (dataUser: ISignInUser) => {
  return await http.post<ISignInUser>(config.authApiUrl.signin, dataUser)
}
