module.exports = {
  extends: ['plugin:vue/recommended', 'airbnb-base'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'global-require': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'no-new': 'off',
  },
};
