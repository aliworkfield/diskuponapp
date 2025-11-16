FROM ghcr.io/br3ndonland/inboard:fastapi-0.68-python3.11

# Use file.name* in case it doesn't exist in the repo
COPY ./app/ /app/
WORKDIR /app/

# Install project dependencies directly using pip
RUN pip install --no-cache-dir --upgrade pip && \
    pip install inboard[fastapi]==0.68.* python-multipart>=0.0.9 email-validator>=1.3.0 requests>=2.31.0 celery>=5.4.0 passlib[bcrypt]>=1.7.4 tenacity>=8.2.3 pydantic>=2.7.1 pydantic-settings>=2.2.1 emails>=0.6.0 raven>=6.10.0 jinja2>=3.1.2 alembic>=1.13.1 sqlalchemy>=2.0.29 python-jose[cryptography]>=3.3.0 httpx>=0.27.0 neo4j>=5.19.0 neomodel>=5.3.0 psycopg[binary]>=3.1.18 setuptools>=69.5.1 pytest>=8.2.0

# For development, Jupyter remote kernel
# Using inside the container:
# jupyter lab --ip=0.0.0.0 --allow-root --NotebookApp.custom_display_url=http://127.0.0.1:8888
ARG INSTALL_JUPYTER=false
RUN bash -c "if [ $INSTALL_JUPYTER == 'true' ] ; then pip install jupyterlab ; fi"
RUN bash -c "pip install argon2_cffi"

ARG BACKEND_APP_MODULE=app.main:app
ARG BACKEND_PRE_START_PATH=/app/prestart.sh
ARG BACKEND_PROCESS_MANAGER=gunicorn
ARG BACKEND_WITH_RELOAD=false
ENV APP_MODULE=${BACKEND_APP_MODULE} PRE_START_PATH=${BACKEND_PRE_START_PATH} PROCESS_MANAGER=${BACKEND_PROCESS_MANAGER} WITH_RELOAD=${BACKEND_WITH_RELOAD}