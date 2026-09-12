import { ExpoConfig, ConfigContext } from 'expo/config';
import packageJson from './package.json';

export default ({ config }: ConfigContext): ExpoConfig => {
  const rawBuildNumber = process.env.BUILD_NUMBER || process.env.VERSION_CODE || '1';
  const buildNumber = String(rawBuildNumber);
  const versionCode = parseInt(rawBuildNumber, 10) || 1;

  return {
    ...config,
    name: 'karyavali',
    slug: 'karyavali',
    version: packageJson.version,
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'karyavali',
    userInterfaceStyle: 'automatic',
    ios: {
      icon: './assets/expo.icon',
      bundleIdentifier: 'com.karyavali.app',
      buildNumber,
    },
    android: {
      package: 'com.karyavali.app',
      versionCode,
      predictiveBackGestureEnabled: false,
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
    },
    web: {
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          backgroundColor: '#208AEF',
          image: './assets/images/splash-icon.png',
          imageWidth: 76,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  };
};
