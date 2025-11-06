# MCA-IV CAPSTONE PROJECT SYNOPSIS

**Project Title:** BarberEase - Professional Barber Shop Management System

**Student Name:** [Your Name]  
**Enrollment No:** [Your Enrollment Number]  
**Program:** Master of Computer Applications (MCA)  
**Semester:** IV  
**Academic Session:** 2024-2025  
**Institution:** Uttaranchal University

---

## Table of Contents

| S.no | Topic | Page No. |
|------|-------|----------|
| 1. | Title of the Project | 3 |
| 2. | Introduction and Objectives of the Project | 4 |
| 3. | Tools/Platform, Hardware and Software Requirement Specifications | 6 |
| 4. | Problem Definition, Requirement Specifications (Detailed Functional Requirements and Technical Specifications), Project Planning and Scheduling (Gantt chart and PERT chart) | 7 |
| 5. | Analysis (Data Models like 0, 1 and 2 level DFDs, Complete ER Diagrams with cardinality, Class Diagrams etc. as per the project requirements) | 10 |
| 6. | A complete structure which includes: <br/> a. Number of modules and their description to provide estimation of the project <br/> b. Student's effort on the project along with process logic of each Module <br/> c. Data Structures as per the project requirements for all the modules <br/> d. Process Logic of each module <br/> e. List of reports that are likely to be generated | 13 |
| 7. | Proposed security mechanisms at various levels | 17 |
| 8. | Future scope and further enhancement of the project | 19 |
| 9. | Bibliography | 20 |

---

<div style="page-break-after: always;"></div>

## 1. Title of the Project

### BarberEase - Professional Barber Shop Management System

**Subtitle:** A Comprehensive Cloud-Based Solution for Barber Shop Operations, Appointment Management, and Customer Engagement

**Domain:** Enterprise Resource Planning (ERP) / Service Industry Management

**Category:** Web-based Application with RESTful API Architecture

---

<div style="page-break-after: always;"></div>

## 2. Introduction and Objectives of the Project

### 2.1 Introduction

BarberEase is a modern, full-stack web application designed to revolutionize how barber shops manage their daily operations. In an era where digital transformation is crucial for business success, traditional barber shops face challenges in managing appointments, staff scheduling, customer engagement, and payment processing efficiently.

This project addresses these challenges by providing a comprehensive digital platform that enables barber shop owners to streamline their operations, customers to book appointments seamlessly, and staff members to manage their schedules effectively. The system implements advanced features like real-time slot availability, conflict detection, advance payment integration, and multi-channel notifications.

### 2.2 Problem Statement

Traditional barber shops face several operational challenges:
- **Manual Booking Management:** Time-consuming and error-prone
- **Double Bookings:** Lack of real-time conflict detection
- **Payment Tracking:** Difficulty in managing advance payments and refunds
- **Customer Communication:** Limited notification mechanisms
- **Staff Scheduling:** Inefficient availability management
- **Business Analytics:** No centralized data for decision making

### 2.3 Project Objectives

#### Primary Objectives:
1. **Streamline Appointment Management:** Develop an intelligent booking system with automatic conflict detection and real-time slot availability
2. **Enable Digital Payments:** Integrate secure payment gateway (Razorpay) for advance payment collection (10-25% of service fee)
3. **Automate Notifications:** Implement multi-channel notification system (Email/WhatsApp) for booking confirmations, reminders, and updates
4. **Centralize Operations:** Create a unified platform for managing shops, staff, services, and customers

#### Secondary Objectives:
1. **Role-Based Access Control:** Implement secure authentication with four user roles (Admin, Shop Owner, Staff, Customer)
2. **Multi-Shop Support:** Enable shop owners to manage multiple locations from a single account
3. **Staff Management:** Provide tools for scheduling, availability management, and performance tracking
4. **Analytics & Reporting:** Generate insights on bookings, revenue, and business performance
5. **Scalable Architecture:** Build a production-ready system capable of handling thousands of concurrent users

### 2.4 Scope of the Project

#### In Scope:
- User authentication and authorization
- Shop management (CRUD operations)
- Staff management with availability scheduling
- Service catalog management
- Advanced booking system with conflict prevention
- Payment integration with Razorpay
- Email and WhatsApp notifications
- Dashboard with analytics
- Responsive web interface

#### Out of Scope (Future Enhancements):
- Mobile applications (iOS/Android)
- Reviews and rating system
- Loyalty programs
- Inventory management
- Multi-language support

### 2.5 Expected Outcomes

1. **Operational Efficiency:** 70% reduction in booking-related errors
2. **Customer Satisfaction:** Improved user experience with instant confirmations
3. **Revenue Growth:** Better payment tracking and reduced no-shows
4. **Time Savings:** 5+ hours per week saved in manual scheduling
5. **Scalability:** Support for 1000+ concurrent users

---

<div style="page-break-after: always;"></div>

## 3. Tools/Platform, Hardware and Software Requirement Specifications

### 3.1 Software Requirements

#### Backend Technologies
| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Programming Language | Java | 17 LTS | Backend development |
| Framework | Spring Boot | 3.2.0 | Application framework |
| Database | MongoDB | 7.0+ | NoSQL document database |
| Security | Spring Security | 3.2.0 | Authentication & Authorization |
| API Documentation | SpringDoc OpenAPI | 2.2.0 | Swagger/API docs |
| Build Tool | Maven | 3.8+ | Dependency management |
| Payment Gateway | Razorpay SDK | 1.4.6 | Payment processing |
| Messaging | Twilio SDK | 9.14.1 | WhatsApp integration |

#### Frontend Technologies
| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Framework | React | 18.2.0 | UI framework |
| Language | TypeScript | 5.2.2 | Type-safe development |
| Build Tool | Vite | 5.0.8 | Fast build tool |
| State Management | Redux Toolkit | 2.0.1 | Global state management |
| Routing | React Router | 6.20.1 | Client-side routing |
| HTTP Client | Axios | 1.6.2 | API communication |
| Styling | Tailwind CSS | 3.3.6 | Utility-first CSS |
| Forms | React Hook Form | 7.48.2 | Form validation |

#### DevOps & Infrastructure
| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Containerization | Docker | 24.0+ | Application containerization |
| Orchestration | Docker Compose | 2.20+ | Multi-container management |
| Web Server | Nginx | Alpine | Reverse proxy & static files |
| CI/CD | GitHub Actions | Latest | Automated deployment |
| Monitoring | Prometheus | Latest | Metrics collection |
| Visualization | Grafana | Latest | Dashboard & alerts |

#### Development Tools
- **IDE:** IntelliJ IDEA / VS Code
- **API Testing:** Postman / Swagger UI
- **Version Control:** Git & GitHub
- **Database Client:** MongoDB Compass
- **Code Quality:** ESLint, Prettier
- **Testing:** JUnit 5, React Testing Library

### 3.2 Hardware Requirements

#### Development Environment
- **Processor:** Intel Core i5 or equivalent (minimum)
- **RAM:** 8 GB (16 GB recommended)
- **Storage:** 50 GB free space (SSD recommended)
- **Network:** Broadband internet connection

#### Production Environment
- **Server:** 4 vCPU, 8 GB RAM (minimum)
- **Storage:** 100 GB SSD
- **Database Server:** 2 vCPU, 4 GB RAM
- **Network:** High-speed internet with static IP
- **Bandwidth:** 100 Mbps (minimum)

### 3.3 Platform Specifications

#### Operating Systems Supported
- **Development:** Windows 10/11, macOS 12+, Ubuntu 20.04+
- **Production:** Ubuntu Server 22.04 LTS, CentOS 8+, Docker Container

