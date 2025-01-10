FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files first to leverage cache
COPY package*.json ./

# Install ALL dependencies since we need them for dev mode
RUN npm ci

# Copy Prisma schema and generate
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of the code
COPY . .

# Expose ports - both HTTP and gRPC
EXPOSE 3000
EXPOSE 50051

# Use ts-node-dev for development with hot reloading
CMD ["npm", "run", "dev"]