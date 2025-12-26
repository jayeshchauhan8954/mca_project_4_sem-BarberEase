# Quick Guide: Create Windows .exe on Linux

Since you're running on **Linux**, you **cannot** use `jpackage` to create Windows .exe files directly. Here are your options:

## ✅ Recommended: Use Launch4j

Launch4j works on Linux, Mac, and Windows to create Windows .exe files.

### Quick Steps:

1. **Download Launch4j:**
   ```bash
   # Download from: https://sourceforge.net/projects/launch4j/
   # Or use wget:
   wget https://sourceforge.net/projects/launch4j/files/latest/download -O launch4j.zip
   unzip launch4j.zip
   ```

2. **Make sure you have the JAR:**
   ```bash
   ./build-embedded.sh
   ```

3. **Run Launch4j:**
   ```bash
   java -jar launch4j/launch4j.jar create-exe-launch4j.xml
   ```

   Or use the GUI:
   ```bash
   java -jar launch4j/launch4j.jar
   ```
   Then load `create-exe-launch4j.xml` and click "Build wrapper"

4. **Output:** `dist/BarberEase.exe` ✅

## 📝 Alternative Options

### Option 1: Distribute JAR + Batch File

Create a simple Windows batch file:

**run-barberease.bat:**
```batch
@echo off
java -jar barber-ease-embedded.jar
pause
```

Users can double-click this to run the application.

### Option 2: Use Windows Machine

If you have access to a Windows machine:
1. Copy `barber-ease-embedded.jar` to Windows
2. Install JDK 17+ on Windows
3. Run `create-exe.bat` (or use jpackage directly)

### Option 3: Use WINE (Advanced)

You can try running Launch4j or jpackage through WINE, but this is not recommended.

## 🎯 Summary

**Best approach for Linux users:**
1. Use Launch4j (cross-platform, works on Linux)
2. Configuration file: `create-exe-launch4j.xml` ✅ (already created)
3. JAR file: `barber-ease-embedded.jar` (create with `./build-embedded.sh`)
4. Output: `dist/BarberEase.exe`

See `LAUNCH4J_INSTRUCTIONS.md` for detailed steps.

