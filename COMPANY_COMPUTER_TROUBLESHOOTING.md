# Company Computer Troubleshooting Guide

## Common Issues and Solutions

### 1. Docker Desktop Issues
**Problem**: "error during connect" or Docker commands not working
**Solution**: 
- Ensure Docker Desktop is running
- Check if it's set to Linux containers mode
- Restart Docker Desktop if needed
- Contact IT if Docker is blocked by company policies

### 2. Port Conflicts
**Problem**: Services not starting due to port conflicts
**Solution**:
- The system automatically tries different ports (3001 → 3002)
- Check if other development servers are running
- Use Task Manager to kill processes using required ports

### 3. Network/Proxy Issues
**Problem**: Cannot download dependencies or connect to services
**Solution**:
- Check if company proxy is blocking connections
- Configure npm proxy settings if needed:
  ```
  npm config set proxy http://company-proxy:port
  npm config set https-proxy http://company-proxy:port
  ```
- Contact IT for proxy configuration

### 4. Permission Issues
**Problem**: Access denied errors when running scripts
**Solution**:
- Run command prompt as Administrator
- Check if antivirus is blocking file access
- Ensure you have write permissions to the project directory

### 5. Corporate Firewall Blocking
**Problem**: Services can't communicate with each other
**Solution**:
- Add exceptions for localhost connections in firewall
- Contact IT to allow communication between services

## Alternative Development Setup

If Docker is not available on your company computer:

1. **Install PostgreSQL locally**:
   - Download and install PostgreSQL
   - Create a database named "app"
   - Update the database connection settings in the backend

2. **Run backend directly**:
   - Install Python dependencies: `pip install -r requirements.txt`
   - Run the backend: `python backend/app/main.py`

3. **Run frontend**:
   - Navigate to react-frontend directory
   - Install dependencies: `npm install`
   - Start development server: `npm run dev`

## Quick Verification Commands

1. Check if Docker is working:
   ```
   docker --version
   docker-compose --version
   ```

2. Check if Node.js is installed:
   ```
   node --version
   npm --version
   ```

3. Check if Python is installed:
   ```
   python --version
   ```

## Contact IT Department

If you continue to have issues, contact your IT department for:
- Docker Desktop installation permissions
- Network/Proxy configuration
- Firewall exceptions for development tools