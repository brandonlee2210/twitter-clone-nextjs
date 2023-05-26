import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useCountFollow = (username: string) => {
  // useSWR will return the data if it's there, or revalidate it if it's not
  const url = username ? `/api/follow/${username}` : null;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCountFollow;
