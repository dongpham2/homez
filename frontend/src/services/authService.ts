import { User } from '../types/user.type'
import http from '~/axiosClient'
import { API_SIGNIN, API_SIGNUP } from '.'

export const AuthService = {
  signin(user: User) {
    return http.post(API_SIGNIN, user)
  },
  signup(user: User) {
    return http.post(API_SIGNUP, user)
  },
}
