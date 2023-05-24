"use client";
import useFollow from "@/hooks/useFollow";
import Avatar from "../Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

type Props = {
  user: Record<string, any>;
};
const FollowbarItem = ({ user }: Props) => {
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();
  const [isFollowing, toggleFollow] = useFollow(user.username);

  const handleFollow = (e: any) => {
    e.stopPropagation();

    if (!currentUser) {
      loginModal.onOpen();
      return;
    }
    toggleFollow();
  };

  return (
    <div key={user.id} className="flex flex-row gap-4 relative">
      <Avatar username={user.username} />
      <div className="flex flex-col">
        <p className="text-black font-semibold text-sm">{user.name}</p>
        <p className="text-neutral-400 text-sm">@{user.username}</p>
      </div>
      {currentUser?.id === user.id ? (
        <button className="absolute right-0 top-0 text-black font-bold rounded-full bg-white border-neutral-600 border px-3 py-2">
          Edit
        </button>
      ) : (
        <button
          className="absolute right-0 top-0 text-black font-bold rounded-full bg-white border-neutral-600 border px-3 py-2"
          onClick={handleFollow}
        >
          {isFollowing() ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};
export default FollowbarItem;
