// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    node:   true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType:  'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: { version: 'detect' }
  },
  plugins: [
    'react',
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // this is what makes JSX‐only imports “used”
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended'
  ],
  rules: {
    // React 17+ with new JSX transform
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    // Warn on console.*
    // 'no-console': 'warn',
    // Hand off formatting to Prettier
    'prettier/prettier': [
      'error',
      {
        semi:        true,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100,
        tabWidth:    2
      }
    ]
  },
  ignorePatterns: [
    'build/'
  ]
};