import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import globals from 'globals';

// 从 vue-eslint-parser 导入解析器
import vueParser from 'vue-eslint-parser';

export default [
  // 基础配置
  {
    ignores: ['dist/*', 'node_modules/*', '*.config.js']
  },

  // JavaScript/TypeScript 文件的配置
  {
    files: ['**/*.{js,ts}'],
    ...eslint.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      },
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      // TypeScript 规则
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_'
      }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', {
        'prefer': 'type-imports'
      }],

      // ECMAScript 规则
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-unused-vars': 'off', // 使用 TypeScript 的规则
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline']
    }
  },

  // Vue 文件的配置
  {
    files: ['**/*.vue'],
    plugins: {
      'vue': vue
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parser: vueParser,
      parserOptions: {
        parser: tsparser,
        sourceType: 'module',
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue'],
        vueFeatures: {
          filter: false,
          interpolationAsNonHTML: true,
          styleCSSVariableInjection: true
        }
      }
    },
    processor: vue.processors['.vue'],
    rules: {
      // Vue 3 规则
      'vue/multi-word-component-names': 'off',
      'vue/component-api-style': ['error', ['script-setup', 'composition']],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/define-macros-order': ['error', {
        order: ['defineProps', 'defineEmits', 'defineSlots']
      }],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/html-closing-bracket-newline': ['error', {
        'singleline': 'never',
        'multiline': 'always'
      }],
      'vue/html-indent': ['error', 2],
      'vue/max-attributes-per-line': ['error', {
        'singleline': 3,
        'multiline': 1
      }],
      'vue/no-unused-refs': 'error',
      'vue/no-v-html': 'warn',
      'vue/prefer-separate-static-class': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/require-typed-ref': 'error',

      // 模板中的间距规则
      'vue/html-closing-bracket-spacing': 'error',
      'vue/mustache-interpolation-spacing': 'error',
      'vue/no-multi-spaces': 'error',
      'vue/no-spaces-around-equal-signs-in-attribute': 'error'
    }
  }
]; 