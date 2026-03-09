#!/bin/bash
set -e

echo "Running Prisma dev migrations..."
docker exec application npx prisma migrate dev

echo "Generating Prisma client..."
docker exec application npx prisma generate

echo "Prisma dev setup completed."