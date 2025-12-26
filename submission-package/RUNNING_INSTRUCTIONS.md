# BarberEase - Running Instructions

## ⚠️ Important: MongoDB Required

**The application requires MongoDB to be running before it can start.**

---

## 🚀 Quick Start

### Step 1: Start MongoDB

**On Linux:**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Enable MongoDB to start on boot (optional)
sudo systemctl enable mongod
```

**On Windows:**
1. Open Services (Win + R, type `services.msc`)
2. Find "MongoDB" service
3. Right-click → Start
4. Or use Command Prompt:
   ```cmd
   net start MongoDB
   ```

**On Mac:**
```bash
brew services start mongodb-community
# or
mongod --config /usr/local/etc/mongod.conf
```

### Step 2: Verify MongoDB is Running

```bash
# Check if MongoDB is accessible
mongosh
# or
mongo
```

If you can connect, MongoDB is running. Type `exit` to quit.

### Step 3: Run the Application

**Option 1: Using JAR File**
```bash
java -jar barber-ease-embedded.jar
```

**Option 2: Using .exe File (Windows)**
- Double-click `dist/BarberEase.exe`
- Or from command prompt:
  ```cmd
  dist\BarberEase.exe
  ```

### Step 4: Access the Application

Open your browser and go to:
- **URL:** http://localhost:8080

---

## 📋 System Requirements

### Required Software:
1. **Java Runtime Environment (JRE) 17+**
   - Download: https://adoptium.net/
   - Verify: `java -version`

2. **MongoDB 6.0+**
   - Download: https://www.mongodb.com/try/download/community
   - Default port: 27017
   - Default database: `barber_ease` (created automatically)

### Optional:
- MongoDB Compass (GUI client) for database management

---

## 🔧 Troubleshooting

### Problem: "Connection refused" to MongoDB

**Solution:**
1. Check if MongoDB is installed:
   ```bash
   which mongod
   ```
2. Check if MongoDB service is running:
   ```bash
   sudo systemctl status mongod
   ```
3. Start MongoDB:
   ```bash
   sudo systemctl start mongod
   ```
4. Verify connection:
   ```bash
   mongosh
   ```

### Problem: Port 8080 already in use

**Solution:**
1. Find the process using port 8080:
   ```bash
   # Linux/Mac
   lsof -i :8080
   # or
   netstat -tulpn | grep 8080
   
   # Windows
   netstat -ano | findstr :8080
   ```
2. Kill the process or change the application port in `application-embedded.yml`

### Problem: "No such file or directory" for MongoDB

**Solution:**
Install MongoDB:
- **Linux:** `sudo apt-get install mongodb` (Ubuntu/Debian) or follow MongoDB installation guide
- **Windows:** Download installer from MongoDB website
- **Mac:** `brew install mongodb-community`

### Problem: Java version error

**Solution:**
Ensure Java 17+ is installed:
```bash
java -version
```

If Java version is less than 17, download and install Java 17+ from:
- https://adoptium.net/
- https://www.oracle.com/java/technologies/downloads/

---

## 📝 MongoDB Installation (If Not Installed)

### Ubuntu/Debian:
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package list
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Windows:
1. Download MongoDB installer from: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Select "Install MongoDB as a Service"
5. MongoDB will start automatically

### Mac:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

---

## 🎯 Application Configuration

### MongoDB Connection
- **Default URI:** `mongodb://localhost:27017/barber_ease`
- **Port:** 27017 (MongoDB default)
- **Database:** `barber_ease` (created automatically on first run)

### Application Port
- **Default:** 8080
- **Change:** Edit `backend/src/main/resources/application-embedded.yml`

### Logs
- Application logs are displayed in the console
- Check console output for errors and startup messages

---

## ✅ Verification Checklist

Before running the application, verify:
- [ ] MongoDB is installed
- [ ] MongoDB service is running (`sudo systemctl status mongod`)
- [ ] Java 17+ is installed (`java -version`)
- [ ] Port 8080 is available
- [ ] Application JAR/EXE file exists

---

## 🆘 Still Having Issues?

1. Check MongoDB logs:
   ```bash
   # Linux
   sudo tail -f /var/log/mongodb/mongod.log
   
   # Mac
   tail -f /usr/local/var/log/mongodb/mongo.log
   
   # Windows
   Check: C:\Program Files\MongoDB\Server\7.0\log\mongod.log
   ```

2. Check application logs in the console output

3. Verify MongoDB is listening on port 27017:
   ```bash
   netstat -tulpn | grep 27017
   ```

4. Try connecting to MongoDB manually:
   ```bash
   mongosh
   # Should connect successfully
   ```

---

**Note:** The application will automatically create the database and collections on first run. Just make sure MongoDB is running!

