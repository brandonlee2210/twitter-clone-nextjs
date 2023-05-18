"use client";

import { BsBell, BsHouse } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";
import SidebarTweetButton from "./SidebarTweetButton";

export default function Sidebar() {
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
      label: "Messages",
      href: "/",
      icon: FaFacebookMessenger,
      auth: true,
    },
    {
      label: "Profile",
      href: `/`,
      icon: FaUser,
      auth: true,
    },
  ];

  return (
    <div className="col-span-1 pr-2 md:pr-6">
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
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
}
