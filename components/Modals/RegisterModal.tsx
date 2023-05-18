"use client";

import axios from "axios";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

import { useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const openSignInModal = () => {
    if (isLoading) return;

    registerModal.onClose();
    loginModal.onOpen();
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/register", {
        email,
        password,
        username,
        name,
      });

      setIsLoading(false);

      toast.success("Account created successfully!");

      signIn("credentials", {
        email,
        password,
      });

      registerModal.onClose();
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <form action="" className="flex flex-col gap-4">
      <Input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        value={email}
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        value={password}
      />
      <Input
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        value={name}
      />
      <Input
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        value={username}
      />
    </form>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4 ">
      <p>
        Already have an account?
        <span
          className="ml-2 text-black cursor-pointer hover:underline"
          onClick={openSignInModal}
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title="Register"
      actionLabel="Sign up"
      body={bodyContent}
      footer={footerContent}
      onSubmit={onSubmit}
    />
  );
}
