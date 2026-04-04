"use client";

import Image from "next/image";
import UserIcon from "@/public/User.svg";
import { useState } from "react";
import { Button } from "@/ui/Button";
import { logOut } from "../services/auth";
import { useUser } from "@/provider/UserProvider";
export default function UserPreview() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user, setUser } = useUser();
  const handleLogOut = async () => {
    await logOut();
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={handleToggleMenu}
        className="bg-light-purple rounded-full w-14 aspect-square relative cursor-pointer flex items-center justify-center"
      >
        <Image src={UserIcon} alt="User" />
        <div
          className={`${user?.profileComplete ? "bg-success" : "bg-warning-color"} absolute w-3.5 z-10 aspect-square rounded-full bottom-0 -right-0.5`}
        ></div>
      </div>
      {toggleMenu && (
        <div className="absolute top-23 z-20 right-24 mt-2 w-48 bg-white border-border-gray rounded-md shadow-lg py-2">
          <Button className="w-full" variant={"ghost"} onClick={handleLogOut}>
            Log Out
          </Button>
        </div>
      )}
    </>
  );
}
