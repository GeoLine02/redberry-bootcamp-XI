import { Button } from "@/ui/Button";
import { CourseEnrollmentDetailsType } from "../types";
import CheckMarkIcon from "@/public/CheckMark.svg";
import Image from "next/image";

interface EnrolledCourseProps {
  enrollment: CourseEnrollmentDetailsType;
}

export default function EnrolledCourse({ enrollment }: EnrolledCourseProps) {
  console.log("123", enrollment);
  const isCompleted = enrollment.progress === 100;

  return (
    <div>
      <div
        className={`${isCompleted ? "bg-success/30 text-success" : "bg-light-purple text-medium-purple"} p-4 font-medium`}
      >
        {isCompleted ? "Completed" : "Enrolled"}
      </div>

      <ul className="space-y-5.5 text-dark-gray">
        <li>{enrollment.schedule.weeklySchedule.label}</li>
        <li>{enrollment.schedule.timeSlot.label}</li>
        <li>{enrollment.schedule.sessionType.name}</li>
        <li>{enrollment.schedule.sessionType.location}</li>
      </ul>

      <p className="text-sm text-dark-gray font-medium">
        {enrollment.progress}% completed
      </p>
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-purple transition-all duration-300"
          style={{ width: `${enrollment.progress}%` }}
        />
      </div>

      <Button
        variant={"primary"}
        className="flex items-center gap-2.5 w-full justify-center"
        aria-labelledby="complete course button"
      >
        <span>Complete Course</span>
        <Image src={CheckMarkIcon} alt="check mark icon" />
      </Button>
    </div>
  );
}
