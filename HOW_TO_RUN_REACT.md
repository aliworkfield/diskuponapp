# How to Run the DisKuponApp

## Prerequisites
1. Docker Desktop (for database)
2. Node.js (for React frontend)
3. Python (for backend, if running locally)

## Quick Start Instructions

### Option 1: Run with Docker Compose (Recommended)
1. Copy `.sample.env` to `.env`:
   ```
   cp .sample.env .env
   ```

2. Start the database:
   ```
   docker-compose up -d db
   ```

3. Wait 2-3 minutes for the database to initialize

4. Start the backend (in a separate terminal):
   ```
   ./run_backend.ps1
   ```

5. Start the React frontend (in another terminal):
   ```
   cd react-frontend
   npm run dev
   ```

### Option 2: Run Everything with Docker Compose
1. Copy `.sample.env` to `.env`:
   ```
   cp .sample.env .env
   ```

2. Start all services:
   ```
   docker-compose up -d
   ```

3. Wait 2-3 minutes for initialization

4. Access the application:
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:8000
   - Swagger UI: http://localhost:8000/docs

## Stopping Services
To stop all services:
```
docker-compose down
```

## Troubleshooting
- If ports are already in use, modify the port mappings in `docker-compose.yml`
- If you get permission errors, make sure Docker Desktop is running
- If the frontend doesn't connect to the backend, check that the backend is running on port 8000