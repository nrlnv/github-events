import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

// service
import baseService from '../baseService'

const initialState: {
  events: []
  isLoading: boolean
} = {
  events: [],
  isLoading: false,
}

export const getEvents = createAsyncThunk(
  'homeSlice/getEvents',
  async (_, { rejectWithValue }) => {
    try {
      const res = await baseService.get('/events?per_page=25')
      return res.data
    } catch (e: any) {
      return rejectWithValue(e.response?.data.message || 'Something went wrong')
    }
  },
)

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEvents.fulfilled, (state, { payload }) => {
      state.events = payload
    })
    builder.addMatcher(isAnyOf(getEvents.pending), (state) => {
      state.isLoading = true
    })
    builder.addMatcher(
      isAnyOf(getEvents.rejected, getEvents.fulfilled),
      (state) => {
        state.isLoading = false
      },
    )
  },
})

export const selectEvents = (state: AppState) => state.homeSlice.events
export const selectIsLoading = (state: AppState) => state.homeSlice.isLoading

export default homeSlice.reducer
