# Set environment variables from .env file
$env:DOMAIN="localhost"
$env:STACK_NAME="diskuponapp-com"
$env:TRAEFIK_PUBLIC_NETWORK="traefik-public"
$env:TRAEFIK_TAG="diskuponapp.com"
$env:TRAEFIK_PUBLIC_TAG="traefik-public"
$env:DOCKER_IMAGE_BACKEND="backend"
$env:DOCKER_IMAGE_CELERYWORKER="celeryworker"
$env:DOCKER_IMAGE_FRONTEND="frontend"

# Backend settings
$env:BACKEND_APP_MODULE="app.main:app"
$env:BACKEND_CORS_ORIGINS='["http://localhost", "http://localhost:4200", "http://localhost:3000", "http://localhost:8080", "https://localhost", "https://localhost:4200", "https://localhost:3000", "https://localhost:8080", "http://dev.diskuponapp.com", "https://stag.diskuponapp.com", "https://diskuponapp.com", "http://local.dockertoolbox.tiangolo.com", "http://localhost.tiangolo.com"]'
$env:BACKEND_PRE_START_PATH="/app/prestart.sh"
$env:PROJECT_NAME="DisKuponApp"
$env:SECRET_KEY="changethis"
$env:TOTP_SECRET_KEY="changethis"
$env:FIRST_SUPERUSER="admin@diskuponapp.com"
$env:FIRST_SUPERUSER_PASSWORD="changethis"
$env:SMTP_TLS="True"
$env:SMTP_PORT="587"
$env:USERS_OPEN_REGISTRATION="True"

# Server settings
$env:SERVER_NAME="localhost"
$env:SERVER_HOST="http://localhost:8000"

# Postgres settings
$env:POSTGRES_SERVER="localhost"
$env:POSTGRES_USER="postgres"
$env:POSTGRES_PASSWORD="changethis"
$env:POSTGRES_DB="app"

# PgAdmin settings
$env:PGADMIN_LISTEN_PORT="5050"
$env:PGADMIN_DEFAULT_EMAIL="admin@diskuponapp.com"
$env:PGADMIN_DEFAULT_PASSWORD="changethis"

# Neo4j settings
$env:NEO4J_SERVER="localhost"
$env:NEO4J_USERNAME="neo4j"
$env:NEO4J_PASSWORD="changethis"
$env:NEO4J_AUTH="neo4j:changethis"
$env:NEO4J_BOLT="bolt"

# Run the backend
cd backend/app
hatch run production:uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload