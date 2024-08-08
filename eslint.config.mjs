import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: path.join(__dirname, "./src"),
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends("eslint:recommended", "plugin:prettier/recommended"),
    {
        ignores: ["./docs/**"],

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },

        rules: {
            "prettier/prettier": "error",
            eqeqeq: ["error", "always"],
            quotes: ["error", "double"],
            semi: ["error", "always"],
            "comma-dangle": ["error", "never"],
            indent: ["error", 4],
            "prefer-arrow-callback": ["error"],
            "func-style": ["error", "expression"]
        }
    }
];
