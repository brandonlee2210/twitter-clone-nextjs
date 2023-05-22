"use client";

import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";

type Props = {
  data: Record<string, any>;
};
function CommentItem({ data }: Props) {
  const router = useRouter();

  const goToUser = useCallback(() => {
    router.push(`/users/${data.user.username}`);
  }, [data?.user.username, router]);

  const createdAt = useMemo(() => {
    if (!data.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      className="
        border-b-[1px] 
        border-neutral-200 
        p-5 
        cursor-pointer 
        hover:bg-neutral-200 
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar username={data.user.username} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                text-black 
                font-semibold 
                cursor-pointer 
                hover:underline
            "
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            "
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-black mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
