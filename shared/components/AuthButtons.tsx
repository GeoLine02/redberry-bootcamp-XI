"use client";

import { Button } from "@/ui/Button";
import SignInModal from "./auth/SignInModal";
import SignUpModal from "./auth/SignUpModal";
import { useUser } from "@/provider/UserProvider";
import Image from "next/image";
import BookIcon from "@/public/Book.svg";
import UserPreview from "./UserPreview";
import EnrolledCoursesModal from "./EnrolledCoursesModal";
import { Enrollment } from "../types";
import { useModal } from "@/provider/ModalProvider";

interface AuthButtonsProps {
  enrolledCourses: Enrollment[];
}

export default function AuthButtons({ enrolledCourses }: AuthButtonsProps) {
  const { openModal } = useModal();
  const { user } = useUser();

  return (
    <>
      {user && (
        <>
          <li>
            <button
              onClick={() =>
                openModal(
                  <EnrolledCoursesModal enrolledCourses={enrolledCourses} />,
                )
              }
              className="flex gap-1 items-center"
            >
              <Image src={BookIcon} alt="Browse Courses" />
              <span className="text-dark-gray font-medium">
                Enrolled Courses
              </span>
            </button>
          </li>

          <UserPreview />
        </>
      )}

      {!user && (
        <div className="flex items-center gap-3.75">
          <Button onClick={() => openModal(<SignInModal />)} variant="outline">
            Log In
          </Button>

          <Button onClick={() => openModal(<SignUpModal />)} variant="primary">
            Sign Up
          </Button>
        </div>
      )}
    </>
  );
}
