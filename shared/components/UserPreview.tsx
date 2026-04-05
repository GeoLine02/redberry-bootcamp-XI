"use client";

import Image from "next/image";
import UserIcon from "@/public/User.svg";
import { useUser } from "@/provider/UserProvider";
import { useModal } from "@/provider/ModalProvider";
import ProfileModal from "./ProfileModal";
export default function UserPreview() {
  const { user } = useUser();
  const { openModal } = useModal();

  const HandleToggleProfileModal = () => {
    openModal(<ProfileModal />);
  };

  return (
    <>
      <div
        onClick={HandleToggleProfileModal}
        className="bg-light-purple rounded-full w-14 aspect-square relative cursor-pointer flex items-center justify-center"
      >
        <Image src={UserIcon} alt="User" />
        <div
          className={`${user?.profileComplete ? "bg-success" : "bg-warning-color"} absolute w-3.5 z-10 aspect-square rounded-full bottom-0 -right-0.5`}
        ></div>
      </div>
    </>
  );
}
