import Link from "next/link";
import ArrowOutlined from "@/public/ArrowOutLined.svg";
import Image from "next/image";
import { getWeeklySchedules } from "./services";
import CourseStats from "./components/CourseStats";
import EnrollNow from "./components/EnrollNow";
import { getCourseDetails } from "../services/index.server";
interface CourseDetailsProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function CourseDetails({ params }: CourseDetailsProps) {
  const resolvedParams = await params;
  const courseDetails = await getCourseDetails(Number(resolvedParams.id));
  const weeklySchedules = await getWeeklySchedules(Number(resolvedParams.id));
  console.log(courseDetails);
  return (
    <div>
      <span className="flex items-center gap-1 font-medium text-[18px]">
        <Link href={"/"} className="">
          Home
        </Link>
        <Image src={ArrowOutlined} alt="arrow" />
        <Link href={"/browse"} className="">
          Browse
        </Link>
        <Image src={ArrowOutlined} alt="arrow" />
        {/* <Link href={`/browse/}`} className="text-primary-purple">
          courseTitle
        </Link> */}
      </span>
      <div className="flex gap-33.25">
        <CourseStats
          category={courseDetails.data.category}
          description={courseDetails.data.description}
          durationWeeks={courseDetails.data.durationWeeks}
          image={courseDetails.data.image}
          lecturerName={courseDetails.data.instructor.name}
          lecturerImage={courseDetails.data.instructor.avatar}
          rating={courseDetails.data.rating}
          title={courseDetails.data.title}
        />
        <EnrollNow
          weeklySchedules={weeklySchedules.data}
          courseId={courseDetails.data.id}
          isCourseRatedData={courseDetails.data.isRated}
          basePrice={courseDetails.data.basePrice}
          enrollment={courseDetails.data.enrollment}
        />
      </div>
    </div>
  );
}
