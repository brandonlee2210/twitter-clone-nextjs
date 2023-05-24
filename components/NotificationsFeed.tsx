"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";
import { mutate } from "swr";

type Props = {};
const NotificationsFeed = (props: Props) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(
    currentUser?.username
  );

  //set the hasNotifications to false
  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length > 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col ">
      {fetchedNotifications.map((notification: any) => (
        <div
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
          key={notification.id}
        >
          <BsTwitter color="black" size={32} />
          <p className="text-black">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
