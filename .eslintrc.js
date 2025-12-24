module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'import/extensions': ['error', 'always'],
    'no-plusplus': 'off',
    'no-param-reassign': ['error', { 'props': false }],
    'max-len': ['error', { 'code': 120 }],
    'no-use-before-define': ['error', { 'functions': false }]
  }
}