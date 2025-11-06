# Troubleshooting Guide

This guide helps you resolve common issues when setting up and running BarberEase.

## Table of Contents

1. [Backend Issues](#backend-issues)
2. [Frontend Issues](#frontend-issues)
3. [Database Issues](#database-issues)
4. [Docker Issues](#docker-issues)
5. [Integration Issues](#integration-issues)
6. [Performance Issues](#performance-issues)
7. [Security Issues](#security-issues)

---

## Backend Issues

### Issue 1: Application won't start

**Symptoms:**
```
Error: Failed to configure a DataSource
```

**Cause:** MongoDB connection string is incorrect or MongoDB is not running

**Solution:**
```bash
# Check if MongoDB is running
mongosh

# Verify connection string in application.yml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/barber_ease

# Start MongoDB if not running
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

---

### Issue 2: JWT Token Invalid

**Symptoms:**
```
Error: JWT signature does not match
```

**Cause:** JWT secret key is too short or not configured

**Solution:**
```yaml
# Update application.yml
spring:
  security:
    jwt:
      secret: a-very-long-secret-key-minimum-32-characters-recommended-64
      expiration: 86400000
```

Generate secure key:
```bash
openssl rand -base64 64
```

---

### Issue 3: Maven Build Fails

**Symptoms:**
```
[ERROR] Failed to execute goal
```

**Solutions:**

```bash
# Clear Maven cache
mvn dependency:purge-local-repository

# Force update dependencies
mvn clean install -U

# Skip tests if they're failing
mvn clean install -DskipTests

# Check Java version
java -version  # Should be 17+

# Use Maven wrapper
./mvnw clean install
```

---

### Issue 4: Port Already in Use

**Symptoms:**
```
Web server failed to start. Port 8080 was already in use
```

**Solutions:**

```bash
# Windows - Find and kill process
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# macOS/Linux - Find and kill process
lsof -ti:8080 | xargs kill -9

# Or change port in application.yml
server:
  port: 8081
```

---

### Issue 5: Email Not Sending

**Symptoms:**
```
Error: Authentication failed
```

**Solutions:**

1. **Check Gmail Settings:**
   - Enable 2-Factor Authentication
   - Generate App Password (not regular password)
   - Use app password in configuration

2. **Update application.yml:**
   ```yaml
   spring:
     mail:
       host: smtp.gmail.com
       port: 587
       username: your-email@gmail.com
       password: your-16-char-app-password  # Not regular password!
       properties:
         mail:
           smtp:
             auth: true
             starttls:
               enable: true
   ```

3. **Test SMTP Connection:**
   ```bash
   telnet smtp.gmail.com 587
   ```

---

### Issue 6: CORS Errors

**Symptoms:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**

Update `SecurityConfig.java`:
```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOriginPatterns(Arrays.asList("http://localhost:5173"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

---

## Frontend Issues

### Issue 1: npm install fails

**Symptoms:**
```
npm ERR! code ERESOLVE
```

**Solutions:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install with legacy peer deps
npm install --legacy-peer-deps

# Or use yarn
yarn install
```

---

### Issue 2: Cannot connect to backend

**Symptoms:**
```
Network Error or CORS Error
```

**Solutions:**

1. **Check backend is running:**
   ```bash
   curl http://localhost:8080/api
   ```

2. **Verify proxy configuration in `vite.config.ts`:**
   ```typescript
   export default defineConfig({
     plugins: [react()],
     server: {
       port: 5173,
       proxy: {
         '/api': {
           target: 'http://localhost:8080',
           changeOrigin: true,
           secure: false,
         },
       },
     },
   })
   ```

3. **Check .env file:**
   ```env
   VITE_API_URL=http://localhost:8080/api
   ```

---

### Issue 3: TypeScript Errors

**Symptoms:**
```
Type 'X' is not assignable to type 'Y'
```

**Solutions:**

```bash
# Regenerate TypeScript definitions
npm run build

# Check tsconfig.json is correct
cat tsconfig.json

# Install missing @types packages
npm install --save-dev @types/react @types/react-dom

# Clear TypeScript cache
rm -rf node_modules/.vite
```

---

### Issue 4: Hot Module Replacement (HMR) Not Working

**Symptoms:**
Changes don't reflect immediately

**Solutions:**

```bash
# Restart dev server
npm run dev

# Clear Vite cache
rm -rf node_modules/.vite

# Check file watchers limit (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

### Issue 5: Build fails

**Symptoms:**
```
Error: Build failed
```

**Solutions:**

```bash
# Check for TypeScript errors
npm run lint

# Build with verbose output
npm run build -- --verbose

# Clear dist folder
rm -rf dist

# Check Node version
node --version  # Should be 18+
```

---

## Database Issues

### Issue 1: MongoDB won't start

**Solutions:**

```bash
# Check if port is in use
netstat -an | grep 27017

# Check MongoDB service status
# Windows
sc query MongoDB

# macOS
brew services list

# Linux
sudo systemctl status mongod

# View MongoDB logs
# Windows
C:\Program Files\MongoDB\Server\6.0\log\mongod.log

# macOS
/opt/homebrew/var/log/mongodb/mongo.log

# Linux
sudo tail -f /var/log/mongodb/mongod.log
```

---

### Issue 2: Cannot connect to MongoDB

**Symptoms:**
```
MongoTimeoutException: Timed out after 30000 ms
```

**Solutions:**

1. **Check MongoDB is running:**
   ```bash
   mongosh
   ```

2. **Verify connection string:**
   ```yaml
   # Local development
   mongodb://localhost:27017/barber_ease
   
   # With authentication
   mongodb://username:password@localhost:27017/barber_ease?authSource=admin
   ```

3. **Check firewall settings:**
   ```bash
   # Linux
   sudo ufw allow 27017
   
   # Windows
   # Add firewall rule for port 27017
   ```

---

### Issue 3: Duplicate Key Error

**Symptoms:**
```
E11000 duplicate key error collection
```

**Solutions:**

```javascript
// Find duplicate documents
db.users.aggregate([
  { $group: { _id: "$email", count: { $sum: 1 } } },
  { $match: { count: { $gt: 1 } } }
])

// Remove duplicates (keep first)
db.users.aggregate([
  { $group: { _id: "$email", docs: { $push: "$_id" } } },
  { $match: { "docs.1": { $exists: true } } }
]).forEach(function(doc) {
  doc.docs.shift();
  db.users.deleteMany({ _id: { $in: doc.docs } });
})

// Rebuild index
db.users.dropIndex("email_1")
db.users.createIndex({ email: 1 }, { unique: true })
```

---

## Docker Issues

### Issue 1: Docker Compose fails to start

**Symptoms:**
```
Error: Cannot start service
```

**Solutions:**

```bash
# Check Docker is running
docker --version
docker ps

# View logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Rebuild containers
docker-compose down
docker-compose up --build -d

# Check for port conflicts
docker ps  # See what's using ports

# Remove all containers and volumes
docker-compose down -v
```

---

### Issue 2: Container keeps restarting

**Symptoms:**
```
Container exits with code 1
```

**Solutions:**

```bash
# View container logs
docker logs barber-ease-backend
docker logs barber-ease-frontend

# Enter container for debugging
docker exec -it barber-ease-backend /bin/bash

# Check environment variables
docker-compose config

# Rebuild specific service
docker-compose up --build backend
```

---

### Issue 3: MongoDB container data lost

**Symptoms:**
Data disappears after restart

**Solutions:**

```bash
# Ensure volume is defined in docker-compose.yml
volumes:
  mongodb_data:
    driver: local

# Check volume exists
docker volume ls

# Inspect volume
docker volume inspect mongodb_data

# Don't use -v flag when stopping (it removes volumes)
docker-compose down  # ✅ Good
docker-compose down -v  # ❌ Removes data
```

---

## Integration Issues

### Issue 1: Razorpay Payment Fails

**Symptoms:**
```
Error: Invalid API key
```

**Solutions:**

1. **Verify API keys:**
   ```yaml
   razorpay:
     key-id: rzp_test_xxxxxxxxxxxx  # Starts with rzp_test or rzp_live
     key-secret: your_secret_here   # Check for typos
   ```

2. **Check Razorpay dashboard:**
   - Verify API keys are active
   - Check test mode vs live mode
   - Review webhook settings

3. **Test API connection:**
   ```bash
   curl -u key_id:key_secret https://api.razorpay.com/v1/orders
   ```

---

### Issue 2: WhatsApp Messages Not Sending

**Symptoms:**
```
Error: Unable to create record
```

**Solutions:**

1. **Verify Twilio configuration:**
   ```yaml
   twilio:
     account-sid: ACxxxxxxxxxxxxxxxxxx  # Starts with AC
     auth-token: your_auth_token
     whatsapp-number: +14155238886     # Twilio sandbox number
   ```

2. **Check WhatsApp sandbox:**
   - User must join sandbox first
   - Send "join [sandbox-name]" to Twilio WhatsApp number
   - Verify sandbox is active

3. **Test Twilio connection:**
   ```bash
   curl -X POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages.json \
     --data-urlencode "From=whatsapp:+14155238886" \
     --data-urlencode "To=whatsapp:+15551234567" \
     --data-urlencode "Body=Test" \
     -u {AccountSid}:{AuthToken}
   ```

---

## Performance Issues

### Issue 1: Slow API Response

**Symptoms:**
API calls taking > 1 second

**Solutions:**

1. **Add database indexes:**
   ```javascript
   db.bookings.createIndex({ shopId: 1, appointmentDateTime: 1 })
   ```

2. **Enable query profiling:**
   ```javascript
   db.setProfilingLevel(2)
   db.system.profile.find().pretty()
   ```

3. **Optimize queries:**
   - Use projections to fetch only needed fields
   - Avoid $where operator
   - Use indexes for sorting

4. **Enable caching:**
   - Add Redis for session caching
   - Cache static data (shops, services)

---

### Issue 2: High Memory Usage

**Symptoms:**
Application crashes or becomes unresponsive

**Solutions:**

```bash
# Increase JVM heap size
java -Xms512m -Xmx2g -jar barber-ease-backend.jar

# In Docker, increase memory limit
docker-compose.yml:
  services:
    backend:
      mem_limit: 2g
```

---

## Security Issues

### Issue 1: Unauthorized Access

**Symptoms:**
```
401 Unauthorized
```

**Solutions:**

1. **Check token is being sent:**
   ```javascript
   // In browser console
   localStorage.getItem('token')
   ```

2. **Verify token format:**
   ```
   Authorization: Bearer <token>
   ```

3. **Check token expiration:**
   - Tokens expire after 24 hours
   - Login again to get new token

4. **Clear browser storage:**
   ```javascript
   localStorage.clear()
   sessionStorage.clear()
   ```

---

### Issue 2: CSRF Token Missing

**Symptoms:**
```
403 Forbidden - Invalid CSRF Token
```

**Solutions:**

CSRF is disabled for stateless JWT auth:
```java
http.csrf().disable()
```

If you need CSRF:
```java
http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
```

---

## Common Error Messages

### Backend Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `ClassNotFoundException` | Missing dependency | Check pom.xml, run `mvn clean install` |
| `NullPointerException` | Uninitialized variable | Check for null before use |
| `ResourceNotFoundException` | Entity not found | Verify ID exists in database |
| `BadRequestException` | Invalid input | Check request payload |
| `AuthenticationException` | Invalid credentials | Verify email/password |
| `AccessDeniedException` | Insufficient permissions | Check user role |

### Frontend Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `Cannot read property of undefined` | Accessing undefined object | Add null checks |
| `Network Error` | Backend not running | Start backend |
| `401 Unauthorized` | Token expired/invalid | Login again |
| `Module not found` | Missing dependency | Run `npm install` |
| `Unexpected token` | Syntax error | Check for typos |

---

## Debugging Tips

### Backend Debugging

#### Enable Debug Logging

```yaml
logging:
  level:
    com.barberease: DEBUG
    org.springframework.security: DEBUG
    org.springframework.data.mongodb: DEBUG
```

#### Use IDE Debugger
1. Set breakpoints in IntelliJ IDEA or VS Code
2. Run in debug mode
3. Inspect variables and call stack

#### Log Request/Response
```java
@Slf4j
@RestController
public class YourController {
    @GetMapping("/endpoint")
    public ResponseEntity<?> method() {
        log.debug("Received request");
        // ... logic
        log.debug("Sending response: {}", response);
        return ResponseEntity.ok(response);
    }
}
```

### Frontend Debugging

#### Use React DevTools
- Install React Developer Tools extension
- Inspect component state and props
- Check Redux state

#### Use Browser DevTools
- Network tab for API calls
- Console for errors
- Application tab for localStorage

#### Add Console Logs
```typescript
console.log('State:', state);
console.log('API Response:', response);
console.error('Error occurred:', error);
```

---

## Getting Help

### Before Asking for Help

1. ✅ Search existing issues on GitHub
2. ✅ Check this troubleshooting guide
3. ✅ Review documentation
4. ✅ Try the solution steps above
5. ✅ Gather error logs and screenshots

### How to Get Help

1. **GitHub Issues**: [Create an issue](https://github.com/your-repo/issues)
2. **Stack Overflow**: Tag with `barberease`
3. **Email**: support@barberease.com
4. **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)

### Information to Include

When asking for help, provide:
- Operating system and version
- Java version (`java -version`)
- Node.js version (`node --version`)
- MongoDB version (`mongosh --version`)
- Full error message
- Steps to reproduce
- What you've tried
- Relevant logs

---

## Useful Commands

### Check System Status

```bash
# Check all services
curl http://localhost:8080/api    # Backend
curl http://localhost:5173         # Frontend
mongosh                            # Database

# Check processes
ps aux | grep java                 # Backend process
ps aux | grep node                 # Frontend process
ps aux | grep mongod               # MongoDB process

# Check ports
netstat -an | grep 8080           # Backend port
netstat -an | grep 5173           # Frontend port
netstat -an | grep 27017          # MongoDB port
```

### Reset Everything

```bash
# Stop all services
docker-compose down -v

# Clear all data
rm -rf backend/target
rm -rf frontend/dist
rm -rf frontend/node_modules

# Rebuild from scratch
cd backend && mvn clean install
cd ../frontend && npm install
```

---

## Performance Tuning

### Backend

```yaml
# application.yml
spring:
  data:
    mongodb:
      # Connection pooling
      min-pool-size: 10
      max-pool-size: 50
      max-connection-idle-time: 60000
```

### Frontend

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true  // Remove console.logs in production
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux']
        }
      }
    }
  }
})
```

---

## Still Need Help?

If you're still experiencing issues:

1. 📧 Email: support@barberease.com
2. 💬 Chat: [Discord](https://discord.gg/barberease)
3. 🐛 Bug Report: [GitHub Issues](https://github.com/your-repo/issues/new)
4. 📖 Docs: [Full Documentation](https://docs.barberease.com)

---

**Last Updated**: November 2024

