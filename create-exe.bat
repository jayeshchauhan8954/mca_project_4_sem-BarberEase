@echo off
REM Script to create Windows .exe file from JAR using jpackage
REM Requires: JDK 17+ with jpackage tool

echo ==========================================
echo Creating Windows .exe from JAR
echo ==========================================

REM Check if JAR exists
if not exist "barber-ease-embedded.jar" (
    echo Error: barber-ease-embedded.jar not found!
    echo Please run build-embedded.bat first to create the JAR file.
    pause
    exit /b 1
)

REM Check if jpackage is available
where jpackage >nul 2>&1
if errorlevel 1 (
    echo Error: jpackage command not found!
    echo jpackage is available in JDK 14+ (part of Java 17+)
    echo Please ensure JDK 17+ is installed and in your PATH.
    pause
    exit /b 1
)

echo Building Windows .exe using jpackage...

REM Create .exe using jpackage
jpackage ^
    --input . ^
    --name "BarberEase" ^
    --main-jar barber-ease-embedded.jar ^
    --main-class com.barberease.BarberEaseApplication ^
    --type exe ^
    --dest dist ^
    --app-version 1.0.0 ^
    --description "BarberEase - Barber Shop Management System" ^
    --vendor "Uttaranchal University" ^
    --copyright "Copyright 2024" ^
    --win-dir-chooser ^
    --win-menu ^
    --win-shortcut

if errorlevel 1 (
    echo.
    echo Error: Failed to create .exe file!
    pause
    exit /b 1
)

echo.
echo ==========================================
echo .exe file created successfully!
echo ==========================================
echo.
echo Output location: dist\BarberEase-1.0.0.exe
echo.
echo Note: The .exe file requires Java Runtime Environment (JRE) 17+
echo       to be installed on the target system.
echo.
pause

