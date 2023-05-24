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

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouse,
    },
    {
      label: "Notifications",
      href: "/",
      icon: BsBell,
      auth: true,
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
              auth={item.auth}
            />
          ))}
          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
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
