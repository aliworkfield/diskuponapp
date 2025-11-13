# Coupon Management System - Getting Started

## 📋 Overview
This document provides a quick start guide for running and testing the Coupon Management Application with Windows Authentication.

## 🚀 Quick Start

### 1. Prerequisites Check
```bash
# Verify Docker is installed
docker --version
docker compose version

# Verify Python is available (for helper scripts)
python --version
```

### 2. Environment Setup
```bash
# Copy environment file (already done)
# The .env file should already exist from .sample.env

# Review and modify .env as needed
# Important settings:
# - FIRST_SUPERUSER: Admin email
# - FIRST_SUPERUSER_PASSWORD: Admin password
# - SECRET_KEY: Change for production
```

### 3. Start the Application
```bash
# Start all services in background
docker compose up -d

# Monitor startup (optional)
docker compose logs -f
# Press Ctrl+C to stop following logs
```

### 4. Verify Setup
```bash
# Run verification script
python verify_setup.py
```

## 🔍 Access the Application

Once running, access the services at:
- **Frontend**: http://localhost
- **Backend API**: http://localhost/api/
- **Swagger UI**: http://localhost/docs
- **PGAdmin**: http://localhost:5050

## 👤 Default Users

After first run, the system creates:
- **Admin User**: admin@diskuponapp.com (password from .env)
- **Default Roles**: User, Manager, Admin

## 🧪 Testing

### Automated Testing
```bash
# Verify setup
python verify_setup.py

# Test core functionality
python test_coupon_system.py
```

### Manual Testing
1. Open http://localhost in your browser
2. The system will automatically authenticate using Windows Authentication
3. Navigate through the different sections:
   - Dashboard
   - My Coupons
   - Coupon Management (Manager/Admin)
   - User Management (Admin)

## 🛠️ Helper Scripts

- **dev_setup.py**: Checks prerequisites and sets up environment
- **verify_setup.py**: Verifies all services are running
- **test_coupon_system.py**: Tests core API functionality
- **HOW_TO_RUN.md**: Detailed running instructions
- **API_USAGE_EXAMPLES.md**: API usage examples
- **TESTING.md**: Comprehensive testing guide

## ⚠️ Troubleshooting

If services don't start:
1. Check Docker Desktop is running
2. Verify no port conflicts (80, 5432, 5050, etc.)
3. Check logs: `docker compose logs`
4. Reset and try again: `docker compose down -v && docker compose up -d`

First startup may take 2-3 minutes as the database initializes.

## 📚 Documentation

- **IMPLEMENTATION_SUMMARY.md**: Technical implementation details
- **API_USAGE_EXAMPLES.md**: API examples with curl
- **TESTING.md**: Comprehensive testing procedures
- **HOW_TO_RUN.md**: Detailed running instructions

## 🛑 Stopping the Application

```bash
# Stop services
docker compose down

# Stop and remove all data (including database)
docker compose down -v
```

## 🎉 Success!

When everything is working, you'll see:
- Frontend loading at http://localhost
- Backend API responding at http://localhost/api/
- All verification checks passing
- Ability to log in and use the coupon management features