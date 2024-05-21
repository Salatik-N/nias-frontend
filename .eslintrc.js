module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:prettier/recommended', // Добавьте это
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
