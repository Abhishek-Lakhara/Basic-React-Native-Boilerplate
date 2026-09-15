/* eslint-env jest */

jest.mock(
  '@react-native-async-storage/async-storage',
  () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@react-native-firebase/messaging', () => {
  const messaging = () => ({
    getToken: jest.fn().mockResolvedValue(null),
    onTokenRefresh: jest.fn().mockReturnValue(jest.fn()),
  });

  return messaging;
});

jest.mock('@notifee/react-native', () => ({
  __esModule: true,
  default: {
    cancelNotification: jest.fn(),
    createChannel: jest.fn(),
    displayNotification: jest.fn().mockResolvedValue('notification-id'),
    getInitialNotification: jest.fn().mockResolvedValue(null),
    requestPermission: jest.fn().mockResolvedValue({ authorizationStatus: 1 }),
  },
  AndroidImportance: { HIGH: 4 },
  AndroidVisibility: { PUBLIC: 1 },
  AuthorizationStatus: { AUTHORIZED: 1 },
  EventType: { PRESS: 1, DISMISSED: 2 },
}));

jest.mock('react-native-image-crop-picker', () => ({
  __esModule: true,
  default: {
    openCamera: jest.fn(),
    openPicker: jest.fn(),
  },
}));

jest.mock('react-native-fast-image', () => {
  const React = require('react');
  const { Image } = require('react-native');
  const FastImage = props => React.createElement(Image, props);
  FastImage.resizeMode = { contain: 'contain', cover: 'cover', stretch: 'stretch' };
  return { __esModule: true, default: FastImage };
});

jest.mock('react-native-video', () => {
  const React = require('react');
  const { View } = require('react-native');
  return props => React.createElement(View, props);
});

jest.mock('react-native-version-check', () => ({
  __esModule: true,
  default: {
    getStoreUrl: jest.fn().mockResolvedValue('https://example.com'),
    needUpdate: jest.fn().mockResolvedValue({ isNeeded: false }),
  },
}));

jest.mock('react-native-permissions', () => ({
  check: jest.fn(),
  checkNotifications: jest.fn(),
  openSettings: jest.fn(),
  request: jest.fn(),
  requestNotifications: jest.fn(),
  RESULTS: { BLOCKED: 'blocked', DENIED: 'denied', GRANTED: 'granted' },
  PERMISSIONS: { ANDROID: {}, IOS: {} },
}));

jest.mock('@react-native-clipboard/clipboard', () => ({
  __esModule: true,
  default: {
    getString: jest.fn().mockResolvedValue(''),
    setString: jest.fn(),
  },
}));

jest.mock('@react-native-community/netinfo', () => ({
  __esModule: true,
  default: {
    addEventListener: jest.fn().mockReturnValue(jest.fn()),
    fetch: jest.fn().mockResolvedValue({ isConnected: true }),
  },
}));
