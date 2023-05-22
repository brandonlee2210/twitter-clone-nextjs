"use client";
import useFollow from "@/hooks/useFollow";
import Avatar from "../Avatar";

type Props = {
  user: Record<string, any>;
};
const FollowbarItem = ({ user }: Props) => {
  const [isFollowing, toggleFollow] = useFollow(user.username);

  return (
    <div key={user.id} className="flex flex-row gap-4 relative">
      <Avatar username={user.username} />
      <div className="flex flex-col">
        <p className="text-black font-semibold text-sm">{user.name}</p>
        <p className="text-neutral-400 text-sm">@{user.username}</p>
      </div>
      <button
        className="absolute right-0 top-0 text-black font-bold rounded-full bg-white border-neutral-600 border px-3 py-2"
        onClick={toggleFollow}
      >
        {isFollowing() ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};
export default FollowbarItem;
