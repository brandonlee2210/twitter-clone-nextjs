import { toast } from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import axios from "axios";

const useLike = (postId: string, username?: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(+postId);
  const { mutate: mutateFetchedPosts } = usePosts(username);

  const loginModal = useLoginModal();

  const hasLiked = () => {
    if (
      currentUser?.like.some(
        (likeData: Record<string, any>) => likeData.postId === postId
      )
    ) {
      return true;
    }

    return false;
  };

  const toggleLike = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      if (hasLiked()) {
        request = axios.delete(`/api/like`, {
          params: {
            postId,
            username: currentUser.username,
          },
        });
      } else {
        request = axios.post(`/api/like`, {
          postId,
          username: currentUser.username,
        });
      }

      await request;
      mutateFetchedPost();
      mutateCurrentUser();
      mutateFetchedPosts();

      toast.success("Success");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return [hasLiked, toggleLike];
};

export default useLike;
