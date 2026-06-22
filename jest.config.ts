import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.module\\.scss$': 'identity-obj-proxy',
    '\\.scss$': 'identity-obj-proxy',
    // Mock react-markdown to avoid ESM issues in Jest
    '^react-markdown$': '<rootDir>/src/__mocks__/react-markdown.tsx',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx', esModuleInterop: true } }],
  },
};

export default config;
