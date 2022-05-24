import axios, { AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';

const useFetch = (url: string) => {
  const [response, setResponse] = useState<AxiosResponse<any, any>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetch = useCallback(async () => {
    setIsLoading(true)
    const response = await axios.get(url);
    setResponse(response);
    setIsLoading(false)

  }, [url]);

  return { response, isLoading, fetch};
};

export default useFetch;
