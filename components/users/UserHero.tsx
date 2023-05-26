import Image from "next/image";
import useUser from "@/hooks/useUser";

import Avatar from "../Avatar";

type UserHeroProps = {
  username: string;
};

const UserHero = ({ username }: UserHeroProps) => {
  const { data: fetchedUser } = useUser(username);

  return (
    <div>
      <div className="bg-neutral-700 h-48 relative">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            sizes="100%"
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar username={username} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
