module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/src/components/__tests__/**/*.test.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
};