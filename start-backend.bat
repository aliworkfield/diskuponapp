@echo off
echo Starting Backend...
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "run_backend.ps1"
pause