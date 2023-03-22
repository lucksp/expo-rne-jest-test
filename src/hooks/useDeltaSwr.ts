/**
 * useDeltaSwr module.
 * @module hooks/use-swr
 * Also, check out {@link https://swr.vercel.app/ SWR Docs}
 */
import useSWR, { Fetcher, Key, SWRConfiguration, SWRResponse } from 'swr';

interface Props<T> {
  key: Key;
  fetcher: Fetcher<T>;
  isReadyToFetch?: boolean;
  options?: SWRConfiguration<T>;
}

export interface SwrReturn<T> extends SWRResponse<T> {
  refetchJob: () => Promise<void>;
  updateLocalData: (data: T) => void;
}

/**
 * A common SWR hook for the LT App
 * @function
 * @param {string, array} key - The url "key" for SWR Url.  This is a single url string or array of [multiple arguments](https://swr.vercel.app/docs/arguments#multiple-arguments)
 * @param {function} fetcher - The "GET" function SWR consumes to make the fetch
 * @param {isReadyToFetch} boolean optional - Conditionally add the URL to the cache based on your params
 * @param {object} options - Any additional [options](https://swr.vercel.app/docs/options) for SWR
 * @returns {object} An object based on the SWR response: SwrReturn
 */

export const useDeltaSwr = <T>({
  key: urlkey,
  fetcher,
  isReadyToFetch = true,
  options = { shouldRetryOnError: false },
}: Props<T>): SwrReturn<T> => {
  const url = isReadyToFetch ? urlkey : null;
  const { data, error, isValidating, mutate } = useSWR<T>(url, fetcher, options);

  const refetchJob = async (): Promise<void> => {
    if (!fetcher) {
      throw new Error(`swr refetch needs a fetcher`);
    }
    const jobPromise = fetcher(urlkey);

    await mutate(jobPromise);
  };

  const updateLocalData = (localData: T): void => {
    mutate(localData, false);
  };

  return {
    data,
    error,
    isValidating,
    mutate,
    refetchJob,
    updateLocalData,
  };
};
