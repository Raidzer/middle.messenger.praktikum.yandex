import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        __dirname: true,
      },
    },
  },
  {
    ignores: ["**/build/*", "**/node_modules/*"],
  }
);
