import Image from "next/image";
import WarningIcon from "@/public/Warning.svg";
import { Button } from "@/ui/Button";

export default function EnrollmentConfilctModal() {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      <div className="bg-white border border-border-gray p-15 flex flex-col items-center gap-6">
        <Image width={94} height={94} src={WarningIcon} alt="warning" />

        <h1 className="text-customBlack font-semibold text-[32px]">
          Enrollment Conflict
        </h1>
        <p className="text-xl font-medium">
          You are already enrolled in “UX/UI Design Fundamentals” with the same
          schedule: Wed-Fri at 12AM-2PM
        </p>
        <div className="flex gap-2 items-center">
          <Button variant={"outline"}>Continue Anyway</Button>
          <Button variant={"primary"}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
