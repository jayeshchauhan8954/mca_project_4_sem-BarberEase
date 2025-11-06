export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'SHOP_OWNER' | 'STAFF' | 'CUSTOMER';
  active: boolean;
  shopId?: string;
  staffId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Shop {
  id: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  description?: string;
  businessHours: BusinessHours;
  settings: ShopSettings;
  ownerId: string;
  staffIds: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface ShopSettings {
  advancePaymentPercentage: number;
  slotDurationMinutes: number;
  bufferTimeMinutes: number;
  allowOnlineBooking: boolean;
  maxAdvanceBookingDays: number;
}

export interface Staff {
  id: string;
  name: string;
  phone: string;
  email?: string;
  specialization?: string;
  profileImage?: string;
  shopId: string;
  userId?: string;
  availability: Record<string, TimeSlot[]>;
  serviceIds: string[];
  rating: number;
  totalReviews: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  durationMinutes: number;
  price: number;
  bufferTimeMinutes: number;
  shopId: string;
  category: 'HAIRCUT' | 'BEARD_TRIM' | 'SHAVE' | 'STYLING' | 'COLORING' | 'TREATMENT' | 'OTHER';
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  shopId: string;
  staffId: string;
  userId: string;
  serviceId: string;
  appointmentDateTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  notes?: string;
  paymentId?: string;
  advanceAmount?: number;
  totalAmount?: number;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  notificationSent: boolean;
  notificationSentAt?: string;
  cancellationReason?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  method: 'RAZORPAY' | 'PAYTM' | 'CASH' | 'CARD';
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
  transactionId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  gatewayResponse?: string;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  bookingId?: string;
  message: string;
  type: 'BOOKING_CONFIRMED' | 'BOOKING_REMINDER' | 'BOOKING_CANCELLED' | 'PAYMENT_SUCCESS' | 'PAYMENT_FAILED' | 'APPOINTMENT_REMINDER' | 'STAFF_ASSIGNED' | 'GENERAL';
  channel: 'EMAIL' | 'SMS' | 'WHATSAPP' | 'PUSH_NOTIFICATION' | 'WEB_NOTIFICATION';
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED' | 'CANCELLED';
  recipientEmail?: string;
  recipientPhone?: string;
  recipientWhatsApp?: string;
  sentAt?: string;
  deliveredAt?: string;
  deliveryResponse?: string;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'ADMIN' | 'SHOP_OWNER' | 'STAFF' | 'CUSTOMER';
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  user: User;
}

export interface BookingRequest {
  shopId: string;
  staffId: string;
  serviceId: string;
  appointmentDateTime: string;
  notes?: string;
}

