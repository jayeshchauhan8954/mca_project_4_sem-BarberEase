# Launch4j - Windows .exe Creation Guide

Since you're on Linux, `jpackage` cannot create Windows .exe files. Use **Launch4j** instead - it's a free, cross-platform tool that works on Linux, Mac, and Windows.

## 📥 Step 1: Download Launch4j

- **Download:** https://sourceforge.net/projects/launch4j/
- **Version:** Latest stable release
- **Note:** Launch4j is a Java application, so it runs on Linux, Mac, and Windows

## 🚀 Step 2: Build Embedded JAR

First, make sure you have the JAR file:

```bash
./build-embedded.sh
```

This creates: `barber-ease-embedded.jar`

## 🔧 Step 3: Create .exe using Launch4j

### Method A: Using GUI (Easiest)

1. **Start Launch4j:**
   ```bash
   # If you downloaded the jar file:
   java -jar launch4j.jar
   
   # Or run the executable if available
   ```

2. **Load Configuration:**
   - File → Load config
   - Select: `create-exe-launch4j.xml`
   - This loads all the pre-configured settings

3. **Verify Settings:**
   - **Output file:** `dist/BarberEase.exe`
   - **Jar:** `barber-ease-embedded.jar`
   - **Min JRE version:** 17

4. **Build:**
   - Click "Build wrapper" button (bottom right)
   - Wait for "Build finished" message

5. **Done!**
   - Your .exe file will be at: `dist/BarberEase.exe`

### Method B: Using Command Line (Linux/Mac)

Launch4j can also be used from command line:

```bash
# Download Launch4j (if not already downloaded)
# Then run:
java -jar launch4j.jar create-exe-launch4j.xml
```

This will create `dist/BarberEase.exe` directly.

## ✅ Step 4: Test the .exe

The created `.exe` file can be run on any Windows system that has:
- **Java Runtime Environment (JRE) 17 or higher** installed

To test:
1. Copy `dist/BarberEase.exe` to a Windows machine
2. Double-click to run (if JRE 17+ is installed)
3. Application will start on http://localhost:8080

## 📋 Configuration File Details

The `create-exe-launch4j.xml` file contains:
- Output file path
- JAR file path
- JRE version requirements
- Application metadata (version, vendor, etc.)
- Icon (if you add one later)

## 🎯 Alternative: Simple JAR Runner

If you just need to distribute the application, you can also:
1. Distribute the JAR file: `barber-ease-embedded.jar`
2. Create a simple batch file for Windows users:

**run-barberease.bat:**
```batch
@echo off
java -jar barber-ease-embedded.jar
pause
```

Users can double-click this batch file to run the application.

## ⚠️ Important Notes

1. **MongoDB Required:** The application needs MongoDB running on localhost:27017
2. **JRE Required:** Target Windows machines must have JRE 17+ installed
3. **File Size:** The .exe will be relatively small (~50-100KB) since it wraps the JAR
4. **Portable:** The .exe + JAR can be distributed together

## 🔍 Troubleshooting

### Problem: "Unable to locate Java Runtime Environment"
**Solution:** Ensure JRE 17+ is installed and in PATH on the target Windows machine.

### Problem: Launch4j build fails
**Solution:** 
- Check that `barber-ease-embedded.jar` exists
- Verify XML configuration file is valid
- Ensure you have write permissions in the `dist/` directory

### Problem: Application doesn't start
**Solution:**
- Check if MongoDB is running
- Check if port 8080 is available
- Run the JAR directly to see error messages: `java -jar barber-ease-embedded.jar`

---

**Happy Building! 🎉**

