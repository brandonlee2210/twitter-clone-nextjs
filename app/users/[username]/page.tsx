"use client";

import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

import useUser from "@/hooks/useUser";

import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import EditModal from "@/components/Modals/EditModal";

export default function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  const { data: fetchedUser, isLoading } = useUser(username);

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
      <UserHero username={username} />
      <UserBio username={username} />
      <PostFeed username={username} />
    </>
  );
}
