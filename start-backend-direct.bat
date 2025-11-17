@echo off
echo Starting Backend without Docker...

echo.
echo Checking if Python is installed...
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python is installed
) else (
    echo [ERROR] Python not found. Please install Python.
    pause
    exit /b 1
)

echo.
echo Installing backend dependencies...
cd /d "%~dp0\backend\app"
pip install -r ../requirements.txt 2>nul
if %errorlevel% == 0 (
    echo [OK] Dependencies installed
) else (
    echo [INFO] Using existing dependencies or skipping installation
)

echo.
echo Starting backend server on port 8000...
echo Backend will be available at http://localhost:8000
echo Press Ctrl+C to stop the server
echo.

python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload