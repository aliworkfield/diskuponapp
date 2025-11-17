@echo off
echo Starting Backend with Database...
cd /d "%~dp0"
echo Starting database with Docker...
docker-compose up -d db

echo.
echo Waiting for database to initialize (30 seconds)...
timeout /t 30 /nobreak >nul

echo.
echo Starting backend...
powershell -ExecutionPolicy Bypass -File "run_backend.ps1"
pause