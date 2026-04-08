import Image from "next/image";
import { EnrollmentType } from "../types";
import StartrIcon from "@/public/Star.svg";
import ProgressBar from "./ProgressBar";
import { Button } from "@/ui/Button";
import { useEffect, useState } from "react";
import PackageOpened from "@/public/PackageOpen.svg";
import Link from "next/link";
import CalendarIcon from "@/public/Calendar.svg";
import ClockIcon from "@/public/Clock.svg";
import PersonsIcon from "@/public/PeopleIcon.svg";
import Location from "@/public/Location.svg";
import { useModal } from "@/provider/ModalProvider";

interface EnrolledCourseCardProps {
  enrolledCourse: EnrollmentType;
}

const EnrolledCourseCard = ({ enrolledCourse }: EnrolledCourseCardProps) => {
  console.log(enrolledCourse);

  const { closeModal } = useModal();

  return (
    <div className="w-full max-w-155.75 bg-white p-5">
      <div className="flex gap-4">
        <Image
          width={269}
          height={191}
          className="max-w-67.25 max-h-47.75 rounded-xl object-fill"
          src={enrolledCourse.course.image}
          alt="image"
        />
        <div>
          <div className="flex items-center">
            <h3>
              Instructor <span>{enrolledCourse.course.instructor.name}</span>
            </h3>
            <div className="flex items-center gap-1">
              <Image src={StartrIcon} alt="star" />
              <span>{enrolledCourse.course.avgRating}</span>
            </div>
          </div>
          <h1 className="text-[20px] font-semibold">
            {enrolledCourse.course.title}
          </h1>
          <ul>
            <li className="flex gap-1 items-center">
              <Image src={CalendarIcon} alt="" />
              <span className="text-medium-gray">
                {enrolledCourse.schedule.weeklySchedule.label}
              </span>
            </li>
            <li className="flex gap-1 items-center text-medium-gray">
              <Image src={ClockIcon} alt="" />{" "}
              <span className="text-medium-gray">
                {" "}
                {enrolledCourse.schedule.timeSlot.label}
              </span>
            </li>
            <li className="flex gap-1 items-center">
              <Image src={PersonsIcon} alt="" />{" "}
              <span className="text-medium-gray">
                {enrolledCourse.schedule.sessionType.name}
              </span>
            </li>
            <li className="flex gap-1 items-center">
              <Image src={Location} alt="" />{" "}
              <span className="text-medium-gray">
                {enrolledCourse.schedule.location || "N/A"}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 gap-6">
        <ProgressBar percentage={enrolledCourse.progress} />
        <Link
          onClick={() => closeModal()}
          href={`/browse/${enrolledCourse.course.id}`}
        >
          <Button
            className="max-w-29.25 w-full"
            size={"md"}
            variant={"outline"}
          >
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};

interface Props {
  enrolledCourses: EnrollmentType[];
  open?: boolean; // injected by Modal
}

export default function EnrolledCoursesModal({
  enrolledCourses,
  open = false,
}: Props) {
  const [mounted, setMounted] = useState(false);

  // trigger animation AFTER mount
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(open);
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  const { closeModal } = useModal();

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-full max-w-198.5 bg-light-gray px-14.25 py-10.5 shadow-2xl transform transition-transform duration-300 ease-out ${mounted ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[40px] font-semibold ">Enrolled Courses</h1>
        <p>Total Enrollments {enrolledCourses.length}</p>
      </div>
      {enrolledCourses.length ? (
        <div className="flex flex-col gap-3.5 overflow-y-auto h-full">
          {enrolledCourses.map((course) => (
            <EnrolledCourseCard key={course.id} enrolledCourse={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center justify-center h-[70vh]">
          <Image src={PackageOpened} alt="" />
          <h1 className="text-dark-puple">No Enrolled Courses Yet</h1>
          <p className="text-dark-puple text-sm text-center">
            Your learning journey starts here! Browse courses to get started.
          </p>
          <Link onClick={closeModal} className="mt-1" href={"/browse"}>
            <Button>Browse Courses</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
