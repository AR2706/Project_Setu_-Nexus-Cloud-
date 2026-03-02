import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // 1. Use standard recommended rules
  js.configs.recommended,
  
  // 2. Set up our custom environment rules
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly"
      }
    },
    rules: {
      "no-console": "off", // We want to allow console.log
      "no-unused-vars": "warn" // Warn us if we create a variable but don't use it
    }
  },
  
  // 3. Turn off any ESLint rules that conflict with Prettier
  eslintConfigPrettier
];
