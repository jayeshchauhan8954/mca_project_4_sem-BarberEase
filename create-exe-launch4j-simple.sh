#!/bin/bash

# Simple script to create .exe using Launch4j
# This script runs from the project directory

set -e

echo "=========================================="
echo "Creating Windows .exe using Launch4j"
echo "=========================================="

# Check if JAR exists
if [ ! -f "barber-ease-embedded.jar" ]; then
    echo "Error: barber-ease-embedded.jar not found!"
    echo "Please run build-embedded.sh first to create the JAR file."
    exit 1
fi

# Check if XML config exists
if [ ! -f "create-exe-launch4j.xml" ]; then
    echo "Error: create-exe-launch4j.xml not found!"
    exit 1
fi

# Try to find Launch4j
LAUNCH4J_PATHS=(
    "$HOME/Downloads/launch4j-3.50-linux-x64/launch4j/launch4j.jar"
    "$HOME/Downloads/launch4j/launch4j.jar"
    "./launch4j.jar"
    "/opt/launch4j/launch4j.jar"
)

LAUNCH4J_JAR=""

for path in "${LAUNCH4J_PATHS[@]}"; do
    if [ -f "$path" ]; then
        LAUNCH4J_JAR="$path"
        echo "Found Launch4j at: $LAUNCH4J_JAR"
        break
    fi
done

if [ -z "$LAUNCH4J_JAR" ]; then
    echo ""
    echo "Error: Launch4j not found!"
    echo ""
    echo "Please download Launch4j from:"
    echo "  https://sourceforge.net/projects/launch4j/"
    echo ""
    echo "Or specify the path manually:"
    echo "  java -jar /path/to/launch4j.jar create-exe-launch4j.xml"
    echo ""
    exit 1
fi

# Create dist directory if it doesn't exist
mkdir -p dist

echo "Building .exe file..."
echo ""

# Run Launch4j from project directory (so it can find the XML and JAR)
java -jar "$LAUNCH4J_JAR" create-exe-launch4j.xml

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "✓ .exe file created successfully!"
    echo "=========================================="
    echo ""
    echo "Output location: dist/BarberEase.exe"
    echo ""
    echo "Note: The .exe file requires Java Runtime Environment (JRE) 17+"
    echo "      to be installed on the target Windows system."
else
    echo ""
    echo "Error: Failed to create .exe file"
    exit 1
fi

