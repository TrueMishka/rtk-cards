import { instance } from 'common/api/common.api';

export const authApi = {
  register: (arg: RegisterArgType) => {
    return instance.post<RegisterResponseType>('auth/register', arg);
  },
  login: (arg: LoginArgType) => {
    return instance.post<LoginResponseType>('auth/login', arg);
  },
};

// Types
export type RegisterArgType = Omit<LoginArgType, 'rememberMe'>;

export type RegisterResponseType = {
  addedUser: ProfileType;
};

export type LoginArgType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type LoginResponseType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
};

export type ProfileType = Omit<LoginResponseType, 'token' | 'tokenDeathTime'>;
