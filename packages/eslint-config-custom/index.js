module.exports = {
  extends: ['next', 'prettier', 'turbo'],
  // settings: {
  //   next: {
  //     rootDir: ['apps/*/', 'packages/*/'],
  //   },
  // },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'turbo/no-undeclared-env-vars': 'off',
  },
}
