import { useDispatch } from 'react-redux'
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'

import { type ISignInUser, type IUser } from '~/types/user.type'

import http from '~/axiosClient'
import { type AppDispatch } from '../store'


export const fetchSignUp = createAsyncThunk('accounts/fetchSignUp', async (dataUser: IUser, thunkAPI) => {
  try {
    const response = await http.post<IUser>('/api/auth/signup', dataUser, {
      signal: thunkAPI.signal,
    })
    return response.data
  } catch (error) {
    return isRejectedWithValue(error)
  }
})

export const fetchSignIn = createAsyncThunk('auth/fetchSignIn', async (dataUser: ISignInUser, thunkAPI) => {
  try {
    const response = await http.post<ISignInUser>('/api/auth/signin', dataUser, {
      signal: thunkAPI.signal,
    })
    return response.data
  } catch (error) {
    return isRejectedWithValue(error)
  }
})

export const fetchSignInWithGoogle = createAsyncThunk(
  'auth/fetchSignInWithGoogle',
  async (dataUser: IUser, thunkAPI) => {
    try {
      const response = await http.post<IUser>('/api/auth/google', dataUser, {
        signal: thunkAPI.signal,
      })
      return response.data
    } catch (error) {
      return isRejectedWithValue(error)
    }
  },
)

export const fetchSignOut = createAsyncThunk('auth/fetchSignOut', async () => {
  try {
    const response = await http.post<IUser>('/api/auth/signout')
    return response.data
  } catch (error) {
    return isRejectedWithValue(error)
  }
})

const initialState = {
  status: 'idle',
  success: false,
  loading: false,
  error: null,
  message: '',
  currentUser: {},
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = 'idle'
          state.success = true
          state.message = ''
          state.currentUser = action.payload
        } else {
          state.status = 'idle'
          state.success = false
          state.message = 'Email đã tồn tại'
        }
      })
      .addCase(fetchSignIn.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentUser = action.payload
          state.success = true
          state.status = 'success'
        } else {
          state.status = 'idle'
          state.message = 'Tài khoản hoặc mật khẩu không chính xác'
          state.success = false
        }
      })
      .addCase(fetchSignInWithGoogle.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchSignInWithGoogle.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentUser = action.payload
          state.success = true
          state.status = 'success'
        } else {
          state.status = 'idle'
          state.message = 'Tài khoản lỗi'
          state.success = false
        }
      })
      .addCase(fetchSignOut.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchSignOut.fulfilled, (state) => {
        state.status = 'idle'
        state.currentUser = {}
        state.loading = false
        state.error = null
      })
  },
})

export default userSlice.reducer

export const useAppDispatch = () => useDispatch<AppDispatch>()
