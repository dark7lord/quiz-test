// module.exports = {
//   testEnvironment: 'jest-environment-jsdom',
//   setupFilesAfterEnv: ['./jest.setup.js'],
//   moduleNameMapper: {
//     '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
//   },
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//   },
// };

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
};