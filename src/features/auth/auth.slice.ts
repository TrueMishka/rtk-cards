import { createSlice } from '@reduxjs/toolkit'
import { RegisterArgType, authApi, LoginArgType, ProfileType } from 'features/auth/auth.api'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'

const register = createAppAsyncThunk<void, RegisterArgType>('auth/register', async (arg) => {
  await authApi.register(arg)
})

const login = createAppAsyncThunk<{ profile: ProfileType }, LoginArgType>(
  'auth/login',
  async (arg, thunkAPI) => {
    const res = await authApi.login(arg)
    return { profile: res.data }
  }
)

const slice = createSlice({
  name: 'auth',
  initialState: {
    profile: null as ProfileType | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile
    })
  },
})

export const authReducer = slice.reducer
export const authThunks = { register, login }
