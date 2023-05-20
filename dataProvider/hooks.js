import { fetcher, seter } from '@/util/fetcher';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { message } from 'antd';

export const useGetOneFamily = (id) => {
  const { data, error, isLoading } = useSWR(`/api/family/${id}`, fetcher);

  return {
    data: data,
    isLoading,
    isError: error,
  };
};
export const useCreateFamily = () => {
  const { trigger, isMutating } = useSWRMutation('/api/family', seter, {
    onSuccess: (data, variables, context) => {
      // Perform the additional mutate operation after a successful mutation
      mutate('/api/family/my', (existingData) => {
        return [...existingData, data];
      });
      message.success('Family added');
    },
    onError: (err, key, config) => {
      message.success('Error');
    },
  });

  return { trigger, isMutating };
};

export const useGetMyFamily = () => {
  const { data, error, isLoading } = useSWR(`/api/family/my`, fetcher);

  return {
    data: data,
    isLoading,
    isError: error,
  };
};
