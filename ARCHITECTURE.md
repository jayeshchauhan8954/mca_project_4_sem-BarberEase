# BarberEase - System Architecture Documentation

## Table of Contents
1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Database Design](#database-design)
5. [API Architecture](#api-architecture)
6. [Security Architecture](#security-architecture)
7. [Frontend Architecture](#frontend-architecture)
8. [Backend Architecture](#backend-architecture)
9. [Data Flow](#data-flow)
10. [Scalability Considerations](#scalability-considerations)

---

## Overview

BarberEase is a comprehensive barber shop management system built using a modern three-tier architecture pattern with clear separation of concerns.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT TIER                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React 18 + Vite + Redux Toolkit + TypeScript       │  │
│  │  - Component-based UI                                 │  │
│  │  - State Management (Redux)                          │  │
│  │  - Routing (React Router)                            │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS/REST API
┌───────────────────────────▼─────────────────────────────────┐
│                   APPLICATION TIER                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Spring Boot 3.x + Java 17                           │  │
│  │  - RESTful API Controllers                           │  │
│  │  - Business Logic Services                           │  │
│  │  - Security Layer (JWT + Spring Security)           │  │
│  │  - Data Validation                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │ MongoDB Driver
┌───────────────────────────▼─────────────────────────────────┐
│                     DATA TIER                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  MongoDB 6.0+                                         │  │
│  │  - Document Storage                                   │  │
│  │  - Indexing                                           │  │
│  │  - Replication (Production)                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### External Integrations

```
┌─────────────────────────────────────────────────────────────┐
│                 EXTERNAL SERVICES                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Razorpay    │  │   SMTP       │  │   Twilio     │     │
│  │  Payment     │  │   Email      │  │   WhatsApp   │     │
│  │  Gateway     │  │   Service    │  │   Messaging  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## System Architecture

### 1. Layered Architecture

The backend follows a clean layered architecture:

```
┌─────────────────────────────────────────────────┐
│          PRESENTATION LAYER                     │
│  Controllers (REST APIs)                        │
│  - AuthController                               │
│  - ShopController                               │
│  - BookingController                            │
│  - PaymentController                            │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│          BUSINESS LOGIC LAYER                   │
│  Services                                       │
│  - AuthService                                  │
│  - ShopService                                  │
│  - BookingService                               │
│  - PaymentService                               │
│  - NotificationService                          │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│          DATA ACCESS LAYER                      │
│  Repositories (Spring Data MongoDB)             │
│  - UserRepository                               │
│  - ShopRepository                               │
│  - BookingRepository                            │
│  - PaymentRepository                            │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│          DATABASE LAYER                         │
│  MongoDB Collections                            │
│  - users                                        │
│  - shops                                        │
│  - bookings                                     │
│  - payments                                     │
└─────────────────────────────────────────────────┘
```

### 2. Component Diagram

```
┌────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│                                                             │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐  │
│  │   Pages      │   │  Components  │   │   Layouts    │  │
│  │              │   │              │   │              │  │
│  │ - Login      │   │ - Navbar     │   │ - Main       │  │
│  │ - Dashboard  │   │ - Sidebar    │   │ - Auth       │  │
│  │ - Shops      │   │ - Cards      │   │              │  │
│  │ - Bookings   │   │ - Forms      │   │              │  │
│  └──────┬───────┘   └──────┬───────┘   └──────┬───────┘  │
│         │                  │                   │           │
│         └──────────────────┼───────────────────┘           │
│                           │                                │
│  ┌────────────────────────▼─────────────────────────┐     │
│  │          Redux Store (State Management)          │     │
│  │                                                   │     │
│  │  - authSlice                                     │     │
│  │  - shopSlice                                     │     │
│  │  - bookingSlice                                  │     │
│  └────────────────────┬─────────────────────────────┘     │
│                       │                                    │
│  ┌────────────────────▼─────────────────────────────┐     │
│  │          API Service Layer (Axios)               │     │
│  │                                                   │     │
│  │  - authApi                                       │     │
│  │  - shopApi                                       │     │
│  │  - bookingApi                                    │     │
│  └───────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Backend Technologies

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Programming Language | Java 17 | Core backend logic |
| Framework | Spring Boot 3.2.0 | Application framework |
| Database | MongoDB 6.0+ | NoSQL document database |
| Security | Spring Security + JWT | Authentication & Authorization |
| API Documentation | SpringDoc OpenAPI | Swagger/OpenAPI documentation |
| Payment Gateway | Razorpay SDK | Payment processing |
| Email | JavaMailSender | Email notifications |
| Messaging | Twilio SDK | WhatsApp notifications |
| Build Tool | Maven 3.8+ | Dependency management |

### Frontend Technologies

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Programming Language | TypeScript | Type-safe JavaScript |
| Framework | React 18 | UI framework |
| Build Tool | Vite 5.0 | Fast build tool |
| State Management | Redux Toolkit | Global state management |
| Routing | React Router v6 | Client-side routing |
| HTTP Client | Axios | API communication |
| Styling | Tailwind CSS | Utility-first CSS |
| Forms | React Hook Form | Form validation |
| Icons | Lucide React | Icon library |

### Development Tools

- **Version Control**: Git
- **Code Quality**: ESLint, Prettier
- **Container**: Docker, Docker Compose
- **API Testing**: Postman, Swagger UI

---

## Database Design

### Collections Schema

#### 1. Users Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string (unique, indexed)",
  "password": "string (hashed)",
  "phone": "string",
  "role": "ADMIN | SHOP_OWNER | STAFF | CUSTOMER",
  "active": "boolean",
  "shopId": "string (optional)",
  "staffId": "string (optional)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### 2. Shops Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "address": "string",
  "phone": "string",
  "email": "string",
  "description": "string",
  "ownerId": "string (ref: users, indexed)",
  "staffIds": ["string"],
  "businessHours": {
    "monday": "string",
    "tuesday": "string",
    ...
  },
  "settings": {
    "advancePaymentPercentage": "number",
    "slotDurationMinutes": "number",
    "bufferTimeMinutes": "number",
    "allowOnlineBooking": "boolean",
    "maxAdvanceBookingDays": "number"
  },
  "active": "boolean (indexed)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### 3. Staff Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "phone": "string",
  "email": "string",
  "specialization": "string",
  "profileImage": "string",
  "shopId": "string (ref: shops, indexed)",
  "userId": "string (ref: users, indexed)",
  "availability": {
    "monday": [{
      "startTime": "string",
      "endTime": "string",
      "available": "boolean"
    }],
    ...
  },
  "serviceIds": ["string"],
  "rating": "number",
  "totalReviews": "number",
  "active": "boolean",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### 4. Services Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "durationMinutes": "number",
  "price": "number",
  "bufferTimeMinutes": "number",
  "shopId": "string (ref: shops, indexed)",
  "category": "HAIRCUT | BEARD_TRIM | SHAVE | ...",
  "active": "boolean (indexed)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### 5. Bookings Collection
```json
{
  "_id": "ObjectId",
  "shopId": "string (ref: shops, indexed)",
  "staffId": "string (ref: staff, indexed)",
  "userId": "string (ref: users, indexed)",
  "serviceId": "string (ref: services)",
  "appointmentDateTime": "datetime (indexed)",
  "status": "PENDING | CONFIRMED | IN_PROGRESS | COMPLETED | CANCELLED",
  "notes": "string",
  "paymentId": "string",
  "advanceAmount": "number",
  "totalAmount": "number",
  "paymentStatus": "PENDING | COMPLETED | FAILED | REFUNDED",
  "notificationSent": "boolean",
  "notificationSentAt": "datetime",
  "cancellationReason": "string",
  "cancelledAt": "datetime",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### 6. Payments Collection
```json
{
  "_id": "ObjectId",
  "bookingId": "string (ref: bookings, indexed)",
  "userId": "string (ref: users, indexed)",
  "amount": "number",
  "method": "RAZORPAY | PAYTM | CASH | CARD",
  "status": "PENDING | PROCESSING | COMPLETED | FAILED | REFUNDED",
  "transactionId": "string",
  "razorpayOrderId": "string",
  "razorpayPaymentId": "string",
  "razorpaySignature": "string",
  "gatewayResponse": "string",
  "failureReason": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### 7. Notifications Collection
```json
{
  "_id": "ObjectId",
  "userId": "string (ref: users, indexed)",
  "bookingId": "string (ref: bookings)",
  "message": "string",
  "type": "BOOKING_CONFIRMED | BOOKING_REMINDER | ...",
  "channel": "EMAIL | SMS | WHATSAPP | ...",
  "status": "PENDING | SENT | DELIVERED | FAILED",
  "recipientEmail": "string",
  "recipientPhone": "string",
  "sentAt": "datetime",
  "deliveredAt": "datetime",
  "failureReason": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Database Indexes

```javascript
// Performance-critical indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })

db.shops.createIndex({ ownerId: 1 })
db.shops.createIndex({ active: 1 })

db.bookings.createIndex({ userId: 1 })
db.bookings.createIndex({ shopId: 1 })
db.bookings.createIndex({ staffId: 1 })
db.bookings.createIndex({ appointmentDateTime: 1 })
db.bookings.createIndex({ status: 1 })

db.payments.createIndex({ bookingId: 1 })
db.payments.createIndex({ userId: 1 })
```

---

## API Architecture

### RESTful API Design

All APIs follow REST principles:
- **Base URL**: `/api`
- **Authentication**: Bearer token (JWT)
- **Content-Type**: `application/json`
- **Status Codes**: Standard HTTP status codes

### API Versioning

Future versions will use URL versioning:
- v1: `/api/v1/...`
- v2: `/api/v2/...`

### Request/Response Format

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <jwt-token>
```

**Success Response:**
```json
{
  "data": {...},
  "message": "Success message",
  "success": true
}
```

**Error Response:**
```json
{
  "status": 400,
  "message": "Error description",
  "timestamp": "2024-01-15T10:30:00",
  "path": "/api/endpoint"
}
```

---

## Security Architecture

### 1. Authentication Flow

```
┌──────────┐                    ┌──────────┐
│  Client  │                    │  Server  │
└─────┬────┘                    └────┬─────┘
      │                              │
      │ 1. Login (email, password)   │
      │─────────────────────────────>│
      │                              │
      │        2. Validate           │
      │                              │
      │   3. Generate JWT Token      │
      │<─────────────────────────────│
      │                              │
      │ 4. Store Token (localStorage)│
      │                              │
      │ 5. API Request + Token       │
      │─────────────────────────────>│
      │                              │
      │    6. Validate Token         │
      │                              │
      │    7. Process Request        │
      │                              │
      │    8. Send Response          │
      │<─────────────────────────────│
      │                              │
```

### 2. Authorization Model

Role-Based Access Control (RBAC):

| Role | Permissions |
|------|------------|
| ADMIN | Full system access |
| SHOP_OWNER | Manage own shops, staff, services, view all bookings |
| STAFF | View assigned bookings, update availability |
| CUSTOMER | Create bookings, view own bookings, make payments |

### 3. Security Layers

1. **Transport Security**: HTTPS in production
2. **Authentication**: JWT tokens
3. **Authorization**: Spring Security with @PreAuthorize
4. **Input Validation**: Jakarta Validation (JSR-380)
5. **SQL Injection Prevention**: Spring Data MongoDB (No SQL)
6. **XSS Prevention**: Content Security Policy headers
7. **CSRF Protection**: Token-based CSRF for state-changing operations

---

## Frontend Architecture

### Component Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── LoadingSpinner.tsx
│   └── layout/          # Layout components
│       ├── Navbar.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
├── pages/               # Page components
│   ├── auth/
│   ├── booking/
│   ├── shop/
│   └── staff/
├── store/               # Redux store
│   ├── index.ts
│   └── slices/
│       ├── authSlice.ts
│       ├── shopSlice.ts
│       └── bookingSlice.ts
├── services/            # API services
│   └── api.ts
├── types/               # TypeScript types
│   └── index.ts
└── utils/               # Utility functions
    └── helpers.ts
```

### State Management Flow

```
┌──────────────┐
│  Component   │
└──────┬───────┘
       │
       │ dispatch(action)
       │
┌──────▼───────┐
│    Store     │
│  (Redux)     │
└──────┬───────┘
       │
       │ Async Thunk
       │
┌──────▼───────┐
│  API Service │
│  (Axios)     │
└──────┬───────┘
       │
       │ HTTP Request
       │
┌──────▼───────┐
│   Backend    │
│     API      │
└──────┬───────┘
       │
       │ Response
       │
┌──────▼───────┐
│   Reducer    │
│  (Update)    │
└──────┬───────┘
       │
       │ State Change
       │
┌──────▼───────┐
│  Component   │
│  (Re-render) │
└──────────────┘
```

---

## Data Flow

### Booking Creation Flow

```
1. Customer selects shop, staff, service, and time slot
   │
   ▼
2. Frontend validates input
   │
   ▼
3. POST /api/bookings with booking data
   │
   ▼
4. Backend validates JWT token
   │
   ▼
5. Check slot availability (conflict detection)
   │
   ▼
6. Calculate advance payment amount
   │
   ▼
7. Create booking record (status: PENDING)
   │
   ▼
8. Initiate payment process
   │
   ▼
9. Customer completes payment
   │
   ▼
10. Verify payment signature
   │
   ▼
11. Update booking (status: CONFIRMED)
   │
   ▼
12. Send notifications (email/WhatsApp)
   │
   ▼
13. Return booking confirmation to client
```

---

## Scalability Considerations

### Current Architecture Limitations
- Single MongoDB instance
- No caching layer
- Synchronous notifications

### Recommended Improvements for Production

1. **Database Layer**
   - Implement MongoDB replica sets
   - Add database sharding for horizontal scaling
   - Implement read replicas for read-heavy operations

2. **Caching Layer**
   - Add Redis for session management
   - Cache frequently accessed data (shops, services)
   - Implement cache invalidation strategies

3. **Load Balancing**
   - Deploy multiple backend instances
   - Use Nginx or AWS ALB for load balancing
   - Implement sticky sessions if needed

4. **Async Processing**
   - Use message queues (RabbitMQ/Kafka) for notifications
   - Implement background jobs for reminders
   - Async payment processing

5. **CDN**
   - Serve static assets from CDN
   - Implement edge caching

6. **Monitoring**
   - Application Performance Monitoring (APM)
   - Error tracking (Sentry)
   - Log aggregation (ELK Stack)

---

## Deployment Architecture

### Development Environment
```
Developer Machine
  ├── Backend (localhost:8080)
  ├── Frontend (localhost:5173)
  └── MongoDB (localhost:27017)
```

### Production Environment
```
┌─────────────────────────────────────────┐
│          Load Balancer (Nginx)          │
└─────────────┬───────────────────────────┘
              │
      ┌───────┴───────┐
      │               │
┌─────▼─────┐   ┌────▼──────┐
│ Backend 1 │   │ Backend 2 │
└─────┬─────┘   └────┬──────┘
      │              │
      └──────┬───────┘
             │
┌────────────▼─────────────┐
│  MongoDB Replica Set     │
│  ├── Primary             │
│  ├── Secondary 1         │
│  └── Secondary 2         │
└──────────────────────────┘
```

---

## Performance Metrics

### Target Performance
- API Response Time: < 200ms (95th percentile)
- Page Load Time: < 2s
- Database Query Time: < 50ms
- Concurrent Users: 1000+

---

## Future Enhancements

1. **Microservices Architecture**: Split into smaller services
2. **Event-Driven Architecture**: Implement event sourcing
3. **GraphQL API**: Alternative to REST
4. **Real-time Features**: WebSocket for live updates
5. **Mobile Apps**: Native iOS/Android apps
6. **AI/ML**: Smart scheduling, demand prediction

---

*Last Updated: 2024*
*Version: 1.0.0*

