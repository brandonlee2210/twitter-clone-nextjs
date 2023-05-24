import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <main>
      <Header label="Home" />
      <Form placeholder="What's happening" />
      <Suspense fallback={<Loading />}>
        <PostFeed />
      </Suspense>
    </main>
  );
}
