import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    transform: {
      '^.+\\.(ts|tsx)$': 'babel-jest',
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    roots: ['<rootDir>/src'],
    setupFilesAfterEnv: ['<rootDir>/setup-test.ts'],
  }
}
