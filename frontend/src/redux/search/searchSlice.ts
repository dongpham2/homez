import { useDispatch } from 'react-redux'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { type ICard } from '~/types/card.type'

import http from '~/axiosClient'
import { type AppDispatch,RootState } from '~/redux/store'



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
}
const initialState: SearchState = {
  results: [],
  isLoading: false,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPostListSearch.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchPostListSearch.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.length > 0) {
          state.results = action.payload
        } else {
          state.results = []
        }
      })
  },
})

export const searchSelector = (state: RootState) => state.searchReducer
export default searchSlice.reducer
export const useAppDispatch = () => useDispatch<AppDispatch>()
