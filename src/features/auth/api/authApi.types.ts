export type UserType = {
  userId: number
  email: string
  login: string
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}
