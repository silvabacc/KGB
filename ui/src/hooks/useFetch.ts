import axios, { AxiosResponse } from 'axios';
import { useMemo, useState } from 'react';

const useFetch = (url: string) => {
  const [response, setResponse] = useState<AxiosResponse<any, any>>();

  useMemo(async () => {
    const response = await axios.get(url);
    setResponse(response);
  }, [url]);

  return { response };
};

export default useFetch;
