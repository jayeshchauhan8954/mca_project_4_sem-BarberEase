@echo off
REM BarberEase Quick Start Script for Windows
REM This script sets up the development environment automatically

echo ========================================
echo    BarberEase Quick Start Script
echo ========================================
echo.

echo Checking prerequisites...
echo.

REM Check Java
where java >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Java not found. Please install Java 17+
    exit /b 1
) else (
    echo [OK] Java found
)

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js not found. Please install Node.js 18+
    exit /b 1
) else (
    echo [OK] Node.js found
)

REM Check Maven
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Maven not found. Please install Maven 3.8+
    exit /b 1
) else (
    echo [OK] Maven found
)

echo.
echo Installing dependencies...
echo.

REM Backend dependencies
echo Installing backend dependencies...
cd backend
call mvn clean install -DskipTests
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Backend dependency installation failed
    exit /b 1
)
echo [OK] Backend dependencies installed
cd ..

REM Frontend dependencies
echo.
echo Installing frontend dependencies...
cd frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Frontend dependency installation failed
    exit /b 1
)
echo [OK] Frontend dependencies installed
cd ..

REM Create .env file
echo.
echo Configuring environment...
if not exist .env (
    copy env.example .env
    echo [OK] Created .env file from template
    echo [WARNING] Please update .env with your credentials
) else (
    echo [OK] .env file already exists
)

echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo You're ready to go!
echo.
echo Next steps:
echo   1. Update .env file with your credentials
echo   2. Start MongoDB (if not running)
echo   3. Start the development servers:
echo.
echo      Option 1: Using Docker
echo      docker-compose up -d
echo.
echo      Option 2: Manual Start
echo      Terminal 1: cd backend ^&^& mvn spring-boot:run
echo      Terminal 2: cd frontend ^&^& npm run dev
echo.
echo   4. Access the application:
echo      Frontend: http://localhost:5173
echo      Backend:  http://localhost:8080/api
echo      Swagger:  http://localhost:8080/swagger-ui.html
echo.
echo Default login credentials:
echo   Admin:    admin@barberease.com / admin123
echo   Owner:    owner@barberease.com / admin123
echo   Customer: customer@barberease.com / admin123
echo.
echo [WARNING] Change these passwords in production!
echo.
echo For more help, see: SETUP_GUIDE.md
echo.

pause

