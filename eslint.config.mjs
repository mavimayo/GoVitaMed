import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    plugins: ["unused-imports"], // ✅ Correct way to reference the plugin
    rules: {
      // Code Style
      semi: ["error", "always"],
      quotes: ["error", "double", { avoidEscape: true }],
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "unused-imports/no-unused-imports": "error", // ✅ Correct rule usage
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "no-var": "error",
      "prefer-const": "error",
      "object-shorthand": "error",
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "newline-before-return": "error",

      // Next.js Specific
      "@next/next/no-img-element": "error",
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-sync-scripts": "error",
      "@next/next/google-font-display": "warn",

      // React & JSX
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "always", children: "never" },
      ],
      "react/no-array-index-key": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // TypeScript
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",

      // Accessibility
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/aria-role": ["error", { ignoreNonDOM: true }],

      // Best Practices
      "no-shadow": "warn",
      eqeqeq: ["error", "always"],
      "consistent-return": "warn",
      curly: ["error", "multi-line"],
      "default-case": "warn",
    },
  }),
];

export default eslintConfig;
