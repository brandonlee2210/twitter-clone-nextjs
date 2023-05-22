import axios from "axios";

import Header from "@/components/Header";
import Form from "@/components/Form";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";
import ClipLoader from "react-spinners/ClipLoader";
import fetcher from "@/libs/fetcher";

export async function generateStaticParams() {
  const posts = await fetcher("http://localhost:3000/api/posts");

  return posts.map((post: Record<string, any>) => ({
    postId: String(post.id),
  }));
}

export default async function Page({ params }: { params: { postId: string } }) {
  const { postId } = params;

  const post = await fetcher(`http://localhost:3000/api/posts/${postId}`);

  // const { data: post, isLoading } = axios.get(`/api/posts/${postId}`);

  // if (isLoading || !post) {
  //   return (
  //     <div className="flex justify-center items-center h-full">
  //       <ClipLoader color="lightblue" size={80} />
  //     </div>
  //   );
  // }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={post} username={post.user.username} />
      <Form placeholder="Tweet your reply" isComment postId={+postId} />
      <CommentFeed comments={post?.comment} />
    </>
  );
}

export const dynamicParams = true;
