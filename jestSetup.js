/* eslint-disable import/no-extraneous-dependencies */
/* global jest */
// ref https://github.com/kmagiera/react-native-gesture-handler/issues/344#issuecomment-489208684
import { NativeModules } from 'react-native';

// ref https://github.com/react-native-community/react-native-async-storage/blob/master/docs/Jest-integration.md
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.doMock('tipsi-stripe', () => ({
  setOptions: jest.fn(),
}));
jest.doMock('react-dom/server', () => {}, { virtual: true });

global.fetch = require('jest-fetch-mock');

NativeModules.RNGestureHandlerModule = {};

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
