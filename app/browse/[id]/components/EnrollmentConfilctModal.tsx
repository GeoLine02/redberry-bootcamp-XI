import Image from "next/image";
import WarningIcon from "@/public/Warning.svg";
import { Button } from "@/ui/Button";
import {
  CourseEnrollmentDetailsType,
  EnrollmentConflictType,
  SelectedEnrollmentOptionsType,
} from "../types";
import { EnrollOnCourseResponse } from "../services";
import { useModal } from "@/provider/ModalProvider";
import { Dispatch, SetStateAction } from "react";

interface EnrollmentConfilctModalProps {
  conflicts: EnrollmentConflictType[];
  selectedOptions: SelectedEnrollmentOptionsType;
  courseId: number;
  enrollOnCourse(
    courseId: number,
    selectedOptions: SelectedEnrollmentOptionsType,
    force: boolean,
  ): Promise<EnrollOnCourseResponse>;
  setEnrolledCourse: Dispatch<
    SetStateAction<CourseEnrollmentDetailsType | null>
  >;
}

export default function EnrollmentConfilctModal({
  conflicts,
  enrollOnCourse,
  courseId,
  selectedOptions,
  setEnrolledCourse,
}: EnrollmentConfilctModalProps) {
  const { closeModal } = useModal();

  const forceEnrollment = async () => {
    try {
      const res = await enrollOnCourse(courseId, selectedOptions, true);
      setEnrolledCourse(res.data);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white border border-border-gray max-w-119 p-15 flex flex-col items-center gap-6 rounded-xl">
        <Image width={94} height={94} src={WarningIcon} alt="warning" />

        <h1 className="text-dark-gray font-semibold text-[32px]">
          Enrollment Conflict!
        </h1>
        {conflicts.map((conflict, index) => (
          <p key={index} className="text-xl font-medium text-center">
            You are already enrolled in “{conflict.conflictingCourseName}” with
            the same schedule: {conflict.schedule}
          </p>
        ))}
        <div className="flex gap-2 items-center">
          <Button onClick={forceEnrollment} variant={"outline"}>
            Continue Anyway
          </Button>
          <Button onClick={closeModal} variant={"primary"}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
