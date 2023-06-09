import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

// service
import baseService from '../baseService'

const initialState: {
  users: User[]
  isLoading: boolean
} = {
  users: [] as User[],
  isLoading: false,
}

export const getUsers = createAsyncThunk<User[]>(
  'usersSlice/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { results },
      } = await baseService.get('?results=20')
      return results
    } catch (e: any) {
      return rejectWithValue(e.response?.data.message || 'Something went wrong')
    }
  },
)

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload
    })
    builder.addMatcher(isAnyOf(getUsers.pending), (state) => {
      state.isLoading = true
    })
    builder.addMatcher(
      isAnyOf(getUsers.rejected, getUsers.fulfilled),
      (state) => {
        state.isLoading = false
      },
    )
  },
})

export const selectUsers = (state: AppState) => state.usersSlice.users
export const selectIsLoading = (state: AppState) => state.usersSlice.isLoading

export default usersSlice.reducer
