#!/bin/bash
cp /tmp/default.conf /todo-app-configs/nginx/

# Collect static files
sleep 5

echo "=== start ===="
cd /backend
python3 manage.py collectstatic

python3 manage.py makemigrations
until python3 manage.py migrate; do
  sleep 2
  echo "Retry!";
done


gunicorn backend.wsgi -b 0.0.0.0:8080
