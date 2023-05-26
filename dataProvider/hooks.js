import { fetcher, seter, put, remove } from '@/util/fetcher';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { message } from 'antd';

export const useGetOneFamily = (id) => {
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    `/api/family/${id}`,
    fetcher
  );

  return {
    data: data,
    isLoading,
    isError: error,
    mutate: mutate,
    isValidating: isValidating,
  };
};
export const useCreateFamily = () => {
  const { trigger, isMutating } = useSWRMutation('/api/family', seter, {
    onSuccess: (data, variables, context) => {
      mutate('/api/family/my', (existingData) => {
        return [...existingData, data];
      });
      message.success('Family added');
    },
    onError: (err, key, config) => {
      message.error('Error');
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

export const useUpdateFamily = (id) => {
  const { trigger, isMutating } = useSWRMutation(`/api/family/${id}`, put, {
    onSuccess: (data, variables, context) => {
      message.success('Saved');
    },
    onError: (err, key, config) => {
      message.error('Error');
    },
  });

  return { trigger, isMutating };
};

export const useDeleteFamily = () => {
  const { trigger, isMutating } = useSWRMutation(`/api/family/my`, remove, {
    onSuccess: (data, variables, context) => {
      mutate('/api/family/my', (existingData) => {
        return existingData?.filter((item) => item?._id !== data?.id);
      });
      message.success('Deleted');
    },
    onError: (err, key, config) => {
      message.error('Error');
    },
  });

  return { trigger, isMutating };
};
