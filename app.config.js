// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const bundleIdentifier = 'com.company.app';

module.exports = {
  name:  'My Work App',
  slug: 'delta',
  owner: 'fluidtruck',
  scheme: 'fluidlt',
  version: '1.6.4',
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  icon: './src/assets/delta.png',
  privacy: 'unlisted',
  plugins: [  ],
  splash: {
    image: './src/assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['./src/assets/**/*.png', './src/assets/icons/**/*.svg'],
  ios: {
    bundleIdentifier,
    buildNumber: '1.6.4',
    infoPlist: {
      NSCameraUsageDescription: 'This app uses the camera to take pictures & video.',
      NSMicrophoneUsageDescription: 'This app may use your microphone.',
      LSApplicationQueriesSchemes: ['comgooglemaps', 'waze'],
    },
  },
  extra: {
    api: 'https://api.stage.io/',
  },
};
