"use client";

import { BsBell, BsHouse } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

import { signOut } from "next-auth/react";

import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";
import SidebarTweetButton from "./SidebarTweetButton";

import useCurrentUser from "@/hooks/useCurrentUser";

export default function Sidebar() {
  const { data: currentUser } = useCurrentUser();

  const handleSignout = async () => {
    await signOut();
  };

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouse,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBell,
      auth: true,
      alert: currentUser?.hasNotification,
    },

    {
      label: "Profile",
      href: `/users/${currentUser?.username}`,
      icon: FaUser,
      auth: true,
    },
  ];

  return (
    <div className="col-span-2 pr-2 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              label={item.label}
              href={item.href}
              icon={item.icon}
              key={item.label}
              alert={item.alert}
              auth={item.auth}
            />
          ))}
          {currentUser && (
            <SidebarItem
              onClick={handleSignout}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
}
