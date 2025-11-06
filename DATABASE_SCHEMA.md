# Database Schema Documentation

## Overview

BarberEase uses MongoDB as its primary database. This document describes the complete database schema, relationships, indexes, and data models.

## Database Information

- **Database Name**: `barber_ease`
- **MongoDB Version**: 6.0+
- **Connection String**: `mongodb://localhost:27017/barber_ease`

---

## Collections

### 1. Users Collection

**Collection Name**: `users`

#### Schema

```javascript
{
  _id: ObjectId,
  name: String,               // Required, 2-50 chars
  email: String,              // Required, unique, indexed
  password: String,           // Required, BCrypt hashed
  phone: String,              // Required, 10 digits
  role: String,               // Enum: ADMIN, SHOP_OWNER, STAFF, CUSTOMER
  active: Boolean,            // Default: true
  shopId: String,             // Optional, ref: shops
  staffId: String,            // Optional, ref: staff
  createdAt: ISODate,
  updatedAt: ISODate
}
```

#### Indexes

```javascript
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })
db.users.createIndex({ active: 1 })
db.users.createIndex({ shopId: 1 })
```

#### Constraints

- `email` must be unique
- `password` must be hashed with BCrypt
- `role` must be one of the defined enums
- `shopId` references `shops._id` (if SHOP_OWNER)
- `staffId` references `staff._id` (if STAFF)

#### Sample Document

