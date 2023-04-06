/* eslint-disable @typescript-eslint/ban-ts-comment */
// Unfortunately the natural type of passing body to requests is not predictable.
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

import { ErrorType } from '../hooks/global/APIErrors';
import { LoginResponse, SSKey, State as BaseAuthState } from '../hooks/global/Authorization/types';

export type ResponseStatus = 'success' | 'fail';


interface Headers {
  Authorization?: string;
  'Content-Type'?: string;
  Version?: string;
  Accept?: string;
}

export const noTokenPaths = [
  'login',
  'signup',
  'password',
  'forgot_password',
  'verify_password',
  'invitations',
];

export type ApiResponse<T> = {
  data: T;
  status: ResponseStatus;
  messages?: string[];
  message?: string;
  token?: string;
  traceID?: string;
  user?: LoginResponse;
};

export type FlatApiResponse<T> = {
  messages?: string[];
  message?: string;
  traceID?: string;
} & T;

type RequestType = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const API_URL = Constants?.manifest?.extra?.api;
const LOG_API_ERRORS = new Boolean(Constants?.manifest?.extra?.log_api_errors === 'true' || false);

enum HEADERS {
  contentType = 'Content-Type',
  version = 'Version',
  accept = 'Accept',
  auth = 'Authorization',
  refresh = 'Refresh',
}

function tryParsingTokens(
  authToken: string | null,
  storeAuthToken: string,
  refreshToken: string | null,
  storeRefreshToken: string
) {
  try {
    authToken = JSON.parse(storeAuthToken);
  } catch (e) {
    authToken = storeAuthToken;
  }

  try {
    refreshToken = JSON.parse(storeRefreshToken);
  } catch (e) {
    refreshToken = storeRefreshToken;
  }
  return { authToken, refreshToken };
}

const packageHeaders = (headerAdjustments: Headers): Record<string, string> => {
  const headers: Record<string, string> = {};

  const contentType = headerAdjustments[HEADERS.contentType];
  if (contentType !== undefined) {
    headers[HEADERS.contentType] = contentType;
  }

  const version = headerAdjustments[HEADERS.version];
  if (version !== undefined) {
    headers[HEADERS.version] = version;
  }

  const auth = headerAdjustments[HEADERS.auth];
  if (auth !== undefined) {
    headers[HEADERS.auth] = auth;
  }

  const accept = headerAdjustments[HEADERS.accept];
  if (accept !== undefined) {
    headers[HEADERS.accept] = accept;
  }

  return headers;
};

export const postPutPatch =
  (type: RequestType) =>
  async <T>(props: {
    path: string;
    authState: BaseAuthState;
    body?: Record<string, unknown> | string;
    headerAdjustments?: Headers;
    pushError: (e: ErrorType) => void;
    useApiUrl?: boolean;
  }): Promise<ApiResponse<T> | null> => {
    const { headerAdjustments, body, path, authState, pushError, useApiUrl = true } = props;
    console.log({ path });

    const headers: Record<string, string> = packageHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      ...(headerAdjustments ? headerAdjustments : {}),
    });

    const checkForTokens = !path.split('/').some(word => noTokenPaths.includes(word));

    const url = useApiUrl ? API_URL : '';

    let authToken: string | null = null;
    let refreshToken: string | null = null;

    if (checkForTokens) {
      // grab tokens from store
      const storeAuthToken = authState.userToken;
      const storeRefreshToken = await SecureStore.getItemAsync(SSKey.RefreshToken);

      // throw error to logout if null
      if (!storeAuthToken || !storeRefreshToken) {
        throw new Error('Tokens unavailable...logout');
      }
      ({ authToken, refreshToken } = tryParsingTokens(
        authToken,
        storeAuthToken,
        refreshToken,
        storeRefreshToken
      ));
    }

    // set auth/refresh headers
    if (authToken && refreshToken) {
      headers.Authorization = `Bearer ${authToken}`;
      headers.Refresh = refreshToken;
    }
    const stringBody = JSON.stringify(body);

    const data = await fetch(`${url}${path}`, {
      method: type,
      headers,
      body: stringBody,
    });

    if (data.status === 204) {
      return null;
    }

    // check headers for new auth - refresh
    const newAuth = data.headers.get('set-authorization');
    const newRefresh = data.headers.get('set-refresh');

    // update store with new tokens
    if (newAuth && newRefresh) {
      await SecureStore.setItemAsync(SSKey.UserToken, newAuth);
      await SecureStore.setItemAsync(SSKey.RefreshToken, newRefresh);
      await SecureStore.setItemAsync(SSKey.API, Constants?.manifest?.extra?.api);
    }

    try {
      const result: ApiResponse<T> = await data.json();
      // console.info('PUT success result: ', result);
      const isFailWithLog = typeof result === 'string' && result !== 'success' && LOG_API_ERRORS;
      const newLocal =
        typeof result === 'object' &&
        result !== null &&
        !!result.status &&
        result.status !== 'success' &&
        LOG_API_ERRORS;
      // TODO: We need a ticket to look at the response structure of the api mobile/api platform APIs,
      // OR discuss this with BE so they can gradually update the response structure so it follows the ApiResponse interface structure
      if (isFailWithLog) {
        const error = {
          path: `${url}${path}`,
          body: body ? JSON.stringify(body) : undefined,
          method: type,
          token: authToken || 'N/A',
        };

        pushError(error);
      } else if (newLocal) {
        const error = {
          path: `${url}${path}`,
          traceId: result.traceID || `no-trace-${Math.floor(Math.random() * 1000)}`,
          message:
            result.message || result.messages
              ? JSON.stringify(result.messages)
              : false || 'WTF NO MESSAGE?!',
          body: body ? JSON.stringify(body) : undefined,
          method: type,
          token: authToken || 'N/A',
        };

        pushError(error);
      }

      return result;
    } catch (e) {
      if (data.status === 200) return null;
      throw new Error(`Something went wrong: ${(e as Error).message}`);
    }
  };

