import { useDispatch } from 'react-redux'
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import { type AppDispatch } from '../store'
import axios from 'axios'


export const fetchProvinces = createAsyncThunk('province/fetchProcvince', async (_ , thunkAPI) => {
  try {
    const response = await axios.get('https://vapi.vnappmob.com/api/province', {
      signal: thunkAPI.signal,
    })
    return response
  } catch (error) {
    return isRejectedWithValue(error)
  }
})
export const fetchDistricts = createAsyncThunk('province/fetchDistrict', async (districtId: number, thunkAPI) => {
  try {
    const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${districtId}`, {
      signal: thunkAPI.signal,
    })
    return response
  } catch (error) {
    return isRejectedWithValue(error)
  }
})
export const fetchWards = createAsyncThunk('province/fetchWards', async (wardId: number, thunkAPI) => {
  try {
    const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${wardId}`, {
      signal: thunkAPI.signal,
    })
    return response
  } catch (error) {
    return isRejectedWithValue(error)
  }
})

const initialState = {
  provinces: [],
  districts: [],
  wards: [],
  status: 500
}

const provinceSlice = createSlice({
  name: 'province',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProvinces.fulfilled, (state, action: any) => {
        state.provinces = action.payload.data.results
        state.status = action.payload.status
      })
      .addCase(fetchDistricts.fulfilled, (state, action: any) => {
        state.districts = action.payload.data.results
        state.status = action.payload.status
      })
      .addCase(fetchWards.fulfilled, (state, action: any) => {
        state.wards = action.payload.data.results
        state.status = action.payload.status
      })
      
  },
})

export default provinceSlice.reducer

export const useAppDispatch = () => useDispatch<AppDispatch>()
