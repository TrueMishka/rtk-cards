import { createSlice } from '@reduxjs/toolkit'
import {
  RegisterArgType,
  authApi,
  LoginArgType,
  ProfileType,
  ForgotArgType,
  EditProfileArgType,
} from 'features/auth/auth.api'
import { appActions } from 'app/app.slice'
import { createAppAsyncThunk, thunkTryCatch } from 'common/utils';

const register = createAppAsyncThunk<void, RegisterArgType>(
  'auth/register',
  async (arg: RegisterArgType, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.register(arg);
      console.log("register", res);
    });
  }
)

const login = createAppAsyncThunk<{ profile: ProfileType }, LoginArgType>(
  'auth/login',
  async (arg: LoginArgType, {dispatch, rejectWithValue}) => {
    // return thunkTryCatch(thunkAPI, async () => {
    //   const res = await authApi.login(arg)
    //   return {profile: res.data}
    // })
    try {
      const res = await authApi.login(arg)
      return { profile: res.data }
    } catch (e: any) {
      const error = e.response ? e.data.response : e.message
      dispatch(appActions.setAppError({ error }))
      return rejectWithValue(null)
    } finally {
      dispatch(initializeApp())
    }
  }
)

const logout = createAppAsyncThunk<{ isLoggedIn: boolean; profile: null }, void>(
  'auth/logout',
  async (_, thunkAPI) => {
    const res = await authApi.logout()
    return { isLoggedIn: false, profile: null }
  }
)

const forgot = createAppAsyncThunk<void, ForgotArgType>('auth/forgot', async (arg, thunkAPI) => {
  await authApi.forgot(arg)
})

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  'auth/me',
  async (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.me()
      return { isLoggedIn: true }
    })
  }
)

const editProfile = createAppAsyncThunk<any, EditProfileArgType>(
  'auth/editProfile',
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.editProfile(arg)
      return null
    })
  }
)

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    profile: null as ProfileType | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.profile = action.payload.profile
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.name = 'Mishka'
        }
      })
      .addCase(register.rejected, (state, action) => {})
  },
})

export const authReducer = slice.reducer
export const authThunks = { register, login, forgot, initializeApp, logout, editProfile }
