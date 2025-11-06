import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Shop, Staff, Service } from '../../types'
import { shopApi } from '../../services/api'

interface ShopState {
  shops: Shop[]
  currentShop: Shop | null
  staff: Staff[]
  services: Service[]
  loading: boolean
  error: string | null
}

const initialState: ShopState = {
  shops: [],
  currentShop: null,
  staff: [],
  services: [],
  loading: false,
  error: null,
}

// Async thunks
export const fetchShops = createAsyncThunk(
  'shop/fetchShops',
  async (_, { rejectWithValue }) => {
    try {
      const response = await shopApi.getShops()
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch shops')
    }
  }
)

export const fetchShopById = createAsyncThunk(
  'shop/fetchShopById',
  async (shopId: string, { rejectWithValue }) => {
    try {
      const response = await shopApi.getShopById(shopId)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch shop')
    }
  }
)

export const createShop = createAsyncThunk(
  'shop/createShop',
  async (shopData: Partial<Shop>, { rejectWithValue }) => {
    try {
      const response = await shopApi.createShop(shopData)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create shop')
    }
  }
)

export const updateShop = createAsyncThunk(
  'shop/updateShop',
  async ({ shopId, shopData }: { shopId: string; shopData: Partial<Shop> }, { rejectWithValue }) => {
    try {
      const response = await shopApi.updateShop(shopId, shopData)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update shop')
    }
  }
)

export const fetchStaffByShop = createAsyncThunk(
  'shop/fetchStaffByShop',
  async (shopId: string, { rejectWithValue }) => {
    try {
      const response = await shopApi.getStaffByShop(shopId)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch staff')
    }
  }
)

export const createStaff = createAsyncThunk(
  'shop/createStaff',
  async ({ shopId, staffData }: { shopId: string; staffData: Partial<Staff> }, { rejectWithValue }) => {
    try {
      const response = await shopApi.createStaff(shopId, staffData)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create staff')
    }
  }
)

export const fetchServicesByShop = createAsyncThunk(
  'shop/fetchServicesByShop',
  async (shopId: string, { rejectWithValue }) => {
    try {
      const response = await shopApi.getServicesByShop(shopId)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch services')
    }
  }
)

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCurrentShop: (state, action: PayloadAction<Shop>) => {
      state.currentShop = action.payload
    },
    clearCurrentShop: (state) => {
      state.currentShop = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch shops
      .addCase(fetchShops.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchShops.fulfilled, (state, action: PayloadAction<Shop[]>) => {
        state.loading = false
        state.shops = action.payload
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch shop by ID
      .addCase(fetchShopById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchShopById.fulfilled, (state, action: PayloadAction<Shop>) => {
        state.loading = false
        state.currentShop = action.payload
      })
      .addCase(fetchShopById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Create shop
      .addCase(createShop.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createShop.fulfilled, (state, action: PayloadAction<Shop>) => {
        state.loading = false
        state.shops.push(action.payload)
      })
      .addCase(createShop.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Update shop
      .addCase(updateShop.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateShop.fulfilled, (state, action: PayloadAction<Shop>) => {
        state.loading = false
        const index = state.shops.findIndex(shop => shop.id === action.payload.id)
        if (index !== -1) {
          state.shops[index] = action.payload
        }
        if (state.currentShop?.id === action.payload.id) {
          state.currentShop = action.payload
        }
      })
      .addCase(updateShop.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch staff
      .addCase(fetchStaffByShop.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchStaffByShop.fulfilled, (state, action: PayloadAction<Staff[]>) => {
        state.loading = false
        state.staff = action.payload
      })
      .addCase(fetchStaffByShop.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Create staff
      .addCase(createStaff.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createStaff.fulfilled, (state, action: PayloadAction<Staff>) => {
        state.loading = false
        state.staff.push(action.payload)
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch services
      .addCase(fetchServicesByShop.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchServicesByShop.fulfilled, (state, action: PayloadAction<Service[]>) => {
        state.loading = false
        state.services = action.payload
      })
      .addCase(fetchServicesByShop.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, setCurrentShop, clearCurrentShop } = shopSlice.actions
export default shopSlice.reducer

