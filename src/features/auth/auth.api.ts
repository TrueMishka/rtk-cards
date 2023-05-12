import { instance } from 'common/api/common.api'
import { ResponseApiType } from 'common/types/common.types';

export const authApi = {
  register: (arg: RegisterArgType) => {
    return instance.post<RegisterResponseType>('auth/register', arg)
  },
  login: (arg: LoginArgType) => {
    return instance.post<LoginResponseType>('auth/login', arg)
  },
  logout: () => {
    return instance.delete<ResponseApiType<LogoutResponseType>>('auth/me')
  },
  me: () => {
    return instance.post<ResponseApiType<LoginResponseType>>('auth/me')
  },
  editProfile: (arg: EditProfileArgType) => {
    return instance.put<ResponseApiType<EditProfileResponseType>>('auth/me', arg)
  },
  forgot: (arg: ForgotArgType) => {
    return instance.post<ResponseApiType<ForgotResponseType>>('https://neko-back.herokuapp.com/2.0/auth/forgot', arg)
  },
}

// Types
export type RegisterArgType = Omit<LoginArgType, 'rememberMe'>
export type RegisterResponseType = {
  addedUser: ProfileType
}

export type LoginArgType = {
  email: string
  password: string
  rememberMe: boolean
}
export type LoginResponseType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
}

export type LogoutResponseType = {
  info: string
  error: string
}

export type EditProfileArgType = {
  name: string
  avatar: string
}
export type EditProfileResponseType = {
  updatedUser: LoginResponseType
  token: string
  tokenDeathTime: number
  error?: string
}

export type ForgotArgType = {
  email: string
  from: string
  message: string
}
export type ForgotResponseType = {
  info: string
  error: string
}

export type ProfileType = Omit<LoginResponseType, 'token' | 'tokenDeathTime'>
