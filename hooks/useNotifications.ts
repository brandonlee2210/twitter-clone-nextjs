import useCurrentUser from "@/hooks/useCurrentUser";

import useSwr from "swr";

import fetcher from "@/libs/fetcher";

const useNotifications = (username: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const url = username ? `/api/notifications/${username}` : null;
  const { data, error, isLoading, mutate } = useSwr(url, fetcher);
  mutateCurrentUser();

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useNotifications;
