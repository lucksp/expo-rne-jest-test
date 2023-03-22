import { renderHook, waitFor } from '@testing-library/react-native';
import React from 'react';

import { AuthContextProvider, useAuthorization } from '../index';

test('hook lib', async () => {
  const { result } = renderHook(() => useAuthorization(), {
    wrapper: ({ children }) => <AuthContextProvider>{children}</AuthContextProvider>,
  });
  expect(result?.current?.authState?.userToken).toBeNull();


  result?.current.authActions?.signIn({
    email: 'test@crap.com',
    password: 'crap',
    remember: false,
  });

  await waitFor(() => expect(result?.current?.authState?.userToken).toBeTruthy(), {
    timeout: 30000,
  });
}, 30000);

