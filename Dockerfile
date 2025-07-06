FROM node:20-slim

RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    pkg-config \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN npm ci

# Generate types and permissions
RUN npm run generate:zero

# Pre-deploy permissions (so we don’t do it at runtime)
RUN npx zero-deploy-permissions -p ./zero-schema-permissions.ts

# Build production app
RUN npm run build

EXPOSE $PORT

CMD ["npm", "start"]