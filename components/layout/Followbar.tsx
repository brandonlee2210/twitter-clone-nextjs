"use client";

import useUsers from "@/hooks/useUsers";
import FollowbarItem from "./FollowbarItem";

const FollowBar = () => {
  const { data: users = [] } = useUsers();

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="lg:col-span-2 px-6 py-4 hidden lg:block ">
      <div className="bg-slate-200 rounded-xl p-4">
        <h2 className="text-black text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4 ">
          {users.map((user: Record<string, any>) => (
            <FollowbarItem key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default FollowBar;
