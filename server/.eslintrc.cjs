module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
  ],
  ignorePatterns: [
    "*_tests.js",
    "./node_modules/**",
    ".eslintrc.cjs"
  ],
  rules: {
    "no-console": "off",
  }
};
