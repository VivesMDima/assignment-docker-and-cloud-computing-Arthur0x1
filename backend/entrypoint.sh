#!/usr/bin/env sh

# Run migrations
npx prisma migrate dev --name init --schema backend/prisma/schema.prisma

exec node dist/index.js "$@"
