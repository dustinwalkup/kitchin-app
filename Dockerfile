FROM rocicorp/zero:0.21.2025070200

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run generate:zero
RUN npx zero-deploy-permissions -p ./zero-schema-permissions.ts
RUN npm run build

EXPOSE $PORT

CMD ["npm", "start"]