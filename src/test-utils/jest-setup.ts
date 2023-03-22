import 'cross-fetch/polyfill';
import '@testing-library/jest-native/extend-expect';

import * as SecureStore from 'expo-secure-store';

import { SSKey } from '@/src/hooks/global/Authorization';

import { server } from '../mocks/server';


beforeEach(async () => {
  await SecureStore.setItemAsync(SSKey.UserToken, 'i am token');
});
beforeAll(() => {
  server.listen();

});

jest.mock('@react-navigation/native');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
