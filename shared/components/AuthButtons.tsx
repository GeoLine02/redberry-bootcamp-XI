"use client";

import { Button } from "@/ui/Button";
import SignInModal from "./auth/SignInModal";
import SignUpModal from "./auth/SignUpModal";
import { useModal } from "@/provider/ModalProvider";
import Link from "next/link";
import { useUser } from "@/provider/UserProvider";
import Image from "next/image";
import BookIcon from "@/public/Book.svg";
import UserPreview from "./UserPreview";

export default function AuthButtons() {
  const { openModal } = useModal();

  const { user } = useUser();
  return (
    <>
      {user && (
        <>
          <li>
            <Link
              href={"/enrolled-courses"}
              className="flex gap-1 items-center"
            >
              <Image src={BookIcon} alt="Browse Courses" />
              <span className="text-dark-gray font-medium">
                Enrolled Courses
              </span>
            </Link>
          </li>
          <UserPreview />
        </>
      )}
      {!user && (
        <div className="flex items-center gap-3.75">
          <Button
            onClick={() => openModal(<SignInModal />)}
            variant={"outline"}
          >
            Log In
          </Button>
          <Button
            onClick={() => openModal(<SignUpModal />)}
            variant={"primary"}
          >
            Sign Up
          </Button>
        </div>
      )}
    </>
  );
}
