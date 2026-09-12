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
