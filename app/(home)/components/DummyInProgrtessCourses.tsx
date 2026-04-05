"use client";

import { useUser } from "@/provider/UserProvider";
import Image from "next/image";
import DummyCardImage from "@/public/BluredCard.png";
import LockIcon from "@/public/Lock.png";
import { Button } from "@/ui/Button";
import { useModal } from "@/provider/ModalProvider";
import SignInModal from "@/shared/components/auth/SignInModal";

const SignInWarning = () => {
  const { openModal } = useModal();

  return (
    <div className="absolute inset-0 flex items-center justify-center  backdrop-blur-sm">
      <div className="border border-border-gray bg-white rounded-xl max-w-104.5 w-full p-6 shadow-lg flex flex-col items-center gap-4">
        <div className="bg-light-purple p-4 rounded-full">
          <Image src={LockIcon} alt="lock" width={48} height={48} />
        </div>
        <p className="text-lg font-semibold text-center">
          Sign in to track your learning progress
        </p>
        <Button onClick={() => openModal(<SignInModal />)} variant={"primary"}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default function DummyInProgrtessCourses() {
  const dummyData = [1, 2, 3];
  const { user } = useUser();

  return (
    <>
      {!user && (
        <section>
          <h1 className="text-[40px] font-semibold ">Continue Learning</h1>
          <p className="font-medium text-lg">Pick up where you left</p>
          <div className="grid grid-cols-3 gap-5 relative">
            {dummyData.map((data) => (
              <Image
                key={data}
                src={DummyCardImage}
                alt="dummy data"
                className="w-full h-auto"
              />
            ))}
            <SignInWarning />
          </div>
        </section>
      )}
    </>
  );
}
