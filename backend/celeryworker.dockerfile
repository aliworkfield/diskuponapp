FROM python:3.11
WORKDIR /app/

# Install all project dependencies directly
RUN pip install --no-cache-dir --upgrade pip && \
    pip install inboard[fastapi]==0.68.* python-multipart>=0.0.9 email-validator>=1.3.0 requests>=2.31.0 celery>=5.4.0 passlib[bcrypt]>=1.7.4 tenacity>=8.2.3 pydantic>=2.7.1 pydantic-settings>=2.2.1 emails>=0.6.0 raven>=6.10.0 jinja2>=3.1.2 alembic>=1.13.1 sqlalchemy>=2.0.29 python-jose[cryptography]>=3.3.0 httpx>=0.27.0 neo4j>=5.19.0 neomodel>=5.3.0 psycopg[binary]>=3.1.18 setuptools>=69.5.1 pytest>=8.2.0

COPY ./app/ /app/
RUN chmod +x /app/worker-start.sh

# Set PYTHONPATH
ENV PYTHONPATH=/app

# For development, Jupyter remote kernel
# ARG INSTALL_JUPYTER=false
# RUN bash -c "if [ $INSTALL_JUPYTER == 'true' ] ; then pip install jupyterlab ; fi"

CMD ["bash", "worker-start.sh"]