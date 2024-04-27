import { useDispatch } from 'react-redux'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState, type AppDispatch } from '../store'
import http from '~/axiosClient'

export const fetchPostListSearch = createAsyncThunk('search/fetchPostListSearch', async (title, thunkAPI) => {
  try {
    const response = await http.post(`api/list/get?searchTerm=${title}`)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const initialState = {
  results: [],
  isLoading: false
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
