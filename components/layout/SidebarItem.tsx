"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

type SidebarItemProps = {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
};

export default function SidebarItem({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
}: SidebarItemProps) {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
      return;
    } else if (href) {
      router.push(href);
    }
  };

  return (
    <div className="flex flex-row items-center" onClick={handleClick}>
      <div className="relative h-14 w-14 lg:hidden rounded-full flex items-center justify-center hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        <Icon color="black" size={28} />
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={80} />
        ) : null}
      </div>
      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-500 hover:bg-opacity-10 cursor-pointer ">
        <Icon color="black" size={26} />
        <p className="hidden lg:block text-[#14171A] font-300 text-2xl">
          {label}
        </p>
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
    </div>
  );
}
