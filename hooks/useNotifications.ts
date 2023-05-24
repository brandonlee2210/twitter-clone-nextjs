import useSwr from "swr";

import fetcher from "@/libs/fetcher";

const useNotifications = (username: string) => {
  const url = username ? `/api/notifications/${username}` : null;
  const { data, error, isLoading, mutate } = useSwr(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useNotifications;
