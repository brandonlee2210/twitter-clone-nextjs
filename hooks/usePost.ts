import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const usePost = (postId: string) => {
  // useSWR will return the data if it's there, or revalidate it if it's not

  const { data, error, isLoading, mutate } = useSWR(
    postId ? `/api/posts/${postId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;
