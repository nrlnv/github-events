import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

// service
import baseService from '../baseService'

const initialState: {
  currentUser: CurrentUser
  isLoading: boolean
} = {
  currentUser: {},
  isLoading: false,
}

export const getUser = createAsyncThunk(
  'userSlice/getUser',
  async ({ login }: any, { rejectWithValue }) => {
    try {
      const res = await baseService.get(`/users/${login}`)
      return res.data
    } catch (e: any) {
      return rejectWithValue(e.response?.data.message || 'Something went wrong')
    }
  },
)

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.currentUser = payload
    })
    builder.addMatcher(isAnyOf(getUser.pending), (state) => {
      state.isLoading = true
    })
    builder.addMatcher(
      isAnyOf(getUser.rejected, getUser.fulfilled),
      (state) => {
        state.isLoading = false
      },
    )
  },
})

export const { clearCurrentUser } = userSlice.actions

export const selectCurrentUser = (state: AppState) =>
  state.userSlice.currentUser
export const selectIsLoading = (state: AppState) => state.userSlice.isLoading

export default userSlice.reducer
