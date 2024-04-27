import { useDispatch } from 'react-redux'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import http from '~/axiosClient'
import { type AppDispatch, type RootState } from '../../redux/store'
import { ICard } from '~/types/card.type'

export const fetchPostLists = createAsyncThunk('home/fetchPostLists', async (_, thunkAPI) => {
  try {
    const response = await http.get('api/list/get')
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

interface homeState {
  idLoading: boolean
  postLists: ICard[] | []
  post: ICard | {}
}

const initialState: homeState = {
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
        state.idLoading = true
      })
      .addCase(fetchPostLists.fulfilled, (state, action) => {
        state.idLoading = false
        state.postLists = action.payload
      })
  },
})

export const homeSelector = (state: RootState) => state.homeReducer
export default homeSlice.reducer
export const useAppDispatch = () => useDispatch<AppDispatch>()
