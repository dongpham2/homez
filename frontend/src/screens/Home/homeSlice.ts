import { useDispatch } from 'react-redux'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { type ICard } from '~/types/card.type'

import http from '~/axiosClient'
import { type AppDispatch, type RootState } from '../../redux/store'

export const fetchPostLists = createAsyncThunk('home/fetchPostLists', async (_, thunkAPI) => {
  try {
    const response = await http.get<ICard[]>('api/list/get')
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const fetchDetailPost = createAsyncThunk('home/fetchDetailPost', async (id: string, thunkAPI) => {
  try {
    const response = await http.get<ICard>(`/api/list/get/${id}`)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

interface homeState {
  status: string
  idLoading: boolean
  postLists: ICard[] | []
  post: ICard | {}
}

const initialState: homeState = {
  status: 'idle',
  idLoading: false,
  postLists: [],
  post: {},
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPostLists.pending, (state) => {
        state.status = 'pending'
        state.idLoading = true
      })
      .addCase(fetchPostLists.fulfilled, (state, action) => {
        console.log(action.payload)
        state.status = 'success'
        state.idLoading = false
        state.postLists = action.payload
      })
      .addCase(fetchDetailPost.pending, (state) => {
        state.status = 'pending'
        state.idLoading = true
      })
      .addCase(fetchDetailPost.fulfilled, (state, action) => {
        state.status = 'success'
        state.idLoading = false
        state.post = action.payload
      })
  },
})

export const homeSelector = (state: RootState) => state.homeReducer
export default homeSlice.reducer
export const useAppDispatch = () => useDispatch<AppDispatch>()
