// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const reactNativePlugin = require('eslint-plugin-react-native');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      'react-native': reactNativePlugin,
    },
    rules: {
      'react-native/no-raw-text': [
        'error',
        {
          skip: ['ThemedText', 'NativeTabs.Trigger.Label', 'Link'],
        },
      ],
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',

      // React 19 / JSX transform cleanups
      'react/jsx-uses-react': 'off',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['default'],
              message:
                "Default import `import React from 'react'` is not needed in React 19. Use named imports (e.g. `import { useState } from 'react'`) instead.",
            },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "ImportDeclaration[importKind!='type'][source.value='react'] > ImportNamespaceSpecifier",
          message:
            "Do not import `* as React` in React 19. Use named imports (e.g. `import { useState } from 'react'`) instead.",
        },
      ],
    },
  },
  {
    files: ['**/*.web.*'],
    rules: {
      'react-native/no-raw-text': 'off',
    },
  },
  {
    ignores: ['dist/*'],
  },
]);
