module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native-firebase|@react-navigation|@reduxjs|@stripe|immer|react-redux|react-native-safe-area-context|react-native-screens|react-native-gesture-handler|react-native-reanimated|react-native-worklets|react-native-svg|react-native-responsive-fontsize|react-native-responsive-screen|react-native-iphone-x-helper|react-native-raw-bottom-sheet|react-native-linear-gradient|react-native-select-dropdown|react-native-image-crop-picker|react-native-fast-image|react-native-video|react-native-version-check|react-native-permissions|react-native-modal-datetime-picker|@react-native-async-storage)/)',
  ],
  moduleNameMapper: {
    '\\.(ttf|otf|woff|woff2|mp3|mp4)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
