import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

module.exports = async () => {
  console.log('Tearing down test database...');
  
  try {
    // Disconnect Prisma
    await prisma.$disconnect();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('All connections closed successfully');

    // Force process exit after cleanup
    process.exit(0);
  } catch (error) {
    console.error('Error during teardown:', error);
    process.exit(1);
  }
};