export const flatPostPutPatch =
  (type: RequestType) =>
  async <T>(props: {
    path: string;
    authState: BaseAuthState;
    body?: Record<string, unknown> | string;
    headerAdjustments?: Headers;
    pushError: (e: ErrorType) => void;
    useApiUrl?: boolean;
  }): Promise<FlatApiResponse<T> | null> => {
    const { headerAdjustments, body, path, authState, pushError, useApiUrl = true } = props;
    console.log({ path });
    const headers: Record<string, string> = packageHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      ...(headerAdjustments ? headerAdjustments : {}),
    });

    const checkForTokens = !path.split('/').some(word => noTokenPaths.includes(word));

    const url = useApiUrl ? API_URL : '';

    let authToken: string | null = null;
    let refreshToken: string | null = null;

    if (checkForTokens) {
      // grab tokens from store
      const storeAuthToken = authState.userToken;
      const storeRefreshToken = await SecureStore.getItemAsync(SSKey.RefreshToken);

      // throw error to logout if null
      if (!storeAuthToken || !storeRefreshToken) {
        throw new Error('Tokens unavailable...logout');
      }
      ({ authToken, refreshToken } = tryParsingTokens(
        authToken,
        storeAuthToken,
        refreshToken,
        storeRefreshToken
      ));
    }

    // set auth/refresh headers
    if (authToken && refreshToken) {
      headers.Authorization = `Bearer ${authToken}`;
      headers.Refresh = refreshToken;
    }
    const stringBody = JSON.stringify(body);
    const data = await fetch(`${url}${path}`, {
      method: type,
      headers,
      body: stringBody,
    });

    if (data.status === 204) {
      return null;
    }

    // check headers for new auth - refresh
    const newAuth = data.headers.get('set-authorization');
    const newRefresh = data.headers.get('set-refresh');

    // update store with new tokens
    if (newAuth && newRefresh) {
      await SecureStore.setItemAsync(SSKey.UserToken, newAuth);
      await SecureStore.setItemAsync(SSKey.RefreshToken, newRefresh);
      await SecureStore.setItemAsync(SSKey.API, Constants?.manifest?.extra?.api);
    }

    try {
      const result: FlatApiResponse<T> = await data.json();
      const isFailWithLog = typeof result === 'string' && result !== 'success' && LOG_API_ERRORS;
      const newLocal =
        (typeof result === 'object' && result !== null && result.message) ||
        (result.messages && LOG_API_ERRORS);
      if (isFailWithLog) {
        const error = {
          path: `${url}${path}`,
          body: body ? JSON.stringify(body) : undefined,
          method: type,
          token: authToken || 'N/A',
        };

        pushError(error);
      } else if (newLocal) {
        const error = {
          path: `${url}${path}`,
          traceId: result.traceID || `no-trace-${Math.floor(Math.random() * 1000)}`,
          message:
            result.message || result.messages
              ? JSON.stringify(result.messages)
              : false || 'WTF NO MESSAGE?!',
          body: body ? JSON.stringify(body) : undefined,
          method: type,
          token: authToken || 'N/A',
        };

        pushError(error);
      }
      return result;
    } catch (e) {
      if (data.status === 200) return null;
      throw new Error(`Something went wrong: ${(e as Error).message}`);
    }
  };

const fullUrl = (path: string, body?: object) => {
  const base = API_URL;

  let url = `${base}${path}`;

  if (path.indexOf('http') !== -1) {
    url = path;
  }

  if (!body) {
    return url;
  }

  const keys = Object.keys(body);
  const qs = keys
    .map(key => {
      // @ts-ignore exception. It's not predictable to know the body.
      const val = encodeURIComponent(body[key] || '').toString();
      const regex = /%2C/gi;
      val.replace(regex, ','); // Decode commas to allow more delimited items.
      return `${key}=${val}`;
    })
    .join('&');

  url += `?${qs}`;

  return url;
};

