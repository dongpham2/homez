import { useDispatch } from 'react-redux'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { type AppDispatch, type RootState } from '~/redux/store'
import { type ICard } from '~/types/card.type'

import http from '~/axiosClient'

export const fetchPostListSearch = createAsyncThunk('search/fetchPostListSearch', async (title: string, thunkAPI) => {
  try {
    const response = await http.get<ICard[]>(`api/list/get?searchTerm=${title}`, {
      signal: thunkAPI.signal,
    })
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
interface SearchState {
  results: ICard[] | []
  isLoading: boolean
  status: string
}
const initialState: SearchState = {
  results: [],
  isLoading: false,
  status: 'idle',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPostListSearch.pending, (state) => {
        state.isLoading = true
        state.status = 'pending'
      })
      .addCase(fetchPostListSearch.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.length > 0) {
          state.results = action.payload
          state.status = 'success'
        } else {
          state.results = []
          state.status = 'failed'
        }
      })
  },
})

export const searchSelector = (state: RootState) => state.searchReducer
export default searchSlice.reducer
export const useAppDispatch = () => useDispatch<AppDispatch>()
