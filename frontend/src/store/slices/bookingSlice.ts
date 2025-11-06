import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Booking, BookingRequest } from '../../types'
import { bookingApi } from '../../services/api'

interface BookingState {
  bookings: Booking[]
  currentBooking: Booking | null
  availableSlots: string[]
  loading: boolean
  error: string | null
}

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  availableSlots: [],
  loading: false,
  error: null,
}

// Async thunks
export const fetchBookings = createAsyncThunk(
  'booking/fetchBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookingApi.getBookings()
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings')
    }
  }
)

export const fetchBookingById = createAsyncThunk(
  'booking/fetchBookingById',
  async (bookingId: string, { rejectWithValue }) => {
    try {
      const response = await bookingApi.getBookingById(bookingId)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch booking')
    }
  }
)

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData: BookingRequest, { rejectWithValue }) => {
    try {
      const response = await bookingApi.createBooking(bookingData)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create booking')
    }
  }
)

export const cancelBooking = createAsyncThunk(
  'booking/cancelBooking',
  async ({ bookingId, reason }: { bookingId: string; reason?: string }, { rejectWithValue }) => {
    try {
      const response = await bookingApi.cancelBooking(bookingId, reason)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel booking')
    }
  }
)

export const fetchBookingsByShop = createAsyncThunk(
  'booking/fetchBookingsByShop',
  async ({ shopId, startDate, endDate }: { shopId: string; startDate?: string; endDate?: string }, { rejectWithValue }) => {
    try {
      const response = await bookingApi.getBookingsByShop(shopId, startDate, endDate)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch shop bookings')
    }
  }
)

export const fetchAvailableSlots = createAsyncThunk(
  'booking/fetchAvailableSlots',
  async ({ shopId, staffId, serviceId, date }: { shopId: string; staffId: string; serviceId: string; date: string }, { rejectWithValue }) => {
    try {
      const response = await bookingApi.getAvailableSlots(shopId, staffId, serviceId, date)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch available slots')
    }
  }
)

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCurrentBooking: (state, action: PayloadAction<Booking>) => {
      state.currentBooking = action.payload
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null
    },
    clearAvailableSlots: (state) => {
      state.availableSlots = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch bookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.loading = false
        state.bookings = action.payload
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch booking by ID
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBookingById.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = false
        state.currentBooking = action.payload
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = false
        state.bookings.push(action.payload)
        state.currentBooking = action.payload
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Cancel booking
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(cancelBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = false
        const index = state.bookings.findIndex(booking => booking.id === action.payload.id)
        if (index !== -1) {
          state.bookings[index] = action.payload
        }
        if (state.currentBooking?.id === action.payload.id) {
          state.currentBooking = action.payload
        }
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch bookings by shop
      .addCase(fetchBookingsByShop.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBookingsByShop.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.loading = false
        state.bookings = action.payload
      })
      .addCase(fetchBookingsByShop.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch available slots
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false
        state.availableSlots = action.payload
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, setCurrentBooking, clearCurrentBooking, clearAvailableSlots } = bookingSlice.actions
export default bookingSlice.reducer

