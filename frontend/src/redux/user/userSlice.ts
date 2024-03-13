import { AppDispatch } from './../store'
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { signInApi } from '~/services/authService'
import { ISignInUser, IUser } from '~/types/user.type'

const initialState = {
  status: 'idle',
  success: false,
  loading: false,
  error: null,
  message: '',
  currentUser: {},
}
// const initialState = {
//   currentUser: null,
//   error: null,
//   loading: false,
// }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // signInStart: (state) => {
    //   state.loading = true
    // },
    // signInSuccess: (state, action) => {
    //   state.currentUser = action.payload
    //   state.loading = false
    //   state.error = null
    // },
    // signInFailure: (state, action) => {
    //   state.error = action.payload
    //   state.loading = false
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSignIn.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        const resData = action.payload
        if (resData) {
          state.status = 'idle'
          state.success = true
          state.currentUser = resData
        } else {
          state.status = 'idle'
          state.message = 'Tài khoản hoặc mật khẩu không chính xác'
          state.success = false
        }
      })
  },
})

export const fetchSignIn = createAsyncThunk('auth/fetchSignIn', async (dataUser: ISignInUser) => {
  try {
    await signInApi(dataUser)
  } catch (error) {
    return isRejectedWithValue(error)
  }
})

// export const { signInStart, signInSuccess, signInFailure } = userSlice.actions
export default userSlice.reducer

export const useAppDispatch = () => useDispatch<AppDispatch>()
