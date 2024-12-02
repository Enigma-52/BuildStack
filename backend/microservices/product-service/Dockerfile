FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run prisma:generate
RUN npm run build

EXPOSE 3001
EXPOSE 50051

CMD ["npm", "run" , "dev"]