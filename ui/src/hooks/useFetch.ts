import axios, { AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';
import { TimeSeriesResponse } from '../responseTypes';

const useFetch = (url: string) => {
  const [response, setResponse] = useState<TimeSeriesResponse[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetch = useCallback(async () => {
    setIsLoading(true)
    const response = await axios.get<TimeSeriesResponse[]>(url);
    setResponse(response.data);
    setIsLoading(false)

  }, [url]);

  return { response, isLoading, fetch};
};

export default useFetch;
