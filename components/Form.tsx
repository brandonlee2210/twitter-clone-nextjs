"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "@/hooks/usePost";

type Props = {
  placeholder: string;
  isComment?: boolean;
  postId?: number;
};

const Form = ({ placeholder, isComment, postId }: Props) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePost } = usePost(postId);
  const { mutate: mutatePosts } = usePosts();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : `/api/posts`;
      await axios.post(url, { body });

      toast.success("Tweet created");
      setBody("");
      mutatePost();
      // mutatePosts()
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePost, isComment, postId]);

  return (
    <div className="border-b-[1px] border-neutral-200 px-5 py-5">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div className="">
            <Avatar username={currentUser?.username} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="disabled:opacity-80 peer resize-none mt-3 w-full bg-white ring-0 outline-none text-[20px] placeholder-neutral-500 text-black  transition"
              placeholder={placeholder}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800" />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                label="Tweet"
                disabled={isLoading || !body}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 ">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};
export default Form;
