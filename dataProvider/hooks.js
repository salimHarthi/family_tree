import { fetcher, seter } from '@/util/fetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export const useGetOneFamily = (id) => {
  const { data, error, isLoading } = useSWR(`/api/family/${id}`, fetcher);

  return {
    data: data,
    isLoading,
    isError: error,
  };
};
export const useCreateFamily = () => {
  const { trigger, isMutating } = useSWRMutation('/api/family', seter);

  return { trigger, isMutating };
};
