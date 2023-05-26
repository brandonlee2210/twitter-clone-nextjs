"use client";

import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

import useUser from "@/hooks/useUser";

import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import EditModal from "@/components/Modals/EditModal";
import { Suspense } from "react";
import Loading from "./loading";

export default function Page() {
  const params = useParams();
  const { username } = params as { username: string };

  const { data: fetchedUser, isLoading } = useUser(username as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <EditModal />
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero username={username as string} />
      <UserBio username={username as string} />
      <Suspense fallback={<Loading />}>
        <PostFeed username={username as string} />
      </Suspense>
    </>
  );
}
