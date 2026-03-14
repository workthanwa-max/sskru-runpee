import { useEffect, useState, useCallback } from 'react';
import axiosInstance from '@src/utils/axios';

export function useRestQuery<T = any>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(url);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export function useRestMutation<T = any, V = any>(
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST'
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const mutate = async (variables?: V) => {
    setLoading(true);
    try {
      const response = await axiosInstance({
        url,
        method,
        data: variables,
      });
      setError(null);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return [mutate, { loading, error }] as const;
}
