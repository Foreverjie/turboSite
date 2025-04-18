module.exports = {
  root: true,
  extends: ['custom'],
  rules: {
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: 'useIsomorphicLayoutEffect',
      },
    ],
    //  displayName is not needed in the app
    'react/display-name': 'off',
  },
}
