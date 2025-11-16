@echo off
echo Starting Database...
cd /d "%~dp0"
docker-compose up db
pause