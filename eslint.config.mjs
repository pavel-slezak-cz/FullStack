import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
        },
        plugins: {
            react,
        },
        rules: {
            'react/react-in-jsx-scope': 'off', // není potřeba v React 17+
            'no-unused-vars': 'warn',
            'no-console': 'off', // můžeš zapnout na 'warn', pokud nechceš logy v produkci
        },
    },
];
