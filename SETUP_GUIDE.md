# BarberEase - Complete Setup Guide

This comprehensive guide will walk you through setting up the BarberEase Barber Shop Management System from scratch.

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Development Environment Setup](#development-environment-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Database Setup](#database-setup)
6. [Configuration](#configuration)
7. [Running the Application](#running-the-application)
8. [Docker Setup](#docker-setup)
9. [Troubleshooting](#troubleshooting)

---

## System Requirements

### Minimum Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **RAM**: 8 GB minimum, 16 GB recommended
- **Storage**: 10 GB free space
- **CPU**: Dual-core processor, Quad-core recommended

### Required Software
- **Java**: OpenJDK 17 or Oracle JDK 17+
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **MongoDB**: v6.0 or higher
- **Maven**: v3.8.0 or higher
- **Git**: Latest version
- **Docker** (Optional): Latest version
- **Docker Compose** (Optional): Latest version

---

## Development Environment Setup

### 1. Install Java 17

#### Windows:
```powershell
# Download from https://adoptium.net/temurin/releases/
# Or use Chocolatey
choco install openjdk17
```

#### macOS:
```bash
# Using Homebrew
brew install openjdk@17

# Add to PATH
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

#### Linux:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-17-jdk

# Verify installation
java -version
```

### 2. Install Node.js and npm

#### Windows:
```powershell
# Download from https://nodejs.org/
# Or use Chocolatey
choco install nodejs
```

#### macOS:
```bash
# Using Homebrew
brew install node@18
```

#### Linux:
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 3. Install MongoDB

#### Windows:
```powershell
# Download from https://www.mongodb.com/try/download/community
# Or use Chocolatey
choco install mongodb
```

#### macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community@6.0

# Start MongoDB service
brew services start mongodb-community@6.0
```

#### Linux:
```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Verify MongoDB Installation:
```bash
mongosh --version
```

### 4. Install Maven

#### Windows:
```powershell
# Download from https://maven.apache.org/download.cgi
# Or use Chocolatey
choco install maven
```

#### macOS:
```bash
brew install maven
```

#### Linux:
```bash
sudo apt install maven
```

#### Verify Maven Installation:
```bash
mvn --version
```

---

## Backend Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd barber-ease
```

### 2. Navigate to Backend Directory
```bash
cd backend
```

### 3. Configure Application Properties

Create or update `src/main/resources/application.yml`:

```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  application:
    name: barber-ease-backend
  
  data:
    mongodb:
      uri: mongodb://localhost:27017/barber_ease
      auto-index-creation: true
  
  security:
    jwt:
      secret: YOUR-SECRET-KEY-CHANGE-THIS-IN-PRODUCTION
      expiration: 86400000 # 24 hours
  
  mail:
    host: smtp.gmail.com
    port: 587
    username: your-email@gmail.com
    password: your-app-password
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true

# Payment Gateway Configuration
razorpay:
  key-id: rzp_test_your_key_id
  key-secret: your_key_secret

# Twilio Configuration
twilio:
  account-sid: your_account_sid
  auth-token: your_auth_token
  whatsapp-number: +14155238886
```

### 4. Build the Backend
```bash
mvn clean install
```

This will:
- Download all dependencies
- Compile the source code
- Run tests (if any)
- Package the application into a JAR file

### 5. Run the Backend
```bash
mvn spring-boot:run
```

Or run the JAR directly:
```bash
java -jar target/barber-ease-backend-1.0.0.jar
```

### 6. Verify Backend is Running

Open your browser and visit:
- API Base: `http://localhost:8080/api`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- API Docs: `http://localhost:8080/api-docs`

---

## Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Configure Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8080/api
```

### 4. Run Development Server
```bash
npm run dev
```

The frontend will start at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### 6. Preview Production Build
```bash
npm run preview
```

---

## Database Setup

### 1. Start MongoDB

#### Windows:
```powershell
# MongoDB should start automatically as a service
# Or start manually
net start MongoDB
```

#### macOS:
```bash
brew services start mongodb-community@6.0
```

#### Linux:
```bash
sudo systemctl start mongod
```

### 2. Connect to MongoDB

```bash
mongosh
```

### 3. Create Database and User

```javascript
use barber_ease

// Create admin user (optional but recommended)
db.createUser({
  user: "barber_admin",
  pwd: "secure_password",
  roles: [
    { role: "readWrite", db: "barber_ease" }
  ]
})
```

### 4. Verify Connection

```javascript
show dbs
use barber_ease
show collections
```

### 5. Create Indexes (Optional for Performance)

```javascript
use barber_ease

// User indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })

// Shop indexes
db.shops.createIndex({ ownerId: 1 })
db.shops.createIndex({ active: 1 })

// Booking indexes
db.bookings.createIndex({ userId: 1 })
db.bookings.createIndex({ shopId: 1 })
db.bookings.createIndex({ staffId: 1 })
db.bookings.createIndex({ appointmentDateTime: 1 })
db.bookings.createIndex({ status: 1 })

// Staff indexes
db.staff.createIndex({ shopId: 1 })
db.staff.createIndex({ userId: 1 })

// Service indexes
db.services.createIndex({ shopId: 1 })
db.services.createIndex({ active: 1 })

// Payment indexes
db.payments.createIndex({ bookingId: 1 })
db.payments.createIndex({ userId: 1 })
db.payments.createIndex({ status: 1 })
```

---

## Configuration

### 1. Gmail SMTP Setup (for Email Notifications)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the generated 16-character password

3. Update `application.yml`:
```yaml
spring:
  mail:
    username: your-email@gmail.com
    password: your-16-char-app-password
```

### 2. Razorpay Setup (for Payments)

1. Sign up at https://razorpay.com
2. Get API keys from Dashboard → Settings → API Keys
3. Update `application.yml`:
```yaml
razorpay:
  key-id: rzp_test_your_key_id
  key-secret: your_key_secret
```

### 3. Twilio Setup (for WhatsApp Notifications)

1. Sign up at https://www.twilio.com
2. Get Account SID and Auth Token
3. Set up WhatsApp Sandbox
4. Update `application.yml`:
```yaml
twilio:
  account-sid: your_account_sid
  auth-token: your_auth_token
  whatsapp-number: +14155238886
```

### 4. JWT Secret Configuration

Generate a secure JWT secret:

```bash
# Using OpenSSL
openssl rand -base64 64
```

Update `application.yml`:
```yaml
spring:
  security:
    jwt:
      secret: your-generated-secret-key
      expiration: 86400000 # 24 hours
```

---

## Running the Application

### Option 1: Development Mode (Separate Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 3 - MongoDB:**
```bash
mongod
# or if already running as service, skip this
```

### Option 2: Production Mode

**Backend:**
```bash
cd backend
mvn clean package -DskipTests
java -jar target/barber-ease-backend-1.0.0.jar
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

---

## Docker Setup

### 1. Install Docker and Docker Compose

#### Windows/macOS:
Download and install Docker Desktop from https://www.docker.com/products/docker-desktop

#### Linux:
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Configure Environment Variables

Create `.env` file in project root:
```env
MONGODB_URI=mongodb://admin:password123@mongodb:27017/barber_ease?authSource=admin
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=+14155238886
```

### 3. Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (deletes data)
docker-compose down -v
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api
- Swagger UI: http://localhost:8080/swagger-ui.html
- MongoDB: mongodb://localhost:27017

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use

**Error:** `Port 8080 is already in use`

**Solution:**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8080 | xargs kill -9
```

#### 2. MongoDB Connection Failed

**Error:** `Failed to connect to MongoDB`

**Solution:**
- Check if MongoDB is running: `mongosh`
- Verify connection string in `application.yml`
- Check firewall settings
- Ensure MongoDB service is started

#### 3. Maven Build Failure

**Error:** `Could not resolve dependencies`

**Solution:**
```bash
# Clear Maven cache
mvn dependency:purge-local-repository

# Force update
mvn clean install -U
```

#### 4. npm Install Errors

**Error:** `ENOENT: no such file or directory`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 5. Cannot Access Swagger UI

**Solution:**
- Ensure backend is running: `curl http://localhost:8080/api`
- Check `application.yml` for correct springdoc configuration
- Access: `http://localhost:8080/swagger-ui.html`

#### 6. Email Not Sending

**Solution:**
- Verify Gmail App Password is correct
- Check `application.yml` mail configuration
- Ensure 2-Factor Authentication is enabled on Gmail
- Check firewall/antivirus blocking port 587

#### 7. Frontend Cannot Connect to Backend

**Error:** `Network Error` or `CORS Error`

**Solution:**
- Verify backend is running on port 8080
- Check Vite proxy configuration in `vite.config.ts`
- Ensure CORS is properly configured in `SecurityConfig.java`
- Check `.env` file has correct `VITE_API_URL`

#### 8. Docker Build Fails

**Solution:**
```bash
# Check Docker is running
docker --version

# Rebuild without cache
docker-compose build --no-cache

# Check logs
docker-compose logs backend
docker-compose logs frontend
```

---

## Default Credentials

After first setup, you can create users through the registration endpoint.

**First Admin User** (create manually in MongoDB):
```javascript
use barber_ease

db.users.insertOne({
  name: "Admin User",
  email: "admin@barberease.com",
  password: "$2a$10$...hashed_password...",  // Use BCrypt to hash "admin123"
  phone: "1234567890",
  role: "ADMIN",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

To hash password with BCrypt online: https://bcrypt-generator.com/

---

## Next Steps

1. ✅ Complete the setup following this guide
2. 📖 Read the [API Documentation](API_DOCUMENTATION.md)
3. 🚀 Read the [Deployment Guide](DEPLOYMENT.md)
4. 🔒 Review [Security Best Practices](#security-best-practices)
5. 🧪 Run tests: `mvn test` and `npm test`

---

## Security Best Practices

1. **Change Default Secrets**: Update all default passwords and secret keys
2. **Use HTTPS**: In production, always use HTTPS
3. **Environment Variables**: Never commit `.env` files or secrets to Git
4. **Regular Updates**: Keep all dependencies up to date
5. **Database Backup**: Set up regular MongoDB backups
6. **Rate Limiting**: Configure rate limiting for production
7. **Input Validation**: Always validate user inputs
8. **Authentication**: Use strong JWT secrets and appropriate expiration times

---

## Support

For issues and questions:
- Create an issue on GitHub
- Check the [Troubleshooting](#troubleshooting) section
- Review the [API Documentation](API_DOCUMENTATION.md)
- Contact the development team

---

## License

This project is licensed under the MIT License.

