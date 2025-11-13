# How to Run the Coupon Management Application

## Prerequisites
- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)
- Windows environment (for Windows Authentication simulation)

## Docker Desktop Configuration

Before running the application, ensure Docker Desktop is properly configured:

1. **Start Docker Desktop** if it's not already running
2. **Switch to Windows Containers mode** (if needed):
   - Right-click Docker Desktop icon in system tray
   - Select "Switch to Windows containers" (if available)
   - Note: This may require a restart of Docker Desktop
3. **Verify Docker is working**:
   ```bash
   docker run hello-world
   ```

## Quick Start

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd diskuponapp
   ```

2. **Run development setup script** (optional but recommended):
   ```bash
   python dev_setup.py
   ```
   This script will check prerequisites and set up the .env file.

3. **Set up environment variables**:
   ```bash
   # The .env file should already be created from .sample.env
   # Review and modify values in .env as needed
   ```

4. **Start the application**:
   ```bash
   docker compose up -d
   ```

5. **Monitor startup progress**:
   ```bash
   docker compose logs -f
   ```
   Wait until you see messages indicating the services are ready.

6. **Verify setup** (optional):
   ```bash
   python verify_setup.py
   ```

7. **Access the application**:
   - Frontend: http://localhost
   - Backend API: http://localhost/api/
   - Swagger UI: http://localhost/docs
   - PGAdmin: http://localhost:5050

## Windows Authentication Simulation

During development, Windows Authentication is simulated:
- The system looks for `X-Windows-Username` header in requests
- If not found, it uses the `WINDOWS_USERNAME` environment variable
- Default development user: `devuser@example.com`

To test with a specific user, you can add the header to your requests:
```bash
curl -H "X-Windows-Username: testuser@example.com" http://localhost/api/v1/login/windows
```

## Default Users

After first run, the system creates:
- **Admin User**: admin@diskuponapp.com (password set in .env)
- **Default Roles**: User, Manager, Admin

## Testing the Application

1. **Access the frontend**: Open http://localhost in your browser
2. **Login**: The system will automatically authenticate using Windows Authentication
3. **Navigate**: Use the navigation menu to access different features:
   - Dashboard: Overview of the system
   - My Coupons: View coupons assigned to you
   - Coupon Management: Upload and assign coupons (Manager/Admin)
   - User Management: Manage user roles (Admin only)

## Stopping the Application

To stop all services:
```bash
docker compose down
```

To stop and remove all data (including database):
```bash
docker compose down -v
```

## Troubleshooting

1. **First startup delay**: The application may take 2-3 minutes to start as it initializes the database and runs migrations
2. **Docker daemon issues**:
   - Ensure Docker Desktop is running
   - Check if Docker Desktop is set to use the correct container type (Windows/Linux)
   - Restart Docker Desktop if needed
   - Run `docker run hello-world` to verify Docker is working
3. **Check logs**: If services aren't responding, check the logs:
   ```bash
   docker compose logs backend
   docker compose logs db
   docker compose logs frontend
   ```
4. **Database issues**: If you encounter database errors, try resetting with:
   ```bash
   docker compose down -v
   docker compose up -d
   ```
5. **Port conflicts**: If you see port binding errors, ensure no other services are using ports 80, 5432, 5050, 7474, 5555, 8090
6. **Image build issues**: If you see image build errors, try:
   ```bash
   docker compose build --no-cache
   docker compose up -d
   ```

## API Testing

You can test the API using the provided examples in `API_USAGE_EXAMPLES.md` or use the interactive Swagger UI at http://localhost/docs