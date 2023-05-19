"use client";

import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

type HeaderProps = {
  showBackArrow?: boolean;
  label: string;
};

const Header = ({ showBackArrow, label }: HeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="border-b-[2px] border-neutral-300 p-5">
      <div className="flex flex-row items-center gap-5">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            color="#1DA1F2"
            size={28}
            className="
              cursor-pointer 
              hover:opacity-70 
              transition
          "
          />
        )}
        <h1 className="text-black text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
