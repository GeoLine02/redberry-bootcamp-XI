"use client";
import ProgressBar from "@/shared/components/ProgressBar";
import { Instructor } from "@/shared/types";
import { Button } from "@/ui/Button";
import Image from "next/image";
import Link from "next/link";
import StarIcon from "@/public/Star.svg";
import { useModal } from "@/provider/ModalProvider";
import EnrolledCoursesModal from "@/shared/components/EnrolledCoursesModal";
import { useEnrollments } from "@/provider/EnrollmentsProvider";
import { useUser } from "@/provider/UserProvider";

interface InCompleteCourseCardProps {
  id: number;
  image: string;
  lecutrer: Instructor;
  rating: number;
  title: string;
  progress: number;
  courseId: number;
}

const InCompleteCourseCard = ({
  image,
  lecutrer,
  progress,
  rating,
  title,
  courseId,
}: InCompleteCourseCardProps) => {
  return (
    <div className="p-5 bg-white w-full max-w-126.5 rounded-xl gap-2 flex flex-col">
      <div className="flex gap-4 flex-1">
        <Image
          width={140}
          height={123}
          className="max-w-35 max-h-30.75 object-fill rounded-xl"
          src={image}
          alt={title}
        />

        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h3 className="text-medium-gray">
              Lecuter <span className="text-dark-gray">{lecutrer.name}</span>
            </h3>
            <div className="flex items-center gap-1">
              <Image src={StarIcon} alt="rating" />
              <span className="text-dark-gray font-medium text-sm">
                {rating}
              </span>
            </div>
          </div>
          <h1 className="text-[20px] font-semibold line-clamp-2">{title}</h1>
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-10">
        <ProgressBar percentage={progress} />
        <Link href={`/browse/${courseId}`}>
          <Button className="px-6.5" size={"md"} variant={"outline"}>
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default function InCompleteCourses() {
  const { openModal } = useModal();
  const { enrolledCourses } = useEnrollments();
  const { user } = useUser();

  const handleOpenEnrollmentsModal = () => {
    if (enrolledCourses.length > 4) {
      openModal(<EnrolledCoursesModal enrolledCourses={enrolledCourses} />);
    }
  };

  return (
    <>
      {user && enrolledCourses.length ? (
        <section>
          <div className="flex w-full justify-between items-baseline">
            <div>
              <h1 className="text-[40px] font-semibold">Continue Learning</h1>
              <p className="font-medium text-lg">Pick up where you left</p>
            </div>
            <button
              onClick={handleOpenEnrollmentsModal}
              className="border-b border-b-primary-purple cursor-pointer h-fit "
            >
              See All
            </button>
          </div>
          <div className="grid grid-cols-3 mt-8 gap-6">
            {enrolledCourses.map((course) => (
              <InCompleteCourseCard
                key={course.id}
                id={course.id}
                courseId={course.course.id}
                image={course.course.image}
                lecutrer={course.course.instructor}
                progress={course.progress}
                rating={course.course.avgRating}
                title={course.course.title}
              />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
