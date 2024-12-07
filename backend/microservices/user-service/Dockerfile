FROM node:18-alpine

WORKDIR /app

# Copy package files first to leverage cache
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy Prisma schema and generate
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of the code
COPY . .

# Expose ports - both HTTP and gRPC
EXPOSE 3000
EXPOSE 50051

# Use production mode instead of dev in Docker
CMD ["npm", "run", "start"]