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
  const { trigger, isMutating } = useSWRMutation(
    '/api/family',
    seter
    // , {
    //   populateCache: (updatedTodo, todos) => {
    //     // filter the list, and return it with the updated item
    //     const filteredTodos = todos.filter((todo) => todo.id !== '1');
    //     return [...filteredTodos, updatedTodo];
    //   },
    //   // Since the API already gives us the updated information,
    //   // we don't need to revalidate here.
    //   revalidate: false,
    // }
  );

  return { trigger, isMutating };
};
