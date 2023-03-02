module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "ES6", // Allows the use of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  "rules": {
    "@typescript-eslint/no-var-requires": "error"
  },
  extends: ["plugin:@typescript-eslint/recommended"], // Uses the linting rules from @typescript-eslint/eslint-plugin
  env: {
    node: true, // Enable Node.js global variables
  },
};