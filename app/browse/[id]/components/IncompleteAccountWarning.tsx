import Image from "next/image";
import UserIcon from "@/public/User.svg";
import { Button } from "@/ui/Button";
import { useModal } from "@/provider/ModalProvider";
import ProfileModal from "@/shared/components/ProfileModal";

export default function IncompleteAccountWarning() {
  const { openModal } = useModal();

  return (
    <div className="flex flex-col gap-6 max-w-89 items-center justify-center">
      <Image width={94} src={UserIcon} alt="user icon" />
      <h1 className="text-[32px] font-semibold text-center">
        Complete your profile to continue
      </h1>
      <div className="flex gap-2">
        <Button onClick={() => openModal(<ProfileModal />)} variant={"outline"}>
          Complete Profile
        </Button>

        <Button variant={"primary"}>Cancel</Button>
      </div>
    </div>
  );
}
