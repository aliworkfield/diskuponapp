#!/usr/bin/env bash
set -e

# Directly run the celery worker without the pre-start script
celery -A app.worker worker -l info -Q main-queue -c 1