import { useState, useEffect } from 'react';

import axios, { isAxiosError } from 'axios';

export interface TApiResponse {
  status: Number;
  data: any;
  error: any;
  loading: Boolean;
}

export const useAPI = (url: string): TApiResponse => {
  const [status, setStatus] = useState<Number>(0);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const getAPIData = async () => {
    setLoading(true);
    try {
      // const apiResponse = await fetch(url);
      // const json = await apiResponse.json();

      const data = await axios.get(url);

      setStatus(data.status);
      setData(data.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return { status, data, error, loading };
};
