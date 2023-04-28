export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRunner: "jest-circus/runner",
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: '../coverage',
  collectCoverage: true,
  verbose: true,
}
