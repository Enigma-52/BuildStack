console.log('Running setup.ts...');
import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });
console.log('Environment variables loaded.');

// Store original console.error
const originalError = console.error;

// Override console.error to suppress specific messages
console.error = (...args) => {
  if (
    args[0]?.includes('Monitoring Error') || 
    args[0]?.toString().includes('Could not load the default credentials')
  ) {
    return;
  }
  originalError.call(console, ...args);
};

module.exports = async () => {
  console.log('Setting up test database...');

  try {
    await execSync('npm run prisma:generate', { stdio: 'inherit' });
    console.log('Test database ready.');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }

  return () => {
    console.error = originalError;
  };
};