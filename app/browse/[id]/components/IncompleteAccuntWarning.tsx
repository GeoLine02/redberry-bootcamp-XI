"use client";

import Image from "next/image";
import WarningIcon from "@/public/Warning.svg";
import { Button } from "@/ui/Button";
import { useModal } from "@/provider/ModalProvider";
import ProfileModal from "@/shared/components/ProfileModal";

export default function IncompleteAccuntWarning() {
  const { openModal } = useModal();

  return (
    <div className="border border-border-gray rounded-xl bg-white p-5 flex items-center justify-between w-full">
      <div className="max-w-87.75">
        <div className="flex gap-1 items-center">
          <Image src={WarningIcon} alt="warning" />
          <h1 className="font-medium text-customBlack">
            Complete Your Profile
          </h1>
        </div>
        <p className="text-medium-gray text-xs">
          You need to fill in your profile details before enrolling in this
          course.
        </p>
      </div>
      <Button
        className="flex items-center gap-2 hover:stroke-white"
        variant={"outline"}
        size={"sm"}
        onClick={() => openModal(<ProfileModal />)}
      >
        <span>Complete</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.8538 8.35403L9.35375 12.854C9.25993 12.9478 9.13268 13.0006 9 13.0006C8.86732 13.0006 8.74007 12.9478 8.64625 12.854C8.55243 12.7602 8.49972 12.633 8.49972 12.5003C8.49972 12.3676 8.55243 12.2403 8.64625 12.1465L12.2931 8.50028H2.5C2.36739 8.50028 2.24021 8.4476 2.14645 8.35383C2.05268 8.26006 2 8.13289 2 8.00028C2 7.86767 2.05268 7.74049 2.14645 7.64672C2.24021 7.55296 2.36739 7.50028 2.5 7.50028H12.2931L8.64625 3.85403C8.55243 3.76021 8.49972 3.63296 8.49972 3.50028C8.49972 3.3676 8.55243 3.24035 8.64625 3.14653C8.74007 3.05271 8.86732 3 9 3C9.13268 3 9.25993 3.05271 9.35375 3.14653L13.8538 7.64653C13.9002 7.69296 13.9371 7.74811 13.9623 7.80881C13.9874 7.86951 14.0004 7.93457 14.0004 8.00028C14.0004 8.06599 13.9874 8.13105 13.9623 8.19175C13.9371 8.25245 13.9002 8.30759 13.8538 8.35403Z"
            fill="currentColor"
          />
        </svg>
      </Button>
    </div>
  );
}
