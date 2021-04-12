module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  extends: ["eslint:recommended", "plugin:sonarjs/recommended", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  plugins: ["sonarjs"],
  rules: {
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always"],
    "no-console": [
      "error",
      {
        allow: ["warn", "error", "info"],
      },
    ],
    "prefer-promise-reject-errors": "error",
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
    "no-var": "error",
    "no-unused-vars": "error",
  },
};
