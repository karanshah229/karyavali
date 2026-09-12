import { ExpoConfig, ConfigContext } from 'expo/config';
import packageJson from './package.json';

export default ({ config }: ConfigContext): ExpoConfig => {
  const rawBuildNumber = process.env.BUILD_NUMBER || process.env.VERSION_CODE || '1';
  const buildNumber = String(rawBuildNumber);
  const versionCode = parseInt(rawBuildNumber, 10) || 1;

  return {
    ...config,
    name: config.name || 'karyavali',
    slug: config.slug || 'karyavali',
    version: packageJson.version,
    ios: {
      ...config.ios,
      bundleIdentifier: config.ios?.bundleIdentifier || 'com.karyavali.app',
      buildNumber,
    },
    android: {
      ...config.android,
      package: config.android?.package || 'com.karyavali.app',
      versionCode,
    },
  };
};
