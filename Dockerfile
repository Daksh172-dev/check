# Optional root Dockerfile for CI base image
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY apps ./apps
COPY packages ./packages
COPY prisma ./prisma
RUN npm install
CMD ["npm", "run", "build"]
