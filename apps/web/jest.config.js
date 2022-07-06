const base = require('../../jest.config')

module.exports = {
  ...base,
  name: 'web',
  displayName: 'Web App Tests',
  setupFiles: ['./test/setupTests.ts'],
}
