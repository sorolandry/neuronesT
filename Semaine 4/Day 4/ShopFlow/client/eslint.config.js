// ShopFlow/client/eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier'; // Importe le plugin Prettier
import prettierConfig from 'eslint-config-prettier'; // Importe la config Prettier

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    // Ajoute la configuration des plugins et extends pour Prettier ici
    plugins: {
      prettier: prettierPlugin, // Active le plugin Prettier
    },
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettierConfig, // Important: place ceci en dernier pour qu'il désactive les règles en conflit
    ],
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }], // Mis à 'warn' pour être moins strict en développement
      // Ajoute la règle 'prettier/prettier' avec les options
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          semi: true,
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 80,
          tabWidth: 2,
          useTabs: false,
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off', // Souvent désactivé avec les composants fonctionnels modernes et/ou TypeScript
    },
  },
]);
