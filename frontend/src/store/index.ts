import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import shopSlice from './slices/shopSlice'
import bookingSlice from './slices/bookingSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    shop: shopSlice,
    booking: bookingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

