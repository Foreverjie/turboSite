const path = require('path')

const fromRoot = d => path.join(__dirname, d)

// Base configuration
module.exports = {
  // Root level configuration for running all tests
  roots: [fromRoot('apps/web'), fromRoot('apps/server')],
  testEnvironment: 'jsdom', // Default for web tests
  setupFilesAfterEnv: [fromRoot('apps/web/setupTests.ts')],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],

  // Transform configuration
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'esbuild-jest',
      {
        loaders: {
          '.js': 'jsx',
          '.jsx': 'jsx',
          '.ts': 'tsx',
          '.tsx': 'tsx',
        },
        target: 'node14',
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
      },
    ],
  },

  // Module name mapping
  moduleNameMapper: {
    '^~/(.*)$': fromRoot('apps/web/$1'),
    '^@/(.*)$': fromRoot('apps/web/$1'),
    '@src/(.*)': fromRoot('apps/web/src/$1'),
  },

  // Test path patterns
  testMatch: [
    '<rootDir>/apps/web/test/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/apps/web/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/apps/web/**/*.(test|spec).{js,jsx,ts,tsx}',
    '<rootDir>/apps/server/test/**/*.{js,ts}',
    '<rootDir>/apps/server/**/__tests__/**/*.{js,ts}',
    '<rootDir>/apps/server/**/*.(test|spec).{js,ts}',
  ],

  // Paths to ignore
  testPathIgnorePatterns: [
    '<rootDir>/apps/web/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/packages/', // Ignore package tests for now
    'setupTests\\.(js|ts)$', // Ignore setup files as tests
  ],

  // Transform ignore patterns
  transformIgnorePatterns: [
    'node_modules/(?!(@?react-hotkeys-hook|@?testing-library)/)',
  ],

  // Coverage configuration
  collectCoverageFrom: [
    'apps/*/src/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/stories/**',
  ],
  coverageDirectory: '<rootDir>/coverage',

  // Test environment overrides for server tests
  testEnvironmentOptions: {
    url: 'http://localhost',
  },

  // Reset mocks between tests
  resetMocks: true,

  // Global setup for React
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx',
      },
    },
  },
}
