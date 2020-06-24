import theme from './theme';

export default {
  expo: {
    name: 'KT11モバイルアプリ',
    slug: 'kt11-mobile-app',
    githubUrl: 'https://github.com/shrry2/kt11-mobile-app/',
    platforms: [
      'ios',
      'android',
    ],
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: theme.themeColor,
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: [
      '**/*',
    ],
    ios: {
      supportsTablet: true,
    }
  }
};
