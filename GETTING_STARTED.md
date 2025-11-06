# 🚀 Getting Started with BarberEase

**Welcome to BarberEase!** This guide will get you up and running in **less than 5 minutes**.

---

## ⚡ Super Quick Start

### Prerequisites Check

```bash
# Check if you have required software
java -version    # Need: 17+
node --version   # Need: 18+
mongosh --version  # Need: 6.0+
docker --version # Optional but recommended
```

**Don't have these?** → See [SETUP_GUIDE.md](SETUP_GUIDE.md#system-requirements)

---

## 🐳 Option 1: Docker (Recommended - 2 minutes)

```bash
# 1. Clone the project
git clone <repository-url>
cd barber-ease

# 2. Copy environment file
cp env.example .env

# 3. Start everything!
docker-compose up -d

# 4. Done! Access the app:
```

**URLs:**
- 🌐 Frontend: http://localhost:5173
- 🔌 Backend API: http://localhost:8080/api
- 📖 Swagger Docs: http://localhost:8080/swagger-ui.html

**Default Login:**
- 👤 Email: `admin@barberease.com`
- 🔑 Password: `admin123`

---

## 💻 Option 2: Manual Setup (5 minutes)

### Step 1: Get the Code

```bash
git clone <repository-url>
cd barber-ease
```

### Step 2: Install Dependencies

```bash
# Automatic (uses provided script)
./scripts/quick-start.sh  # Linux/Mac
scripts\quick-start.bat   # Windows

# Or manual
cd backend && mvn install
cd ../frontend && npm install
```

### Step 3: Setup Database

```bash
# Start MongoDB
mongod

# Initialize database (in new terminal)
mongosh barber_ease < scripts/mongo-init.js
```

### Step 4: Start Services

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Open Browser

Visit: http://localhost:5173

---

## 🎯 First Steps After Setup

### 1. Login

Use default credentials:
- Email: `admin@barberease.com`
- Password: `admin123`

⚠️ **Change this password immediately!**

### 2. Explore the Dashboard

You'll see:
- 📊 Statistics overview
- 📅 Recent bookings
- 🏪 Shop summary

### 3. Create Your First Shop (if Shop Owner)

1. Navigate to **Shops** → **Add Shop**
2. Fill in shop details
3. Set business hours
4. Configure settings
5. Click **Create Shop**

### 4. Add Services

1. Go to **Shop Details**
2. Click **Add Service**
3. Enter service details (name, price, duration)
4. Save

### 5. Add Staff

1. Go to **Staff** page
2. Click **Add Staff**
3. Enter staff details
4. Set availability
5. Save

### 6. Create a Booking

1. Go to **Bookings** → **New Booking**
2. Select shop, service, staff
3. Choose date and time
4. Complete payment
5. Get confirmation!

---

## 🎓 Learning Path

### Beginner (Day 1)
1. Read [README.md](README.md) - 5 minutes
2. Follow this guide to setup - 5 minutes
3. Explore the UI - 10 minutes
4. Read [USER_GUIDE.md](USER_GUIDE.md) - 20 minutes

### Intermediate (Week 1)
1. Read [ARCHITECTURE.md](ARCHITECTURE.md) - 30 minutes
2. Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - 45 minutes
3. Explore the codebase - 2 hours
4. Make a small change - 1 hour

### Advanced (Month 1)
1. Read [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) - 1 hour
2. Read [TESTING_GUIDE.md](TESTING_GUIDE.md) - 30 minutes
3. Contribute a feature - varies
4. Deploy to production - 2 hours

---

## 🔧 Configuration Quick Reference

### Environment Variables

Create `.env` file:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/barber_ease

# Email (Gmail)
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-16-char-app-password

# Payment (Razorpay)
RAZORPAY_KEY_ID=rzp_test_your_key
RAZORPAY_KEY_SECRET=your_secret

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=+14155238886
```

**Detailed configuration** → [SETUP_GUIDE.md#configuration](SETUP_GUIDE.md#configuration)

---

## 📚 Documentation Roadmap

```
Start Here
    ↓
README.md (Project Overview)
    ↓
GETTING_STARTED.md (This File)
    ↓
SETUP_GUIDE.md (Detailed Setup)
    ↓
Choose Your Path:
    ↓                    ↓                      ↓
User                 Developer             DevOps
USER_GUIDE.md        DEVELOPER_GUIDE.md    DEPLOYMENT.md
                     ARCHITECTURE.md        docker-compose.yml
                     API_DOCUMENTATION.md   monitoring/
```

---

## 🆘 Need Help?

### Common Issues

**Issue**: Application won't start  
**Solution**: [TROUBLESHOOTING.md#application-wont-start](TROUBLESHOOTING.md#backend-issues)

**Issue**: Database connection failed  
**Solution**: [TROUBLESHOOTING.md#mongodb-connection](TROUBLESHOOTING.md#database-issues)

**Issue**: Payment not working  
**Solution**: [TROUBLESHOOTING.md#payment-integration](TROUBLESHOOTING.md#integration-issues)

**Full Troubleshooting**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

### Get Support

- 📖 **Documentation**: Check [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)
- 🐛 **Bug Report**: [Create Issue](https://github.com/your-repo/issues/new?template=bug_report.md)
- 💡 **Feature Request**: [Request Feature](https://github.com/your-repo/issues/new?template=feature_request.md)
- 💬 **Questions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- 📧 **Email**: support@barberease.com

---

## 🎯 Next Steps

### For Users
→ Read [USER_GUIDE.md](USER_GUIDE.md)

### For Developers
→ Read [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)  
→ Check [ARCHITECTURE.md](ARCHITECTURE.md)  
→ Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

### For Contributors
→ Read [CONTRIBUTING.md](CONTRIBUTING.md)  
→ Check [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

### For DevOps
→ Read [DEPLOYMENT.md](DEPLOYMENT.md)  
→ Check [docker-compose.prod.yml](docker-compose.prod.yml)

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Backend starts without errors
- [ ] Frontend loads at http://localhost:5173
- [ ] Can login with default credentials
- [ ] Can see dashboard
- [ ] MongoDB is connected
- [ ] Swagger UI accessible

---

## 🎉 Success!

If you've reached this point, you're all set up! 

**What's next?**
- 🏪 Create your first shop
- 👥 Add staff members
- ✂️ Add services
- 📅 Make a test booking

**Need more help?**
- Check [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) for all guides
- Read [USER_GUIDE.md](USER_GUIDE.md) for detailed instructions

---

## 🌟 Pro Tips

💡 **Tip 1**: Use `make` commands for common tasks
```bash
make help          # See all available commands
make dev           # Start development environment
make test          # Run all tests
make docker-up     # Start with Docker
```

💡 **Tip 2**: Bookmark important URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:8080/api
- Swagger: http://localhost:8080/swagger-ui.html

💡 **Tip 3**: Use the Postman collection
Import `postman/BarberEase_API_Collection.json` for easy API testing

💡 **Tip 4**: Check health endpoints
- Backend: http://localhost:8080/api/health
- Returns server status and database connection

---

<div align="center">

**Ready to build something amazing? Let's go! 🚀**

[📖 Full Documentation](DOCUMENTATION_INDEX.md) •
[🏗️ Architecture](ARCHITECTURE.md) •
[💬 Get Help](TROUBLESHOOTING.md)

</div>

---

**Last Updated**: November 2024  
**Version**: 1.0.0

