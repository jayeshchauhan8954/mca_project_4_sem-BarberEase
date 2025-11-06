#!/bin/bash

# BarberEase Quick Start Script
# This script sets up the development environment automatically

set -e

echo "🚀 BarberEase Quick Start Script"
echo "================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Java
if ! command -v java &> /dev/null; then
    echo -e "${RED}❌ Java not found. Please install Java 17+${NC}"
    exit 1
else
    JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2 | cut -d'.' -f1)
    if [ "$JAVA_VERSION" -lt 17 ]; then
        echo -e "${RED}❌ Java version must be 17 or higher. Current: $JAVA_VERSION${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Java $JAVA_VERSION found${NC}"
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
    exit 1
else
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo -e "${RED}❌ Node.js version must be 18 or higher. Current: $NODE_VERSION${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Node.js $NODE_VERSION found${NC}"
fi

# Check MongoDB
if ! command -v mongosh &> /dev/null; then
    echo -e "${YELLOW}⚠️  MongoDB shell not found. Please ensure MongoDB is installed and running${NC}"
else
    echo -e "${GREEN}✅ MongoDB found${NC}"
fi

# Check Maven
if ! command -v mvn &> /dev/null; then
    echo -e "${RED}❌ Maven not found. Please install Maven 3.8+${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Maven found${NC}"
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Backend dependencies
echo "Installing backend dependencies..."
cd backend
mvn clean install -DskipTests
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Backend dependency installation failed${NC}"
    exit 1
fi
cd ..

# Frontend dependencies
echo ""
echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Frontend dependency installation failed${NC}"
    exit 1
fi
cd ..

echo ""
echo "⚙️  Configuring environment..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp env.example .env
    echo -e "${GREEN}✅ Created .env file from template${NC}"
    echo -e "${YELLOW}⚠️  Please update .env with your credentials${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

echo ""
echo "🗄️  Setting up database..."

# Check if MongoDB is running
if mongosh --eval "db.version()" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ MongoDB is running${NC}"
    
    # Initialize database
    echo "Initializing database with sample data..."
    mongosh barber_ease < scripts/mongo-init.js > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Database initialized${NC}"
    else
        echo -e "${YELLOW}⚠️  Could not initialize database. You may need to do this manually${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  MongoDB is not running. Please start MongoDB and run:${NC}"
    echo "    mongosh barber_ease < scripts/mongo-init.js"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎉 You're ready to go!"
echo ""
echo "Next steps:"
echo "  1. Update .env file with your credentials"
echo "  2. Start the development servers:"
echo ""
echo "     Option 1: Using Docker (Recommended)"
echo "     $ docker-compose up -d"
echo ""
echo "     Option 2: Manual Start"
echo "     Terminal 1: cd backend && mvn spring-boot:run"
echo "     Terminal 2: cd frontend && npm run dev"
echo ""
echo "  3. Access the application:"
echo "     Frontend: http://localhost:5173"
echo "     Backend:  http://localhost:8080/api"
echo "     Swagger:  http://localhost:8080/swagger-ui.html"
echo ""
echo "Default login credentials:"
echo "  Admin:    admin@barberease.com / admin123"
echo "  Owner:    owner@barberease.com / admin123"
echo "  Customer: customer@barberease.com / admin123"
echo ""
echo "⚠️  Remember to change these passwords in production!"
echo ""
echo "📖 For more help, see: SETUP_GUIDE.md"
echo ""