export const put = postPutPatch('PUT');
export const post = postPutPatch('POST');
export const flatPost = flatPostPutPatch('POST');
export const patch = postPutPatch('PATCH');
export const deleteRequest = postPutPatch('DELETE');

export const get = async <T>(props: {
  path: string;
  headers?: Headers;
  authState: BaseAuthState;
  body?: Record<string, unknown>;
  pushError: (e: ErrorType) => void;
}): Promise<ApiResponse<T>> => {
  const { headers, body, path, pushError, authState } = props;
  console.log({ path });
  const newHeaders: Record<string, string> = packageHeaders({
    ...(headers ? headers : ({} as Headers)),
  });

  let authToken: string | null = null;
  let refreshToken: string | null = '';

  if (!path.includes('invitations')) {
    // grab tokens from store
    authToken = authState.userToken;
    refreshToken = await SecureStore.getItemAsync(SSKey.RefreshToken);

    // throw error msg to logout if null
    if (!authToken || !refreshToken) {
      throw new Error('Tokens unavailable...logout');
    }
  }

  // set token headers
  newHeaders.Authorization = `Bearer ${authToken}`;
  newHeaders.Refresh = refreshToken;

  const url = fullUrl(path, body);

  const res = await fetch(url, { headers: newHeaders });

  // check response headers for new tokens
  const newAuth = res.headers.get('set-authorization');
  const newRefresh = res.headers.get('set-refresh');

  // update store w/ new tokens
  if (newAuth && newRefresh) {
    await SecureStore.setItemAsync(SSKey.UserToken, newAuth);
    await SecureStore.setItemAsync(SSKey.RefreshToken, newRefresh);
    await SecureStore.setItemAsync(SSKey.API, Constants?.manifest?.extra?.api);
  }

  // some response bodies are completely empty so we cannot parse json() without an err
  const data = await res.json();

  if (!data && (!res.ok || data.status !== 'success') && LOG_API_ERRORS) {
    const error = {
      path: `${url}`,
      traceId: data.traceID || `no-trace-${Math.floor(Math.random() * 1000)}`,
      message:
        data.message || data.messages ? JSON.stringify(data.messages) : false || 'WTF NO MESSAGE?!',
      body: body ? JSON.stringify(body) : undefined,
      method: 'GET' as RequestType,
      token: authToken || 'N/A',
    };

    pushError(error);
  }

  return data;
};

export type SignedURLs = {
  filename: string;
  signedUrl: string;
  uuid: string;
};


// The flatResponseGet is used when the shape has no `status` or JSON obj response is available
export const flatResponseGet = async <T>(props: {
  path: string;
  headers?: Headers;
  authState: BaseAuthState;
  body?: object;
  pushError: (e: ErrorType) => void;
}): Promise<FlatApiResponse<T>> => {
  const { headers, body, path, pushError, authState } = props;
  const newHeaders: Record<string, string> = packageHeaders({
    ...(headers ? headers : ({} as Headers)),
  });

  let authToken: string | null = null;
  let refreshToken: string | null = '';

  if (!path.includes('invitations')) {
    // grab tokens from store
    authToken = authState.userToken;
    refreshToken = await SecureStore.getItemAsync(SSKey.RefreshToken);

    // throw error msg to logout if null
    if (!authToken || !refreshToken) {
      throw new Error('Tokens unavailable...logout');
    }

    // set token headers
    newHeaders.Authorization = `Bearer ${authToken}`;
    newHeaders.Refresh = refreshToken;
  }

  const url = fullUrl(path, body);
  const res = await fetch(url, { headers: newHeaders });
  // check response headers for new tokens
  const newAuth = res.headers.get('set-authorization');
  const newRefresh = res.headers.get('set-refresh');

  // update store w/ new tokens
  if (newAuth && newRefresh) {
    await SecureStore.setItemAsync(SSKey.UserToken, newAuth);
    await SecureStore.setItemAsync(SSKey.RefreshToken, newRefresh);
    await SecureStore.setItemAsync(SSKey.API, Constants?.manifest?.extra?.api);
  }

  try {
    const data = await res.json();

    if ((!data || data.message || data.messages) && LOG_API_ERRORS) {
      const error = {
        path: `${url}`,
        traceId: data.traceID || `no-trace-${Math.floor(Math.random() * 1000)}`,
        message:
          data.message || data.messages
            ? JSON.stringify(data.messages)
            : false || 'WTF NO MESSAGE?!',
        body: body ? JSON.stringify(body) : undefined,
        method: 'GET' as RequestType,
        token: authToken || 'N/A',
      };

      pushError(error);

      throw new Error(data.message || data.messages.join());
    }

    return data;
  } catch (e) {
    throw new Error(`Something went wrong: ${(e as Error).message}`);
  }
};

export type AuthenticatedFetcherResponse<T> = {
  // Note: url is the key being used by SWR to cache the request.
  url: string;
  fetcher: (url: string, auth: BaseAuthState) => Promise<T>;
};
