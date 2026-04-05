import { Button } from "@/ui/Button";
import { CourseEnrollmentDetailsType } from "../types";
import CheckMarkIcon from "@/public/CheckMark.svg";
import Image from "next/image";
import RepeatIcon from "@/public/Repeat.svg";

interface EnrolledCourseProps {
  enrollment: CourseEnrollmentDetailsType;
  handleCompleteEnrollment: () => Promise<void>;
  retakeEnrollment: () => Promise<void>;
}

export default function EnrolledCourse({
  enrollment,
  handleCompleteEnrollment,
  retakeEnrollment,
}: EnrolledCourseProps) {
  const isCompleted = enrollment.progress === 100;

  return (
    <div className="w-full max-w-113 space-y-5.5 mt-17.5">
      <span
        className={`${isCompleted ? "bg-success/10 text-success" : "bg-light-purple text-primary-purple"} p-4 font-medium rounded-full inline-block`}
      >
        {isCompleted ? "Completed" : "Enrolled"}
      </span>

      <ul className="space-y-5.5 text-dark-gray">
        <li>{enrollment.schedule.weeklySchedule.label}</li>
        <li>{enrollment.schedule.timeSlot.label}</li>
        <li>{enrollment.schedule.sessionType.name}</li>
        <li>{enrollment.schedule.sessionType.location}</li>
      </ul>

      <div className="space-y-3">
        <p className="text-sm text-dark-gray font-medium">
          {enrollment.progress}% completed
        </p>
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-purple transition-all rounded-r-full duration-300"
            style={{ width: `${enrollment.progress}%` }}
          />
        </div>
      </div>

      {enrollment.progress !== 100 ? (
        <Button
          onClick={handleCompleteEnrollment}
          variant={"primary"}
          className="flex items-center gap-2.5 w-full justify-center"
          aria-labelledby="complete course button"
        >
          <span>Complete Course</span>
          <Image src={CheckMarkIcon} alt="check mark icon" />
        </Button>
      ) : (
        <Button
          onClick={retakeEnrollment}
          variant={"primary"}
          className="flex items-center gap-2.5 w-full justify-center"
          aria-labelledby="repeat course button"
        >
          <span>Retake Course</span>
          <Image src={RepeatIcon} alt="repaet icon" />
        </Button>
      )}
    </div>
  );
}
