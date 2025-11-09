/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  verbose: true,
  // extensionsToTreatAsEsm: ['.ts'],
  testPathIgnorePatterns: ['dist', 'node_modules'],
  transform: {
    '(\\.ts$|@mylib)': ['ts-jest', {}],
  },
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
