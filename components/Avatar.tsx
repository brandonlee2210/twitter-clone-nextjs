import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Image from "next/image";

type avatarProps = {
  username: string;
  isLarge?: boolean;
  hasBorder?: boolean;
};

const Avatar = ({ username, isLarge, hasBorder }: avatarProps) => {
  const { data: fetchedUser } = useUser(username);

  const routers = useRouter();

  const onClick = (e: any) => {
    e.stopPropagation();

    const url = `/users/${username}`;

    routers.push(url);
  };
  return (
    <div
      className={`${hasBorder ? "border-4 border-white" : ""} ${
        isLarge ? "h-36 w-36" : "min-h-[46px] min-w-[46px]"
      } rounded-full hover:opacity-90 transition cursor-pointer relative`}
    >
      <Image
        fill
        style={{ objectFit: "cover", borderRadius: "100%" }}
        alt="avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
        // src="https://twitterclone-nextapp.s3.amazonaws.com/giabao.png"
      />
    </div>
  );
};

export default Avatar;
