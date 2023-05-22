import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
// import useFollow from "@/hooks/useFollow";
import useEditModal from "@/hooks/useEditModal";

import Button from "../Button";

type UserBioProps = {
  username: string;
};

const UserBio = ({ username }: UserBioProps) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(username);

  const editModal = useEditModal();

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-200 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.username === username ? (
          <Button secondary label="Edit Profile" onClick={editModal.onOpen} />
        ) : null}
      </div>
      <div className="mt-2 px-4">
        <div className="flex flex-col">
          <p className="text-black text-2xl font-bold">{fetchedUser?.name}</p>
          <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-3">
          <p className="text-black">{fetchedUser?.bio}</p>
          <div
            className="
              flex 
              flex-row 
              items-center 
              gap-1
              mt-4 
              text-neutral-500
          "
          >
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-2 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-black font-bold">0</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-black font-bold">
              {fetchedUser?.followersCount || 0}
            </p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
