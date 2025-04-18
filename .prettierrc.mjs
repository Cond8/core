// .prettierrc.mjs

/** @type {import("prettier").Config} */
export default {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'auto',
  jsxSingleQuote: false,
  printWidth: 80,
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-organize-imports'],
};
