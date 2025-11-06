# BarberEase Deployment Guide

This guide will help you deploy the BarberEase application using Docker and Docker Compose.

## Prerequisites

- Docker and Docker Compose installed
- MongoDB (if not using Docker)
- Java 17+ (for local development)
- Node.js 18+ (for local development)

## Environment Setup

1. Copy the environment file:
```bash
cp env.example .env
```

2. Update the `.env` file with your actual values:
```bash
# Database Configuration
MONGODB_URI=mongodb://admin:password123@mongodb:27017/barber_ease?authSource=admin

# Email Configuration
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=+14155238886
```

## Deployment Options

### Option 1: Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd barber-ease
```

2. Start all services:
```bash
docker-compose up -d
```

3. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api
- API Documentation: http://localhost:8080/swagger-ui.html

### Option 2: Manual Deployment

#### Backend Deployment

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the application:
```bash
mvn clean package -DskipTests
```

3. Run the application:
```bash
java -jar target/barber-ease-backend-1.0.0.jar
```

#### Frontend Deployment

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Build the application:
```bash
npm run build
```

4. Serve the built files:
```bash
npm run preview
```

## Database Setup

### MongoDB Setup

1. Install MongoDB locally or use Docker:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```

2. Create the database and initial collections:
```bash
mongo mongodb://localhost:27017/barber_ease
```

## Configuration

### Email Configuration

For Gmail SMTP:
1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in the MAIL_PASSWORD environment variable

### Payment Gateway Setup

1. Create a Razorpay account
2. Get your API keys from the dashboard
3. Update the environment variables

### WhatsApp Integration

1. Create a Twilio account
2. Set up WhatsApp sandbox
3. Update the environment variables

## Monitoring and Logs

### View Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb
```

### Health Checks

- Backend health: http://localhost:8080/api/health
- Frontend: http://localhost:5173

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 8080, 5173, and 27017 are available
2. **MongoDB connection**: Check if MongoDB is running and accessible
3. **Environment variables**: Ensure all required environment variables are set
4. **Memory issues**: Increase Docker memory allocation if needed

### Reset Everything

```bash
# Stop all containers
docker-compose down

# Remove volumes (this will delete all data)
docker-compose down -v

# Rebuild and start
docker-compose up --build -d
```

## Production Deployment

### Security Considerations

1. Use strong passwords for all services
2. Enable HTTPS with SSL certificates
3. Use environment variables for sensitive data
4. Regularly update dependencies
5. Implement proper backup strategies

### Scaling

1. Use a load balancer for multiple backend instances
2. Use MongoDB replica sets for high availability
3. Implement caching with Redis
4. Use CDN for static assets

## Support

For issues and support, please refer to the documentation or contact the development team.

