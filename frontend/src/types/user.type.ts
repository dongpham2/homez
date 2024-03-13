export interface ISignInRequest {
  email: string
  password: string
}

export interface ISignUpRequest {
  username: string
  email: string
  password: string
}

export interface IUser {
  username?: string
  email: string
  password: string
  avatar?: string | null
}

export interface ISignInUser {
  email: string
  password: string
}
