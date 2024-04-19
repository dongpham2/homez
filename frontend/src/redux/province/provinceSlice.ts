import { useDispatch } from 'react-redux'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { type DistrictResults, type ProvinceResults, type ProvinceState, type WardResults } from '~/types/province.type'

import { type AppDispatch } from '../store'

export const fetchProvinces = createAsyncThunk('province/fetchProcvince', async (_, thunkAPI) => {
  try {
    const response = await axios.get<ProvinceResults>('https://vapi.vnappmob.com/api/province', {
      signal: thunkAPI.signal,
    })
    return response.data.results
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const fetchDistricts = createAsyncThunk('province/fetchDistrict', async (districtId: number, thunkAPI) => {
  try {
    const response = await axios.get<DistrictResults>(`https://vapi.vnappmob.com/api/province/district/${districtId}`, {
      signal: thunkAPI.signal,
    })
    return response.data.results
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const fetchWards = createAsyncThunk('province/fetchWards', async (wardId: number, thunkAPI) => {
  try {
    const response = await axios.get<WardResults>(`https://vapi.vnappmob.com/api/province/ward/${wardId}`, {
      signal: thunkAPI.signal,
    })
    return response.data.results
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const initialState: ProvinceState = {
  provinces: [],
  districts: [],
  wards: [],
}

const provinceSlice = createSlice({
  name: 'province',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.provinces = action.payload
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.districts = action.payload
      })
      .addCase(fetchWards.fulfilled, (state, action) => {
        state.wards = action.payload
      })
  },
})

export default provinceSlice.reducer

export const useAppDispatch = () => useDispatch<AppDispatch>()
