# BarberEase - .exe File Creation Guide

इस guide में BarberEase project को Windows .exe file में convert करने के steps दिए गए हैं।

## 📋 Prerequisites (आवश्यक सॉफ़्टवेयर)

### 1. Java Development Kit (JDK 17 या उच्चतर)
- Download: https://www.oracle.com/java/technologies/downloads/
- या OpenJDK: https://adoptium.net/
- Installation के बाद verify करें:
  ```bash
  java -version
  javac -version
  ```

### 2. Node.js और npm
- Download: https://nodejs.org/
- Version: Node.js 18+ recommended
- Installation के बाद verify करें:
  ```bash
  node --version
  npm --version
  ```

### 3. Maven (Build Tool)
- Download: https://maven.apache.org/download.cgi
- Installation के बाद verify करें:
  ```bash
  mvn --version
  ```

### 4. MongoDB (Database)
- Application को run करने के लिए MongoDB चाहिए
- Download: https://www.mongodb.com/try/download/community
- MongoDB को start करें:
  ```bash
  # Windows
  mongod
  
  # Linux/Mac
  sudo systemctl start mongod
  ```

---

## 🚀 Step-by-Step Instructions

### Method 1: Using jpackage (Recommended - JDK 17+ में built-in)

#### Step 1: Build Embedded JAR File

**Windows के लिए:**
```bash
build-embedded.bat
```

**Linux/Mac के लिए:**
```bash
chmod +x build-embedded.sh
./build-embedded.sh
```

यह script:
- Frontend को build करेगा
- Frontend files को Spring Boot resources में copy करेगा
- Executable JAR file बनाएगा (`barber-ease-embedded.jar`)

#### Step 2: Create .exe File using jpackage

**Windows के लिए:**
```bash
create-exe.bat
```

**Linux/Mac के लिए:**
```bash
chmod +x create-exe.sh
./create-exe.sh
```

यह `dist/BarberEase-1.0.0.exe` file बनाएगा।

**Note:** जहाँ .exe बनाना है, वहाँ Windows OS होना चाहिए। Linux/Mac पर jpackage Windows .exe नहीं बना सकता।

---

### Method 2: Using Launch4j (Alternative Method)

Launch4j एक GUI tool है जो JAR को .exe में convert करता है।

#### Step 1: Download Launch4j
- Download: https://sourceforge.net/projects/launch4j/
- Install करें

#### Step 2: Build Embedded JAR
```bash
build-embedded.bat  # या build-embedded.sh
```

#### Step 3: Create .exe using Launch4j
1. Launch4j खोलें
2. File → Load config → `create-exe-launch4j.xml` select करें
3. Output file path verify करें: `dist/BarberEase.exe`
4. JAR file path verify करें: `barber-ease-embedded.jar`
5. Build wrapper button पर click करें

---

## 📦 Manual Build Process (Step-by-Step)

अगर scripts काम नहीं कर रहे, तो manually ये steps follow करें:

### 1. Frontend Build
```bash
cd frontend
npm install
npm run build
cd ..
```

### 2. Copy Frontend to Spring Boot
```bash
# Windows
xcopy /E /I /Y frontend\dist\* backend\src\main\resources\static\

# Linux/Mac
mkdir -p backend/src/main/resources/static
cp -r frontend/dist/* backend/src/main/resources/static/
```

### 3. Build Spring Boot JAR
```bash
cd backend
mvn clean package -Dspring.profiles.active=embedded -DskipTests
cd ..
cp backend/target/*.jar barber-ease-embedded.jar
```

### 4. Create .exe (jpackage के साथ)
```bash
jpackage --input . --name "BarberEase" --main-jar barber-ease-embedded.jar --main-class com.barberease.BarberEaseApplication --type exe --dest dist --app-version 1.0.0 --description "BarberEase - Barber Shop Management System" --vendor "Uttaranchal University" --copyright "Copyright 2024" --win-dir-chooser --win-menu --win-shortcut
```

---

## 🎯 Running the Application

### Option 1: JAR File से Run करें
```bash
java -jar barber-ease-embedded.jar
```

### Option 2: .exe File से Run करें
1. `dist/BarberEase-1.0.0.exe` (या `BarberEase.exe`) double-click करें
2. Application automatically start हो जाएगी

### Application Access
- **URL:** http://localhost:8080
- Frontend और Backend दोनों same port पर run होंगे
- MongoDB `localhost:27017` पर running होना चाहिए

---

## ⚠️ Important Notes

### MongoDB Requirement
- Application को run करने के लिए **MongoDB चल रहा होना चाहिए**
- MongoDB installation guide: https://www.mongodb.com/docs/manual/installation/
- Default connection: `mongodb://localhost:27017/barber_ease`

### Java Runtime Requirement
- .exe file को run करने के लिए target system पर **Java Runtime Environment (JRE) 17+** installed होना चाहिए
- या bundled JRE के साथ .exe बनाने के लिए jpackage के `--java-options` use करें

### Configuration
- Application configuration: `backend/src/main/resources/application-embedded.yml`
- Database, email, payment gateway settings यहाँ configure कर सकते हैं
- Environment variables भी use कर सकते हैं

---

## 🔧 Troubleshooting

### Problem: "jpackage command not found"
**Solution:** 
- JDK 17+ installed है verify करें
- PATH variable में Java bin directory add करें
- Command prompt/PowerShell restart करें

### Problem: "MongoDB connection failed"
**Solution:**
- MongoDB service running है verify करें
- `application-embedded.yml` में MongoDB URI check करें
- MongoDB logs check करें

### Problem: Frontend not loading
**Solution:**
- Frontend build successful है verify करें
- `backend/src/main/resources/static/` directory में files हैं check करें
- Browser console में errors check करें

### Problem: Port 8080 already in use
**Solution:**
- `application-embedded.yml` में port change करें
- या running process को stop करें:
  ```bash
  # Windows
  netstat -ano | findstr :8080
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -ti:8080 | xargs kill
  ```

---

## 📝 File Structure After Build

```
mca-4th-sem/
├── barber-ease-embedded.jar          # Executable JAR (run करने के लिए)
├── dist/
│   └── BarberEase-1.0.0.exe         # Windows .exe file
├── backend/
│   └── src/main/resources/static/   # Embedded frontend files
├── frontend/
│   └── dist/                        # Frontend build output
└── ...
```

---

## 📧 Submission

Project submission के लिए:
1. **.exe file** बनाएं (`dist/BarberEase-1.0.0.exe`)
2. Email करें: **project.ol@uumail.in**
3. Subject: "BarberEase MCA Project - Executable File"
4. Email body में mention करें:
   - Project name: BarberEase
   - Your name and roll number
   - System requirements (MongoDB + JRE 17+)

---

## 🆘 Support

अगर कोई problem आए तो:
1. इस guide के troubleshooting section check करें
2. Application logs check करें
3. Error messages carefully read करें

**Happy Coding! 🎉**

