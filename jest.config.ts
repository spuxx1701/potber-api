import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  modulePaths: ['<rootDir>'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s', 'src/*app*.(t|j)s'],
  coverageDirectory: '../coverage',
  modulePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    'main.ts',
    'module.ts',
    'resources',
    'types',
  ],
  testEnvironment: 'node',
};

export default config;
