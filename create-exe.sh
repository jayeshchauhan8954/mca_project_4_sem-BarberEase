#!/bin/bash

# Script to create Windows .exe file from JAR
# NOTE: This script can only create .exe files on Windows OS
# On Linux/Mac, use Launch4j or run this on Windows

set -e

echo "=========================================="
echo "Creating Windows .exe from JAR"
echo "=========================================="

# Check if JAR exists
if [ ! -f "barber-ease-embedded.jar" ]; then
    echo "Error: barber-ease-embedded.jar not found!"
    echo "Please run build-embedded.sh first to create the JAR file."
    exit 1
fi

# Detect OS
OS="$(uname -s)"
case "${OS}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    CYGWIN*)    MACHINE=Windows;;
    MINGW*)     MACHINE=Windows;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

if [ "$MACHINE" != "Windows" ]; then
    echo ""
    echo "⚠️  WARNING: You are running on $MACHINE"
    echo "jpackage cannot create Windows .exe files on non-Windows systems."
    echo ""
    echo "To create a Windows .exe file, you have two options:"
    echo ""
    echo "Option 1: Use Launch4j (Recommended)"
    echo "  1. Download Launch4j from: https://sourceforge.net/projects/launch4j/"
    echo "  2. Open Launch4j"
    echo "  3. File → Load config → Select: create-exe-launch4j.xml"
    echo "  4. Click 'Build wrapper'"
    echo "  5. Output will be: dist/BarberEase.exe"
    echo ""
    echo "Option 2: Run on Windows"
    echo "  1. Copy barber-ease-embedded.jar to a Windows machine"
    echo "  2. Install JDK 17+ on Windows"
    echo "  3. Run: create-exe.bat"
    echo ""
    echo "For now, you can use the JAR file directly on any system with Java:"
    echo "  java -jar barber-ease-embedded.jar"
    echo ""
    exit 0
fi

# Windows - use jpackage
# Check if jpackage is available
if ! command -v jpackage &> /dev/null; then
    echo "Error: jpackage command not found!"
    echo "jpackage is available in JDK 17+"
    echo "Please ensure JDK 17+ is installed and in your PATH."
    exit 1
fi

echo "Building Windows .exe using jpackage..."

# Create .exe using jpackage (Windows only)
jpackage \
    --input . \
    --name "BarberEase" \
    --main-jar barber-ease-embedded.jar \
    --main-class com.barberease.BarberEaseApplication \
    --type exe \
    --dest dist \
    --app-version 1.0.0 \
    --description "BarberEase - Barber Shop Management System" \
    --vendor "Uttaranchal University" \
    --copyright "Copyright 2024" \
    --win-dir-chooser \
    --win-menu \
    --win-shortcut

echo ""
echo "=========================================="
echo "✓ .exe file created successfully!"
echo "=========================================="
echo ""
echo "Output location: dist/BarberEase-1.0.0.exe"
echo ""
echo "Note: The .exe file requires Java Runtime Environment (JRE) 17+"
echo "      to be installed on the target system."

