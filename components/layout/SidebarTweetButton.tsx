"use client";
import { useRouter } from "next/navigation";
import { FaFeather } from "react-icons/fa";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

const SidebarTweetButton = () => {
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const onClick = () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    router.push("/");
  };

  return (
    <div onClick={onClick}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-600 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      <div className="mt-6 hidden lg:block rounded-full px-4 py-2 bg-sky-600 hover:bg-opacity-90 transition cursor-pointer">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
};
export default SidebarTweetButton;
