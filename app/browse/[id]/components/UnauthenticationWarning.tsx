"use client";

import Image from "next/image";
import WarningIcon from "@/public/Warning.svg";
import { Button } from "@/ui/Button";
import ArrowRight from "@/public/ArrowRight.svg";
import { useModal } from "@/provider/ModalProvider";
import SignInModal from "@/shared/components/auth/SignInModal";

export default function UnauthenticationWarning() {
  const { openModal } = useModal();

  return (
    <div className="max-w-132.5 w-full bg-white rounded-xl flex items-center justify-between p-5 border border-border-gray mt-3">
      <div>
        <div className="flex gap-1 items-center">
          <Image src={WarningIcon} alt="warning icon" />
          <h1 className="text-customBlack font-medium">
            Authentication Required
          </h1>
        </div>
        <p className="text-medium-gray max-w-70.75">
          You need sign in to your profile before enrolling in this course.
        </p>
      </div>
      <Button
        className="flex items-center gap-1.5"
        onClick={() => openModal(<SignInModal />)}
        variant={"outline"}
        size={"sm"}
      >
        <span>Sign In</span>
        <Image width={16} src={ArrowRight} alt="arrow right" />
      </Button>
    </div>
  );
}
