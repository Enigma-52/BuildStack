import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

module.exports = async () => {
  console.log('Tearing down test database...');
  await prisma.$disconnect();
};
