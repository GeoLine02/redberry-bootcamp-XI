import { Button } from "@/ui/Button";
import { CourseEnrollmentDetailsType } from "../types";
import CheckMarkIcon from "@/public/CheckMark.svg";
import Image from "next/image";
import RepeatIcon from "@/public/Repeat.svg";
import ProgressBar from "@/shared/components/ProgressBar";
import CalendarIcon from "@/public/Calendar.svg";
import CLockIcon from "@/public/Clock.svg";
import PersonsIcon from "@/public/PeopleIcon.svg";
import LocationIcon from "@/public/Location.svg";

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
        <li className="flex items-center gap-1">
          <Image src={CalendarIcon} alt="" />
          {enrollment.schedule.weeklySchedule.label}
        </li>
        <li className="flex items-center gap-1">
          <Image src={CLockIcon} alt="" />
          {enrollment.schedule.timeSlot.label}
        </li>
        <li className="flex items-center gap-1">
          <Image src={PersonsIcon} alt="" />
          {enrollment.schedule.sessionType.name}
        </li>
        <li className="flex items-center gap-1">
          <Image src={LocationIcon} alt="" />
          {enrollment.schedule.sessionType.location || "N/A"}
        </li>
      </ul>

      <ProgressBar percentage={enrollment.progress} />

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
