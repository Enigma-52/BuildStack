console.log('Running setup.ts...');
import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });
console.log('Environment variables loaded.');

module.exports = async () => {
  console.log('Setting up test database...');

  // Run Prisma migrations
  try {
    await execSync('npm run prisma:migrate', { stdio: 'inherit' });
    await execSync('npm run prisma:generate', { stdio: 'inherit' });
    console.log('Test database ready.');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
};
