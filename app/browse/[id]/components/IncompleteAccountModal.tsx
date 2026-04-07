import Image from "next/image";
import UserIcon from "@/public/User.svg";
import { Button } from "@/ui/Button";
import { useModal } from "@/provider/ModalProvider";
import ProfileModal from "@/shared/components/ProfileModal";

export default function IncompleteAccountModal() {
  const { openModal, closeModal } = useModal();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="max-w-119 relative flex flex-col items-center p-15 space-y-6 bg-white rounded-xl shadow-xl pointer-events-auto">
        <Image width={94} src={UserIcon} alt="user icon" />
        <h1 className="text-[32px] font-semibold text-center">
          Complete your profile to continue
        </h1>
        <p className="text-center">
          You need to complete your profile before enrolling in this course.
        </p>
        <div className="flex gap-2">
          <Button
            onClick={() => openModal(<ProfileModal />)}
            variant={"outline"}
          >
            Complete Profile
          </Button>

          <Button onClick={closeModal} variant={"primary"}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
