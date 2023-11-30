const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.config.js'],
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(customJestConfig);
