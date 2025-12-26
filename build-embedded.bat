@echo off
REM Build script for Windows to create embedded executable JAR with frontend

echo ==========================================
echo Building BarberEase Embedded Application
echo ==========================================

REM Step 1: Build Frontend
echo [1/4] Building React Frontend...
cd frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)

REM Build frontend
call npm run build
if errorlevel 1 (
    echo Frontend build failed!
    exit /b 1
)
echo Frontend built successfully

REM Step 2: Copy Frontend Build to Spring Boot Resources
echo [2/4] Copying frontend build to Spring Boot resources...
cd ..

set STATIC_DIR=backend\src\main\resources\static

REM Remove old static files if they exist
if exist "%STATIC_DIR%" (
    rmdir /s /q "%STATIC_DIR%"
)

REM Create static directory
mkdir "%STATIC_DIR%"

REM Copy frontend dist contents to static directory
xcopy /E /I /Y frontend\dist\* "%STATIC_DIR%\"
if errorlevel 1 (
    echo Failed to copy frontend files!
    exit /b 1
)
echo Frontend files copied to Spring Boot resources

REM Step 3: Build Spring Boot JAR
echo [3/4] Building Spring Boot executable JAR...
cd backend

REM Build with embedded profile
call mvn clean package -Dspring.profiles.active=embedded -DskipTests
if errorlevel 1 (
    echo Spring Boot build failed!
    exit /b 1
)

echo Spring Boot JAR built successfully

REM Step 4: Copy JAR to root directory
echo [4/4] Copying JAR to project root...
cd ..
if exist "backend\target\barber-ease-backend-1.0.0.jar" (
    copy /Y backend\target\barber-ease-backend-1.0.0.jar barber-ease-embedded.jar
) else (
    REM Try to find any JAR file
    for %%f in (backend\target\*.jar) do (
        copy /Y "%%f" barber-ease-embedded.jar
        goto :jar_copied
    )
    :jar_copied
)

echo.
echo ==========================================
echo Build completed successfully!
echo ==========================================
echo.
echo Executable JAR: barber-ease-embedded.jar
echo.
echo To run the application:
echo   java -jar barber-ease-embedded.jar
echo.
echo The application will be available at:
echo   http://localhost:8080
echo.
echo Note: MongoDB must be running on localhost:27017
echo.
pause

