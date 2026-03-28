import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        exports: "writable",      // <--- ADD THIS
        setInterval: "readonly"   // <--- ADD THIS
      }
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": "warn"
    }
  },
  eslintConfigPrettier
];
