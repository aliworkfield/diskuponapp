@echo off
echo DisKuponApp - Complete Start Script
echo ================================

echo.
echo Checking prerequisites...
echo ------------------------

where docker >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Docker is installed
) else (
    echo [WARNING] Docker not found - Some features may not work
)

where node >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Node.js is installed
) else (
    echo [ERROR] Node.js not found - Please install Node.js
    pause
    exit /b 1
)

where python >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python is installed
) else (
    echo [WARNING] Python not found - Backend may not work
)

echo.
echo Starting services...
echo -------------------

echo 1. Starting database (if Docker is available)...
docker-compose up -d db 2>nul
if %errorlevel% == 0 (
    echo [OK] Database started
    echo Waiting 30 seconds for database to initialize...
    timeout /t 30 /nobreak >nul
) else (
    echo [INFO] Docker not available - Skipping database start
)

echo.
echo 2. Starting backend in separate window...
start "Backend" /D "%~dp0" powershell -ExecutionPolicy Bypass -File "run_backend.ps1"

echo.
echo 3. Starting React frontend...
start "Frontend" /D "%~dp0\react-frontend" npm run dev

echo.
echo Setup complete!
echo ---------------
echo Frontend will be available at http://localhost:3001 (or http://localhost:3002 if 3001 is in use)
echo Backend API will be available at http://localhost:8000
echo.
echo If you encounter issues:
echo 1. Check the troubleshooting guide: COMPANY_COMPUTER_TROUBLESHOOTING.md
echo 2. Make sure Docker Desktop is running (if available)
echo 3. Check that ports 3001/3002 and 8000 are not in use
echo.
echo To stop:
echo 1. Close the backend PowerShell window
echo 2. If Docker was used: docker-compose down
echo.
pause