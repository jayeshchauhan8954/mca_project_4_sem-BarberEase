#!/bin/bash

# Build script for creating embedded executable JAR with frontend
# This script builds the frontend, copies it to Spring Boot resources, and creates executable JAR

set -e

echo "=========================================="
echo "Building BarberEase Embedded Application"
echo "=========================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Build Frontend
echo -e "${BLUE}[1/4] Building React Frontend...${NC}"
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Build frontend
npm run build
echo -e "${GREEN}✓ Frontend built successfully${NC}"

# Step 2: Copy Frontend Build to Spring Boot Resources
echo -e "${BLUE}[2/4] Copying frontend build to Spring Boot resources...${NC}"
cd ..
STATIC_DIR="backend/src/main/resources/static"

# Remove old static files if they exist
if [ -d "$STATIC_DIR" ]; then
    rm -rf "$STATIC_DIR"
fi

# Create static directory
mkdir -p "$STATIC_DIR"

# Copy frontend dist contents to static directory
cp -r frontend/dist/* "$STATIC_DIR/"
echo -e "${GREEN}✓ Frontend files copied to Spring Boot resources${NC}"

# Step 3: Build Spring Boot JAR
echo -e "${BLUE}[3/4] Building Spring Boot executable JAR...${NC}"
cd backend

# Build with embedded profile
mvn clean package -Dspring.profiles.active=embedded -DskipTests

echo -e "${GREEN}✓ Spring Boot JAR built successfully${NC}"

# Step 4: Copy JAR to root directory
echo -e "${BLUE}[4/4] Copying JAR to project root...${NC}"
cd ..
cp backend/target/barber-ease-backend-1.0.0.jar barber-ease-embedded.jar 2>/dev/null || cp backend/target/*.jar barber-ease-embedded.jar

echo -e "${GREEN}✓ Build completed successfully!${NC}"
echo ""
echo "=========================================="
echo "Executable JAR: barber-ease-embedded.jar"
echo "=========================================="
echo ""
echo "To run the application:"
echo "  java -jar barber-ease-embedded.jar"
echo ""
echo "The application will be available at:"
echo "  http://localhost:8080"
echo ""
echo "Note: MongoDB must be running on localhost:27017"

