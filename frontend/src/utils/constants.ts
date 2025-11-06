/**
 * Application constants
 */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
export const API_TIMEOUT = 30000 // 30 seconds

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// Date/Time
export const DATE_FORMAT = 'YYYY-MM-DD'
export const TIME_FORMAT = 'HH:mm'
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm'
export const DISPLAY_DATE_FORMAT = 'MMM DD, YYYY'
export const DISPLAY_DATETIME_FORMAT = 'MMM DD, YYYY hh:mm A'

// Booking
export const MIN_ADVANCE_BOOKING_HOURS = 1
export const MAX_ADVANCE_BOOKING_DAYS = 90
export const DEFAULT_SLOT_DURATION = 30 // minutes
export const DEFAULT_BUFFER_TIME = 5 // minutes

// Payment
export const MIN_ADVANCE_PAYMENT_PERCENTAGE = 10
export const MAX_ADVANCE_PAYMENT_PERCENTAGE = 50
export const DEFAULT_ADVANCE_PAYMENT_PERCENTAGE = 20

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']

// User Roles
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  SHOP_OWNER: 'SHOP_OWNER',
  STAFF: 'STAFF',
  CUSTOMER: 'CUSTOMER',
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW',
} as const

export type BookingStatus = typeof BOOKING_STATUS[keyof typeof BOOKING_STATUS]

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
} as const

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS]

// Service Categories
export const SERVICE_CATEGORIES = {
  HAIRCUT: 'HAIRCUT',
  BEARD_TRIM: 'BEARD_TRIM',
  SHAVE: 'SHAVE',
  STYLING: 'STYLING',
  COLORING: 'COLORING',
  TREATMENT: 'TREATMENT',
  OTHER: 'OTHER',
} as const

export type ServiceCategory = typeof SERVICE_CATEGORIES[keyof typeof SERVICE_CATEGORIES]

// Service Category Labels
export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  HAIRCUT: 'Haircut',
  BEARD_TRIM: 'Beard Trim',
  SHAVE: 'Shave',
  STYLING: 'Hair Styling',
  COLORING: 'Hair Coloring',
  TREATMENT: 'Hair Treatment',
  OTHER: 'Other Services',
}

// Notification Types
export const NOTIFICATION_TYPES = {
  BOOKING_CONFIRMED: 'BOOKING_CONFIRMED',
  BOOKING_REMINDER: 'BOOKING_REMINDER',
  BOOKING_CANCELLED: 'BOOKING_CANCELLED',
  PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  APPOINTMENT_REMINDER: 'APPOINTMENT_REMINDER',
  STAFF_ASSIGNED: 'STAFF_ASSIGNED',
  GENERAL: 'GENERAL',
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'token',
  USER_DATA: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  SHOPS: '/shops',
  SHOP_DETAILS: '/shops/:id',
  STAFF: '/staff',
  BOOKINGS: '/bookings',
  BOOKING_CREATE: '/bookings/create',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
}

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!',
  BOOKING_CREATED: 'Booking created successfully!',
  BOOKING_CANCELLED: 'Booking cancelled successfully!',
  PAYMENT_SUCCESS: 'Payment completed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  SHOP_CREATED: 'Shop created successfully!',
  STAFF_ADDED: 'Staff member added successfully!',
  SERVICE_CREATED: 'Service created successfully!',
}

// Regex Patterns
export const REGEX = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE: /^[6-9]\d{9}$/,
  URL: /^https?:\/\/.+/,
  TIME: /^([01]\d|2[0-3]):([0-5]\d)$/,
}

// Time Slots (9 AM to 6 PM)
export const TIME_SLOTS = Array.from({ length: 19 }, (_, i) => {
  const hour = Math.floor(9 + i / 2)
  const minute = i % 2 === 0 ? '00' : '30'
  return `${hour.toString().padStart(2, '0')}:${minute}`
})

// Days of Week
export const DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const

export const DAY_LABELS: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

