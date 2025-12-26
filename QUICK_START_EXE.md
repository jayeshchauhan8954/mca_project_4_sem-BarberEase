# Quick Start - .exe File बनाने के लिए

## 🚀 Fast Track (सबसे तेज़ तरीका)

### Windows पर:

1. **Dependencies Install करें:**
   - Java JDK 17+ ✅
   - Node.js 18+ ✅
   - Maven ✅
   - MongoDB ✅

2. **Build Script Run करें:**
   ```bash
   build-embedded.bat
   ```
   यह `barber-ease-embedded.jar` file बनाएगा।

3. **.exe File बनाएं:**
   ```bash
   create-exe.bat
   ```
   यह `dist/BarberEase-1.0.0.exe` file बनाएगा।

4. **Submit करें:**
   - File: `dist/BarberEase-1.0.0.exe`
   - Email: project.ol@uumail.in

---

## ⚡ One-Line Commands

### Full Build + .exe:
```bash
build-embedded.bat && create-exe.bat
```

### Just JAR (बिना .exe):
```bash
build-embedded.bat
# Output: barber-ease-embedded.jar
```

---

## 📝 Important Notes

1. **MongoDB चाहिए:** Application run करने से पहले MongoDB start करें
2. **JRE 17+ चाहिए:** .exe run करने के लिए target system पर Java Runtime Environment 17+ installed होना चाहिए
3. **Application URL:** http://localhost:8080

---

## 🔍 Troubleshooting

| Problem | Solution |
|---------|----------|
| `jpackage not found` | JDK 17+ install करें |
| `MongoDB connection failed` | MongoDB service start करें |
| `Port 8080 in use` | Application का port change करें या running process stop करें |

---

**Detailed Guide:** `BUILD_EXE_INSTRUCTIONS.md` देखें

