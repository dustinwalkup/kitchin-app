FROM node:20-slim

# Install Python and build tools
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --production=false

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]