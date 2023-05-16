import { fetcher } from '@/util/fetcher';
import useSWR from 'swr';
export const useGetAllFamiles = () => {
  const { data, error, isLoading } = useSWR(`/api/family`, fetcher);

  return {
    data: data,
    isLoading,
    isError: error,
  };
};

export const useGetOneFamily = (id) => {
  const { data, error, isLoading } = useSWR(`/api/family/${id}`, fetcher);

  return {
    data: data,
    isLoading,
    isError: error,
  };
};
