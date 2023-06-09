"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { formatDistanceToNowStrict } from "date-fns";
import { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

const NotificationsFeed = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(
    currentUser?.username
  );

  //set the hasNotifications to false

  if (fetchedNotifications.length === 0) {
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
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-200"
          key={notification.id}
        >
          <BsTwitter color="#1DA1F2" size={32} />
          <p className="text-black flex justify-between w-full">
            {notification.body}
            <span className="text-neutral-500">
              {formatDistanceToNowStrict(new Date(notification.createdAt))} ago
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
