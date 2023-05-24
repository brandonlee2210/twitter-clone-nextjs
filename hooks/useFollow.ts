import axios from "axios";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import { toast } from "react-hot-toast";

const useFollow = (username: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedUser, mutate: mutateFetchedUser } = useUser(username);

  const loginModal = useLoginModal();

  const isFollowing = () => {
    if (
      currentUser?.follower.some(
        (follower: any) => follower.followingUsername === username
      )
    ) {
      return true;
    }
    return false;
  };

  const toggleFollow = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      if (isFollowing()) {
        await axios.delete(`/api/follow/`, {
          params: {
            username,
          },
        });
      } else {
        await axios.post(`/api/follow`, {
          username: username,
        });
      }
      mutateCurrentUser();
      mutateFetchedUser();
      toast.success("Success");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return [isFollowing, toggleFollow];
};

export default useFollow;
