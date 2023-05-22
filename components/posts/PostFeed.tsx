"use client";

import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

type Props = {
  username?: string;
};

const PostFeed = ({ username }: Props) => {
  const { data: posts = [] } = usePosts(username);

  return (
    <>
      {posts?.map((post: Record<string, any>) => (
        <PostItem username={username} key={post.id} data={post} />
      ))}
    </>
  );
};
export default PostFeed;
