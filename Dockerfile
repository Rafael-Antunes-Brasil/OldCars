FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY tsconfig.json ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]