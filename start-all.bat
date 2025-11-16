@echo off
echo Starting DisKuponApp...

echo.
echo 1. Starting Database...
start "Database" /D "%~dp0" docker-compose up db

timeout /t 10 /nobreak >nul

echo.
echo 2. Starting Backend...
start "Backend" /D "%~dp0" powershell -ExecutionPolicy Bypass -File "run_backend.ps1"

timeout /t 10 /nobreak >nul

echo.
echo 3. Starting Frontend...
start "Frontend" /D "%~dp0\react-frontend" npm run dev

echo.
echo All services started!
echo Frontend will be available at http://localhost:3002 (or another port if 3001 is in use)
echo Backend API will be available at http://localhost:8000
echo Database is running on Docker
echo.
pause