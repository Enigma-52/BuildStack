require('dotenv').config({ path: '.env.test' });

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './tests/setup.ts',
  globalTeardown: './tests/teardown.ts',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Handle .js extensions in imports
  },
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        allowJs: true,
      }
    ]
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    '!**/node_modules/**'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
};