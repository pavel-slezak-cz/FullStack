const eslint = require('@eslint/js');

module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@stylistic/js'],
    extends: [
        eslint.configs.recommended,
    ],
    rules: {
        // můžeš přidat vlastní pravidla
    },
};
