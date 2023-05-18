import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";

type avatarProps = {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
};

const Avatar = ({ userId, isLarge, hasBorder }: avatarProps) => {
  const onClick = () => {};
  return (
    <div
      className={`${hasBorder ? "border-4 border-black" : ""} ${
        isLarge ? "h-32 w-32" : "min-h-[46px] min-w-[46px]"
      } rounded-full hover:opacity-90 transition cursor-pointer relative`}
    >
      <Image
        fill
        style={{ objectFit: "cover", borderRadius: "100%" }}
        alt="avatar"
        onClick={onClick}
        src="/images/placeholder.png"
      />
    </div>
  );
};

export default Avatar;
