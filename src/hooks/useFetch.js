import { useCallback, useEffect, useState } from 'react';

function useFetch(url, options) {
  const [response, setResponse] = useState({
    data: null,
    isLoading: true,
    error: false,
  });

  const fetchData = useCallback(
    async (options) => {
      const params = options?.params
        ? '?' + new URLSearchParams(options?.params)
        : '';

      const response = await fetch(url + params);

      let dataReceived = {};
      if (response.ok) {
        dataReceived = {
          data: await response.json(),
        };
      } else {
        dataReceived = {
          error: true,
        };
      }

      setResponse((prevState) => ({
        ...prevState,
        ...dataReceived,
        isLoading: false,
        fetchData,
      }));
    },
    [url]
  );

  useEffect(() => {
    fetchData(options);
  }, [url]);

  return { ...response, refetch: fetchData };
}

export { useFetch };
