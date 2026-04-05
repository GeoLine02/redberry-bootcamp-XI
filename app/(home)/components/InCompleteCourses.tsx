"use client";
import ProgressBar from "@/shared/components/ProgressBar";
import { Enrollment, Instructor } from "@/shared/types";
import { Button } from "@/ui/Button";
import Image from "next/image";
import Link from "next/link";
import StarIcon from "@/public/Star.svg";

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
    <div className="p-5 bg-white w-full max-w-126.5 rounded-xl">
      <div className="flex gap-4">
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
          <Button size={"md"} variant={"outline"}>
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};

interface InCompleteCoursesProps {
  incompleteCourses: Enrollment[];
}

export default function InCompleteCourses({
  incompleteCourses,
}: InCompleteCoursesProps) {
  return (
    <section>
      <h1 className="text-[40px] font-semibold">Continue Learning</h1>
      <p className="font-medium text-lg">Pick up where you left</p>
      <div className="grid grid-col-3 gap-6">
        {incompleteCourses.map((course) => (
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
  );
}
