/**
 * Validation utility functions
 */

/**
 * Validate email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return emailRegex.test(email)
}

/**
 * Validate phone number (Indian format)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone)
}

/**
 * Validate password strength
 */
export const isStrongPassword = (password: string): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate required field
 */
export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value !== null && value !== undefined
}

/**
 * Validate minimum length
 */
export const minLength = (value: string, min: number): boolean => {
  return value.length >= min
}

/**
 * Validate maximum length
 */
export const maxLength = (value: string, max: number): boolean => {
  return value.length <= max
}

/**
 * Validate number range
 */
export const inRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max
}

/**
 * Validate positive number
 */
export const isPositive = (value: number): boolean => {
  return value > 0
}

/**
 * Validate date is in future
 */
export const isFutureDate = (date: string | Date): boolean => {
  return new Date(date) > new Date()
}

/**
 * Validate date is within range
 */
export const isDateInRange = (
  date: string | Date,
  minDate: string | Date,
  maxDate: string | Date
): boolean => {
  const checkDate = new Date(date)
  return checkDate >= new Date(minDate) && checkDate <= new Date(maxDate)
}

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate booking time (must be future and within business hours)
 */
export const isValidBookingTime = (
  dateTime: string,
  businessHours: { start: string; end: string }
): { isValid: boolean; error?: string } => {
  const bookingDate = new Date(dateTime)
  const now = new Date()
  
  // Check if in future
  if (bookingDate <= now) {
    return { isValid: false, error: 'Booking time must be in the future' }
  }
  
  // Check if within business hours
  const bookingTime = bookingDate.getHours() * 60 + bookingDate.getMinutes()
  const [startHour, startMin] = businessHours.start.split(':').map(Number)
  const [endHour, endMin] = businessHours.end.split(':').map(Number)
  const startTime = startHour * 60 + startMin
  const endTime = endHour * 60 + endMin
  
  if (bookingTime < startTime || bookingTime >= endTime) {
    return { 
      isValid: false, 
      error: `Booking must be between ${businessHours.start} and ${businessHours.end}` 
    }
  }
  
  return { isValid: true }
}

