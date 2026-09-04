#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "Building frontend..."
npm install
npm run build
cp -a dist/. "$ROOT/"

if [ -f "$ROOT/backend/artisan" ]; then
  cd "$ROOT/backend"
  echo "Installing Laravel..."
  composer install --no-dev --optimize-autoloader --no-interaction
  php artisan migrate --force --no-interaction
  php artisan db:seed --class=CourseSeeder --force --no-interaction
  php artisan config:clear --no-interaction
  php artisan view:clear --no-interaction
fi

echo "Live deploy complete."
