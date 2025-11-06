# Makefile for BarberEase Project

.PHONY: help install build start stop clean test lint docker-build docker-up docker-down logs

# Default target
help:
	@echo "BarberEase Project - Available Commands:"
	@echo ""
	@echo "  make install        - Install all dependencies (backend & frontend)"
	@echo "  make build          - Build both backend and frontend"
	@echo "  make start          - Start both backend and frontend in dev mode"
	@echo "  make stop           - Stop all running services"
	@echo "  make test           - Run all tests"
	@echo "  make lint           - Run linters for both projects"
	@echo "  make clean          - Clean build artifacts"
	@echo ""
	@echo "Docker Commands:"
	@echo "  make docker-build   - Build Docker images"
	@echo "  make docker-up      - Start all services with Docker Compose"
	@echo "  make docker-down    - Stop and remove all Docker containers"
	@echo "  make docker-logs    - View Docker logs"
	@echo "  make docker-clean   - Remove all Docker containers and volumes"
	@echo ""
	@echo "Backend Commands:"
	@echo "  make backend-install  - Install backend dependencies"
	@echo "  make backend-build    - Build backend"
	@echo "  make backend-start    - Start backend server"
	@echo "  make backend-test     - Run backend tests"
	@echo ""
	@echo "Frontend Commands:"
	@echo "  make frontend-install - Install frontend dependencies"
	@echo "  make frontend-build   - Build frontend"
	@echo "  make frontend-start   - Start frontend server"
	@echo "  make frontend-lint    - Lint frontend code"
	@echo ""
	@echo "Database Commands:"
	@echo "  make db-start       - Start MongoDB"
	@echo "  make db-stop        - Stop MongoDB"
	@echo "  make db-shell       - Open MongoDB shell"
	@echo "  make db-seed        - Seed database with sample data"
	@echo ""

# Install all dependencies
install: backend-install frontend-install
	@echo "✅ All dependencies installed"

# Build all projects
build: backend-build frontend-build
	@echo "✅ All projects built successfully"

# Start all services (development)
start:
	@echo "Starting all services..."
	@echo "Starting MongoDB..."
	@(mongod --fork --logpath /tmp/mongodb.log 2>/dev/null || echo "MongoDB already running or not installed")
	@echo "Starting Backend (in background)..."
	@cd backend && mvn spring-boot:run > /tmp/backend.log 2>&1 &
	@sleep 5
	@echo "Starting Frontend..."
	@cd frontend && npm run dev

# Stop all services
stop:
	@echo "Stopping all services..."
	@pkill -f "spring-boot:run" || true
	@pkill -f "vite" || true
	@echo "✅ Services stopped"

# Run all tests
test: backend-test frontend-test
	@echo "✅ All tests completed"

# Run all linters
lint: backend-lint frontend-lint
	@echo "✅ All linting completed"

# Clean all build artifacts
clean: backend-clean frontend-clean
	@echo "✅ All build artifacts cleaned"

# Backend commands
backend-install:
	@echo "Installing backend dependencies..."
	@cd backend && mvn dependency:resolve

backend-build:
	@echo "Building backend..."
	@cd backend && mvn clean package -DskipTests

backend-start:
	@echo "Starting backend..."
	@cd backend && mvn spring-boot:run

backend-test:
	@echo "Running backend tests..."
	@cd backend && mvn test

backend-lint:
	@echo "Linting backend code..."
	@cd backend && mvn checkstyle:check

backend-clean:
	@echo "Cleaning backend..."
	@cd backend && mvn clean

# Frontend commands
frontend-install:
	@echo "Installing frontend dependencies..."
	@cd frontend && npm install

frontend-build:
	@echo "Building frontend..."
	@cd frontend && npm run build

frontend-start:
	@echo "Starting frontend..."
	@cd frontend && npm run dev

frontend-test:
	@echo "Running frontend tests..."
	@cd frontend && npm test

frontend-lint:
	@echo "Linting frontend code..."
	@cd frontend && npm run lint

frontend-lint-fix:
	@echo "Fixing frontend lint errors..."
	@cd frontend && npm run lint:fix

frontend-format:
	@echo "Formatting frontend code..."
	@cd frontend && npm run format

frontend-clean:
	@echo "Cleaning frontend..."
	@cd frontend && rm -rf dist node_modules/.vite

# Docker commands
docker-build:
	@echo "Building Docker images..."
	@docker-compose build

docker-up:
	@echo "Starting services with Docker Compose..."
	@docker-compose up -d
	@echo "✅ Services started"
	@echo "Frontend: http://localhost:5173"
	@echo "Backend: http://localhost:8080/api"
	@echo "Swagger: http://localhost:8080/swagger-ui.html"

docker-down:
	@echo "Stopping Docker services..."
	@docker-compose down
	@echo "✅ Services stopped"

docker-logs:
	@docker-compose logs -f

docker-logs-backend:
	@docker-compose logs -f backend

docker-logs-frontend:
	@docker-compose logs -f frontend

docker-logs-mongodb:
	@docker-compose logs -f mongodb

docker-clean:
	@echo "Removing all Docker containers and volumes..."
	@docker-compose down -v
	@echo "✅ Docker cleaned"

docker-restart:
	@make docker-down
	@make docker-up

# Database commands
db-start:
	@echo "Starting MongoDB..."
	@mongod --fork --logpath /tmp/mongodb.log

db-stop:
	@echo "Stopping MongoDB..."
	@mongosh admin --eval "db.shutdownServer()"

db-shell:
	@mongosh barber_ease

db-seed:
	@echo "Seeding database..."
	@mongosh barber_ease < scripts/mongo-init.js
	@echo "✅ Database seeded"

db-backup:
	@echo "Creating database backup..."
	@mongodump --uri="mongodb://localhost:27017/barber_ease" --out=./backup/$$(date +%Y%m%d_%H%M%S)
	@echo "✅ Backup created"

db-restore:
	@echo "Restoring database from latest backup..."
	@mongorestore --uri="mongodb://localhost:27017/barber_ease" --drop $$(ls -td ./backup/* | head -1)

# Development helpers
dev:
	@echo "Starting development environment..."
	@make docker-up

prod-build:
	@echo "Building for production..."
	@cd backend && mvn clean package -DskipTests
	@cd frontend && npm run build
	@echo "✅ Production build complete"

setup: install db-seed
	@echo "✅ Project setup complete"
	@echo ""
	@echo "Next steps:"
	@echo "  1. Update .env file with your credentials"
	@echo "  2. Run 'make start' to start development servers"
	@echo "  3. Or run 'make docker-up' to start with Docker"

health-check:
	@echo "Checking service health..."
	@echo "Backend: $$(curl -s http://localhost:8080/api/health | jq -r .status 2>/dev/null || echo 'DOWN')"
	@echo "Frontend: $$(curl -s http://localhost:5173 > /dev/null 2>&1 && echo 'UP' || echo 'DOWN')"
	@echo "MongoDB: $$(mongosh --eval 'db.adminCommand({ping: 1})' > /dev/null 2>&1 && echo 'UP' || echo 'DOWN')"

# Quality checks
quality: lint test
	@echo "✅ Quality checks passed"

# Deploy (placeholder)
deploy-dev:
	@echo "Deploying to development environment..."
	# Add your deployment script here

deploy-prod:
	@echo "Deploying to production environment..."
	# Add your deployment script here

# Update dependencies
update-deps:
	@echo "Updating backend dependencies..."
	@cd backend && mvn versions:use-latest-releases
	@echo "Updating frontend dependencies..."
	@cd frontend && npm update
	@echo "✅ Dependencies updated"

