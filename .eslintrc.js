module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    'react': {
      'createClass': 'createReactClass', 
      'pragma': 'React',
      'version': 'detect',
    },
  },
  rules: {
    complexity: 'error',
    eqeqeq: ['error', 'always', {'null': 'ignore'}],
    indent: ['error', 2],
    'max-len': ['error', { 'code': 120 }],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'none',
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
    }]
  }
}