#### Browser Compatibility
- Chrome 90+ (Recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

#### Deployment Platforms
- **Cloud:** AWS, Azure, Google Cloud Platform
- **On-Premise:** Docker Swarm, Kubernetes
- **Containerization:** Docker, Docker Compose

---

<div style="page-break-after: always;"></div>

## 4. Problem Definition, Requirement Specifications, Project Planning and Scheduling

### 4.1 Problem Definition

The barber shop industry faces significant operational challenges in the digital age. Traditional appointment management relies on phone calls, manual ledgers, and memory-based scheduling, leading to:

1. **Booking Conflicts:** Double bookings occur frequently (30-40% of shops)
2. **Revenue Loss:** No-shows result in 15-20% revenue loss
3. **Customer Dissatisfaction:** Long wait times and poor communication
4. **Operational Inefficiency:** Manual processes consume 10+ hours weekly
5. **Limited Growth:** Inability to scale operations across multiple locations

### 4.2 Detailed Functional Requirements

#### FR1: User Authentication & Authorization
- **FR1.1:** Users shall register with name, email, phone, password, and role
- **FR1.2:** System shall validate email format and check uniqueness
- **FR1.3:** Passwords shall be encrypted using BCrypt algorithm
- **FR1.4:** JWT tokens shall be generated for authenticated sessions
- **FR1.5:** Four user roles supported: Admin, Shop Owner, Staff, Customer
- **FR1.6:** Role-based access control for all features

#### FR2: Shop Management
- **FR2.1:** Shop owners shall create multiple shop profiles
- **FR2.2:** Shop details include name, address, phone, email, description
- **FR2.3:** Business hours configurable for each day of the week
- **FR2.4:** Shop settings include advance payment %, slot duration, buffer time
- **FR2.5:** Shops can be activated/deactivated (soft delete)
- **FR2.6:** Public shop listing available for customers

#### FR3: Staff Management
- **FR3.1:** Shop owners shall add staff members to their shops
- **FR3.2:** Staff profiles include name, phone, email, specialization, image
- **FR3.3:** Weekly availability schedule with time slot management
- **FR3.4:** Staff can update their own availability
- **FR3.5:** Service assignment to staff members
- **FR3.6:** Rating and review tracking for each staff

#### FR4: Service Management
- **FR4.1:** Shop owners shall create service catalog
- **FR4.2:** Services include name, description, duration, price, buffer time
- **FR4.3:** Service categorization (Haircut, Beard Trim, Shave, Styling, etc.)
- **FR4.4:** Services can be activated/deactivated
- **FR4.5:** Pricing and duration can be updated

#### FR5: Booking System
- **FR5.1:** Customers shall book appointments by selecting shop, staff, service, and time
- **FR5.2:** System shall display only available time slots in real-time
- **FR5.3:** Automatic conflict detection prevents double bookings
- **FR5.4:** Booking requires advance payment (10-25% configurable)
- **FR5.5:** Booking statuses: Pending, Confirmed, In-Progress, Completed, Cancelled
- **FR5.6:** Customers can cancel bookings with refund eligibility
- **FR5.7:** Staff can update booking status
- **FR5.8:** Booking history maintained for all users

#### FR6: Payment Processing
- **FR6.1:** Integration with Razorpay payment gateway
- **FR6.2:** Support for UPI, Cards, Net Banking, Wallets
- **FR6.3:** Advance payment calculation based on shop settings
- **FR6.4:** Payment verification using signature validation
- **FR6.5:** Refund processing for cancelled bookings
- **FR6.6:** Payment history and transaction tracking
- **FR6.7:** Multiple payment methods: Razorpay, Cash, Card

#### FR7: Notification System
- **FR7.1:** Automated booking confirmation via Email/WhatsApp
- **FR7.2:** Appointment reminders sent 24 hours before
- **FR7.3:** Cancellation notifications to customers and staff
- **FR7.4:** Payment success/failure notifications
- **FR7.5:** Notification delivery status tracking
- **FR7.6:** Configurable notification preferences

#### FR8: Dashboard & Analytics
- **FR8.1:** Role-specific dashboards for all user types
- **FR8.2:** Booking statistics (total, confirmed, pending, completed)
- **FR8.3:** Revenue tracking for shop owners
- **FR8.4:** Staff performance metrics
- **FR8.5:** Customer engagement analytics

### 4.3 Technical Specifications

#### TS1: Architecture
- **Pattern:** Three-tier architecture (Presentation, Business Logic, Data)
- **Design:** RESTful API with JSON data exchange
- **Security:** JWT-based stateless authentication
- **Database:** MongoDB with document-based storage

#### TS2: API Specifications
- **Protocol:** HTTP/HTTPS
- **Format:** JSON
- **Authentication:** Bearer Token (JWT)
- **Base URL:** `/api`
- **Versioning:** URL-based (future: `/api/v1/`)
- **Status Codes:** Standard HTTP status codes

#### TS3: Performance Requirements
- **API Response Time:** < 200ms (95th percentile)
- **Page Load Time:** < 2 seconds
- **Database Query Time:** < 50ms
- **Concurrent Users:** 1000+ supported
- **Availability:** 99.9% uptime (SLA target)

#### TS4: Security Requirements
- **Authentication:** JWT tokens with 24-hour expiration
- **Password:** BCrypt hashing with salt rounds = 10
- **Transport:** HTTPS/TLS 1.3 in production
- **CORS:** Configured for specific origins
- **Input Validation:** Jakarta Validation (JSR-380)
- **Rate Limiting:** 100 requests/minute per user

#### TS5: Database Requirements
- **Type:** NoSQL (MongoDB)
- **Collections:** 7 main collections (users, shops, staff, services, bookings, payments, notifications)
- **Indexing:** 15+ indexes for performance
- **Backup:** Daily automated backups
- **Replication:** 3-node replica set (production)

### 4.4 Project Planning and Scheduling

#### Phase-wise Development Plan

**Phase 1: Planning & Setup (Week 1-2)**
- Requirements gathering and analysis
- System design and architecture
- Development environment setup
- Database schema design
- Technology stack finalization

**Phase 2: Backend Development (Week 3-6)**
- Spring Boot project setup
- MongoDB integration
- User authentication module
- Shop management module
- Staff management module
- Service management module
- Booking system with conflict detection
- Payment integration
- Notification service

**Phase 3: Frontend Development (Week 7-10)**
- React project setup with Vite
- Redux store configuration
- Authentication pages (Login/Register)
- Dashboard components
- Shop management UI
- Staff management UI
- Booking interface with slot selection
- Payment integration UI
- Profile management

**Phase 4: Integration & Testing (Week 11-12)**
- API integration
- End-to-end testing
- Security testing
- Performance optimization
- Bug fixes

**Phase 5: Deployment & Documentation (Week 13-14)**
- Docker containerization
- CI/CD pipeline setup
- Production deployment
- User documentation
- API documentation
- Project report

#### 4.4.1 Gantt Chart

```
Task                    | Week 1-2 | Week 3-4 | Week 5-6 | Week 7-8 | Week 9-10 | Week 11-12 | Week 13-14 |
------------------------|----------|----------|----------|----------|-----------|------------|------------|
Planning & Setup        | ████████ |          |          |          |           |            |            |
Backend - Core          |          | ████████ | ████     |          |           |            |            |
Backend - Features      |          |          | ████████ | ████     |           |            |            |
Frontend - Setup        |          |          |          | ████████ |           |            |            |
Frontend - Pages        |          |          |          |          | ████████  | ████       |            |
Integration & Testing   |          |          |          |          |           | ████████   |            |
Deployment & Docs       |          |          |          |          |           |            | ████████   |
```

#### 4.4.2 PERT Chart Analysis

**Critical Path:** Planning → Backend Core → Backend Features → Frontend Setup → Frontend Pages → Integration → Deployment

**Total Project Duration:** 14 weeks (98 days)

**Critical Activities:**
1. Database schema design (5 days)
2. Authentication module (7 days)
3. Booking system with conflict detection (10 days)
4. Payment integration (7 days)
5. Frontend booking interface (8 days)
6. Integration testing (10 days)

**Estimated Effort:** 560 hours (14 weeks × 40 hours)

---

<div style="page-break-after: always;"></div>

## 5. Analysis

### 5.1 Data Flow Diagrams (DFD)

#### 5.1.1 Level 0 DFD (Context Diagram)

```
                            ┌─────────────────┐
                            │                 │
       Customer ───────────>│                 │<────────── Shop Owner
                            │   BarberEase    │
       Staff ──────────────>│     System      │<────────── Admin
                            │                 │
       Payment Gateway ────>│                 │<────────── Email/SMS Service
                            │                 │
                            └─────────────────┘
```

**External Entities:**
- Customer: Books appointments, makes payments
- Shop Owner: Manages shops, staff, services
- Staff: Updates availability, manages assigned bookings
- Admin: System administration
- Payment Gateway: Razorpay for payment processing
- Email/SMS Service: SMTP (Gmail), Twilio (WhatsApp)

#### 5.1.2 Level 1 DFD

```
                    ┌──────────────────────────────────────────────────────┐
                    │                                                      │
                    │              BarberEase System                       │
                    │                                                      │
                    │  ┌──────────────┐    ┌──────────────┐              │
  Customer ────────>│  │ 1.0          │    │ 2.0          │              │
                    │  │ User         │───>│ Shop         │              │
                    │  │ Management   │    │ Management   │              │
                    │  └──────────────┘    └──────┬───────┘              │
                    │                             │                       │
                    │                             ▼                       │
                    │  ┌──────────────┐    ┌──────────────┐              │
  Staff ───────────>│  │ 3.0          │───>│ 4.0          │              │
                    │  │ Staff        │    │ Service      │              │
                    │  │ Management   │    │ Management   │              │
                    │  └──────────────┘    └──────┬───────┘              │
                    │                             │                       │
                    │                             ▼                       │
  Shop Owner ──────>│  ┌──────────────┐    ┌──────────────┐              │
                    │  │ 5.0          │───>│ 6.0          │              │
                    │  │ Booking      │    │ Payment      │              │
                    │  │ Management   │    │ Processing   │              │
                    │  └──────────────┘    └──────┬───────┘              │
                    │         │                   │                       │
                    │         └────────┬──────────┘                       │
                    │                  ▼                                  │
                    │  ┌──────────────────────────────┐                  │
                    │  │ 7.0                          │                  │
                    │  │ Notification Service         │                  │
                    │  └──────────────────────────────┘                  │
                    │                                                      │
                    └──────────────────────────────────────────────────────┘
```

#### 5.1.3 Level 2 DFD - Booking Management Process

```
Customer                    Booking Management System                    Database
   │                              │                                         │
   │  1. Select Shop/Staff       │                                         │
   │─────────────────────────────>│                                         │
   │                              │  2. Fetch Available Slots               │
   │                              │────────────────────────────────────────>│
   │                              │  3. Return Slots                        │
   │                              │<────────────────────────────────────────│
   │  4. Select Slot & Confirm    │                                         │
   │─────────────────────────────>│                                         │
   │                              │  5. Check Conflicts                     │
   │                              │────────────────────────────────────────>│
   │                              │  6. Conflict Result                     │
   │                              │<────────────────────────────────────────│
   │                              │  7. Create Booking (PENDING)            │
   │                              │────────────────────────────────────────>│
   │  8. Payment Request          │                                         │
   │<─────────────────────────────│                                         │
   │  9. Make Payment             │                                         │
   │─────────────────────────────>│                                         │
   │                              │  10. Verify Payment                     │
   │                              │────────────> Payment Gateway            │
   │                              │  11. Verification Result                │
   │                              │<─────────────                           │
   │                              │  12. Update Booking (CONFIRMED)         │
   │                              │────────────────────────────────────────>│
   │                              │  13. Send Notification                  │
   │                              │────────────> Notification Service       │
   │  14. Booking Confirmation    │                                         │
   │<─────────────────────────────│                                         │
```

### 5.2 Entity-Relationship Diagram (ERD)

```
┌─────────────────────────┐
│        USERS            │
│─────────────────────────│
│ PK: _id (ObjectId)      │
│ name (String)           │
│ email (String) UNIQUE   │
│ password (String)       │
│ phone (String)          │
│ role (Enum)             │
│ active (Boolean)        │
│ FK: shopId (Optional)   │
│ FK: staffId (Optional)  │
│ createdAt (DateTime)    │
│ updatedAt (DateTime)    │
└───────┬─────────────────┘
        │
        │ 1:N (owns)
        │
┌───────▼─────────────────┐
│        SHOPS            │
│─────────────────────────│
│ PK: _id (ObjectId)      │
│ name (String)           │
│ address (String)        │
│ phone (String)          │
│ email (String)          │
│ description (String)    │
│ FK: ownerId (Ref: User) │
│ staffIds (Array)        │
│ businessHours (Object)  │
│ settings (Object)       │
│ active (Boolean)        │
│ createdAt (DateTime)    │
│ updatedAt (DateTime)    │
└───────┬─────────────────┘
        │
        │ 1:N (has)
        │
┌───────▼─────────────────┐       ┌─────────────────────────┐
│        STAFF            │       │       SERVICES          │
│─────────────────────────│       │─────────────────────────│
│ PK: _id (ObjectId)      │       │ PK: _id (ObjectId)      │
│ name (String)           │       │ name (String)           │
│ phone (String)          │       │ description (String)    │
│ email (String)          │       │ durationMinutes (Int)   │
│ specialization (String) │       │ price (Double)          │
│ profileImage (String)   │       │ bufferTimeMinutes (Int) │
│ FK: shopId (Ref: Shop)  │       │ FK: shopId (Ref: Shop)  │
│ FK: userId (Ref: User)  │       │ category (Enum)         │
│ availability (Map)      │       │ active (Boolean)        │
│ serviceIds (Array)      │       │ createdAt (DateTime)    │
│ rating (Double)         │       │ updatedAt (DateTime)    │
│ totalReviews (Int)      │       └─────────────────────────┘
│ active (Boolean)        │                    │
│ createdAt (DateTime)    │                    │
│ updatedAt (DateTime)    │                    │
└───────┬─────────────────┘                    │
        │                                      │
        │                                      │
        │       ┌──────────────────────────────┘
        │       │
        │       │
┌───────▼───────▼─────────────────┐
│        BOOKINGS                  │
│──────────────────────────────────│
│ PK: _id (ObjectId)               │
│ FK: shopId (Ref: Shop)           │
│ FK: staffId (Ref: Staff)         │
│ FK: userId (Ref: User)           │
│ FK: serviceId (Ref: Service)     │
│ appointmentDateTime (DateTime)   │
│ status (Enum)                    │
│ notes (String)                   │
│ FK: paymentId (Ref: Payment)     │
│ advanceAmount (Double)           │
│ totalAmount (Double)             │
│ paymentStatus (Enum)             │
│ notificationSent (Boolean)       │
│ notificationSentAt (DateTime)    │
│ cancellationReason (String)      │
│ cancelledAt (DateTime)           │
│ createdAt (DateTime)             │
│ updatedAt (DateTime)             │
└───────┬──────────────────────────┘
        │
        │ 1:1 (has)
        │
┌───────▼──────────────────────────┐
│        PAYMENTS                  │
│──────────────────────────────────│
│ PK: _id (ObjectId)               │
│ FK: bookingId (Ref: Booking)     │
│ FK: userId (Ref: User)           │
│ amount (Double)                  │
│ method (Enum)                    │
│ status (Enum)                    │
│ transactionId (String)           │
│ razorpayOrderId (String)         │
│ razorpayPaymentId (String)       │
│ razorpaySignature (String)       │
│ gatewayResponse (String)         │
│ failureReason (String)           │
│ createdAt (DateTime)             │
│ updatedAt (DateTime)             │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│      NOTIFICATIONS               │
│──────────────────────────────────│
│ PK: _id (ObjectId)               │
│ FK: userId (Ref: User)           │
│ FK: bookingId (Ref: Booking)     │
│ message (String)                 │
│ type (Enum)                      │
│ channel (Enum)                   │
│ status (Enum)                    │
│ recipientEmail (String)          │
│ recipientPhone (String)          │
│ sentAt (DateTime)                │
│ deliveredAt (DateTime)           │
│ failureReason (String)           │
│ createdAt (DateTime)             │
│ updatedAt (DateTime)             │
└──────────────────────────────────┘
```

**Cardinality Relationships:**
- User → Shop: 1:N (One user can own multiple shops)
- Shop → Staff: 1:N (One shop has multiple staff members)
- Shop → Services: 1:N (One shop offers multiple services)
- Staff → User: 1:1 (One staff member linked to one user account)
- Booking → Shop: N:1 (Many bookings for one shop)
- Booking → Staff: N:1 (Many bookings for one staff member)
- Booking → User: N:1 (Many bookings by one user)
- Booking → Service: N:1 (Many bookings for one service)
- Booking → Payment: 1:1 (One booking has one payment)
- User → Notifications: 1:N (One user receives multiple notifications)

### 5.3 Class Diagram

```
┌─────────────────────────┐
│      <<Entity>>         │
│         User            │
├─────────────────────────┤
│ - id: String            │
│ - name: String          │
│ - email: String         │
│ - password: String      │
│ - phone: String         │
│ - role: UserRole        │
│ - active: Boolean       │
│ - shopId: String        │
│ - staffId: String       │
│ - createdAt: DateTime   │
│ - updatedAt: DateTime   │
├─────────────────────────┤
│ + getAuthorities()      │
│ + getUsername()         │
│ + isEnabled()           │
└───────┬─────────────────┘
        │ implements
        │
┌───────▼─────────────────┐
│    <<Interface>>        │
│    UserDetails          │
└─────────────────────────┘

┌─────────────────────────┐
│   <<Controller>>        │
│   AuthController        │
├─────────────────────────┤
│ - authService           │
├─────────────────────────┤
│ + login()               │
│ + register()            │
│ + getCurrentUser()      │
└───────┬─────────────────┘
        │ uses
        │
┌───────▼─────────────────┐
│    <<Service>>          │
│    AuthService          │
├─────────────────────────┤
│ - userRepository        │
│ - passwordEncoder       │
│ - jwtTokenProvider      │
├─────────────────────────┤
│ + login()               │
│ + register()            │
│ + getCurrentUser()      │
│ + validateCredentials() │
└───────┬─────────────────┘
        │ uses
        │
┌───────▼─────────────────┐
│   <<Repository>>        │
│   UserRepository        │
├─────────────────────────┤
│ + findByEmail()         │
│ + existsByEmail()       │
│ + findByRole()          │
│ + save()                │
└─────────────────────────┘

┌─────────────────────────┐         ┌─────────────────────────┐
│   <<Service>>           │         │   <<Service>>           │
│   BookingService        │────────>│   NotificationService   │
├─────────────────────────┤  uses   ├─────────────────────────┤
│ - bookingRepository     │         │ - notificationRepo      │
│ - serviceRepository     │         │ - mailSender            │
│ - notificationService   │         │ - twilioClient          │
├─────────────────────────┤         ├─────────────────────────┤
│ + createBooking()       │         │ + sendConfirmation()    │
│ + getAvailableSlots()   │         │ + sendReminder()        │
│ + cancelBooking()       │         │ + sendCancellation()    │
│ + updateStatus()        │         └─────────────────────────┘
└───────┬─────────────────┘
        │ uses
        │
┌───────▼─────────────────┐
│   <<Service>>           │
│   PaymentService        │
├─────────────────────────┤
│ - paymentRepository     │
│ - razorpayClient        │
├─────────────────────────┤
│ + createOrder()         │
│ + verifyPayment()       │
│ + processRefund()       │
└─────────────────────────┘
```

### 5.4 Use Case Diagram

```
                            ┌─────────────────────────────────┐
                            │     BarberEase System           │
                            │                                 │
  ┌──────────┐              │  ┌─────────────────────────┐   │
  │ Customer │──────────────┼─>│ Register/Login          │   │
  └──────────┘              │  └─────────────────────────┘   │
       │                    │                                 │
       │                    │  ┌─────────────────────────┐   │
       └────────────────────┼─>│ Browse Shops            │   │
                            │  └─────────────────────────┘   │
                            │                                 │
                            │  ┌─────────────────────────┐   │
                            │  │ Create Booking          │   │
                            │  │  - Select Shop          │   │
                            │  │  - Select Staff         │   │
                            │  │  - Select Service       │   │
                            │  │  - Choose Time Slot     │   │
  ┌──────────┐              │  │  - Make Payment         │   │
  │   Staff  │──────────────┼─>└─────────────────────────┘   │
  └──────────┘              │                                 │
       │                    │  ┌─────────────────────────┐   │
       │                    │  │ Manage Availability     │   │
       └────────────────────┼─>└─────────────────────────┘   │
                            │                                 │
                            │  ┌─────────────────────────┐   │
  ┌──────────┐              │  │ View Assigned Bookings  │   │
  │   Shop   │──────────────┼─>└─────────────────────────┘   │
  │  Owner   │              │                                 │
  └──────────┘              │  ┌─────────────────────────┐   │
       │                    │  │ Manage Shops            │   │
       │                    │  │  - Create Shop          │   │
       └────────────────────┼─>│  - Update Shop          │   │
                            │  │  - Delete Shop          │   │
                            │  └─────────────────────────┘   │
                            │                                 │
                            │  ┌─────────────────────────┐   │
                            │  │ Manage Staff            │   │
                            │  │  - Add Staff            │   │
  ┌──────────┐              │  │  - Update Staff         │   │
  │  Admin   │──────────────┼─>│  - Remove Staff         │   │
  └──────────┘              │  └─────────────────────────┘   │
       │                    │                                 │
       │                    │  ┌─────────────────────────┐   │
       │                    │  │ Manage Services         │   │
       └────────────────────┼─>└─────────────────────────┘   │
                            │                                 │
                            │  ┌─────────────────────────┐   │
                            │  │ View Analytics          │   │
                            │  └─────────────────────────┘   │
                            │                                 │
                            │  ┌─────────────────────────┐   │
                            │  │ System Administration   │   │
                            │  └─────────────────────────┘   │
                            │                                 │
                            └─────────────────────────────────┘
```

### 5.5 Sequence Diagram - Booking Creation

```
Customer    Frontend    Backend     Database    Payment     Notification
   │           │           │            │         Gateway        Service
   │           │           │            │            │             │
   │  Login    │           │            │            │             │
   │──────────>│           │            │            │             │
   │           │  POST     │            │            │             │
   │           │  /auth    │            │            │             │
   │           │──────────>│            │            │             │
   │           │           │   Query    │            │             │
   │           │           │──────────> │            │             │
   │           │           │  User Data │            │             │
   │           │           │<────────── │            │             │
   │           │  JWT      │            │            │             │
   │           │<──────────│            │            │             │
   │  Token    │           │            │            │             │
   │<──────────│           │            │            │             │
   │           │           │            │            │             │
   │  Select   │           │            │            │             │
   │  Shop     │           │            │            │             │
   │──────────>│           │            │            │             │
   │           │  GET      │            │            │             │
   │           │  /slots   │            │            │             │
   │           │──────────>│            │            │             │
   │           │           │  Get       │            │             │
   │           │           │  Bookings  │            │             │
   │           │           │──────────> │            │             │
   │           │           │  Data      │            │             │
   │           │           │<────────── │            │             │
   │           │  Available│            │            │             │
   │           │  Slots    │            │            │             │
   │           │<──────────│            │            │             │
   │  Display  │           │            │            │             │
   │  Slots    │           │            │            │             │
   │<──────────│           │            │            │             │
   │           │           │            │            │             │
   │  Create   │           │            │            │             │
   │  Booking  │           │            │            │             │
   │──────────>│           │            │            │             │
   │           │  POST     │            │            │             │
   │           │  /bookings│            │            │             │
   │           │──────────>│            │            │             │
   │           │           │  Check     │            │             │
   │           │           │  Conflicts │            │             │
   │           │           │──────────> │            │             │
   │           │           │  No        │            │             │
   │           │           │  Conflict  │            │             │
   │           │           │<────────── │            │             │
   │           │           │  Create    │            │             │
   │           │           │  Booking   │            │             │
   │           │           │──────────> │            │             │
   │           │           │  Booking   │            │             │
   │           │           │  Created   │            │             │
   │           │           │<────────── │            │             │
   │           │           │  Create    │            │             │
   │           │           │  Order     │            │             │
   │           │           │───────────────────────> │             │
   │           │           │  Order ID  │            │             │
   │           │           │<─────────────────────── │             │
   │           │  Order    │            │            │             │
   │           │  Details  │            │            │             │
   │           │<──────────│            │            │             │
   │  Payment  │           │            │            │             │
   │  Page     │           │            │            │             │
   │<──────────│           │            │            │             │
   │           │           │            │            │             │
   │  Make     │           │            │            │             │
   │  Payment  │           │            │            │             │
   │───────────────────────────────────────────────> │             │
   │           │           │            │  Payment   │             │
   │  Success  │           │            │  Success   │             │
   │<───────────────────────────────────────────────│             │
   │           │           │            │            │             │
   │  Verify   │           │            │            │             │
   │  Payment  │           │            │            │             │
   │──────────>│           │            │            │             │
   │           │  POST     │            │            │             │
   │           │  /verify  │            │            │             │
   │           │──────────>│            │            │             │
   │           │           │  Verify    │            │             │
   │           │           │  Signature │            │             │
   │           │           │───────────────────────> │             │
   │           │           │  Valid     │            │             │
   │           │           │<─────────────────────── │             │
   │           │           │  Update    │            │             │
   │           │           │  Status    │            │             │
   │           │           │──────────> │            │             │
   │           │           │  Send      │            │             │
   │           │           │  Notification          │             │
   │           │           │────────────────────────────────────> │
   │           │           │            │            │  Email/     │
   │           │           │            │            │  WhatsApp   │
   │           │           │            │            │  Sent       │
   │           │           │<────────────────────────────────────│
   │           │  Success  │            │            │             │
   │           │<──────────│            │            │             │
   │  Confirm  │           │            │            │             │
   │<──────────│           │            │            │             │
```

---

<div style="page-break-after: always;"></div>

## 6. Complete Structure

### 6.1 Number of Modules and Description

The BarberEase system comprises **8 major modules** with **45+ sub-modules**:

#### Module 1: User Authentication & Authorization Module
**Effort Estimation:** 40 hours

**Sub-modules:**
- User Registration Service
- Login/Logout Service
- JWT Token Generation & Validation
- Password Encryption Service
- Role-Based Access Control
- Session Management

**Description:** Handles all user authentication operations including registration, login, JWT token generation, and role-based access control. Implements Spring Security with custom UserDetailsService.

#### Module 2: Shop Management Module
**Effort Estimation:** 50 hours

**Sub-modules:**
- Shop CRUD Operations
- Business Hours Configuration
- Shop Settings Management
- Multi-Shop Support
- Shop Activation/Deactivation
- Public Shop Listing

**Description:** Enables shop owners to create and manage multiple shop profiles with customizable settings including business hours, payment configurations, and booking parameters.

#### Module 3: Staff Management Module
**Effort Estimation:** 45 hours

**Sub-modules:**
- Staff CRUD Operations
- Availability Scheduling
- Service Assignment
- Staff Profile Management
- Rating & Review Tracking
- Performance Analytics

**Description:** Manages staff members including their profiles, weekly availability schedules, service assignments, and performance metrics.

#### Module 4: Service Management Module
**Effort Estimation:** 35 hours

**Sub-modules:**
- Service CRUD Operations
- Service Categorization
- Pricing Management
- Duration Configuration
- Buffer Time Settings
- Service Activation

**Description:** Maintains the service catalog for each shop with details like pricing, duration, categories, and availability status.

#### Module 5: Booking Management Module
**Effort Estimation:** 80 hours

**Sub-modules:**
- Booking Creation Service
- Slot Availability Calculator
- Conflict Detection Algorithm
- Booking Status Management
- Cancellation Service
- Rescheduling Service
- Booking History
- Booking Validation

**Description:** Core module handling all booking operations with real-time slot availability, automatic conflict detection, and comprehensive booking lifecycle management.

#### Module 6: Payment Processing Module
**Effort Estimation:** 60 hours

**Sub-modules:**
- Razorpay Integration
- Order Creation Service
- Payment Verification Service
- Refund Processing
- Payment History
- Transaction Tracking
- Webhook Handler

**Description:** Integrates with Razorpay payment gateway for secure payment processing, including advance payment collection, verification, and refund management.

#### Module 7: Notification Module
**Effort Estimation:** 50 hours

**Sub-modules:**
- Email Notification Service (SMTP)
- WhatsApp Notification Service (Twilio)
- Booking Confirmation Notifications
- Reminder Notifications
- Cancellation Notifications
- Payment Notifications
- Notification Queue Management
- Delivery Status Tracking

**Description:** Automated multi-channel notification system for keeping customers and staff informed about bookings, payments, and updates.

#### Module 8: Dashboard & Analytics Module
**Effort Estimation:** 40 hours

**Sub-modules:**
- Role-Specific Dashboards
- Booking Statistics
- Revenue Analytics
- Staff Performance Metrics
- Customer Insights
- Report Generation

**Description:** Provides comprehensive analytics and reporting capabilities with role-specific dashboards for admins, shop owners, staff, and customers.

**Total Estimated Effort:** 400 hours (10 weeks of full-time development)

### 6.2 Data Structures

#### 6.2.1 User Data Structure
```java
class User {
    String id;                    // MongoDB ObjectId
    String name;                  // 2-50 characters
    String email;                 // Unique, indexed
    String password;              // BCrypt hashed
    String phone;                 // 10 digits
    UserRole role;                // ADMIN, SHOP_OWNER, STAFF, CUSTOMER
    Boolean active;               // Default: true
    String shopId;                // Optional reference
    String staffId;               // Optional reference
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}

enum UserRole {
    ADMIN, SHOP_OWNER, STAFF, CUSTOMER
}
```

#### 6.2.2 Shop Data Structure
```java
class Shop {
    String id;
    String name;
    String address;
    String phone;
    String email;
    String description;
    String ownerId;               // Reference to User
    List<String> staffIds;        // Array of Staff IDs
    BusinessHours businessHours;  // Nested object
    ShopSettings settings;        // Nested object
    Boolean active;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}

class BusinessHours {
    String monday;                // Format: "09:00-18:00"
    String tuesday;
    // ... other days
}

class ShopSettings {
    Integer advancePaymentPercentage;  // 10-25
    Integer slotDurationMinutes;       // 15, 30, 60
    Integer bufferTimeMinutes;         // 0-30
    Boolean allowOnlineBooking;
    Integer maxAdvanceBookingDays;     // 1-90
}
```

#### 6.2.3 Booking Data Structure
```java
class Booking {
    String id;
    String shopId;
    String staffId;
    String userId;
    String serviceId;
    LocalDateTime appointmentDateTime;
    BookingStatus status;
    String notes;
    String paymentId;
    Double advanceAmount;
    Double totalAmount;
    PaymentStatus paymentStatus;
    Boolean notificationSent;
    LocalDateTime notificationSentAt;
    String cancellationReason;
    LocalDateTime cancelledAt;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}

enum BookingStatus {
    PENDING, CONFIRMED, IN_PROGRESS, 
    COMPLETED, CANCELLED, NO_SHOW
}

enum PaymentStatus {
    PENDING, COMPLETED, FAILED, REFUNDED
}
```

#### 6.2.4 Payment Data Structure
```java
class Payment {
    String id;
    String bookingId;
    String userId;
    Double amount;
    PaymentMethod method;
    PaymentStatus status;
    String transactionId;
    String razorpayOrderId;
    String razorpayPaymentId;
    String razorpaySignature;
    String gatewayResponse;
    String failureReason;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}

enum PaymentMethod {
    RAZORPAY, PAYTM, CASH, CARD
}
```

#### 6.2.5 Slot Availability Algorithm Data Structure
```java
class AvailableSlotCalculator {
    List<LocalDateTime> existingBookings;
    Integer serviceDuration;
    Integer bufferTime;
    Map<String, List<TimeSlot>> staffAvailability;
    LocalDateTime requestedDate;
}

class TimeSlot {
    LocalDateTime startTime;
    LocalDateTime endTime;
    Boolean isAvailable;
}
```

### 6.3 Process Logic of Each Module

#### 6.3.1 Authentication Module Process Logic

**Registration Process:**
```
1. Receive user registration request
2. Validate input data (name, email, phone, password)
3. Check if email already exists in database
4. If exists, return error "Email already registered"
5. Hash password using BCrypt with salt rounds = 10
6. Create new User document
7. Set default role (CUSTOMER if not specified)
8. Set active = true, createdAt = now()
9. Save user to database
10. Generate JWT token with userId as subject
11. Set token expiration = 24 hours
12. Return AuthResponse with token and user details
```

**Login Process:**
```
1. Receive login request (email, password)
2. Query database for user by email
3. If user not found, return "Invalid credentials"
4. Compare submitted password with hashed password
5. If password doesn't match, return "Invalid credentials"
6. Check if user is active
7. If not active, return "Account is deactivated"
8. Create Authentication object with user authorities
9. Generate JWT token
10. Return AuthResponse with token and user details
```

#### 6.3.2 Booking Module Process Logic

**Booking Creation Process:**
```
1. Receive booking request (shopId, staffId, serviceId, dateTime)
2. Validate authentication token
3. Extract userId from token
4. Validate input parameters:
   - Shop exists and is active
   - Staff exists and belongs to shop
   - Service exists and belongs to shop
   - DateTime is in future
   - DateTime is within shop's advance booking limit
5. Fetch service details to get duration
6. Calculate total slot duration = service.duration + service.bufferTime
7. Calculate slot end time = appointmentDateTime + totalDuration
8. Query existing bookings for the staff on same date
9. For each existing booking:
   - Calculate existing slot end time
   - Check for time overlap:
     IF (newSlotStart < existingSlotEnd AND newSlotEnd > existingSlotStart)
       THEN conflict exists
10. If conflict found, return error "Slot not available"
11. Calculate advance payment amount:
    advanceAmount = service.price × (shop.advancePaymentPercentage / 100)
12. Create booking document:
    - Set status = PENDING
    - Set paymentStatus = PENDING
    - Set totalAmount = service.price
    - Set advanceAmount = calculated amount
13. Save booking to database
14. Create Razorpay payment order
15. Return booking details with payment order ID
16. Trigger notification service (asynchronous)
```

**Available Slots Calculation Algorithm:**
```
FUNCTION getAvailableSlots(shopId, staffId, serviceId, date)
  // Input validation
  service = fetchService(serviceId)
  slotDuration = service.durationMinutes + service.bufferTimeMinutes
  
  // Get shop business hours for requested day
  dayOfWeek = date.getDayOfWeek()
  businessHours = fetchShopBusinessHours(shopId, dayOfWeek)
  
  // Parse business hours
  shopOpenTime = parseTime(businessHours.start)  // e.g., "09:00"
  shopCloseTime = parseTime(businessHours.end)   // e.g., "18:00"
  
  // Get existing bookings for the day
  startOfDay = date.atTime(00:00:00)
  endOfDay = date.atTime(23:59:59)
  existingBookings = fetchActiveBookings(staffId, startOfDay, endOfDay)
  
  // Generate time slots
  availableSlots = []
  currentSlot = date.atTime(shopOpenTime)
  
  WHILE currentSlot < date.atTime(shopCloseTime)
    slotEndTime = currentSlot + slotDuration
    
    // Check if slot is in business hours
    IF slotEndTime <= date.atTime(shopCloseTime)
      // Check for conflicts with existing bookings
      hasConflict = false
      
      FOR EACH booking IN existingBookings
        bookingEndTime = booking.appointmentDateTime + slotDuration
        
        // Check overlap
        IF (currentSlot < bookingEndTime AND slotEndTime > booking.appointmentDateTime)
          hasConflict = true
          BREAK
        END IF
      END FOR
      
      // Check if slot is in future
      IF NOT hasConflict AND currentSlot > now()
        availableSlots.add(currentSlot)
      END IF
    END IF
    
    // Move to next slot (30-minute intervals)
    currentSlot = currentSlot + 30 minutes
  END WHILE
  
  RETURN availableSlots
END FUNCTION
```

#### 6.3.3 Payment Module Process Logic

**Payment Verification Process:**
```
1. Receive payment verification request:
   - razorpayOrderId
   - razorpayPaymentId
   - razorpaySignature
2. Fetch payment record by orderId from database
3. Create verification payload:
   payload = razorpayOrderId + "|" + razorpayPaymentId
4. Generate expected signature:
   expectedSignature = HMAC_SHA256(payload, razorpayKeySecret)
5. Compare signatures:
   IF expectedSignature == receivedSignature
     THEN payment is valid
   ELSE
     THEN payment is invalid
6. If valid:
   - Update payment status = COMPLETED
   - Update payment.razorpayPaymentId
   - Update payment.razorpaySignature
   - Fetch associated booking
   - Update booking.status = CONFIRMED
   - Update booking.paymentStatus = COMPLETED
   - Update booking.paymentId
   - Save changes to database
   - Trigger confirmation notification
7. If invalid:
   - Update payment status = FAILED
   - Update payment.failureReason
   - Return error response
8. Return verification result
```

**Refund Process:**
```
1. Receive refund request for paymentId
2. Validate authorization (Admin or Shop Owner)
3. Fetch payment record
4. Validate payment status = COMPLETED
5. Fetch associated booking
6. Create refund request to Razorpay:
   - paymentId
   - amount (full or partial)
7. Submit refund to Razorpay API
8. If successful:
   - Update payment.status = REFUNDED
   - Update booking.paymentStatus = REFUNDED
   - Send refund notification to customer
9. If failed:
   - Log error
   - Return failure response
10. Return refund confirmation
```

#### 6.3.4 Notification Module Process Logic

**Email Notification Process:**
```
1. Receive notification request:
   - userId
   - bookingId
   - type (BOOKING_CONFIRMED, REMINDER, etc.)
   - channel (EMAIL, WHATSAPP)
2. Fetch user details from database
3. Fetch booking details (if bookingId provided)
4. Create notification document:
   - Set status = PENDING
   - Set recipientEmail/Phone based on channel
5. Save notification to database
6. Generate message content based on type:
   - Subject line
   - Email body with booking details
   - Personalization (user name, shop name, etc.)
7. Send via configured channel:
   IF channel = EMAIL:
     - Create SimpleMailMessage
     - Set from, to, subject, text
     - Send using JavaMailSender
   ELSE IF channel = WHATSAPP:
     - Create Twilio message
     - Set to (WhatsApp number), body
     - Send using Twilio client
8. Update notification:
   - Set status = SENT
   - Set sentAt = now()
9. If error occurs:
   - Set status = FAILED
   - Set failureReason = error message
10. Save notification updates
```

### 6.4 Student's Effort on the Project

**Total Project Duration:** 14 weeks  
**Total Estimated Hours:** 560 hours

**Breakdown by Activity:**

| Activity | Hours | Percentage |
|----------|-------|------------|
| Requirements Analysis | 40 | 7% |
| System Design & Architecture | 60 | 11% |
| Backend Development | 180 | 32% |
| Frontend Development | 140 | 25% |
| Integration & Testing | 60 | 11% |
| Documentation | 40 | 7% |
| Deployment & DevOps | 40 | 7% |
| **Total** | **560** | **100%** |

**Breakdown by Module:**

| Module | Development Hours | Testing Hours | Total |
|--------|------------------|---------------|-------|
| Authentication | 32 | 8 | 40 |
| Shop Management | 40 | 10 | 50 |
| Staff Management | 36 | 9 | 45 |
| Service Management | 28 | 7 | 35 |
| Booking System | 64 | 16 | 80 |
| Payment Processing | 48 | 12 | 60 |
| Notification System | 40 | 10 | 50 |
| Dashboard & Analytics | 32 | 8 | 40 |

### 6.5 List of Reports Generated

#### 6.5.1 Admin Reports
1. **System Analytics Report**
   - Total users count (by role)
   - Total shops count (active/inactive)
   - Total bookings (daily/weekly/monthly)
   - System-wide revenue
   - User growth trends

2. **Health Monitoring Report**
   - Database connection status
   - API response times
   - Error rates
   - System uptime

#### 6.5.2 Shop Owner Reports
1. **Booking Summary Report**
   - Total bookings by date range
   - Bookings by status
   - Bookings by staff member
   - Bookings by service type

2. **Revenue Report**
   - Total revenue by period
   - Revenue by service
   - Revenue by staff
   - Payment method breakdown
   - Pending payments

3. **Staff Performance Report**
   - Bookings completed per staff
   - Average rating per staff
   - Revenue generated per staff
   - No-show rate per staff

4. **Customer Analytics Report**
   - Total unique customers
   - Repeat customer rate
   - Customer acquisition trends
   - Popular services
   - Peak booking hours

#### 6.5.3 Staff Reports
1. **Personal Schedule Report**
   - Daily appointment schedule
   - Weekly schedule overview
   - Upcoming bookings

2. **Earnings Report**
   - Total earnings by period
   - Services completed count
   - Average service rating

#### 6.5.4 Customer Reports
1. **Booking History Report**
   - Past bookings with details
   - Total spending
   - Favorite shops/staff

2. **Payment History Report**
   - All payment transactions
   - Refund history
   - Pending payments

---

<div style="page-break-after: always;"></div>

## 7. Proposed Security Mechanisms at Various Levels

### 7.1 Application Layer Security

#### 7.1.1 Authentication Security
- **JWT Implementation:** Stateless token-based authentication
- **Token Expiration:** 24-hour validity period
- **Token Structure:** Header.Payload.Signature with HMAC-SHA256
- **Secret Key:** 256-bit secure key stored in environment variables
- **Token Storage:** Client-side in httpOnly cookies (recommended) or localStorage

#### 7.1.2 Authorization Security
- **Role-Based Access Control (RBAC):** Four distinct roles with specific permissions
- **Method-Level Security:** @PreAuthorize annotations on sensitive endpoints
- **Ownership Verification:** Users can only access their own data
- **Admin Override:** Admin role has system-wide access

#### 7.1.3 Password Security
- **Hashing Algorithm:** BCrypt with cost factor 10
- **Salt:** Automatically generated unique salt per password
- **Minimum Length:** 6 characters (enforced)
- **Strength Validation:** Optional regex for complexity requirements
- **Storage:** Never store plaintext passwords

### 7.2 API Layer Security

#### 7.2.1 Input Validation
- **Jakarta Validation (JSR-380):** Annotations on DTOs
  - @NotBlank, @NotNull for required fields
  - @Email for email validation
  - @Size for length constraints
  - @Positive for numeric values
- **Request Validation:** All request bodies validated before processing
- **SQL Injection Prevention:** MongoDB queries use parameterized approach
- **XSS Prevention:** Input sanitization on text fields

#### 7.2.2 CORS Configuration
```java
allowedOrigins: ["http://localhost:5173", "https://barberease.com"]
allowedMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
allowedHeaders: ["*"]
allowCredentials: true
maxAge: 3600 seconds
```

#### 7.2.3 Rate Limiting
- **Public Endpoints:** 100 requests per minute per IP
- **Authenticated Endpoints:** 1000 requests per hour per user
- **Login Endpoint:** 5 requests per minute (brute force prevention)
- **Implementation:** Configuration ready for Redis + Bucket4j

### 7.3 Transport Layer Security

#### 7.3.1 HTTPS/TLS
- **Production Requirement:** All traffic over HTTPS
- **TLS Version:** 1.3 (minimum 1.2)
- **Certificate:** Let's Encrypt auto-renewal
- **HSTS:** Strict-Transport-Security header enabled

#### 7.3.2 Security Headers
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
```

### 7.4 Database Layer Security

#### 7.4.1 Access Control
- **Database Authentication:** Username/password authentication enabled
- **User Roles:** Separate users for application, admin, backup
- **Least Privilege:** Application user has only read/write access to barber_ease database
- **Network Security:** MongoDB bound to localhost or private network only

#### 7.4.2 Data Protection
- **Password Encryption:** BCrypt hashing before storage
- **Sensitive Data:** No credit card data stored (PCI-DSS compliant)
- **Audit Logging:** Track all data modifications with timestamps
- **Backup Encryption:** Encrypted backups stored securely

### 7.5 Container Security

#### 7.5.1 Docker Security
- **Non-Root User:** Containers run as non-privileged user
- **Image Scanning:** Trivy vulnerability scanner in CI/CD
- **Minimal Base Images:** Alpine Linux for smaller attack surface
- **Resource Limits:** CPU and memory limits defined
- **Read-Only Filesystem:** Where possible

#### 7.5.2 Network Security
- **Private Network:** Services communicate on private Docker network
- **Port Exposure:** Only necessary ports exposed to host
- **Firewall Rules:** Production firewall restricts access

### 7.6 Session Security

- **Session Management:** Stateless (no server-side sessions)
- **Token Refresh:** Automatic refresh mechanism (future enhancement)
- **Logout:** Client-side token deletion
- **Concurrent Sessions:** Multiple devices supported
- **Session Timeout:** 24 hours (token expiration)

### 7.7 Payment Security

- **PCI-DSS Compliance:** No card data stored locally
- **Payment Gateway:** All transactions via certified gateway (Razorpay)
- **Signature Verification:** HMAC-SHA256 signature validation
- **Webhook Security:** Signature verification for webhook requests
- **Transaction Logging:** All payment attempts logged

### 7.8 Monitoring & Incident Response

- **Security Monitoring:** Prometheus metrics for failed auth attempts
- **Alert System:** Automated alerts for suspicious activities
- **Logging:** Comprehensive logging with sensitive data redaction
- **Incident Response:** Documented security incident procedures

---

<div style="page-break-after: always;"></div>

## 8. Future Scope and Further Enhancement of the Project

### 8.1 Short-Term Enhancements (v1.1 - v1.2)

#### 8.1.1 Reviews & Rating System
- Customer reviews for staff and services
- 5-star rating system
- Review moderation for shop owners
- Aggregate rating calculations
- Testimonial display on shop pages

#### 8.1.2 Advanced Analytics
- Interactive charts and graphs using Chart.js
- Revenue forecasting using historical data
- Customer behavior analysis
- Staff productivity metrics
- Service popularity trends
- Peak hours identification

#### 8.1.3 Loyalty Program
- Points earned per booking
- Tiered membership levels (Bronze, Silver, Gold)
- Discount coupons and vouchers
- Referral rewards system
- Birthday special offers

#### 8.1.4 Enhanced Notifications
- Push notifications for web and mobile
- SMS integration via Twilio
- In-app notification center
- Notification preferences customization
- Scheduled reminder campaigns

### 8.2 Medium-Term Enhancements (v2.0 - v2.5)

#### 8.2.1 Mobile Applications
- Native iOS application (Swift/SwiftUI)
- Native Android application (Kotlin/Jetpack Compose)
- React Native cross-platform alternative
- Mobile-specific features (GPS, camera, biometric auth)
- Offline mode with sync

#### 8.2.2 Advanced Booking Features
- Recurring appointments (weekly/monthly)
- Group bookings for events
- Walk-in queue management
- Virtual queue system
- Appointment waitlist

#### 8.2.3 Inventory Management
- Product inventory tracking
- Stock alerts and reordering
- Product sales integration
- Vendor management
- Purchase order generation

#### 8.2.4 Employee Management
- Attendance tracking
- Leave management
- Payroll integration
- Commission calculation
- Performance reviews

### 8.3 Long-Term Enhancements (v3.0+)

#### 8.3.1 AI/ML Integration
- Smart scheduling algorithm
- Demand prediction for optimal staffing
- Customer preference learning
- Personalized service recommendations
- Chatbot for customer support
- Automated pricing optimization

#### 8.3.2 Multi-Language Support
- Internationalization (i18n)
- Support for Hindi, Spanish, French, Arabic
- RTL (Right-to-Left) language support
- Currency localization
- Date/time format localization

#### 8.3.3 Franchise Management
- Multi-location franchise support
- Centralized brand management
- Franchise-specific branding
- Consolidated reporting across franchises
- Territory management

#### 8.3.4 Marketplace Features
- Public marketplace for discovering shops
- Advanced search with filters (location, price, ratings)
- Featured shops and promotions
- Shop comparison tool
- Service package bundles

#### 8.3.5 Integration Ecosystem
- Google Calendar synchronization
- Google Maps integration for directions
- Social media integration (Facebook, Instagram)
- Accounting software integration (QuickBooks, Tally)
- CRM integration (Salesforce)
- Email marketing tools (Mailchimp)
- WhatsApp Business API
- Zapier automation

### 8.4 Scalability Enhancements

#### 8.4.1 Architecture Evolution
- **Microservices Architecture:** Split monolith into services
  - Authentication Service
  - Booking Service
  - Payment Service
  - Notification Service
- **Event-Driven Architecture:** Apache Kafka for event streaming
- **CQRS Pattern:** Separate read/write operations
- **API Gateway:** Kong or AWS API Gateway

#### 8.4.2 Performance Optimization
- **Redis Caching:** Distributed caching layer
- **CDN Integration:** CloudFlare or AWS CloudFront for static assets
- **Database Sharding:** Horizontal partitioning for large datasets
- **Read Replicas:** MongoDB replica set with read preference
- **Load Balancing:** Nginx or AWS ALB for traffic distribution

#### 8.4.3 Advanced DevOps
- **Kubernetes Deployment:** Container orchestration
- **Auto-Scaling:** Horizontal pod autoscaling
- **Blue-Green Deployment:** Zero-downtime deployments
- **Canary Releases:** Gradual feature rollouts
- **Disaster Recovery:** Multi-region deployment

### 8.5 Emerging Technologies

- **Blockchain:** Secure payment records and transaction history
- **IoT Integration:** Smart queue management displays
- **AR/VR:** Virtual hairstyle preview
- **Voice Assistant:** Alexa/Google Assistant integration
- **Progressive Web App (PWA):** Offline-first capabilities

---

<div style="page-break-after: always;"></div>

## 9. Bibliography

### 9.1 Books and Publications

1. **Spring Boot in Action** by Craig Walls  
   Manning Publications, 2nd Edition, 2020  
   ISBN: 978-1617297571

2. **Pro Spring Security: Securing Spring Framework 6 and Boot 3-based Java Applications** by Carlo Scarioni, Massimo Nardone  
   Apress, 2023  
   ISBN: 978-1484282847

3. **React - The Complete Guide** by Maximilian Schwarzmüller  
   Udemy Course, 2024

4. **MongoDB: The Definitive Guide** by Shannon Bradshaw, Kristina Chodorow  
   O'Reilly Media, 3rd Edition, 2019  
   ISBN: 978-1491954461

5. **Clean Architecture: A Craftsman's Guide to Software Structure and Design** by Robert C. Martin  
   Prentice Hall, 2017  
   ISBN: 978-0134494166

### 9.2 Online Documentation

6. **Spring Boot Official Documentation**  
   https://spring.io/projects/spring-boot  
   Accessed: October-November 2024

7. **React Official Documentation**  
   https://react.dev/  
   Accessed: October-November 2024

8. **MongoDB Manual**  
   https://www.mongodb.com/docs/  
   Accessed: October-November 2024

9. **Redux Toolkit Documentation**  
   https://redux-toolkit.js.org/  
   Accessed: October-November 2024

10. **TypeScript Handbook**  
    https://www.typescriptlang.org/docs/  
    Accessed: October-November 2024

### 9.3 API and Integration Documentation

11. **Razorpay Payment Gateway Documentation**  
    https://razorpay.com/docs/  
    Accessed: November 2024

12. **Twilio API Documentation**  
    https://www.twilio.com/docs/  
    Accessed: November 2024

13. **SpringDoc OpenAPI Documentation**  
    https://springdoc.org/  
    Accessed: November 2024

14. **Docker Documentation**  
    https://docs.docker.com/  
    Accessed: October-November 2024

### 9.4 Research Papers and Articles

15. **RESTful Web Services: A Tutorial** by M. Elkstein  
    arXiv:1412.3245, 2014

16. **JWT Handbook** by Sebastián Peyrott  
    Auth0, 2016  
    Available at: https://auth0.com/resources/ebooks/jwt-handbook

17. **Microservices Patterns** by Chris Richardson  
    Manning Publications, 2018  
    ISBN: 978-1617294549

### 9.5 Tools and Frameworks Documentation

18. **Tailwind CSS Documentation**  
    https://tailwindcss.com/docs  
    Accessed: November 2024

19. **Vite Documentation**  
    https://vitejs.dev/  
    Accessed: November 2024

20. **GitHub Actions Documentation**  
    https://docs.github.com/en/actions  
    Accessed: November 2024

21. **Nginx Documentation**  
    https://nginx.org/en/docs/  
    Accessed: November 2024

22. **Prometheus Documentation**  
    https://prometheus.io/docs/  
    Accessed: November 2024

### 9.6 Standards and Best Practices

23. **OWASP Top Ten Web Application Security Risks**  
    https://owasp.org/www-project-top-ten/  
    OWASP Foundation, 2021

24. **Google Java Style Guide**  
    https://google.github.io/styleguide/javaguide.html  
    Accessed: October 2024

25. **Airbnb JavaScript Style Guide**  
    https://github.com/airbnb/javascript  
    Accessed: October 2024

26. **REST API Design Best Practices**  
    https://restfulapi.net/  
    Accessed: November 2024

27. **MongoDB Schema Design Best Practices**  
    https://www.mongodb.com/developer/products/mongodb/schema-design-best-practices/  
    Accessed: October 2024

### 9.7 Video Tutorials and Online Resources

28. **Spring Boot Tutorial for Beginners** by Telusko  
    YouTube, 2024

29. **React Redux Toolkit Tutorial** by Net Ninja  
    YouTube, 2023

30. **MongoDB University Courses**  
    https://learn.mongodb.com/  
    Completed: M001 MongoDB Basics, 2024

---

## Appendices

### Appendix A: Acronyms and Abbreviations

| Acronym | Full Form |
|---------|-----------|
| API | Application Programming Interface |
| CRUD | Create, Read, Update, Delete |
| DFD | Data Flow Diagram |
| ER | Entity-Relationship |
| ERD | Entity-Relationship Diagram |
| JWT | JSON Web Token |
| MCA | Master of Computer Applications |
| NoSQL | Not Only SQL |
| RBAC | Role-Based Access Control |
| REST | Representational State Transfer |
| SDK | Software Development Kit |
| SMTP | Simple Mail Transfer Protocol |
| SQL | Structured Query Language |
| TLS | Transport Layer Security |
| UI | User Interface |
| UX | User Experience |

### Appendix B: Technical Specifications Summary

- **Total Lines of Code:** ~21,000+
- **Backend Code:** ~6,000 lines (Java)
- **Frontend Code:** ~4,500 lines (TypeScript/React)
- **Test Code:** ~1,500 lines
- **Configuration:** ~1,000 lines
- **Documentation:** ~8,000 lines (19 files)

### Appendix C: Project Links

- **GitHub Repository:** [Project URL]
- **API Documentation:** http://localhost:8080/swagger-ui.html
- **Live Demo:** [Demo URL]
- **Documentation Site:** [Docs URL]

---

## Declaration

I hereby declare that the work presented in this synopsis is original and has been carried out by me under the guidance of [Supervisor Name]. This work has not been submitted elsewhere for any degree or diploma.

**Student Name:** ________________________  
**Signature:** ________________________  
**Date:** ________________________

---

## Certificate

This is to certify that the synopsis titled "BarberEase - Professional Barber Shop Management System" submitted by [Student Name], Enrollment No. [Number], is a bonafide work carried out under my supervision and guidance for the partial fulfillment of the requirements for the degree of Master of Computer Applications (MCA) at Uttaranchal University.

**Supervisor Name:** ________________________  
**Designation:** ________________________  
**Signature:** ________________________  
**Date:** ________________________

---

**Document Formatting:**
- **Font:** Times New Roman
- **Font Size:** Text: 12pt, Headings: 14pt, Chapter Titles: 16pt
- **Margins:** Top: 1", Bottom: 1", Left: 1.5", Right: 1"
- **Line Spacing:** 1.5 lines
- **Page Numbers:** Bottom center
- **Paper Size:** A4 (210mm × 297mm)

**Total Pages:** 14  
**Last Updated:** November 5, 2024  
**Version:** 1.0

