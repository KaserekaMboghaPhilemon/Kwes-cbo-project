import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    plugins: { react },
    settings: { react: { version: 'detect' } },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Treat identifiers used in JSX (e.g. `motion` in `<motion.div>`) as
      // used so no-unused-vars doesn't flag them.
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'error',
      // Components used in JSX (PascalCase) aren't always recognized as
      // "used" without eslint-plugin-react/jsx-uses-vars, so we whitelist
      // PascalCase identifiers in both var and arg positions.
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^[A-Z_]',
          argsIgnorePattern: '^(_|[A-Z])',
        },
      ],
      // Context files conventionally export both a Provider component and a
      // hook (useTheme, useLanguage). Splitting them into separate files just
      // to satisfy fast-refresh would hurt readability for zero runtime gain.
      'react-refresh/only-export-components': 'off',
      // React 19 ships an experimental rule that flags every setState inside
      // useEffect. The patterns here (close menu on route change, dismiss
      // tooltip when sidebar opens, seed greeting on first open) are
      // intentional and correct. We keep the rule off to avoid noise.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  // Server: Node globals, no React rules.
  {
    files: ['server/**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.node },
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
])
