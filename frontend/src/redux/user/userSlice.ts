import { useDispatch } from 'react-redux'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { type ISignUpRequest, type IUser } from '~/types/user.type'

import http from '~/axiosClient'
import { type AppDispatch, type RootState } from '../store'


export const fetchSignUp = createAsyncThunk('accounts/fetchSignUp', async (dataUser: ISignUpRequest, thunkAPI) => {
  try {
    const response = await http.post<ISignUpRequest>('/api/auth/signup', dataUser, {
      signal: thunkAPI.signal,
    })
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const fetchSignIn = createAsyncThunk('accounts/fetchSignIn', async (dataUser: IUser, thunkAPI) => {
  try {
    const response = await http.post<IUser>('/api/auth/signin', dataUser, {
      signal: thunkAPI.signal,
    })
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const fetchSignInWithGoogle = createAsyncThunk(
  'accounts/fetchSignInWithGoogle',
  async (dataUser: IUser, thunkAPI) => {
    try {
      const response = await http.post<IUser>('/api/auth/google', dataUser, {
        signal: thunkAPI.signal,
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const fetchSignOut = createAsyncThunk('accounts/fetchSignOut', async (_, thunkAPI) => {
  try {
    const response = await http.post<IUser>('/api/auth/signout')
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

interface UserState {
  status: string
  loading: boolean
  message: string
  currentUser: IUser | null
}

const initialState: UserState = {
  status: 'idle',
  loading: false,
  message: '',
  currentUser: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.status = 'pending'
        state.loading = true
        state.message = 'Đang xử lý'
      })
      .addCase(fetchSignUp.fulfilled, (state) => {
        state.status = 'success'
        state.loading = false
        state.message = 'Đăng ký thành công'
      })
      .addCase(fetchSignUp.rejected, (state) => {
        state.status = 'idle'
        state.loading = false
        state.message = 'Đăng ký thất bại'
      })
      .addCase(fetchSignIn.pending, (state) => {
        state.loading = true
        state.status = 'pending'
        state.message = 'Đang xử lý'
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentUser = action.payload
          state.status = 'success'
          state.loading = false
          state.message = 'Đăng nhập thành công'
        } else {
          state.status = 'idle'
          state.message = 'Tài khoản hoặc mật khẩu không chính xác'
          state.loading = false
        }
      })
      .addCase(fetchSignIn.rejected, (state) => {
        state.loading = false
        state.currentUser = null
        state.status = 'idle'
        state.message = 'Đăng nhập thất bại'
      })
      .addCase(fetchSignInWithGoogle.pending, (state) => {
        state.status = 'pending'
        state.message = 'Đang xử lý'
      })
      .addCase(fetchSignInWithGoogle.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentUser = action.payload
          state.loading = false
          state.status = 'success'
          state.message = 'Đăng nhập thành công'
        } else {
          state.status = 'idle'
          state.loading = false
          state.message = 'Tài khoản lỗi'
          state.status = 'failed'
        }
      })
      .addCase(fetchSignOut.pending, (state) => {
        state.status = 'pending'
        state.loading = true
      })
      .addCase(fetchSignOut.fulfilled, (state) => {
        state.status = 'idle'
        state.currentUser = null
        state.loading = false
        state.message = 'Đăng xuất thành công'
      })
  },
})

export const userSelector = (state: RootState) => state.userReducer
export default userSlice.reducer
export const useAppDispatch = () => useDispatch<AppDispatch>()
