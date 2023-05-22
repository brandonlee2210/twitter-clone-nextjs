"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

type Props = {
  username?: string;
  data: any;
};
const PostItem = ({ username, data = {} }: Props) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const goToUser = (e: any) => {
    e.stopPropagation();

    router.push(`/users/${data.user.id}`);
  };

  const goToPost = () => {
    router.push(`/posts/${data.id}`);
  };

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-200 p-5  hover:bg-neutral-200 transition">
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
            <span
              className="text-neutral-500 text-sm hover:underline cursor-pointer"
              onClick={goToPost}
            >
              {createdAt} ago
            </span>
          </div>
          <div className="text-black mt-1 break-all">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <span>{data.comments?.length || 0}</span>
            </div>
            <div
              className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500 `}
            >
              <AiOutlineHeart size={20} />
              <span>{data.likedIds?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostItem;
