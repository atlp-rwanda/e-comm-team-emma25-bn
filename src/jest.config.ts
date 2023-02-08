export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageThreshold: {
    global: {
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageReporters: ['lcov', 'text'],
  collectCoverage: true,
  coverageDirectory: '../coverage',
}
