import antfu from '@antfu/eslint-config';
import perfectionistAlphabetical from 'eslint-plugin-perfectionist/configs/recommended-alphabetical';
import nuxt from './.nuxt/eslint.config.mjs';

export default antfu(
  {
    typescript: true,
    formatters: true,
    vue: true,
    stylistic: {
      indent: 2,
      semi: true,
      maxLen: 80,
    },
  },
  nuxt,
  {
    files: ['**/*.vue'],
    rules: {
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/attributes-order': [
        'error',
        {
          alphabetical: true,
        },
      ],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/component-options-name-casing': ['error', 'PascalCase'],
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      'vue/html-comment-content-spacing': ['error', 'never'],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            component: 'always',
            normal: 'always',
            void: 'any',
          },
          math: 'always',
          svg: 'always',
        },
      ],
      'vue/multi-word-component-names': 0,
      'vue/next-tick-style': ['error', 'promise'],
      'vue/order-in-components': 0,
      'vue/prefer-separate-static-class': ['error'],
      'vue/prefer-true-attribute-shorthand': ['error', 'always'],
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/v-on-event-hyphenation': ['error', 'always'],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'never',
          selfClosingTag: {
            singleline: 'never',
            multiline: 'never',
          },
        },
      ],
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      }],
    },
  },
  {
    files: ['**/*.{ts,vue}'],
    ...perfectionistAlphabetical,
    ...{
      rules: {
        ...perfectionistAlphabetical.rules,
        'perfectionist/sort-vue-attributes': 0,
      },
    },
  },
);
