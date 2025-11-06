# BarberEase API Documentation

This document provides comprehensive information about the BarberEase REST API endpoints.

## Base URL

- Development: `http://localhost:8080/api`
- Production: `https://your-domain.com/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this format:

```json
{
  "data": {},
  "message": "Success message",
  "success": true
}
```

Error responses:

```json
{
  "error": "Error message",
  "success": false,
  "status": 400
}
```

## Authentication Endpoints

### POST /auth/login
Login user with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "accessToken": "jwt-token",
  "tokenType": "Bearer",
  "user": {
    "id": "user-id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "CUSTOMER"
  }
}
```

### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "CUSTOMER"
}
```

### GET /auth/me
Get current user information.

**Headers:** Authorization required

## Shop Management Endpoints

### GET /owner/shops
Get all shops for the current user.

**Headers:** Authorization required (SHOP_OWNER or ADMIN)

### POST /owner/shops
Create a new shop.

**Request Body:**
```json
{
  "name": "Shop Name",
  "address": "Shop Address",
  "phone": "1234567890",
  "email": "shop@example.com",
  "description": "Shop description"
}
```

### GET /owner/shops/{id}
Get shop by ID.

### PUT /owner/shops/{id}
Update shop information.

### DELETE /owner/shops/{id}
Delete a shop (soft delete).

### GET /owner/public/shops
Get all active shops (public endpoint).

## Staff Management Endpoints

### GET /owner/shops/{shopId}/staff
Get all staff for a shop.

### POST /owner/shops/{shopId}/staff
Add new staff member to a shop.

**Request Body:**
```json
{
  "name": "Staff Name",
  "phone": "1234567890",
  "email": "staff@example.com",
  "specialization": "Hair Cutting"
}
```

### GET /owner/staff/{id}
Get staff member by ID.

### PUT /owner/staff/{id}
Update staff member information.

### DELETE /owner/staff/{id}
Delete staff member (soft delete).

### PUT /owner/staff/{id}/availability
Update staff availability.

**Request Body:**
```json
{
  "availability": {
    "monday": [
      {
        "startTime": "09:00",
        "endTime": "17:00",
        "available": true
      }
    ]
  }
}
```

## Service Management Endpoints

### GET /owner/shops/{shopId}/services
Get all services for a shop.

### POST /owner/shops/{shopId}/services
Create a new service.

**Request Body:**
```json
{
  "name": "Hair Cut",
  "description": "Professional hair cutting service",
  "durationMinutes": 30,
  "price": 500.0,
  "category": "HAIRCUT"
}
```

### GET /owner/services/{id}
Get service by ID.

### PUT /owner/services/{id}
Update service information.

### DELETE /owner/services/{id}
Delete a service.

## Booking Endpoints

### GET /bookings
Get all bookings for the current user.

**Headers:** Authorization required

### POST /bookings
Create a new booking.

**Request Body:**
```json
{
  "shopId": "shop-id",
  "staffId": "staff-id",
  "serviceId": "service-id",
  "appointmentDateTime": "2024-01-15T10:00:00Z",
  "notes": "Additional notes"
}
```

### GET /bookings/{id}
Get booking by ID.

### PUT /bookings/{id}/cancel
Cancel a booking.

**Request Body:**
```json
{
  "reason": "Cancellation reason"
}
```

### PUT /bookings/{id}/status
Update booking status.

**Request Body:**
```json
{
  "status": "CONFIRMED"
}
```

### GET /shops/{shopId}/bookings
Get bookings for a specific shop.

**Query Parameters:**
- `startDate` (optional): Start date filter
- `endDate` (optional): End date filter

### GET /staff/{staffId}/bookings
Get bookings for a specific staff member.

### GET /shops/{shopId}/available-slots
Get available time slots for booking.

**Query Parameters:**
- `staffId`: Staff member ID
- `serviceId`: Service ID
- `date`: Date in YYYY-MM-DD format

## Payment Endpoints

### POST /payments/create-order
Create Razorpay order for booking.

**Request Body:**
```json
{
  "bookingId": "booking-id",
  "amount": 100.0
}
```

### POST /payments/verify
Verify payment after completion.

**Request Body:**
```json
{
  "orderId": "razorpay-order-id",
  "paymentId": "razorpay-payment-id",
  "signature": "razorpay-signature"
}
```

## Notification Endpoints

### GET /notifications
Get notifications for the current user.

### POST /notifications/send
Send notification to user.

**Request Body:**
```json
{
  "userId": "user-id",
  "message": "Notification message",
  "type": "BOOKING_CONFIRMED",
  "channel": "EMAIL"
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

## Rate Limiting

API requests are rate limited to prevent abuse:
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

## Webhook Endpoints

### POST /webhooks/razorpay
Razorpay payment webhook endpoint.

### POST /webhooks/twilio
Twilio SMS/WhatsApp webhook endpoint.

## SDKs and Libraries

### JavaScript/TypeScript
```javascript
import { BarberEaseAPI } from './api'

const api = new BarberEaseAPI('http://localhost:8080/api')
await api.auth.login({ email: 'user@example.com', password: 'password' })
```

### Python
```python
import requests

response = requests.post('http://localhost:8080/api/auth/login', json={
    'email': 'user@example.com',
    'password': 'password'
})
```

## Testing

Use the provided Postman collection or Swagger UI for testing:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- API Docs: `http://localhost:8080/api-docs`

