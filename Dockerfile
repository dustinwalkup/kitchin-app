FROM node:20-slim

# Install Python and build tools
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    pkg-config \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies without running postinstall
RUN npm ci --ignore-scripts

# Copy all source files
COPY . .

# Run the zero generation manually
RUN npm run generate:zero

# Build the application
RUN npm run build

# Expose port
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]