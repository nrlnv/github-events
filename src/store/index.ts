import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// reducers
import homeSlice from './homeSlice'
import userSlice from './userSlice'

const store = configureStore({
  reducer: {
    homeSlice,
    userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

declare global {
  type AppState = ReturnType<typeof store.getState>
}

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export default store
