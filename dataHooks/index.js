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
