export interface SignInRequest {
  email: string
  password: string
}

export interface SignUpRequest {
  username:string
  email: string
  password: string
}

export interface User {
  username: string
  email: string
  password: string
  avatar?: string | null
  access_token?: string
}