```json
{
  "_id": "6547a1b2c3d4e5f6g7h8i9j0",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  "phone": "9876543210",
  "role": "SHOP_OWNER",
  "active": true,
  "shopId": "6547a1b2c3d4e5f6g7h8i9j1",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

### 2. Shops Collection

**Collection Name**: `shops`

#### Schema

```javascript
{
  _id: ObjectId,
  name: String,               // Required, 2-100 chars
  address: String,            // Required
  phone: String,              // Required
  email: String,              // Optional
  description: String,        // Optional
  ownerId: String,            // Required, ref: users, indexed
  staffIds: [String],         // Array of staff IDs
  businessHours: {            // Business hours per day
    monday: String,           // e.g., "09:00-18:00"
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  settings: {
    advancePaymentPercentage: Number,    // Default: 20
    slotDurationMinutes: Number,         // Default: 30
    bufferTimeMinutes: Number,           // Default: 5
    allowOnlineBooking: Boolean,         // Default: true
    maxAdvanceBookingDays: Number        // Default: 30
  },
  active: Boolean,            // Default: true, indexed
  createdAt: ISODate,
  updatedAt: ISODate
}
```

#### Indexes

```javascript
db.shops.createIndex({ ownerId: 1 })
db.shops.createIndex({ active: 1 })
db.shops.createIndex({ name: 1 })
db.shops.createIndex({ ownerId: 1, active: 1 })
```

#### Sample Document

```json
{
  "_id": "6547a1b2c3d4e5f6g7h8i9j1",
  "name": "Premium Cuts Barbershop",
  "address": "123 Main Street, Mumbai, Maharashtra 400001",
  "phone": "9876543210",
  "email": "info@premiumcuts.com",
  "description": "Professional barbershop with experienced staff",
  "ownerId": "6547a1b2c3d4e5f6g7h8i9j0",
  "staffIds": ["6547a1b2c3d4e5f6g7h8i9j2", "6547a1b2c3d4e5f6g7h8i9j3"],
  "businessHours": {
    "monday": "09:00-18:00",
    "tuesday": "09:00-18:00",
    "wednesday": "09:00-18:00",
    "thursday": "09:00-18:00",
    "friday": "09:00-20:00",
    "saturday": "10:00-20:00",
    "sunday": "10:00-16:00"
  },
  "settings": {
    "advancePaymentPercentage": 20,
    "slotDurationMinutes": 30,
    "bufferTimeMinutes": 5,
    "allowOnlineBooking": true,
    "maxAdvanceBookingDays": 30
  },
  "active": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

### 3. Staff Collection

**Collection Name**: `staff`

#### Schema

```javascript
{
  _id: ObjectId,
  name: String,               // Required, 2-50 chars
  phone: String,              // Required
  email: String,              // Optional
  specialization: String,     // Optional (e.g., "Hair Stylist")
  profileImage: String,       // Optional, URL
  shopId: String,             // Required, ref: shops, indexed
  userId: String,             // Optional, ref: users, indexed
  availability: {             // Weekly availability
    monday: [{
      startTime: String,      // e.g., "09:00"
      endTime: String,        // e.g., "12:00"
      available: Boolean      // true/false
    }],
    tuesday: [...],
    // ... other days
  },
  serviceIds: [String],       // Services offered
  rating: Number,             // Average rating (0-5)
  totalReviews: Number,       // Total review count
  active: Boolean,            // Default: true
  createdAt: ISODate,
  updatedAt: ISODate
}
```

#### Indexes

```javascript
db.staff.createIndex({ shopId: 1 })
db.staff.createIndex({ userId: 1 }, { unique: true, sparse: true })
db.staff.createIndex({ active: 1 })
db.staff.createIndex({ shopId: 1, active: 1 })
```

#### Sample Document

```json
{
  "_id": "6547a1b2c3d4e5f6g7h8i9j2",
  "name": "Rajesh Kumar",
  "phone": "9876543211",
  "email": "rajesh@example.com",
  "specialization": "Hair Cutting & Beard Styling",
  "profileImage": "https://example.com/images/rajesh.jpg",
  "shopId": "6547a1b2c3d4e5f6g7h8i9j1",
  "userId": "6547a1b2c3d4e5f6g7h8i9j4",
  "availability": {
    "monday": [
      { "startTime": "09:00", "endTime": "13:00", "available": true },
      { "startTime": "14:00", "endTime": "18:00", "available": true }
    ],
    "tuesday": [
      { "startTime": "09:00", "endTime": "13:00", "available": true },
      { "startTime": "14:00", "endTime": "18:00", "available": true }
    ]
  },
  "serviceIds": ["6547a1b2c3d4e5f6g7h8i9j5", "6547a1b2c3d4e5f6g7h8i9j6"],
  "rating": 4.7,
  "totalReviews": 145,
  "active": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

### 4. Services Collection

**Collection Name**: `services`

#### Schema

```javascript
{
  _id: ObjectId,
  name: String,               // Required
  description: String,        // Optional
  durationMinutes: Number,    // Required, positive
  price: Number,              // Required, positive
  bufferTimeMinutes: Number,  // Default: 5
  shopId: String,             // Required, ref: shops, indexed
  category: String,           // Enum: HAIRCUT, BEARD_TRIM, etc.
  active: Boolean,            // Default: true, indexed
  createdAt: ISODate,
  updatedAt: ISODate
}
```

#### Categories Enum
- `HAIRCUT`
- `BEARD_TRIM`
- `SHAVE`
- `STYLING`
- `COLORING`
- `TREATMENT`
- `OTHER`

#### Indexes

```javascript
db.services.createIndex({ shopId: 1 })
db.services.createIndex({ active: 1 })
db.services.createIndex({ shopId: 1, active: 1 })
db.services.createIndex({ category: 1, active: 1 })
```

#### Sample Document

```json
{
  "_id": "6547a1b2c3d4e5f6g7h8i9j5",
  "name": "Premium Haircut",
  "description": "Professional hair cutting with styling",
  "durationMinutes": 30,
  "price": 500,
  "bufferTimeMinutes": 5,
  "shopId": "6547a1b2c3d4e5f6g7h8i9j1",
  "category": "HAIRCUT",
  "active": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

### 5. Bookings Collection

**Collection Name**: `bookings`

#### Schema

```javascript
{
  _id: ObjectId,
  shopId: String,             // Required, ref: shops, indexed
  staffId: String,            // Required, ref: staff, indexed
  userId: String,             // Required, ref: users, indexed
  serviceId: String,          // Required, ref: services
  appointmentDateTime: ISODate, // Required, indexed
  status: String,             // Enum: PENDING, CONFIRMED, etc.
  notes: String,              // Optional
  paymentId: String,          // Optional, ref: payments
  advanceAmount: Number,      // Amount paid in advance
  totalAmount: Number,        // Total service amount
  paymentStatus: String,      // Enum: PENDING, COMPLETED, etc.
  notificationSent: Boolean,  // Default: false
  notificationSentAt: ISODate,
  cancellationReason: String,
  cancelledAt: ISODate,
  createdAt: ISODate,
  updatedAt: ISODate
}
```

#### Status Enum
- `PENDING` - Awaiting payment
- `CONFIRMED` - Payment completed
- `IN_PROGRESS` - Service in progress
- `COMPLETED` - Service completed
- `CANCELLED` - Booking cancelled
- `NO_SHOW` - Customer didn't show up

#### Payment Status Enum
- `PENDING` - Awaiting payment
- `COMPLETED` - Payment successful
- `FAILED` - Payment failed
- `REFUNDED` - Payment refunded

#### Indexes

```javascript
db.bookings.createIndex({ userId: 1 })
db.bookings.createIndex({ shopId: 1 })
db.bookings.createIndex({ staffId: 1 })
db.bookings.createIndex({ appointmentDateTime: 1 })
db.bookings.createIndex({ status: 1 })
db.bookings.createIndex({ paymentStatus: 1 })

// Compound indexes for common queries
db.bookings.createIndex({ shopId: 1, appointmentDateTime: 1 })
db.bookings.createIndex({ staffId: 1, appointmentDateTime: 1 })
db.bookings.createIndex({ userId: 1, status: 1 })
```

#### Sample Document

```json
{
  "_id": "6547a1b2c3d4e5f6g7h8i9j7",
  "shopId": "6547a1b2c3d4e5f6g7h8i9j1",
  "staffId": "6547a1b2c3d4e5f6g7h8i9j2",
  "userId": "6547a1b2c3d4e5f6g7h8i9j8",
  "serviceId": "6547a1b2c3d4e5f6g7h8i9j5",
  "appointmentDateTime": "2024-01-20T14:00:00.000Z",
  "status": "CONFIRMED",
  "notes": "Please use organic products",
  "paymentId": "6547a1b2c3d4e5f6g7h8i9j9",
  "advanceAmount": 100,
  "totalAmount": 500,
  "paymentStatus": "COMPLETED",
  "notificationSent": true,
  "notificationSentAt": "2024-01-15T10:35:00.000Z",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:35:00.000Z"
}
```

---

### 6. Payments Collection

**Collection Name**: `payments`

#### Schema

```javascript
{
  _id: ObjectId,
  bookingId: String,          // Required, ref: bookings, indexed
  userId: String,             // Required, ref: users, indexed
  amount: Number,             // Required, positive
  method: String,             // Enum: RAZORPAY, CASH, CARD, PAYTM
  status: String,             // Enum: PENDING, PROCESSING, etc.
  transactionId: String,      // Payment gateway transaction ID
  razorpayOrderId: String,    // Razorpay specific
  razorpayPaymentId: String,  // Razorpay specific
  razorpaySignature: String,  // Razorpay specific
  gatewayResponse: String,    // Raw response from gateway
  failureReason: String,      // If payment failed
  createdAt: ISODate,
  updatedAt: ISODate
}
```

#### Payment Method Enum
- `RAZORPAY` - Online payment via Razorpay
- `PAYTM` - Online payment via PayTM
- `CASH` - Cash payment (walk-ins)
- `CARD` - Card payment (manual entry)

#### Payment Status Enum
- `PENDING` - Payment initiated
- `PROCESSING` - Payment in progress
- `COMPLETED` - Payment successful
- `FAILED` - Payment failed
- `CANCELLED` - Payment cancelled
- `REFUNDED` - Payment refunded

#### Indexes

```javascript
db.payments.createIndex({ bookingId: 1 })
db.payments.createIndex({ userId: 1 })
db.payments.createIndex({ status: 1 })
db.payments.createIndex({ razorpayOrderId: 1 }, { unique: true, sparse: true })
db.payments.createIndex({ razorpayPaymentId: 1 }, { unique: true, sparse: true })
db.payments.createIndex({ createdAt: -1 })
```

#### Sample Document

```json
{
  "_id": "6547a1b2c3d4e5f6g7h8i9j9",
  "bookingId": "6547a1b2c3d4e5f6g7h8i9j7",
  "userId": "6547a1b2c3d4e5f6g7h8i9j8",
  "amount": 100,
  "method": "RAZORPAY",
  "status": "COMPLETED",
  "transactionId": "txn_1234567890",
  "razorpayOrderId": "order_1234567890",
  "razorpayPaymentId": "pay_1234567890",
  "razorpaySignature": "signature_hash",
  "gatewayResponse": "{\"status\": \"captured\"}",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:35:00.000Z"
}
```

---

### 7. Notifications Collection

**Collection Name**: `notifications`

#### Schema

```javascript
{
  _id: ObjectId,
  userId: String,             // Required, ref: users, indexed
  bookingId: String,          // Optional, ref: bookings
  message: String,            // Required
  type: String,               // Enum: BOOKING_CONFIRMED, etc.
  channel: String,            // Enum: EMAIL, SMS, WHATSAPP, etc.
  status: String,             // Enum: PENDING, SENT, etc.
  recipientEmail: String,
  recipientPhone: String,
  recipientWhatsApp: String,
  sentAt: ISODate,
  deliveredAt: ISODate,
  deliveryResponse: String,   // Response from service
  failureReason: String,
  createdAt: ISODate,
  updatedAt: ISODate
}
```

#### Notification Type Enum
- `BOOKING_CONFIRMED`
- `BOOKING_REMINDER`
- `BOOKING_CANCELLED`
- `PAYMENT_SUCCESS`
- `PAYMENT_FAILED`
- `APPOINTMENT_REMINDER`
- `STAFF_ASSIGNED`
- `GENERAL`

#### Notification Channel Enum
- `EMAIL`
- `SMS`
- `WHATSAPP`
- `PUSH_NOTIFICATION`
- `WEB_NOTIFICATION`

#### Notification Status Enum
- `PENDING`
- `SENT`
- `DELIVERED`
- `FAILED`
- `CANCELLED`

#### Indexes

```javascript
db.notifications.createIndex({ userId: 1 })
db.notifications.createIndex({ bookingId: 1 })
db.notifications.createIndex({ status: 1 })
db.notifications.createIndex({ type: 1 })
db.notifications.createIndex({ createdAt: -1 })
```

---

## Relationships

### Entity Relationship Diagram

```
┌─────────────┐
│    Users    │
└──────┬──────┘
       │
       │ 1:1 (shopId)
       │
┌──────▼──────┐
│    Shops    │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────▼──────┐
│    Staff    │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────▼──────┐          ┌──────────────┐
│  Services   │          │   Bookings   │
└─────────────┘          └──────┬───────┘
                                │
                                │ 1:1
                                │
                         ┌──────▼───────┐
                         │   Payments   │
                         └──────────────┘
```

### Relationship Details

1. **Users → Shops** (1:N)
   - One user (SHOP_OWNER) can own multiple shops
   - `shops.ownerId` references `users._id`

2. **Shops → Staff** (1:N)
   - One shop has multiple staff members
   - `staff.shopId` references `shops._id`

3. **Staff → User** (1:1, Optional)
   - Staff member can have a user account
   - `staff.userId` references `users._id`

4. **Shops → Services** (1:N)
   - One shop offers multiple services
   - `services.shopId` references `shops._id`

5. **Bookings → Multiple References**
   - `bookings.shopId` → `shops._id`
   - `bookings.staffId` → `staff._id`
   - `bookings.userId` → `users._id`
   - `bookings.serviceId` → `services._id`

6. **Bookings → Payments** (1:1)
   - One booking has one payment
   - `payments.bookingId` references `bookings._id`

7. **Users → Notifications** (1:N)
   - One user receives multiple notifications
   - `notifications.userId` references `users._id`

---

## Data Integrity Rules

### Referential Integrity

1. **Cascade Delete**:
   - Deleting a shop → Soft delete (set `active: false`)
   - Deleting a user → Soft delete (set `active: false`)
   - Deleting staff → Soft delete (set `active: false`)

2. **Orphan Prevention**:
   - Cannot delete shop if active bookings exist
   - Cannot delete staff if future bookings exist
   - Cannot delete service if future bookings exist

3. **Validation Rules**:
   - Booking date must be in the future
   - Staff must belong to selected shop
   - Service must belong to selected shop
   - Payment amount must match booking amount

---

## Common Queries

### 1. Get User with Shop Details

```javascript
db.users.aggregate([
  { $match: { _id: ObjectId("userId") } },
  {
    $lookup: {
      from: "shops",
      localField: "shopId",
      foreignField: "_id",
      as: "shop"
    }
  },
  { $unwind: { path: "$shop", preserveNullAndEmptyArrays: true } }
])
```

### 2. Get Shop with Staff and Services

```javascript
db.shops.aggregate([
  { $match: { _id: ObjectId("shopId") } },
  {
    $lookup: {
      from: "staff",
      localField: "_id",
      foreignField: "shopId",
      as: "staff"
    }
  },
  {
    $lookup: {
      from: "services",
      localField: "_id",
      foreignField: "shopId",
      as: "services"
    }
  }
])
```

### 3. Get Bookings with Full Details

```javascript
db.bookings.aggregate([
  { $match: { userId: ObjectId("userId") } },
  {
    $lookup: {
      from: "shops",
      localField: "shopId",
      foreignField: "_id",
      as: "shop"
    }
  },
  {
    $lookup: {
      from: "staff",
      localField: "staffId",
      foreignField: "_id",
      as: "staff"
    }
  },
  {
    $lookup: {
      from: "services",
      localField: "serviceId",
      foreignField: "_id",
      as: "service"
    }
  },
  { $unwind: "$shop" },
  { $unwind: "$staff" },
  { $unwind: "$service" }
])
```

### 4. Get Available Slots for Staff

```javascript
db.bookings.find({
  staffId: "staffId",
  appointmentDateTime: {
    $gte: ISODate("2024-01-20T00:00:00.000Z"),
    $lt: ISODate("2024-01-21T00:00:00.000Z")
  },
  status: { $nin: ["CANCELLED", "NO_SHOW"] }
}).sort({ appointmentDateTime: 1 })
```

### 5. Get Shop Revenue Report

```javascript
db.payments.aggregate([
  {
    $lookup: {
      from: "bookings",
      localField: "bookingId",
      foreignField: "_id",
      as: "booking"
    }
  },
  { $unwind: "$booking" },
  { $match: { "booking.shopId": "shopId", status: "COMPLETED" } },
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
      totalRevenue: { $sum: "$amount" },
      bookingCount: { $sum: 1 }
    }
  },
  { $sort: { _id: -1 } }
])
```

---

## Database Maintenance

### Backup Strategy

```bash
# Daily backup
mongodump --uri="mongodb://localhost:27017/barber_ease" --out=/backup/$(date +%Y%m%d)

# Restore from backup
mongorestore --uri="mongodb://localhost:27017/barber_ease" /backup/20240115
```

### Data Cleanup

```javascript
// Archive old bookings (older than 3 years)
db.bookings.updateMany(
  {
    createdAt: { $lt: new Date(Date.now() - 3 * 365 * 24 * 60 * 60 * 1000) }
  },
  {
    $set: { archived: true }
  }
)

// Delete old notifications (older than 90 days)
db.notifications.deleteMany({
  createdAt: { $lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) },
  status: { $in: ["DELIVERED", "FAILED"] }
})
```

### Index Maintenance

```javascript
// Rebuild indexes
db.bookings.reIndex()

// Check index usage
db.bookings.aggregate([{ $indexStats: {} }])
```

---

## Migration Scripts

### v1.0.0 Initial Setup

```javascript
// Create database
use barber_ease

// Create collections with validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "password", "phone", "role"],
      properties: {
        name: { bsonType: "string", minLength: 2, maxLength: 50 },
        email: { bsonType: "string", pattern: "^.+@.+$" },
        password: { bsonType: "string", minLength: 6 },
        phone: { bsonType: "string" },
        role: { enum: ["ADMIN", "SHOP_OWNER", "STAFF", "CUSTOMER"] }
      }
    }
  }
})

// Create all indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.shops.createIndex({ ownerId: 1 })
db.bookings.createIndex({ appointmentDateTime: 1 })
// ... all other indexes
```

---

## Performance Optimization

### Query Optimization

1. **Use Indexes**: All foreign keys are indexed
2. **Projection**: Only fetch required fields
3. **Pagination**: Use `skip` and `limit`
4. **Aggregation**: Use for complex queries

### Best Practices

```javascript
// ✅ Good: Uses index
db.users.find({ email: "john@example.com" })

// ❌ Bad: Full collection scan
db.users.find({ phone: { $regex: "987" } })

// ✅ Good: Projection
db.bookings.find({}, { _id: 1, status: 1, appointmentDateTime: 1 })

// ❌ Bad: Fetching all fields
db.bookings.find({})
```

---

## Data Security

### Sensitive Data

1. **Passwords**: Always hashed with BCrypt
2. **Payment Info**: Only transaction IDs stored
3. **Personal Info**: Encrypted at rest (production)

### Access Control

```javascript
// MongoDB user creation
use admin
db.createUser({
  user: "barber_app",
  pwd: "secure_password",
  roles: [
    { role: "readWrite", db: "barber_ease" }
  ]
})
```

---

## Monitoring Queries

### Health Checks

```javascript
// Database size
db.stats()

// Collection counts
db.users.countDocuments()
db.shops.countDocuments()
db.bookings.countDocuments()

// Active bookings today
db.bookings.countDocuments({
  appointmentDateTime: {
    $gte: new Date().setHours(0,0,0,0),
    $lt: new Date().setHours(23,59,59,999)
  },
  status: { $nin: ["CANCELLED", "COMPLETED"] }
})
```

---

**Last Updated**: November 2024  
**Schema Version**: 1.0.0

