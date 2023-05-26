"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import useLike from "@/hooks/useLike";

import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

type Props = {
  username?: string;
  data: any;
};
const PostItem = ({ username, data = {} }: Props) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const [hasLiked, toggleLike] = useLike(data.id);

  const { data: currentUser } = useCurrentUser();

  const goToUser = (e: any) => {
    e.stopPropagation();

    router.push(`/users/${data.user.username}`);
  };

  const goToPost = () => {
    router.push(`/posts/${data.id}`);
  };

  const handleLike = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    toggleLike();
  };

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      className="border-b-[1px] border-neutral-200 p-5 cursor-pointer  hover:bg-neutral-100 transition"
      onClick={goToPost}
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar username={data.user.username} />
        <div className="max-w-[100%] flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <p
              className="text-black font-semibold cursor-pointer hover:underline"
              onClick={goToUser}
            >
              {data.user.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm hover:underline cursor-pointer">
              {createdAt} ago
            </span>
          </div>
          <div className="text-black mt-1 break-all">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <span>{data.comment?.length || 0}</span>
            </div>
            <div
              className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500 ${
                hasLiked() ? "text-red-500" : ""
              }`}
              onClick={handleLike}
            >
              <AiOutlineHeart size={20} />
              <span>{data.like?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostItem;
