FROM node:22-alpine AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat

FROM base AS dev

ENV NODE_ENV=development
ENV PORT=3000

COPY package.json package-lock.json ./
RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "dev"]