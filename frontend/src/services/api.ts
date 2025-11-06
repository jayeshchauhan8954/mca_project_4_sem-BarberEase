import axios from 'axios'
import { LoginRequest, RegisterRequest, AuthResponse, User, Shop, Staff, Service, Booking, BookingRequest } from '../types'

const API_BASE_URL = '/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authApi = {
  login: (credentials: LoginRequest): Promise<AuthResponse> =>
    api.post('/auth/login', credentials).then(res => res.data),
  
  register: (userData: RegisterRequest): Promise<AuthResponse> =>
    api.post('/auth/register', userData).then(res => res.data),
  
  getCurrentUser: (): Promise<User> =>
    api.get('/auth/me').then(res => res.data),
}

// Shop API
export const shopApi = {
  getShops: (): Promise<Shop[]> =>
    api.get('/owner/shops').then(res => res.data),
  
  getShopById: (shopId: string): Promise<Shop> =>
    api.get(`/owner/shops/${shopId}`).then(res => res.data),
  
  createShop: (shopData: Partial<Shop>): Promise<Shop> =>
    api.post('/owner/shops', shopData).then(res => res.data),
  
  updateShop: (shopId: string, shopData: Partial<Shop>): Promise<Shop> =>
    api.put(`/owner/shops/${shopId}`, shopData).then(res => res.data),
  
  deleteShop: (shopId: string): Promise<void> =>
    api.delete(`/owner/shops/${shopId}`).then(res => res.data),
  
  getPublicShops: (): Promise<Shop[]> =>
    api.get('/owner/public/shops').then(res => res.data),
  
  getStaffByShop: (shopId: string): Promise<Staff[]> =>
    api.get(`/owner/shops/${shopId}/staff`).then(res => res.data),
  
  createStaff: (shopId: string, staffData: Partial<Staff>): Promise<Staff> =>
    api.post(`/owner/shops/${shopId}/staff`, staffData).then(res => res.data),
  
  updateStaff: (staffId: string, staffData: Partial<Staff>): Promise<Staff> =>
    api.put(`/owner/staff/${staffId}`, staffData).then(res => res.data),
  
  deleteStaff: (staffId: string): Promise<void> =>
    api.delete(`/owner/staff/${staffId}`).then(res => res.data),
  
  updateStaffAvailability: (staffId: string, availability: any): Promise<Staff> =>
    api.put(`/owner/staff/${staffId}/availability`, { availability }).then(res => res.data),
  
  getServicesByShop: (shopId: string): Promise<Service[]> =>
    api.get(`/owner/shops/${shopId}/services`).then(res => res.data),
  
  createService: (shopId: string, serviceData: Partial<Service>): Promise<Service> =>
    api.post(`/owner/shops/${shopId}/services`, serviceData).then(res => res.data),
  
  updateService: (serviceId: string, serviceData: Partial<Service>): Promise<Service> =>
    api.put(`/owner/services/${serviceId}`, serviceData).then(res => res.data),
  
  deleteService: (serviceId: string): Promise<void> =>
    api.delete(`/owner/services/${serviceId}`).then(res => res.data),
}

// Booking API
export const bookingApi = {
  getBookings: (): Promise<Booking[]> =>
    api.get('/bookings').then(res => res.data),
  
  getBookingById: (bookingId: string): Promise<Booking> =>
    api.get(`/bookings/${bookingId}`).then(res => res.data),
  
  createBooking: (bookingData: BookingRequest): Promise<Booking> =>
    api.post('/bookings', bookingData).then(res => res.data),
  
  cancelBooking: (bookingId: string, reason?: string): Promise<Booking> =>
    api.put(`/bookings/${bookingId}/cancel`, { reason }).then(res => res.data),
  
  updateBookingStatus: (bookingId: string, status: string): Promise<Booking> =>
    api.put(`/bookings/${bookingId}/status`, { status }).then(res => res.data),
  
  getBookingsByShop: (shopId: string, startDate?: string, endDate?: string): Promise<Booking[]> => {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    return api.get(`/shops/${shopId}/bookings?${params}`).then(res => res.data)
  },
  
  getBookingsByStaff: (staffId: string, startDate?: string, endDate?: string): Promise<Booking[]> => {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    return api.get(`/staff/${staffId}/bookings?${params}`).then(res => res.data)
  },
  
  getAvailableSlots: (shopId: string, staffId: string, serviceId: string, date: string): Promise<string[]> => {
    const params = new URLSearchParams({
      staffId,
      serviceId,
      date,
    })
    return api.get(`/shops/${shopId}/available-slots?${params}`).then(res => res.data)
  },
}

export default api

