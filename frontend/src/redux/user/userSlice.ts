import { AppDispatch } from './../store'
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { signInApi, signInWithGoogle, signUpApi, signout } from '~/services/authService'
import { ISignInUser, IUser } from '~/types/user.type'

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
        const resData = action.meta.arg
        if (resData) {
          state.status = 'idle'
          state.success = true
          state.message = ''
          state.currentUser = resData
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
        const resData = action.meta.arg
        if (resData) {
          state.status = 'idle'
          state.success = true
          state.message = ''
          state.currentUser = resData
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
        const resData = action.meta.arg
        console.log('google resData', resData)
        if (resData) {
          state.status = 'idle'
          state.success = true
          state.message = ''
          state.currentUser = resData
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

export const fetchSignUp = createAsyncThunk('accounts/fetchSignUp', async (dataUser: IUser) => {
  try {
    return await signUpApi(dataUser)
  } catch (error) {
    return isRejectedWithValue(error)
  }
})

export const fetchSignIn = createAsyncThunk('auth/fetchSignIn', (dataUser: ISignInUser) => {
  try {
    signInApi(dataUser)
  } catch (error) {
    return isRejectedWithValue(error)
  }
})
export const fetchSignInWithGoogle = createAsyncThunk('auth/fetchSignInWithGoogle', (dataUser: IUser) => {
  try {
    signInWithGoogle(dataUser)
  } catch (error) {
    return isRejectedWithValue(error)
  }
})
export const fetchSignOut = createAsyncThunk('auth/fetchSignOut', () => {
  try {
    signout()
  } catch (error) {
    return isRejectedWithValue(error)
  }
})

// export const { signInStart, signInSuccess, signInFailure } = userSlice.actions
export default userSlice.reducer

export const useAppDispatch = () => useDispatch<AppDispatch>()
