#!/bin/bash
set -e

HOST="digitalocean"
DIR="/var/www/cateringhub"

echo "🚀 Deploying CateringHub..."

echo "📦 Pushing code..."
git push origin main
git push $HOST main

echo "🔧 Running remote commands..."
ssh $HOST << 'EOF'
    set -e
    cd /var/www/cateringhub

    echo "  ↳ Pulling latest code..."
    git pull origin main

    echo "  ↳ Installing Composer dependencies..."
    COMPOSER_ALLOW_SUPERUSER=1 /usr/bin/php8.4 /usr/local/bin/composer install --no-dev --no-interaction --optimize-autoloader

    echo "  ↳ Installing npm & building..."
    npm install --ignore-scripts --legacy-peer-deps
    npm run build

    echo "  ↳ Running migrations..."
    /usr/bin/php8.4 artisan migrate --force

    echo "  ↳ Caching..."
    /usr/bin/php8.4 artisan config:cache
    /usr/bin/php8.4 artisan route:cache
    /usr/bin/php8.4 artisan view:cache

    echo "  ↳ Setting permissions..."
    chown -R www-data:www-data storage bootstrap/cache database public/build
    chmod -R 775 storage bootstrap/cache database

    echo "  ↳ Restarting queue..."
    systemctl restart cateringhub-queue

    echo "  ↳ Reloading PHP & Nginx..."
    systemctl reload php8.4-fpm
    systemctl reload nginx
EOF

echo "✅ Deploy complete!"
