module.exports = {
  'env': {
    'browser': true,
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', { 'code': 120 }],
    'no-undef': 'off',
  },
};
