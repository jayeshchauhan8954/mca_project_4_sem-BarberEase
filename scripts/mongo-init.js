// MongoDB Initialization Script for BarberEase

// Switch to barber_ease database
db = db.getSiblingDB('barber_ease');

// Create collections
db.createCollection('users');
db.createCollection('shops');
db.createCollection('staff');
db.createCollection('services');
db.createCollection('bookings');
db.createCollection('payments');
db.createCollection('notifications');

// Create indexes for performance

// Users indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.users.createIndex({ active: 1 });
db.users.createIndex({ shopId: 1 });

// Shops indexes
db.shops.createIndex({ ownerId: 1 });
db.shops.createIndex({ active: 1 });
db.shops.createIndex({ name: 1 });
db.shops.createIndex({ ownerId: 1, active: 1 });

// Staff indexes
db.staff.createIndex({ shopId: 1 });
db.staff.createIndex({ userId: 1 }, { unique: true, sparse: true });
db.staff.createIndex({ active: 1 });
db.staff.createIndex({ shopId: 1, active: 1 });

// Services indexes
db.services.createIndex({ shopId: 1 });
db.services.createIndex({ active: 1 });
db.services.createIndex({ shopId: 1, active: 1 });
db.services.createIndex({ category: 1, active: 1 });

// Bookings indexes (most important for performance)
db.bookings.createIndex({ userId: 1 });
db.bookings.createIndex({ shopId: 1 });
db.bookings.createIndex({ staffId: 1 });
db.bookings.createIndex({ appointmentDateTime: 1 });
db.bookings.createIndex({ status: 1 });
db.bookings.createIndex({ paymentStatus: 1 });

// Compound indexes for common queries
db.bookings.createIndex({ shopId: 1, appointmentDateTime: 1 });
db.bookings.createIndex({ staffId: 1, appointmentDateTime: 1 });
db.bookings.createIndex({ userId: 1, status: 1 });
db.bookings.createIndex({ shopId: 1, status: 1, appointmentDateTime: 1 });

// Payments indexes
db.payments.createIndex({ bookingId: 1 });
db.payments.createIndex({ userId: 1 });
db.payments.createIndex({ status: 1 });
db.payments.createIndex({ razorpayOrderId: 1 }, { unique: true, sparse: true });
db.payments.createIndex({ razorpayPaymentId: 1 }, { unique: true, sparse: true });
db.payments.createIndex({ createdAt: -1 });

// Notifications indexes
db.notifications.createIndex({ userId: 1 });
db.notifications.createIndex({ bookingId: 1 });
db.notifications.createIndex({ status: 1 });
db.notifications.createIndex({ type: 1 });
db.notifications.createIndex({ createdAt: -1 });

print('BarberEase database initialized successfully!');
print('Indexes created for optimal performance.');

// Create sample admin user (password: admin123)
// Password is BCrypt hash of "admin123"
db.users.insertOne({
  name: "System Administrator",
  email: "admin@barberease.com",
  password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  phone: "1234567890",
  role: "ADMIN",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

print('Sample admin user created:');
print('Email: admin@barberease.com');
print('Password: admin123');
print('⚠️  Please change this password after first login!');

// Create sample shop owner
db.users.insertOne({
  name: "Demo Shop Owner",
  email: "owner@barberease.com",
  password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  phone: "9876543210",
  role: "SHOP_OWNER",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Create sample customer
db.users.insertOne({
  name: "Demo Customer",
  email: "customer@barberease.com",
  password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  phone: "8765432109",
  role: "CUSTOMER",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

print('Sample users created for testing.');
print('');
print('Setup complete! You can now start using BarberEase.');

