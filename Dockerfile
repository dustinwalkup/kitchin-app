FROM ghcr.io/rocicorp/zero:latest

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run generate:zero
RUN npx zero-deploy-permissions -p ./zero-schema-permissions.ts
RUN npm run build

EXPOSE $PORT

CMD ["npm", "start"]