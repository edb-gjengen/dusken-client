/* eslint-disable import/no-extraneous-dependencies */
// ref https://github.com/kmagiera/react-native-gesture-handler/issues/344#issuecomment-489208684
import { NativeModules } from 'react-native';

// ref https://react-native-async-storage.github.io/async-storage/docs/advanced/jest
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.doMock('react-dom/server', () => {}, { virtual: true });

global.fetch = require('jest-fetch-mock');

NativeModules.RNGestureHandlerModule = {};

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest.fn().mockImplementation((config, reducers) => reducers),
  };
});
