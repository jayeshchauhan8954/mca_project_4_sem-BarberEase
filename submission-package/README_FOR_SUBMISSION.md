# BarberEase - MCA Project Submission

## 📦 What's Included

This package contains a complete Barber Shop Management System ready for deployment.

---

## 📁 Package Contents

```
mca-4th-sem/
├── dist/
│   └── BarberEase.exe          ← MAIN SUBMISSION FILE (Windows Executable)
├── barber-ease-embedded.jar    ← Alternative: JAR file (runs on any OS)
├── README_FOR_SUBMISSION.md    ← This file
└── RUNNING_INSTRUCTIONS.md     ← Complete setup guide
```

---

## 🎯 Quick Start (Windows)

### Step 1: Prerequisites

**Required:**
1. **Java Runtime Environment (JRE) 17 or higher**
   - Download: https://adoptium.net/temurin/releases/
   - Verify installation: Open Command Prompt and type `java -version`

2. **MongoDB 6.0 or higher**
   - Download: https://www.mongodb.com/try/download/community
   - Installation guide: See `RUNNING_INSTRUCTIONS.md`

### Step 2: Start MongoDB

**Windows:**
1. Open Services (Press `Win + R`, type `services.msc`, press Enter)
2. Find "MongoDB" service
3. Right-click → Start

**OR use Command Prompt (Run as Administrator):**
```cmd
net start MongoDB
```

### Step 3: Run the Application

**Method 1: Double-click the .exe file**
- Navigate to the `dist` folder
- Double-click `BarberEase.exe`
- Application will start automatically

**Method 2: From Command Prompt**
```cmd
cd dist
BarberEase.exe
```

### Step 4: Access the Application

1. Open your web browser
2. Go to: **http://localhost:8080**
3. The application is ready to use!

---

## 🔧 Alternative: Using JAR File

If the .exe doesn't work or you're on a different OS:

```bash
java -jar barber-ease-embedded.jar
```

Then open: http://localhost:8080

---

## ⚙️ System Requirements

### Minimum Requirements:
- **OS:** Windows 10/11, Linux, or macOS
- **RAM:** 4 GB (8 GB recommended)
- **Storage:** 100 MB free space
- **Java:** JRE 17 or higher
- **Database:** MongoDB 6.0 or higher
- **Port:** 8080 (must be available)

### Network:
- Localhost connection for MongoDB
- Internet (optional, for email notifications if configured)

---

## 📋 Application Features

This application includes:
- ✅ User Authentication & Registration
- ✅ Shop Management
- ✅ Staff Management
- ✅ Service Catalog
- ✅ Booking System with Conflict Prevention
- ✅ Payment Integration (Razorpay)
- ✅ Email & WhatsApp Notifications
- ✅ Dashboard with Analytics
- ✅ Responsive Web Interface

---

## 🆘 Troubleshooting

### Problem: "Connection refused" error
**Solution:** MongoDB is not running. Start MongoDB service first.

### Problem: "Java not found" or version error
**Solution:** Install Java 17+ from https://adoptium.net/

### Problem: Port 8080 already in use
**Solution:** Close other applications using port 8080 or change port in configuration

### Problem: Application starts but browser shows error
**Solution:** 
1. Wait 10-15 seconds for application to fully start
2. Check console for error messages
3. Verify MongoDB is running: `mongosh` or `mongo`

---

## 📧 Submission Details

**File to Submit:** `dist/BarberEase.exe`

**Email:** project.ol@uumail.in

**Include in Email:**
- Your name and roll number
- Project name: BarberEase
- Note: MongoDB and JRE 17+ required on target system

---

## 📚 Documentation

- **RUNNING_INSTRUCTIONS.md** - Detailed setup and troubleshooting guide
- **BUILD_EXE_INSTRUCTIONS.md** - How the .exe was created
- **API_DOCUMENTATION.md** - API endpoints documentation (if available)

---

## ✅ Verification Checklist

Before submitting, ensure:
- [ ] `BarberEase.exe` file exists in `dist/` folder
- [ ] File size is approximately 52 MB
- [ ] You have `RUNNING_INSTRUCTIONS.md` for reference
- [ ] You understand that MongoDB must be running on target system

---

## 🎓 Project Information

- **Project Name:** BarberEase - Barber Shop Management System
- **University:** Uttaranchal University
- **Course:** MCA 4th Semester
- **Technology Stack:**
  - Backend: Spring Boot 3.2.0 (Java 17)
  - Frontend: React 18 + TypeScript + Vite
  - Database: MongoDB 6.0+
  - Build Tool: Maven

---

## 💡 Important Notes

1. **MongoDB is Required:** The application will not start without MongoDB running
2. **First Run:** The application will automatically create the database and collections
3. **Default Port:** Application runs on port 8080
4. **Data Persistence:** All data is stored in MongoDB database named `barber_ease`

---

**For detailed setup instructions, see: RUNNING_INSTRUCTIONS.md**

**Good luck with your submission! 🚀**

