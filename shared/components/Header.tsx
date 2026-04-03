"use client";

import Logo from "@/ui/Logo";
import Image from "next/image";
import Link from "next/link";
import BrowseIcon from "@/public/BrowseCourses.svg";
import { Button } from "@/ui/Button";
import { useModal } from "@/provider/ModalProvider";
import SignInModal from "./auth/SignInModal";
import SignUpModal from "./auth/SignUpModal";
import BookIcon from "@/public/Book.svg";
import UserPreview from "./UserPreview";

export default function Header() {
  const { openModal } = useModal();
  const token = localStorage.getItem("accessToken");
  return (
    <header className="border-b border-border-gray">
      <div className="flex items-center  justify-between py-6 container">
        <Logo />
        <nav>
          <ul className="flex items-center gap-9">
            <li>
              <Link className="flex gap-1 items-center" href={"/courses"}>
                <Image src={BrowseIcon} alt="Browse Courses" />
                <span className="text-dark-gray font-medium">
                  Browse Courses
                </span>
              </Link>
            </li>
            {token && (
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
            {!token && (
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
