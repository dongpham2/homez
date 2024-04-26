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
  avatar?: string
  phone?: number | undefined
  createdAt?: string
  updatedAt?: string
  password?: string
}

export interface ISignInUser {
  email: string
  password: string
}
