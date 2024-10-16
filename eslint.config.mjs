import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
	files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
	rules: {
		'no-console': 'off',
		'semi': ['error', 'always'],
		'import/no-unresolved': 'off',
		'import/named': 'error',
		'import/order': [
			'error',
			{
				'groups': ['builtin', 'external', 'parent', 'sibling', 'index'],
				'newlines-between': 'always',
			},
		],
		'vue/no-multiple-template-root': 'error',
		'vue/multi-word-component-names': ['off', { ignores: ['index'] }],

		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'error',
	},
});
