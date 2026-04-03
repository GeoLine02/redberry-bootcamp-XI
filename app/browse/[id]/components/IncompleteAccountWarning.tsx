import Image from "next/image";
import UserIcon from "@/public/User.svg";
import { Button } from "@/ui/Button";
import Link from "next/link";

export default function IncompleteAccountWarning() {
  return (
    <div className="flex flex-col gap-6 max-w-89 items-center justify-center">
      <Image width={94} src={UserIcon} alt="user icon" />
      <h1 className="text-[32px] font-semibold text-center">
        Complete your profile to continue
      </h1>
      <div className="flex gap-2">
        <Link href={"/profile"}>
          <Button variant={"outline"}>Complete Profile</Button>
        </Link>
        <Button variant={"primary"}>Cancel</Button>
      </div>
    </div>
  );
}
