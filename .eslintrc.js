module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.VUE_APP_ENV === 'dev' ? 'warn' : 'off',
    'no-debugger': process.env.VUE_APP_ENV === 'dev' ? 'warn' : 'off'
  }
}
