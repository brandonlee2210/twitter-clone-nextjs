import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const usePosts = (username?: string) => {
  // useSWR will return the data if it's there, or revalidate it if it's not
  const url = username ? `/api/posts?username=${username}` : "/api/posts";

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
