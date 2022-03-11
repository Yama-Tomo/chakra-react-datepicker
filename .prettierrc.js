module.exports = {
  // https://github.com/trivago/prettier-plugin-sort-imports/blob/5ce566baaaa86c73d4e206deb3eacca2c4e6d6b8/docs/TROUBLESHOOTING.md#q-why-the-plugin-does-not-work-with-pnpm--or-why-do-i-see-the-warn-ignored-unknown-option-
  plugins: [require('@trivago/prettier-plugin-sort-imports')],
  singleQuote: true,
  printWidth: 100,
  importOrder: ['^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
};
